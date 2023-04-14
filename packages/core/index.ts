import { ChatUserstate, Client, client } from 'tmi.js';

export * from 'tmi.js';

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
	onMessageIgnoreRoles?: UserType[];
	onMessage?: (args: MessageArgs) => void;
	onSubscriberMessage?: (args: MessageArgs) => void;
	onModMessage?: (args: MessageArgs) => void;
	onBroadcasterMessage?: (args: MessageArgs) => void;
	onConnect?: () => void;
}

export interface BasicBot {
	client: Client;
	connect: () => Promise<this>;
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
		this.twitchClient = client(opts);

		this.twitchClient.on('message', (channel, userState, message) => {
			this.plugins.forEach(
				({
					onMessage,
					onSubscriberMessage,
					onBroadcasterMessage,
					onModMessage,
					onMessageIgnoreRoles,
				}) => {
					if (onMessage) {
						if (!onMessageIgnoreRoles?.includes(getUserRole(userState))) {
							onMessage({ channel, userState, message });
						}
					}

					if (onModMessage && userState.mod) {
						onModMessage({ channel, userState, message });
					}

					if (onSubscriberMessage && userState.subscriber) {
						onSubscriberMessage({ channel, userState, message });
					}

					if (onBroadcasterMessage && userState.badges?.broadcaster) {
						onBroadcasterMessage({ channel, userState, message });
					}
				}
			);
		});

		this.twitchClient.on('connected', () => {
			this.plugins.forEach(({ onConnect }) => {
				if (onConnect) {
					onConnect();
				}
			});
		});
	}

	get client(): Client {
		return this.twitchClient;
	}

	async connect() {
		await this.twitchClient.connect();
		return this;
	}

	async say(target: string, message: string): Promise<void> {
		await this.twitchClient.say(target, message);
	}

	addPlugin(plugin: Plugin) {
		this.plugins.push(plugin);
		return this;
	}
}
