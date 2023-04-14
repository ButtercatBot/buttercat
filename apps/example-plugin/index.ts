import { MessageArgs, Plugin } from '@buttercat/core';
import { getLogger } from '@buttercat/logger';

const log = getLogger({ name: 'example-plugin' });

const examplePlugin: Plugin = {
	name: 'Example Plugin',
	onMessageIgnoreRoles: ['broadcaster'],

	init: () => {
		log.info('examplePlugin.init');
	},

	onMessage: (args: MessageArgs) => {
		log.info(`examplePlugin.onMessage from ${args.userState.username}`);
	},

	onModMessage: (args: MessageArgs) => {
		log.info(`examplePlugin.onModMessage from ${args.userState.username}`);
	},

	onBroadcasterMessage: (args: MessageArgs) => {
		log.info(
			`examplePlugin.onBroadcasterMessage from ${args.userState.username}`
		);
	},

	onConnect: () => {
		log.info('examplePlugin.onConnect');
	},
};

export default examplePlugin;
