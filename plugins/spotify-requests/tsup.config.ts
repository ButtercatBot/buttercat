import { defineConfig } from 'tsup';

export default defineConfig((opts) => ({
	entry: ['src/index.ts', 'src/standalone.ts'],
	clean: !opts.watch,
	outDir: 'dist',
	target: 'es2017',
}));
