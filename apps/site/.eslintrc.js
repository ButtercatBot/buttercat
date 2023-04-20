module.exports = {
	extends: ['@buttercatbot/eslint-config', 'next'],
	plugins: ['@next/eslint-plugin-next'],
	settings: {
		next: {
			rootDir: ['apps/*'],
		},
	},
};
