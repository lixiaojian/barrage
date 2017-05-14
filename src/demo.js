/**
 * Created by 872458899@qq.com on 2017/5/13.
 */

var bar = new Barrage({
    id:'bgvid',
    serverUrl:'127.0.0.1:8091'
});

document.getElementById('submit_link').onclick = function () {
    var text = document.getElementById('text').value;
    bar.sendBarrage(text);
}

document.getElementById('toggle_barrage').onclick = function (e) {
    var link = e.target;
    var type = link.getAttribute('data-type');
    if('open' === type){
        bar.openBarrage();
        link.setAttribute('data-type','close');
        link.innerHTML = '关闭';
    }else{
        bar.closeBarrage();
        link.setAttribute('data-type','open');
        link.innerHTML = '开启';
    }
}