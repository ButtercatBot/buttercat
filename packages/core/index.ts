import { ChatUserstate, Client, client } from 'tmi.js';

export * from 'tmi.js';

interface BotOptions {
	channels: string[];
	identity?: {
		username: string;
		password: string;
	};
}

export type MessageCallback = (
	channel: string,
	userState: ChatUserstate,
	message: string
) => void;

export interface BasicBot {
	connect: () => Promise<void>;
	say: (target: string, message: string) => Promise<void>;
	client: Client;
	onMessage: (callback: MessageCallback) => void;
	onSubscriberMessage: (callback: MessageCallback) => void;
	onModMessage: (callback: MessageCallback) => void;
	onConnect: (callback: () => void) => void;
}

export function Bot(opts: BotOptions): BasicBot {
	const twitchClient = client(opts);

	return {
		client: twitchClient,
		connect: async () => {
			await twitchClient.connect();
		},

		say: async (target: string, message: string): Promise<void> => {
			await twitchClient.say(target, message);
		},

		onConnect: (callback) => {
			twitchClient.on('connected', (_addr: string, _port: number) => {
				callback();
			});
		},

		onSubscriberMessage: (callback) => {
			twitchClient.on(
				'message',
				(
					channel: string,
					userState: ChatUserstate,
					message: string,
					self: boolean
				) => {
					if (self) {
						return;
					}

					if (userState.subscriber) {
						callback(channel, userState, message);
					}
				}
			);
		},

		onModMessage: (callback) => {
			twitchClient.on(
				'message',
				(
					channel: string,
					userState: ChatUserstate,
					message: string,
					self: boolean
				) => {
					if (self) {
						return;
					}

					if (userState.mod) {
						callback(channel, userState, message);
					}
				}
			);
		},

		onMessage: (callback) => {
			twitchClient.on(
				'message',
				(
					channel: string,
					userState: ChatUserstate,
					message: string,
					self: boolean
				) => {
					if (self) {
						return;
					}

					callback(channel, userState, message);
				}
			);
		},
	};
}
