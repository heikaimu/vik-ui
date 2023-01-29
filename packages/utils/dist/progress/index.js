"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ticker_1 = require("../ticker");
var Progress = (function () {
    function Progress(_a) {
        var parts = _a.parts, _b = _a.speed, speed = _b === void 0 ? 1000 : _b, onProgress = _a.onProgress, onComplete = _a.onComplete;
        this._total = 100;
        this._percent = 0;
        this._completeParts = 0;
        this._n = 0;
        this._parts = parts;
        this._onePartPercent = this._total / this._parts;
        this._speed = speed;
        this._onProgress = onProgress || null;
        this._onComplete = onComplete || null;
    }
    Progress.prototype.start = function () {
        (0, ticker_1.addTicker)(this.handleTicker, this);
    };
    Progress.prototype.handleTicker = function (val) {
        this.handleAutoAddPercent(val);
    };
    Progress.prototype.handleAutoAddPercent = function (val) {
        this._n += val;
        if (this._n >= this.getRandomSpeed()) {
            this._n = 0;
            this.addPercent();
            if (this._onProgress)
                this._onProgress(this._percent);
        }
    };
    Progress.prototype.addPercent = function () {
        var min = Math.max(0, Math.floor(this._onePartPercent * this._completeParts));
        var max = Math.min(Math.floor(this._onePartPercent * (this._completeParts + 1)), 100);
        var total = this._total;
        if (this._percent >= total) {
            this._percent = total;
            this.end();
            return;
        }
        if (this._percent < min) {
            this._percent = min;
            return;
        }
        if (this._percent >= max - 1) {
            this._percent = max - 1;
            return;
        }
        this._percent += 1;
    };
    Progress.prototype.getRandomSpeed = function () {
        var min = this._speed - 500;
        var max = this._speed + 500;
        return Math.random() * (max - min) + min;
    };
    Progress.prototype.next = function () {
        this._completeParts += 1;
    };
    Progress.prototype.end = function () {
        (0, ticker_1.removeTicker)(this.handleTicker, this);
        if (this._onComplete)
            this._onComplete();
    };
    Object.defineProperty(Progress.prototype, "percent", {
        get: function () {
            return this._percent;
        },
        enumerable: false,
        configurable: true
    });
    return Progress;
}());
exports.default = Progress;
