# [Buttercat](https://buttercat.dev)

A modular, extensible, and easy to set up Twitch bot

## Examples

- [example-bot](/examples/example-bot)
- [example-plugin](/examples/example-plugin)

## Packages

- [core](/packages/core)
- [logger](/packages/logger)

## Plugins

- [Spotify Requests](/plugins/spotify-requests)

## Set up a Buttercat bot

1. Install `@buttercatbot/core`
2. Create a new instance of the Bot class

   ```ts
   import { Bot } from '@buttercatbot/core';

   await new Bot({
   	channels: ['mychannel'],
   	identity: {
   		username: 'mytwitchusername',
   		password: 'mytwitchtoken',
   	},
   	logLevel: 2,
   }).initialize();
   ```

3. Add whichever plugins you want to use

   ```ts
   import { Bot } from '@buttercatbot/core';
   import examplePlugin from '@buttercatbot/example-plugin';

   await new Bot({
   	channels: ['mychannel'],
   	identity: {
   		username: 'mytwitchusername',
   		password: 'mytwitchtoken',
   	},
   	logLevel: 2,
   })
   	.addPlugin(examplePlugin)
   	.initialize();
   ```

Check out the [Example Bot](examples/example-bot) for a working example

## Make Your Own Plugin

1. Install `@buttercatbot/core` and optionally `@buttercatbot/logger`
2. Create a new function of type `Plugin`

   ```ts
   import { Plugin } from '@buttercatbot/core';

   const myPlugin: Plugin = {
   	name: 'My Cool Plugin',
   };
   ```

3. Optionally set up the logger

   ```ts
   import { log } from '@buttercatbot/logger';
   const log = getLogger({ name: 'my-cool-plugin' });
   ```

4. Add whichever events you want to listen to

   ```ts
   import { Plugin } from '@buttercatbot/core';
   import { log } from '@buttercatbot/logger';

   const log = getLogger({ name: 'my-cool-plugin' });
   const myPlugin: Plugin = {
   	name: 'My Cool Plugin',

   	init: () => {
   		log.info('My Cool Plugin has been initialized!');
   	},

   	onMessage: (args: MessageArgs) => {
   		log.info(`${args.userState.username} sent ${args.message}`);
   	},
   };
   ```

### Further Reading

- Check out the [Example Plugin](examples/example-plugin) for a working example

- Check out the [docs](https://buttercat.dev/docs) for more info on what you can do with plugins
