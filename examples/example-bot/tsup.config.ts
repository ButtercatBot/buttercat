import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	entry: ['src/bin.ts'],
	clean: !opts.watch,
	outDir: 'dist',
	target: 'es2017',
	// dts: true,
	onSuccess: 'tsc --emitDeclarationOnly --declaration',
}));
