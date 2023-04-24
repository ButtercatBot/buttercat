import * as tmi from 'tmi.js';
import { ChatUserstate } from 'tmi.js';

export type UserRole = 'chatter' | 'mod' | 'subscriber' | 'broadcaster';
const getUserRoles = (userState: ChatUserstate): UserRole[] => {
	const roles: UserRole[] = ['chatter'];

	if (userState.badges?.broadcaster) {
		roles.push('broadcaster');
	}

	if (userState.mod) {
		roles.push('mod');
	}

	if (userState.subscriber) {
		roles.push('subscriber');
	}

	return roles;
};
export type MessageUserState = {
	type: 'chat' | 'action' | 'whisper';
	username: string;
	bits: string;
	subscriber: boolean;
	mod: boolean;
	broadcaster: boolean;
	roles: UserRole[];
};
export const mapMessageUserState = (
	userState: tmi.ChatUserstate
): MessageUserState => {
	const roles = getUserRoles(userState);
	return {
		type: userState['message-type'] ?? 'chat',
		username: userState.username ?? 'Unknown',
		bits: userState.bits ?? '0',
		roles,
		subscriber: roles.includes('subscriber'),
		mod: roles.includes('mod'),
		broadcaster: roles.includes('broadcaster'),
	};
};

export type MessageArgs = {
	channel: string;
	userState: MessageUserState;
	message: string;
};

export const mapMessageArgs = ({
	channel,
	userstate,
	message,
}: {
	channel: string;
	userstate: tmi.ChatUserstate;
	message: string;
}): MessageArgs => ({
	channel,
	userState: mapMessageUserState(userstate),
	message,
});

export type SubscriptionUserState = {
	type: 'sub' | 'resub';
	cumulativeMonths: number;
	shouldShareStreak: boolean;
	streakMonths: number;
};

export const mapSubscriptionUserState = (
	userState: tmi.SubUserstate
): SubscriptionUserState => ({
	type: userState['message-type'] ?? 'sub',
	cumulativeMonths:
		typeof userState['msg-param-cumulative-months'] === 'number'
			? userState['msg-param-cumulative-months']
			: 0,
	shouldShareStreak: userState['msg-param-should-share-streak'] ?? false,
	streakMonths:
		typeof userState['msg-param-streak-months'] === 'number'
			? userState['msg-param-streak-months']
			: 0,
});

export type SubscriptionMethods = {
	prime: boolean;
	planName: string;
};

export type SubscriptionArgs = {
	channel: string;
	userState: SubscriptionUserState;
	message: string;
	methods: SubscriptionMethods;
	username: string;
};

export const mapSubscriptionMethods = (
	subMethods: tmi.SubMethods
): SubscriptionMethods => ({
	prime: subMethods.prime ?? false,
	planName: subMethods.planName ?? 'Unknown',
});

export const mapSubscriptionArgs = ({
	channel,
	userstate,
	message,
	methods,
	username,
}: {
	channel: string;
	userstate: tmi.SubUserstate;
	message: string;
	methods: tmi.SubMethods;
	username: string;
}): SubscriptionArgs => ({
	channel,
	userState: mapSubscriptionUserState(userstate),
	message,
	methods: mapSubscriptionMethods(methods),
	username,
});
