import { MessageArgs, SubscriptionArgs, UserRole } from './types';

export type PluginActions = {
	say: (message: string) => void;
};

export interface Plugin {
	name: string;
	init?: () => void;
	onMessageIgnoreRoles?: UserRole[];
	onMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onSubscriberMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onModMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onBroadcasterMessage?: (args: MessageArgs, actions: PluginActions) => void;
	onSubscription?: (args: SubscriptionArgs, actions: PluginActions) => void;
	onConnect?: () => void;
}
