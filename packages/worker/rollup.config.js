const babel = require("rollup-plugin-babel");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");
const terser = require("rollup-plugin-terser");
export default [
  {
    input: "lib/init.ts",
    output: [
      {
        name: "HttpMockJsSW",
        file: `dist/umd/index.umd.js`,
        format: "umd"
      }
    ],
    plugins: [
      babel({
        // exclude: "node_modules/**",
        presets: [["@babel/preset-typescript"]],
        extensions:['js','ts','jsx']
      }),
      resolve(),
      commonjs(),
      terser.terser()
    ]
  }
];
