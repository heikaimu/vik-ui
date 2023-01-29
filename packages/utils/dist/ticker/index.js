"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTicker = exports.addTicker = void 0;
var tickers = [];
var startDate = Date.now();
function animate() {
    var interval = Date.now() - startDate;
    for (var _i = 0, tickers_1 = tickers; _i < tickers_1.length; _i++) {
        var ticker = tickers_1[_i];
        ticker.fn.call(ticker.listener, interval);
    }
    startDate = Date.now();
    requestAnimationFrame(animate);
}
animate();
function addTicker(fn, listener) {
    for (var i = 0; i < tickers.length; i++) {
        var ticker = tickers[i];
        if (ticker.fn === fn && ticker.listener === listener)
            return;
    }
    tickers.push({
        fn: fn,
        listener: listener,
    });
}
exports.addTicker = addTicker;
function removeTicker(fn, listener) {
    for (var i = 0; i < tickers.length; i++) {
        var ticker = tickers[i];
        if (ticker.fn === fn && ticker.listener === listener)
            tickers.splice(i, 1);
    }
}
exports.removeTicker = removeTicker;
