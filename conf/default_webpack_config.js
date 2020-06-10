const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const preprocess = require('svelte-preprocess');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = (input, output) => {
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
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: true,
                            hydratable: true,
                            preprocess: preprocess(),
                        }
                    }
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
            })
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
