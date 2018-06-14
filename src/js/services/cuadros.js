App.service.cuadros = (function (parent, config) {

    var getIndicadores = function (ubigeos, callback) {
        parent.get({
            url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos}),
            success: function (data) {
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        })
    };

    return {
        getIndicadores: getIndicadores
    }
})(App.service, AppConfig());