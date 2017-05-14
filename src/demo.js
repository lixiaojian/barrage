/**
 * Created by 872458899@qq.com on 2017/5/13.
 */

var bar = new Barrage({
    id:'bgvid'
});

document.getElementById('submit_link').onclick = function () {
    var text = document.getElementById('text').value;

    bar.setBarrages([{text:text}]);
}