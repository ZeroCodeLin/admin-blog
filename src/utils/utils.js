function dateFormat(fmt, time) { 
    const date = new Date(time)
    var o = {   
        'M+' : date.getMonth() + 1, //月份   
        'd+' : date.getDate(), //日   
        'h+' : date.getHours(), //小时   
        'm+' : date.getMinutes(), //分   
        's+' : date.getSeconds(), //秒   
        'q+' : Math.floor((date.getMonth() + 3) / 3), //季度   
        'S'  : date.getMilliseconds() //毫秒   
    };   
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));   
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));   
        }
    }
    return fmt;   
}

function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var callableControl = function() {
            clearTimeout(timeout);
            timeout = null;
        }
        if (!timeout) {
            func.apply(context, args);
        } else {
            callableControl();
        }
        timeout = setTimeout(callableControl, wait);
    }
};

function throttle(method, delay, duration) {
    let timer = null;
    let begin = new Date();
    return function () {
        let context = this, args = arguments;
        let current = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function () {
                method.apply(context, args);
            }, delay);
        }
    }
}

export default {
    dateFormat,
    debounce,
    throttle,
}