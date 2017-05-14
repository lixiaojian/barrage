/**
 * Created by xiaojianli on 2017/3/6.
 */
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const app = express();
const compiler = webpack(config);

const webpackDevOptions = {
    noInfo:true,
    historyApiFallback:true,
    publicPath:config.output.publicPath,
    headers:{
        'Access-Control-Allow-Origin':'*'
    }
};

app.use(require('webpack-dev-middleware')(compiler,webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'index.html'));
});

app.get('/test/test.mp4',function (req,res) {
    res.sendFile(path.join(__dirname,'test/test.mp4'));
});

app.listen(8090,'localhost',function (err) {
    if(err){
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:8090');
});