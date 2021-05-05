const path = require('path');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log(path.resolve(__dirname))
const px2vwLoader = path.resolve(__dirname, 'src/loaders/px2vw-loader.js');
module.exports = {
    mode: 'development',
    entry:   './src/start.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            '@':  path.resolve(__dirname, 'src')
        },
        extensions: ['.js', '.vue', '.json']
    },
     //自定义loader
     resolveLoader: {
         //设置别名
         alias: {
             'px2vw-loader': px2vwLoader
         }
     },
    devtool: 'source-map',
    devServer: {
        host: '127.0.0.1',
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8888,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader',
                    'less-loader',
                    {
                        loader: 'px2vw-loader'
                    }
                ]
            }
        ],
        
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/home.html'
        })
    ]
}