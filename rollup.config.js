import { nodeResolve } from '@rollup/plugin-node-resolve';

console.log('hi----------------------')

export default {
  plugins: [nodeResolve()],
  output: {
    inlineDynamicImports: true
  }
};