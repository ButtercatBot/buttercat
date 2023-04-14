import { info } from 'logger';
import { MessageArgs, Plugin } from 'core';

const examplePlugin: Plugin = {
	onMessageIgnoreRoles: ['mod', 'broadcaster'],

	onMessage(args: MessageArgs) {
		info(`examplePlugin.onMessage from ${args.userState.username}`);
	},

	onBroadcasterMessage(args: MessageArgs) {
		info(`examplePlugin.onBroadcasterMessage from ${args.userState.username}`);
	},

	onConnect() {
		info('examplePlugin.onConnect');
	},
};

export default examplePlugin;
