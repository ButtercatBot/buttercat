import { Plugin } from '@buttercatbot/core';
import { getLogger } from '@buttercatbot/logger';

const log = getLogger({ name: 'example-plugin' });

const examplePlugin: Plugin = {
	name: 'Example Plugin',
	onMessageIgnoreRoles: ['broadcaster'],

	init: () => {
		log.info('examplePlugin.init');
	},

	onMessage: (args) => {
		log.info(`examplePlugin.onMessage from ${args.userState.username}`);
	},

	onModMessage: (args) => {
		log.info(`examplePlugin.onModMessage from ${args.userState.username}`);
	},

	onBroadcasterMessage: (args, actions) => {
		log.info(
			`examplePlugin.onBroadcasterMessage from ${args.userState.username}`
		);
		actions.say('Hello from example plugin!');
	},

	onSubscriberMessage: (args) => {
		log.info(
			`examplePlugin.onSubscriberMessage from ${args.userState.username}`
		);
	},

	onConnect: () => {
		log.info('examplePlugin.onConnect');
	},
};

export default examplePlugin;
