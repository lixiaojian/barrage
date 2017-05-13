/**
 * Created by xiaojianli on 2017/3/6.
 */

var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry:{
        barrage:[
            './src/index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build/'),
        publicPath:'/build/',
        filename: '[name].min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //     }
        // }),
        new CleanWebpackPlugin(['build'],
            {
                // root:'/full/project/path',
                verbose: true,
                dry: false
            }
        )
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            }
        ]
    },
    resolve:{
        extensions:['.js']
    }
};