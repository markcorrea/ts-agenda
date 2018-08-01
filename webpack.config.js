var path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/index.tsx",
    devtool: "source-map",
    // devServer: {
    //     hot: true
    // },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "./bundle.js",
        publicPath: '/static/'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "babel-loader!ts-loader"
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};