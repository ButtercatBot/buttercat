import { Bot } from '@modularbot/core';
import { env } from './env';
import examplePlugin from '@modularbot/example-plugin';
import { getLogger } from '@modularbot/logger';

export const log = getLogger({ name: 'example-bot' });

void new Bot({
	channels: [env.TWITCH_CHANNEL],
	identity: {
		username: env.BOT_USERNAME,
		password: env.TWITCH_TOKEN,
	},
})
	.addPlugin(examplePlugin)
	.initialize();
