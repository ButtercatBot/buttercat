import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	entry: ['src/index.ts'],
	clean: !opts.watch,
	outDir: 'dist',
	target: 'es2017',
	sourcemap: true,
	dts: false,
	splitting: true,
	onSuccess: 'tsc --emitDeclarationOnly --declaration',
}));
