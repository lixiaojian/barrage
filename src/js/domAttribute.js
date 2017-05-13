/**
 * Created by 872458899@qq.com on 2017/5/14.
 *  获取节点的属性
 *
 */


/**
 * 判断一个节点是否为dom节点
 *  首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的类型为function，此时就不能用它来判断了
 * @param ele
 * @returns {*}
 */
const isDOM = (ele) =>{
    return (typeof HTMLElement === 'object' )?(ele instanceof HTMLElement):(ele && typeof ele === 'object' && ele.nodeType === 1 && typeof ele.nodeName === 'string');
}
/**
 * 验证输入参数 不能为空，且必须为dom节点
 * @param ele
 */
export const checkHTMLElement = (ele) => {
    if(!ele){
        //获取位置信息的节点不能为空
        throw Error('the param of checkHTMLElement is required!');
    }
    if(!isDOM(ele)){
        //参数必须为HTML节点
        throw Error('the param must be HTMLElement!');
    }
}

/**
 * 获取dom节点的css样式
 * @param ele
 * @returns {*}
 */
const getStyle = (ele) =>{
    checkHTMLElement(ele);
    return ele.currentStyle? ele.currentStyle : window.getComputedStyle(ele,null)
}
/**
 * 获取一个节点的位置信息
 * @param dom
 * @returns {{position, top, right, bottom, left}}
 */
export const getPosition = (dom) => {
    checkHTMLElement(dom);
    let {position,top,right,bottom,left} = getStyle(dom);
    return {position,top,right,bottom,left};
}

/**
 * 获取一个节点的盒模型信息
 * @param dom
 * @returns {
           {boxSizing,
            borderBottomWidth,
            borderRightWidth,
            borderTopWidth,
            borderLeftWidth,
            marginTop,
            marginRight,
            marginBottom,
            marginLeft,
            paddingTop,
            paddingRight,
            paddingBottom,
            paddingLeft}
        }
 */
export const getBox = (dom) => {
    checkHTMLElement(dom);

    let {
        boxSizing,
        borderBottomWidth,
        borderRightWidth,
        borderTopWidth,
        borderLeftWidth,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    } = getStyle(dom)

    return {
        boxSizing,
        borderBottomWidth,
        borderRightWidth,
        borderTopWidth,
        borderLeftWidth,
        marginTop,
        marginRight,
        marginBottom,
        marginLeft,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft
    }
}
/**
 * 获取一个节点的大小
 * @param dom
 * @returns {{width, height}}
 */
export const getSize = (dom) => {
    checkHTMLElement(dom);
    let {width,height} = getStyle(dom);
    return {width,height};
}
