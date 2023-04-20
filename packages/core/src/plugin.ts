import { ChatUserstate } from 'tmi.js';
import { UserType } from './utils';

export type MessageArgs = {
	channel: string;
	userState: ChatUserstate;
	message: string;
};

export type PluginActions = {
	say: (message: string) => void;
};

export interface Plugin {
	name: string;
	init?: () => void;
	onMessageIgnoreRoles?: UserType[];
	onMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onSubscriberMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onModMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onBroadcasterMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onConnect?: () => void;
}
