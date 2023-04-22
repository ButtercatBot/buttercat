module.exports = {
	extends: ['@buttercatbot/eslint-config', 'next'],
	plugins: ['@next/eslint-plugin-next'],
	rules: {
		'react/no-unescaped-entities': 'off',
	},
	settings: {
		next: {
			rootDir: ['apps/*'],
		},
	},
};
