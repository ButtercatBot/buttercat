module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `eslint-config`
	extends: ['@buttercatbot/eslint-config', 'next', 'plugin:mdx/recommended'],
	settings: {
		'mdx/code-blocks': true,
		'mdx/language-mapper': {},
		next: {
			rootDir: ['apps/*/'],
		},
	},
};
