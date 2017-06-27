/**
 * Created by hong1012 on 2017/6/27.
 */

// 设置dom节点可拖动:  handle 操作移动的dom, dom 是要移动的视图，需绝对布局
function setMoveable(handle, dom) {
    const doc = document
    let domxs = 0;
    let domx = 0;
    let domys = 0;
    let domy = 0;
    let start = false;
    let isIE = isIEBrower();
    let mousedown = ev => {
        if (ev.target === handle) {
            if (isIE) {
                domxs = ev.offsetX;
                domys = ev.offsetY;
            } else {
                domx = ev.pageX - ev.offsetX;
                domy = ev.pageY - ev.offsetY;
            }
            start = true;
            doc.addEventListener('mouseup', mouseup);
            doc.addEventListener('mousemove', mousemove);
        } else {
            start = false;
        }
    }
    let mouseup = ev => {
        start = false;
        doc.removeEventListener('mousemove', _.throttle(mousemove, 50));
        doc.removeEventListener('mousedown', mousedown);
        doc.removeEventListener('mouseup', mouseup);
    }
    let mousemove = ev => {
        if (start) {
            if (isIE) {
                domx = ev.pageX - domxs;
                domy = ev.pageY - domys;
            } else {
                domx = domx + ev.movementX;
                domy = domy + ev.movementY;
                if (domy < 0) {
                    domy = 0;
                }
            }
            dom.style.cssText = 'left:' + domx + 'px;top:' + domy + 'px;margin-top:0;margin-left:0';
        }
    }
    dom.addEventListener('mousedown', mousedown);
}

module.exports = setMoveable



