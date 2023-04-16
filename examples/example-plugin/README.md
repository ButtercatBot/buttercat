# Example Plugin

This is a basic plugin that connects to Twitch and logs out messages received

## Features

- `onMessage` logs out messages from the chat

	- As the `mod` and `subscriber` roles are not in the `onMessageIgnoreRoles` array messages from these roles will be
		logged twice in both `onMessage` and `onModMessage`/`onSubscriberMessage`. This allows you to handle messages from
		anyone in chat, or by specific role.

- `onModMessage` logs out messages from moderators
- `onSubscriberMessage` logs out messages from subscribers
- `onBroadcasterMessage` logs out messages from the broadcaster
- `onConnect` logs when connected to Twitch chat