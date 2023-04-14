import { ChatUserstate, Client, client } from 'tmi.js';
import { getLogger } from '@modularbot/logger';

export * from 'tmi.js';

export const log = getLogger({ name: 'core' });

interface BotOptions {
	channels: string[];
	identity?: {
		username: string;
		password: string;
	};
}

export type MessageArgs = {
	channel: string;
	userState: ChatUserstate;
	message: string;
};

export type UserType = 'chatter' | 'mod' | 'subscriber' | 'broadcaster';

export interface Plugin {
	name: string;
	init?: () => void;
	onMessageIgnoreRoles?: UserType[];
	onMessage?: (args: MessageArgs) => void;
	onSubscriberMessage?: (args: MessageArgs) => void;
	onModMessage?: (args: MessageArgs) => void;
	onBroadcasterMessage?: (args: MessageArgs) => void;
	onConnect?: () => void;
}

export interface BasicBot {
	client: Client;
	initialize: () => Promise<this>;
	say: (target: string, message: string) => Promise<void>;
	addPlugin(plugin: Plugin): this;
}

const getUserRole = (userState: ChatUserstate): UserType => {
	if (userState.badges?.broadcaster) {
		return 'broadcaster';
	}

	if (userState.mod) {
		return 'mod';
	}

	if (userState.subscriber) {
		return 'subscriber';
	}

	return 'chatter';
};

export class Bot implements BasicBot {
	private readonly twitchClient: Client;
	private plugins: Plugin[] = [];

	constructor(opts: BotOptions) {
		log.info('Creating new bot instance');
		this.twitchClient = client(opts);
		log.debug('Created client');
	}

	get client(): Client {
		return this.twitchClient;
	}

	async initialize() {
		log.debug('Loading plugins');
		this.plugins.forEach((plugin, i) => {
			log.debug(
				`Loading plugin '${plugin.name}' (${i + 1}/${this.plugins.length})`
			);
			this.loadPlugin(plugin);
		});
		log.debug(`Loaded ${this.plugins.length} plugins`);

		log.debug('Attempting to connect');
		this.twitchClient.on('connected', () => {
			log.info('Connected to Twitch');
		});

		await this.twitchClient.connect();
		return this;
	}

	async say(target: string, message: string): Promise<void> {
		log.trace(`Attempting to send ${message} to ${target}`);
		await this.twitchClient.say(target, message);
	}

	addPlugin(plugin: Plugin) {
		log.info(`Adding plugin ${plugin.name}`);
		this.plugins.push(plugin);
		return this;
	}

	private loadPlugin({
		onMessage,
		onSubscriberMessage,
		onBroadcasterMessage,
		onModMessage,
		onMessageIgnoreRoles,
		init,
		name,
		onConnect,
	}: Plugin) {
		if (init) {
			log.trace(`${name}: init`);
			init();
		}

		if (
			onMessage ||
			onSubscriberMessage ||
			onBroadcasterMessage ||
			onModMessage
		) {
			log.trace(`${name}: setting up message handler`);
			this.twitchClient.on('message', (channel, userState, message) => {
				const role = getUserRole(userState);

				if (onMessage) {
					log.trace(`${name}: onMessage`);
					if (!onMessageIgnoreRoles?.includes(role)) {
						log.trace(`${name}: onMessage allowed role ${role}`);
						onMessage({ channel, userState, message });
					} else {
						log.trace(`${name}: onMessage ignored role ${role}`);
					}
				}

				if (onModMessage && role === 'mod') {
					log.trace(`${name}: onModMessage`);
					onModMessage({ channel, userState, message });
				}

				if (onSubscriberMessage && role === 'subscriber') {
					log.trace(`${name}: onSubscriberMessage`);
					onSubscriberMessage({ channel, userState, message });
				}

				if (onBroadcasterMessage && role === 'broadcaster') {
					log.trace(`${name}: onBroadcasterMessage`);
					onBroadcasterMessage({ channel, userState, message });
				}
			});
		}

		if (onConnect) {
			log.trace(`${name}: onConnect`);
			this.twitchClient.on('connected', () => {
				onConnect();
			});
		}
	}
}
