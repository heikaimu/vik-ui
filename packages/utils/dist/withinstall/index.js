export default (function (comp) {
    comp.install = function (app) {
        var name = comp.name || comp.__name;
        app.component(name, comp);
    };
    return comp;
});
