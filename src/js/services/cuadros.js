App.service.cuadros = (function (parent, config) {
    var _this = this;
    var getIndicadores = function (ubigeos, callback) {
        parent.get({
            url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos}),
            success: function (data) {
                _this = data;
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        })
    };

    return {
        indicadores: undefined,
        getIndicadores: getIndicadores
    }
})(App.service, AppConfig());