export const startMove = function(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var css = 0;
        var stop = true;
        for (var attr in json) {
            if (attr == 'opacity') {
                css = parseInt(parseFloat(getStyle(obj, attr)) * 100);
            } else {
                css = parseInt(getStyle(obj, attr));
            };

            var iSpeed = (json[attr] - css) / 10;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (css != json[attr]) {
                stop = false;
            };

            if (attr == 'opacity') {
                obj.style.filter = 'alpha(opacity:' + (css + iSpeed) + ')';
                obj.style.opacity = (css + iSpeed) / 100;
            } else {
                obj.style[attr] = css + iSpeed + 'px';
            };

            if (stop) {
                clearInterval(obj.timer);

                if (fn) {
                    fn();
                };
            };
        };
    }, 30);

    function getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
    };
}

/**
 * 客户端检测
 */
export const BrowserInfo = function() {
    var json = {
        userAgent: navigator.userAgent.toLowerCase(),
        isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
        isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
        isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
        isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
    }

    return json;
}