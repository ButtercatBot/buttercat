import { FileTextIcon, LibraryIcon, PuzzleIcon } from 'lucide-react';

export const siteConfig = {
	name: 'Buttercat',
	url: 'https://buttercat.dev',
	description: 'A modular and extensible Twitch bot',
	links: {
		github: 'https://github.com/marcdonald/buttercat',
	},
	creator: {
		name: 'Marc Donald',
		twitter: '@DeveloperMarc',
		github: 'MarcDonald',
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
			href: '/examples',
		},
		{
			title: 'Plugins',
			href: '/plugins',
		},
		{
			title: 'GitHub',
			href: 'https://github.com/MarcDonald/buttercat',
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
						title: 'Spotify Requests',
						href: '/plugins/spotify-requests',
					},
				],
			},
		],
	},
};

export type SiteConfig = typeof siteConfig;
