App.service.graficos = (function (parent, config) {
    var getGrafico = function (cod_grafico, ubigeo, callback) {
        parent.get({
            url: parent.getUrlServer('graficos/lista/'+cod_grafico+'/'+ubigeo+'/'),
            success: function (data) {
                callback(data);
            },

            error: function () {
                console.log("Error");
            }
        })
    };

    return {
        getGrafico: getGrafico
    }
})(App.service, AppConfig());