App.service.cuadros = (function (parent, config) {

    var getIndicadores = function (ubigeos, vista, callback) {
        var _this = this;
        parent.get({
            url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                _this.indicadores = data;
                callback();
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    return {
        indicadores: undefined,
        getIndicadores: getIndicadores
    }
})(App.service, AppConfig());