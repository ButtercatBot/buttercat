import { Bot } from '@buttercatbot/core';
import { env } from './env';
import examplePlugin from '@buttercatbot/example-plugin';
import { getLogger } from '@buttercatbot/logger';

export const log = getLogger({ name: 'example-bot' });

log.info('Starting example bot...');

void new Bot({
	channels: [env.TWITCH_CHANNEL],
	identity: {
		username: env.BOT_USERNAME,
		password: env.TWITCH_TOKEN,
	},
	logLevel: 2,
})
	.addPlugin(examplePlugin)
	.initialize();
