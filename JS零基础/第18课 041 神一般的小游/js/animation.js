function move(obj , mJson , time , callBack) {
    var sVal = {}, //存初始值
        tVal = {}, //存目标值
        sTime = new Date(); //存初始时间
    for (var key in mJson) {
        sVal[key] = parseFloat( getStyle(obj,key) );//获取初始值
        tVal[key] = parseFloat( mJson[key] );//将目标值转换为数字
    }

    m();
    function m(){
        var prop = (new Date() - sTime)/time;
        prop >= 1?prop = 1:requestAnimationFrame(m);
        for (var key in mJson) {
            if ( key === "opacity" ){
                var o = sVal[key] + prop*(tVal[key] - sVal[key]);
                obj.style[key] = o;
                obj.style.filter = "alpha(opacity="+ 100*o +")";
            }else{
                obj.style[key] = sVal[key] + prop*(tVal[key] - sVal[key]) + "px";
            }
        }
        if ( prop === 1 ){
            callBack && callBack.call(obj);
        }
    }
    function getStyle(obj , atr) {
        return obj.currentStyle?obj.currentStyle[atr]:getComputedStyle(obj)[atr];
    }
}
