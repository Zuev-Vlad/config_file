const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const defPath = {
    build: path.resolve(__dirname, 'public/build'),
    src: path.resolve(__dirname, 'src'),
}

module.exports = (env, argv) => {
    const ENV = argv.mode == 'production' ? "production" : "development"
    console.log('mode ', ENV)
    return {
        entry: {
            // enter EntryPoints (path file src, where key -> name build file), man! 
            core: defPath.src + '/js/test/test.js',
            ts: defPath.src + '/js/ts/ts.ts'
        },
        output: {
            filename: "./js/[name].js?[contenthash]",
            path: defPath.build,
        },
        externals: [
            "fs",
            'process',
            'child_process',
            'worker_threads',
            'inspector',
            'path',
            'crypto',
            'stream',
            'https',
            'zlib',
            'node',
            'http',
            'stream-http',
            'os',
            'vm',
            'constants',
            'browser'
        ],
        plugins: [
            new MiniCssExtractPlugin({
                filename: './css/[name].css',
            }),
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(ENV)
            })
        ],

        module: {
            rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', "@babel/preset-react"],
                            plugins: ["transform-regenerator"],
                        }
                    }
                },
                {
                    test: /\.less$/i,
                    use: [MiniCssExtractPlugin.loader,
                        "css-loader",
                        "less-loader",
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader,
                        "css-loader",
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: 'url-loader',
                    }, ]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ]
        },
        optimization: {
            minimizer: ENV == "production" ? [
                '...',
                new CssMinimizerPlugin({
                    minify: CssMinimizerPlugin.cleanCssMinify,
                }),
            ] : [],
            minimize: true,
        }
    }
};