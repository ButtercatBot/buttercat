import { Client, client } from 'tmi.js';
import { log } from './logger';
import { getUserRole } from "./utils";
import { Plugin } from "./plugin";

interface BotOptions {
	channels: string[];
	identity?: {
		username: string;
		password: string;
	};
	logLevel?: number;
}

export interface BasicBot {
	client: Client;
	initialize: () => Promise<this>;
	say: (target: string, message: string) => Promise<void>;
	addPlugin(plugin: Plugin): this;
}

export class Bot implements BasicBot {
	private readonly twitchClient: Client;
	private plugins: Plugin[] = [];

	constructor(private readonly opts: BotOptions) {
		log.settings.minLevel = typeof opts.logLevel === "number" ? opts.logLevel : 3;

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
			try {
				this.loadPlugin(plugin);
			} catch (e) {
				log.error(`Failed to load plugin '${plugin.name}'`);
				log.error(e);
			}
		});
		log.debug(`Loaded ${this.plugins.length} plugins`);

		log.debug('Attempting to connect');
		this.twitchClient.on('connected', () => {
			log.info(`Connected to ${this.opts.channels}`);
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

	private async loadPlugin({
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
				await init();
			}

			if (
				onMessage ||
				onSubscriberMessage ||
				onBroadcasterMessage ||
				onModMessage
			) {
				log.trace(`${name}: setting up message handler`);
				this.twitchClient.on('message', async (channel, userState, message) => {
					const role = getUserRole(userState);

					if (onMessage) {
						log.trace(`${name}: onMessage`);
						if (!onMessageIgnoreRoles?.includes(role)) {
							log.trace(`${name}: onMessage allowed role ${role}`);
							await onMessage({ channel, userState, message });
						} else {
							log.trace(`${name}: onMessage ignored role ${role}`);
						}
					}

					if (onModMessage && role === 'mod') {
						log.trace(`${name}: onModMessage`);
						await onModMessage({ channel, userState, message });
					}

					if (onSubscriberMessage && role === 'subscriber') {
						log.trace(`${name}: onSubscriberMessage`);
						await onSubscriberMessage({ channel, userState, message });
					}

					if (onBroadcasterMessage && role === 'broadcaster') {
						log.trace(`${name}: onBroadcasterMessage`);
						await onBroadcasterMessage({ channel, userState, message });
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
