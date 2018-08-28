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

    var getIndicador = function (cod_caategoria, ubigeo, callback) {
        var url = parent.url('graficos/indicadores/{0}/{1}/', [cod_caategoria, ubigeo]);
        parent.get({
            url: parent.getUrlServer(url),
            success: function (data) {
                callback(data);
                parent.save(url, data);
            },
            error: function () {
                console.log("Error >>>>>>>>>>>>>>>");
            }
        });
    };

    return {
        getGrafico: getGrafico,
        getIndicador: getIndicador
    }
})(App.service, AppConfig());