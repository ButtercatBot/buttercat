import { Client, client } from 'tmi.js';
import { Plugin, PluginActions } from './plugin';
import { getLogger } from '@buttercatbot/logger';
import { mapMessageArgs, mapSubscriptionArgs } from './types';

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
		onSubscription,
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
				async (channel, userstate, message, self) => {
					if (self) return;
					const args = mapMessageArgs({ channel, userstate, message });

					const messageActions: PluginActions = {
						say: (message: string) => this.say(channel, message),
					};

					if (onMessage) {
						this.logger.trace(`${name}: onMessage`);
						const ignoredRole =
							(onMessageIgnoreRoles?.filter((role) =>
								args.userState.roles.includes(role)
							)?.length ?? 0) > 0 ?? false;

						if (!ignoredRole) {
							this.logger.trace(
								`${name}: onMessage allowed role ${args.userState.roles}`
							);
							await onMessage(args, messageActions);
						} else {
							this.logger.trace(
								`${name}: onMessage ignored role ${args.userState.roles}`
							);
						}
					}

					if (onModMessage && args.userState.mod) {
						this.logger.trace(`${name}: onModMessage`);
						await onModMessage(args, messageActions);
					}

					if (onSubscriberMessage && args.userState.subscriber) {
						this.logger.trace(`${name}: onSubscriberMessage`);
						await onSubscriberMessage(args, messageActions);
					}

					if (onBroadcasterMessage && args.userState.broadcaster) {
						this.logger.trace(`${name}: onBroadcasterMessage`);
						await onBroadcasterMessage(args, messageActions);
					}
				}
			);
		}

		if (onSubscription) {
			this.logger.trace(`${name}: onSubscription`);

			this.twitchClient.on(
				'subscription',
				async (channel, username, methods, message, userstate) => {
					const args = mapSubscriptionArgs({
						channel,
						username,
						methods,
						message,
						userstate,
					});

					const messageActions: PluginActions = {
						say: (message: string) => this.say(channel, message),
					};

					await onSubscription(args, messageActions);
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
