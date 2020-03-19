const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    root: path.join(__dirname, '/'),
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
};

config = {
    // Mode can be 'development' or 'production'
    mode: 'development',

    entry: './src/js/index.js',

    output: {
        filename: 'main.js',
        path: PATHS.dist,
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            }, 
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            }, 
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            context: PATHS.src,
                            name: `[path][name].[ext]`,
                            esModule: false,
                        },
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                        esModule: false,
                    },
                }]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
    ]
};
module.exports = config;
