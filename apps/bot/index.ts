import { Bot } from 'core';
import { log } from 'logger';
import { env } from './env';

const bot = Bot({
	channels: [env.TWITCH_CHANNEL],
	identity: {
		username: env.BOT_USERNAME,
		password: env.TWITCH_TOKEN,
	},
});

bot.onConnect(() => {
	log('Connected to Twitch');
});

bot.onSubscriberMessage((channel, userState, message) => {
	log(`Subscriber message from ${userState.username}: ${message}`);
});

bot.onModMessage((channel, userState, message) => {
	log(`Moderator message from ${userState.username}: ${message}`);
});

bot.onMessage((channel, userState, message) => {
	log(`Message from ${userState.username}: ${message}`);
});

void bot.connect();
