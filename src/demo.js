/**
 * Created by 872458899@qq.com on 2017/5/13.
 */

var bar = new Barrage({
    id:'bgvid',
    serverUrl:'127.0.0.1:8091'
});

document.getElementById('submit_link').onclick = function () {
    var text = document.getElementById('text').value;

    // bar.setBarrages([{text:text}]);
    bar.sendBarrage(text);
}