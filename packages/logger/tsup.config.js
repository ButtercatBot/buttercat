"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsup_1 = require("tsup");
exports.default = (0, tsup_1.defineConfig)(function (opts) { return ({
    entry: ['src/index.ts'],
    clean: !opts.watch,
    outDir: 'dist',
    target: 'es2017',
    sourcemap: true,
    dts: false,
    onSuccess: 'tsc --emitDeclarationOnly --declaration',
}); });
