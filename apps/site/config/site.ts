import { FileTextIcon, LibraryIcon, PuzzleIcon } from 'lucide-react';

export const siteConfig = {
	name: 'Buttercat',
	url: 'https://buttercat.dev',
	description: 'A modular and extensible Twitch bot',
	links: {
		github: 'https://github.com/buttercatbot/buttercat',
	},
	creator: {
		name: 'Marc Donald',
		twitter: 'https://twitter.com/@DeveloperMarc',
		github: 'https://github.com/MarcDonald',
	},
	mainNav: [
		{
			title: 'Documentation',
			href: '/docs',
		},
		{
			title: 'Guides',
			href: '/guides',
		},
		{
			title: 'Examples',
			href: 'https://github.com/buttercatbot/buttercat/tree/main/examples',
		},
		{
			title: 'Plugins',
			href: '/plugins',
		},
		{
			title: 'GitHub',
			href: 'https://github.com/buttercatbot/buttercat',
			external: true,
		},
	],
	sidebarNav: {
		groups: [
			{
				title: 'Docs',
				icon: LibraryIcon,
				items: [
					{
						title: 'Introduction',
						href: '/docs',
					},
					{
						title: 'Bot',
						href: '/docs/bot',
					},
					{
						title: 'Plugin',
						href: '/docs/plugin',
					},
				],
			},
			{
				title: 'Guides',
				icon: FileTextIcon,
				items: [
					{
						title: 'Introduction',
						href: '/guides',
					},
					{
						title: 'Getting Started',
						href: '/guides/getting-started',
					},
					{
						title: 'Add a Plugin',
						href: '/guides/add-a-plugin',
					},
					{
						title: 'Create a Plugin',
						href: '/guides/create-a-plugin',
					},
				],
			},
			{
				title: 'Plugins',
				icon: PuzzleIcon,
				items: [
					{
						title: 'Introduction',
						href: '/plugins',
					},
					{
						title: 'Spotify Requests',
						href: '/plugins/spotify-requests',
					},
				],
			},
		],
	},
};

export type SiteConfig = typeof siteConfig;
