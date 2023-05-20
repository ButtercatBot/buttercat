import { Bot } from '@buttercatbot/core';
import * as dotenv from 'dotenv';

import SpotifyRequestsPlugin from '../index';
import { Config, ConfigSchema } from '../types/config';
import { log } from '../utils';
import { SafeParseError } from 'zod';

dotenv.config();

const configParseResult = ConfigSchema.safeParse(process.env);

if (!configParseResult.success) {
	log.fatal(`Invalid .env file`);
	(
		configParseResult as SafeParseError<typeof ConfigSchema>
	).error.errors.forEach((error) => {
		log.error(`${error.path} - ${error.message}`);
	});
	process.exit(-1);
}

const CONFIG = configParseResult.data;

const getConfig = <T>(name: keyof Config): T => {
	return CONFIG[name] as T;
};

const plugin = SpotifyRequestsPlugin({
	logLevel: 0,
	chatFeedback: getConfig('CHAT_FEEDBACK'),
	addToQueue: getConfig('ADD_TO_QUEUE'),
	addToPlaylist: getConfig('ADD_TO_PLAYLIST'),
	subscribersOnly: getConfig('SUBSCRIBERS_ONLY'),
	commandPrefix: getConfig('COMMAND_PREFIX'),
	spotify: {
		clientId: getConfig('SPOTIFY_CLIENT_ID'),
		clientSecret: getConfig('SPOTIFY_CLIENT_SECRET'),
	},
	authServer: {
		port: getConfig('AUTH_SERVER_PORT'),
		host: getConfig('HOST'),
	},
});

void new Bot({
	channels: [getConfig('TWITCH_CHANNEL')],
	identity: {
		username: getConfig('BOT_USERNAME'),
		password: getConfig('TWITCH_TOKEN'),
	},
	logLevel: 0,
})
	.addPlugin(plugin)
	.initialize();

export {};
