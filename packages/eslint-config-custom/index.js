/**
 * @see https://github.com/eslint/eslint/issues/3458
 * @see https://www.npmjs.com/package/@rushstack/eslint-patch
 */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	extends: ['turbo', 'prettier'],
	plugins: ['import', 'prettier'],
	rules: {},
	ignorePatterns: ['*.d.ts', '*.ts.map'],
	parser: '@typescript-eslint/parser',
};
