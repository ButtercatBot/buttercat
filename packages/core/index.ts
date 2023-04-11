import { ChatUserstate, Client, client, Userstate } from 'tmi.js';

export * from 'tmi.js';

interface BotOptions {
	channels: string[];
	identity?: {
		username: string;
		password: string;
	};
}

export interface IBot {
	connect: () => Promise<void>;
	say: (target: string, message: string) => Promise<void>;
	client: Client;
	onSubscriberMessage: (
		callback: (
			channel: string,
			userState: ChatUserstate,
			message: string
		) => void
	) => void;
}

export function Bot(opts: BotOptions): IBot {
	const twitchClient = client(opts);

	return {
		client: twitchClient,
		connect: async () => {
			await twitchClient.connect();
		},

		say: async (target: string, message: string): Promise<void> => {
			await twitchClient.say(target, message);
		},

		onSubscriberMessage: (
			callback: (
				channel: string,
				userState: ChatUserstate,
				message: string
			) => void
		): void => {
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
	};
}
