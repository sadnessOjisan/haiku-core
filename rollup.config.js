import typescript from "rollup-plugin-typescript";
import { terser } from "rollup-plugin-terser";

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.js",
    format: "cjs"
  },
  plugins: [terser(), typescript()]
};
