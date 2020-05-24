import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import scss from 'rollup-plugin-scss';

const production = !process.env.ROLLUP_WATCH;
const devmode = process.env.DEVMODE;
if(devmode){
	console.log("YOYOYOYOYO");
}
export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			// enable run-time checks when not in production
			dev: !production,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			css: css => {
				css.write('public/build/bundle.css');
			},
			onwarn: (warning, handler) => {
				// UIKit3 uses <a> for several things that do not use href attributes. We want to hide these warnings.
				if(warning.code === 'a11y-missing-attribute') return;
				handler(warning);
			},
			hydratable: true,
			preprocess: autoPreprocess(),
		}),
		scss(),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),


		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(
			{
				verbose:true,
				contentBase: 'public',
				historyApiFallback: true,
				port:5000,
				host:'0.0.0.0'
			}
		),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && babel({
			extensions: [ '.js', '.mjs', '.html', '.svelte' ],
			exclude: [ 'node_modules/@babel/**', 'node_modules/core-js/**', 'node_modules/**' ],
			babelHelpers: "runtime",
			presets: [
				[
					'@babel/preset-env',
					{
						targets: '> 0.25%, not dead',
						useBuiltIns: 'usage',
						corejs: 3
					}
				]
			],
			plugins: [
				'@babel/plugin-syntax-dynamic-import',
				[
					'@babel/plugin-transform-runtime',
					{
						useESModules: true
					}
				]
			]
		}),
		production && devmode && terser()
	],
	watch: {
		clearScreen: false
	}
};