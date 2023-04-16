type NavSection = {
	title: string;
	items: NavItem[];
	root: string;
};

type NavItem = {
	title: string;
	slug: string;
};

type DocsConfig = {
	sidebarNav: NavSection[];
};

export const docsConfig: DocsConfig = {
	sidebarNav: [
		{
			title: 'Getting Started',
			root: 'getting-started',
			items: [
				{
					title: 'Introduction',
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
					title: 'Introduction',
					slug: '',
				},
			],
		},
		{
			title: 'Pre-made Plugins',
			root: 'pre-made-plugins',
			items: [
				{
					title: 'Introduction',
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
