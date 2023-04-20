import { ChatUserstate } from 'tmi.js';
import { UserType } from './utils';

export type MessageArgs = {
	channel: string;
	userState: ChatUserstate;
	message: string;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Actions = {};

export interface Plugin {
	name: string;
	init?: () => void;
	onMessageIgnoreRoles?: UserType[];
	onMessage?: (args: MessageArgs, actions: Actions) => void;
	onSubscriberMessage?: (args: MessageArgs, actions: Actions) => void;
	onModMessage?: (args: MessageArgs, actions: Actions) => void;
	onBroadcasterMessage?: (args: MessageArgs, actions: Actions) => void;
	onConnect?: () => void;
}
