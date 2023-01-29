"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (comp) {
    comp.install = function (app) {
        var name = comp.name || comp.__name;
        app.component(name, comp);
    };
    return comp;
});
