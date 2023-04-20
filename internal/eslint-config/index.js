/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	extends: ['plugin:@typescript-eslint/recommended', 'turbo', 'prettier'],
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	rules: {
		'no-console': 'error',
		'no-used-vars': 'off',
		'@typescript-eslint/no-unused-vars': [
			'error',
			{
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
			},
		],
	},
	overrides: [
		{
			files: ['*.test.ts'],
			rules: {
				'no-console': 'off',
			},
		},
	],
	ignorePatterns: ['*.d.ts', '*.ts.map', '*.tsbuildinfo'],
	parser: '@typescript-eslint/parser',
};
