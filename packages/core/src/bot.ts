import { Client, client } from 'tmi.js';
import { getUserRole } from './utils';
import { MessageArgs, Plugin, PluginActions } from './plugin';
import { getLogger } from '@buttercatbot/logger';

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
	private clientLogger = getLogger({ name: 'tmi.js' });
	private logger = getLogger({ name: 'core' });
	private pluginList: Plugin[] = [];

	constructor(private readonly opts: BotOptions) {
		this.logger.settings.minLevel =
			typeof opts.logLevel === 'number' ? opts.logLevel : 3;

		this.logger.info('Creating new bot instance');
		this.twitchClient = client({
			channels: opts.channels,
			identity: opts.identity,
		});
		this.logger.debug('Created client');
	}

	get client(): Client {
		return this.twitchClient;
	}

	get plugins() {
		return this.pluginList;
	}

	async initialize() {
		this.logger.debug('Loading plugins');
		this.pluginList.forEach((plugin, i) => {
			this.logger.debug(
				`Loading plugin '${plugin.name}' (${i + 1}/${this.pluginList.length})`
			);
			try {
				this.loadPlugin(plugin);
				this.logger.debug(
					`Loaded plugin '${plugin.name}' (${i + 1}/${this.pluginList.length})`
				);
			} catch (e) {
				this.logger.error(`Failed to load plugin '${plugin.name}'`);
				this.logger.error(e);
			}
		});
		this.logger.info(`Loaded ${this.pluginList.length} plugins`);

		this.logger.debug('Attempting to connect');
		this.twitchClient.on('connected', () => {
			this.logger.info(`Connected to ${this.opts.channels}`);
		});

		await this.twitchClient.connect();
		return this;
	}

	async say(target: string, message: string): Promise<void> {
		this.logger.trace(`Attempting to send ${message} to ${target}`);
		await this.twitchClient.say(target, message);
	}

	addPlugin(plugin: Plugin) {
		this.logger.info(`Adding plugin ${plugin.name}`);
		this.pluginList.push(plugin);
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
			this.logger.trace(`${name}: init`);
			await init();
		}

		if (
			onMessage ||
			onSubscriberMessage ||
			onBroadcasterMessage ||
			onModMessage
		) {
			this.logger.trace(`${name}: setting up message handler`);
			this.twitchClient.on(
				'message',
				async (channel, userState, message, self) => {
					if (self) return;

					const role = getUserRole(userState);
					const messageArgs: MessageArgs = { channel, userState, message };
					const messageActions: PluginActions = {
						say: (message: string) => this.say(channel, message),
					};

					if (onMessage) {
						this.logger.trace(`${name}: onMessage`);
						if (!onMessageIgnoreRoles?.includes(role)) {
							this.logger.trace(`${name}: onMessage allowed role ${role}`);
							await onMessage(messageArgs, messageActions);
						} else {
							this.logger.trace(`${name}: onMessage ignored role ${role}`);
						}
					}

					if (onModMessage && role === 'mod') {
						this.logger.trace(`${name}: onModMessage`);
						await onModMessage(messageArgs, messageActions);
					}

					if (onSubscriberMessage && role === 'subscriber') {
						this.logger.trace(`${name}: onSubscriberMessage`);
						await onSubscriberMessage(messageArgs, messageActions);
					}

					if (onBroadcasterMessage && role === 'broadcaster') {
						this.logger.trace(`${name}: onBroadcasterMessage`);
						await onBroadcasterMessage(messageArgs, messageActions);
					}
				}
			);
		}

		if (onConnect) {
			this.logger.trace(`${name}: onConnect`);
			this.twitchClient.on('connected', () => {
				onConnect();
			});
		}
	}
}
