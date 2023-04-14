import { Bot } from 'core';
import { env } from './env';
import examplePlugin from 'example-plugin';

void new Bot({
	channels: [env.TWITCH_CHANNEL],
	identity: {
		username: env.BOT_USERNAME,
		password: env.TWITCH_TOKEN,
	},
})
	.addPlugin(examplePlugin)
	.connect();
