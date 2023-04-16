# Example Bot

This is a basic bot that connects to Twitch and loads the `example-plugin` plugin.

## Set up

- Create a `.env` file based on `.env.template` and fill in the values.

	```dotenv
	TWITCH_CHANNEL=exampleuser
	TWITCH_TOKEN=oauth:exampletoken
	BOT_USERNAME=examplebot
	```

	`TWITCH_TOKEN` can be generated at [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/).

- Install dependencies

	```bash
	npm install
	```

- Run the bot

	```bash
	npm start
	```
