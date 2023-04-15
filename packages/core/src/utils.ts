import { ChatUserstate } from 'tmi.js';

export type UserType = 'chatter' | 'mod' | 'subscriber' | 'broadcaster';
export const getUserRole = (userState: ChatUserstate): UserType => {
	if (userState.badges?.broadcaster) {
		return 'broadcaster';
	}

	if (userState.mod) {
		return 'mod';
	}

	if (userState.subscriber) {
		return 'subscriber';
	}

	return 'chatter';
};
