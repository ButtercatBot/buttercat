import { ChatUserstate } from 'tmi.js';
import { UserType } from './utils';

export type MessageArgs = {
	channel: string;
	userState: ChatUserstate;
	message: string;
};

export interface Plugin {
	name: string;
	init?: () => void;
	onMessageIgnoreRoles?: UserType[];
	onMessage?: (args: MessageArgs) => void;
	onSubscriberMessage?: (args: MessageArgs) => void;
	onModMessage?: (args: MessageArgs) => void;
	onBroadcasterMessage?: (args: MessageArgs) => void;
	onConnect?: () => void;
}
