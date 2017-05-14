/**
 * Created by 872458899@qq.com on 2017/5/14.
 *
 * socket.io 的服务
 */
var http = require('http');
/**
 * HTTP server
 */
var server = http.createServer(function (request, response) {
    // Not important for us. We're writing socket.io server, not HTTP server
});
server.listen(8091);
var io = require("socket.io").listen(server);

//io监听socket事件
io.on('connection', function (connection) {

    console.log((new Date()) + ' Connection accepted.');

    /**
     * 接收客户端提交的弹幕
     */
    connection.on('submit_barrage', function (message) {
        if(message && message.text){
            io.emit('barrage',{text:message.text})
        }
        console.log(message);
    });
    // user disconnected
    connection.on('disconnect', function (socket) {
        console.log("关闭连接:" + socket);
    });

});
