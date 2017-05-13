/**
 * Created by 872458899@qq.com on 2017/5/13.
 * 
 * 播放器弹幕
 */

import '../style/index.less'

/**
 * @class Barrage 弹幕的类
 *
 * @param id 播放器的父容器id
 */
class Barrage {
    constructor(config) {
        this.id = config.id;
    };
    static draw(circle, canvas) {
        // Canvas绘制代码
    };
    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };
    get radius() {
        return this._radius;
    };
    set radius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("圆的半径必须为整数。");
        this._radius = radius;
    };
}