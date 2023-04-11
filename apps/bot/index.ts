import { Bot, ChatUserstate } from 'core';
import { log } from 'logger';
import { env } from './env';

const bot = Bot({
	channels: [env.TWITCH_CHANNEL],
	identity: {
		username: env.BOT_USERNAME,
		password: env.TWITCH_TOKEN,
	},
});

const handleMessage = async (
	target: string,
	userState: ChatUserstate,
	msg: string,
	self: boolean
) => {
	if (self) {
		return;
	}
	log(`Message from ${userState.username}: ${msg}`);
};

bot.onSubscriberMessage((channel, userState, message) => {
	log(`Subscriber message from ${userState.username}: ${message}`);
});

bot.client.on('connected', (_addr: string, _port: number) => {
	log(`Connected to ${env.TWITCH_CHANNEL}'s chat`);
});

bot.client.on('message', handleMessage);

void bot.connect();
