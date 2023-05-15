import * as dotenv from 'dotenv';
import { z } from 'zod';
import { log } from './bin';

dotenv.config();

const envSchema = z.object({
	TWITCH_CHANNEL: z.string(),
	TWITCH_TOKEN: z.string(),
	BOT_USERNAME: z.string(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	log.error(
		'❌ Invalid environment variables:',
		parsed.error.flatten().fieldErrors
	);
	throw new Error('Invalid environment variables');
}

// noinspection JSUnusedGlobalSymbols
const env = new Proxy(parsed.data, {
	get(target, prop) {
		const propParse = envSchema.keyof().safeParse(prop);
		if (!propParse.success) return undefined;
		return target[propParse.data];
	},
});

export { env };
