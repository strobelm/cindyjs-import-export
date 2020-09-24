export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  external: ['fs', 'path', 'fast-glob', 'acorn', 'eslint'],
}
