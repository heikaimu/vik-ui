function debounce(fn, delay) {
    var timer = null;
    return function () {
        var _this = this;
        var args = arguments;
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(function () {
            fn.apply(_this, args);
        }, delay);
    };
}
function throttle(fn, delay, atleast) {
    var timer = null;
    var previous = null;
    return function () {
        var now = +new Date();
        if (!previous)
            previous = now;
        if (atleast && now - previous > atleast) {
            fn();
            previous = now;
            clearTimeout(timer);
        }
        else {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn();
                previous = null;
            }, delay);
        }
    };
}
function getRandomID(length) {
    if (length === void 0) { length = 8; }
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
function number(val, inscriber) {
    if (inscriber === void 0) { inscriber = 2; }
    var str = val.toFixed(inscriber);
    var x = str.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ".".concat(x[1]) : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2.substr(0, inscriber + 1);
}
export { debounce, throttle, getRandomID, number, };
