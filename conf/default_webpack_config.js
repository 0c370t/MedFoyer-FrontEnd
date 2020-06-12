const EnvironmentPlugin = require("webpack").EnvironmentPlugin;

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const preprocess = require('svelte-preprocess');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

const getLoaders = (legacy_support = false) => legacy_support
    ? [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: "> 0.25%, not dead",
                        modules: "commonjs",
                        debug: !prod,
                        useBuiltIns: "usage",
                        corejs: "3.6.4",
                        include: ["@babel/plugin-transform-regenerator"]
                    }]
                ],

            }
        },
        {
            loader: 'svelte-loader',
            options: {
                emitCss: true,
                hotReload: true,
                legacy: legacy_support,
                hydratable: true,
                dev: !prod,
                preprocess: [preprocess()],
            }
        },

    ]
    : {
        loader: 'svelte-loader',
        options: {
            emitCss: true,
            hotReload: true,
            hydratable: true,
            dev: !prod,
            preprocess: [preprocess()],
        }
    }
;


module.exports = (input, output, legacy_support = false) => {
    return {
        entry: {
            bundle: [input]
        },
        resolve: {
            alias: {
                svelte: path.resolve('node_modules', 'svelte')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        output: {
            path: output,
            filename: 'build/[name].js',
            chunkFilename: 'build/[name].[id].js'
        },
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: getLoaders(legacy_support)
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            },
                        },
                        'css-loader',
                        'sass-loader',
                    ]

                }
            ]
        },
        mode,
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'build/[name].css'
            }),
            new EnvironmentPlugin(["AMP_DOMAIN", "AMP_USER_POOL", "AMP_USER_POOL_CLIENT"]),
        ],
        devtool: prod ? false : 'source-map',
        devServer: {
            contentBase: path.join(output),
            historyApiFallback: true
        },
        stats: {
            warningsFilter: [
                (warning) => /unused css selector/.exec(warning.toLowerCase()),
                (warning) => /<a>/.exec(warning.toLowerCase()) // UIKit3 wants us to do thing to a tags that A1ly does not like.
            ]
        }
    }
};
