/**
 * Created by 872458899@qq.com on 2017/5/13.
 * 
 * 播放器弹幕
 */
import {checkHTMLElement,getPosition,getBox,getSize} from './domAttribute'
import '../style/index.less'

/**
 * 单位换算 将其他单位换算成px
 * @param unit
 */
const unitConversion = (unit,relative) => {
    if(parseFloat(unit)){
        if(/px/i.test(this.paddingTop)){
            return unit;
        }else if(/rem/i.test(this.paddingTop)){
            const bodyFontSize = parseFloat(document.body.style.fontSize);
            return parseFloat(unit) * bodyFontSize +'px';
        }else if(/em/i.test(this.paddingTop)){
            if(!relativeDom){
                //换算单位为em 所以必须传父节点
                throw new Error('the unit is em,so the param relativeDom is required!');
            }
            const bodyFontSize = parseFloat(unit) * parseFloat(relative.style.fontSize) +'px';
        }else{
            throw new Error('not support this unit,you can try [px,rem,em]');
        }
    }
    return 0;
}
/**
 * @class Barrage 弹幕的类
 *
 * @param id 播放器的父容器id
 * @param paddingTop 到播放器上边界的距离
 * @param paddingRigt 到播放器右边界的距离
 * @param paddingBottom 到播放器下边界的距离
 * @param paddingLeft 到播放器左边界的距离
 *
 */
class Barrage {
    constructor({
                    id,
                    paddingTop=0,
                    paddingRigt=0,
                    paddingBottom=0,
                    paddingLeft=0
                }) {

        if(id === undefined){
            //配置项的id不能为空
            throw Error('the config of id is required!')
        }
        //初始化参数
        this.id = id
        this.paddingTop = paddingTop
        this.paddingRigt = paddingRigt
        this.paddingBottom = paddingBottom
        this.paddingLeft = paddingLeft
        this.parentEle = document.getElementById(this.id)
        //最后一弹幕显示的行数
        this.currindex = 1
        if(!this.parentEle){
            //配置项中的id所在的dom节点不存在
            throw Error('id dom node for '+id+' does not exist!')
        }
        this.createBarrageParent()
    };

    /**
     * 创建弹幕的父容器
     */
    createBarrageParent(){
        const bp = document.createElement('div')
        bp.className = 'barrage'
        this.parentEle.appendChild(bp)
        this.setBarrageParentStyle(bp)
        this.barrageWapper = bp;
    }

    /**
     * 设置弹幕父容器的样式
     */
    setBarrageParentStyle(barrageParent){
        checkHTMLElement(barrageParent);
        var {position} = getPosition(this.parentEle);
        //如果父容器没有设置定位，就设置为relative
        if(position !== 'fixed' && position !== 'position' && position !== 'relative'){
            this.parentEle.style.position = 'relative'
        }
        const video = this.parentEle.querySelector('video')
        if(!video){
            //没有找到视频的播放标签
            throw new Error('the video tag is not found')
        }
        let videoSize = getSize(video);
        //播放器的宽
        this.videoWidth = parseFloat(videoSize.width)
        //播放器的高
        this.videoHeight = parseFloat(videoSize.height)
        var top = 0,left=0,bottom=0,right=0;
        if(parseFloat(this.paddingTop)){
            top = parseFloat(unitConversion(this.paddingTop,video))
        }
        if(parseFloat(this.paddingLeft)){
            left = parseFloat(unitConversion(this.paddingLeft,video))
        }
        if(parseFloat(this.paddingBottom)){
            bottom = parseFloat(unitConversion(this.paddingBottom,video))
        }
        if(parseFloat(this.paddingRigt)){
            right = parseFloat(unitConversion(this.paddingRigt,video))
        }
        //播放器父容器的box信息
        let box = getBox(this.parentEle)
        console.log(box);
        let width = parseFloat(videoSize.width) - left - right
        let height = parseFloat(videoSize.height) - top -bottom
        let styleArr = [`width:${width}px`,`height:${height}px`]
        //top为自己的paddingtop + 父容器的 paddingtop + 父容器的 bordertop
        if(top || parseFloat(box.paddingTop) || parseFloat(box.borderTopWidth)){
            styleArr.push(`top:${top+parseFloat(box.paddingTop)+parseFloat(box.borderTopWidth)}px`)
        }
        //算法同top
        if(left || parseFloat(box.paddingLeft) || parseFloat(box.borderLeftWidth)){
            styleArr.push(`left:${left+parseFloat(box.paddingLeft)+parseFloat(box.borderLeftWidth)}px`)
        }
        if(bottom){
            styleArr.push(`bottom:${bottom}px`)
        }
        if(right){
            styleArr.push(`right:${right}px`)
        }
        barrageParent.style.cssText = styleArr.join(';');
    }

    /**
     * 添加弹幕标签
     * @param barrages
     */
    setBarrages(barrages = []){
        barrages.map((item,index)=>{
            const tag = document.createElement('div')
            tag.className = 'barrage-tag'
            tag.innerHTML = item.text
            this.barrageWapper.appendChild(tag)
            const top = this.currindex * 30
            tag.style.top = top+'px'
            //根据视频宽度设置弹幕的过度时间
            const durationTime = parseInt(this.videoWidth / 50)
            tag.style.transitionDuration = durationTime+'s'
            this.currindex ++
            if(top > (parseFloat(this.videoHeight) * 0.7)){
                this.currindex = 1
            }
            //让内容开始移动
            setTimeout(() =>{
                tag.style.right = '200%';
            },20);
            //删除内容标签
            setTimeout(() =>{
                this.barrageWapper.removeChild(tag);
            },durationTime*1000);
        })
    }
}

window.Barrage = Barrage;