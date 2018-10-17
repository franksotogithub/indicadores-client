App.service.cuadros = (function (parent, config) {

    var getIndicadores = function (ubigeos, vista, callback) {
        var _this = this;
        parent.get({
            url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                _this.indicadores = data;
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    var getIndicador = function (indicador, ubigeos, vista, callback) {
        var _this = this;
        var url = parent.url('indicadores/tabla/{0}/', [indicador]);
        parent.get({
            url: parent.getUrlServer(url, {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                //_this.indicadores = data;
                callback();
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };


    return {
        indicadores: undefined,
        getIndicadores: getIndicadores,
        getIndicador: getIndicador
    }
})(App.service, AppConfig());