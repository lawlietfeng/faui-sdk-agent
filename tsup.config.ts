import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: 'terser',
  terserOptions: {
    mangle: {
      properties: { regex: /^_/ },
    },
    compress: {
      passes: 3,
    },
  },
  sourcemap: false,
});
