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
export function addTicker(fn, listener) {
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
export function removeTicker(fn, listener) {
    for (var i = 0; i < tickers.length; i++) {
        var ticker = tickers[i];
        if (ticker.fn === fn && ticker.listener === listener)
            tickers.splice(i, 1);
    }
}
