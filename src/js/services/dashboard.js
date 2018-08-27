App.service.dashboard = (function (parent, config) {
    var getCuadro = function (cod_cuadro, callback) {
        parent.get({
            url: parent.getUrlServer(parent.url('primeros-resultados/cuadro/{0}/', [cod_cuadro])),
            success: function (data) {
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "Error intente nuevamente");
            }
        });
    };



    return {
        getCuadro: getCuadro
    }
})(App.service, AppConfig());