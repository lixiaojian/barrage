const webpack = require('webpack');
const path = require('path');
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    context: path.join(__dirname),
    devtool:'cheap-module-eval-source-map',
    entry:{
        barrage:[
            './src/index.js',
            hotMiddlewareScript
        ],
        demo:[
            './src/demo.js',
            hotMiddlewareScript
        ]
    },
    output:{
        filename:'[name].js',
        publicPath:'/build/',
        path: __dirname + '/build/'
    },
    module:{
        rules:[
            {
                test:/\.jsx?$/,
                include:[
                    path.resolve(__dirname,'src')
                ],
                use:['babel-loader']
            }
        ]
    },
    resolve:{
        extensions:['.js']
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV),
            __DEV__:true
        }),
        //遇到编译错误不停止服务
        new webpack.NoEmitOnErrorsPlugin(),
        //热启动
        new webpack.HotModuleReplacementPlugin()
    ]
};