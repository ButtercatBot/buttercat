type NavSection = {
	title: string;
	items: NavItem[];
	root: string;
};

type NavItem = {
	title: string;
	slug: string;
};

type GuidesConfig = {
	sidebarNav: NavSection[];
};

export const guidesConfig: GuidesConfig = {
	sidebarNav: [
		{
			title: 'Getting Started',
			root: 'getting-started',
			items: [
				{
					title: 'Create a Bot',
					slug: '',
				},
				{
					title: 'Add a Plugin',
					slug: 'add-a-plugin',
				},
			],
		},
		{
			title: 'Custom Plugin',
			root: 'custom-plugin',
			items: [
				{
					title: 'Make your own plugin',
					slug: '',
				},
			],
		},
		{
			title: 'Plugins',
			root: 'plugins',
			items: [
				{
					title: 'Pre-made Plugins',
					slug: '',
				},
				{
					title: 'Spotify Requests',
					slug: 'spotify-requests',
				},
			],
		},
	],
};

export default guidesConfig;
