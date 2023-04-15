module.exports = {
	root: true,
	// This tells ESLint to load the config from the package `eslint-config`
	extends: ['@buttercatbot/eslint-config', 'next'],
	settings: {
		next: {
			rootDir: ['apps/*/'],
		},
	},
};
