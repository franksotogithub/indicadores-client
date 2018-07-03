App.service.mapas = (function (parent, config) {

    /*
    var getLegenda = function (map,indicador,url,titulo,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/legendas/obtener-por-mapa-cod-tematico/'+map+'/'+indicador+'/'),
            success: function (data) {
                callback(data,map,indicador,url,titulo);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        });
    };

*/

    var getLegenda = function (map,indicador,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/legendas/obtener-por-mapa-cod-tematico/'+map+'/'+indicador+'/'),
            success: function (data) {
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        });
    };

    var getMapas = function (){
        parent.get({
            url: parent.getUrlServer('mapa/mapas/'),
            success: function (data) {
                callback(data);
            },
            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        });
    }

    var getMapa = function (cod_map,callback){
        parent.get({
            url: parent.getUrlServer('mapa/mapas/'+cod_map+'/'),
            success: function (data) {
                callback(data);
            },
            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        });
    }

    var getDataGrafico = function (ubigeo,categoria,div ,callback) {
        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/'+ubigeo),
            success: function (data) {
                var arreglodata = [];
                data.forEach(function (i) {

                    arreglodata.push( [(i).hombre, (i).mujer]  );
                });
                if (callback !== undefined) {
                    console.log('aqui div-->',div);
                    console.log('aqui arreglo data-->',arreglodata);
                    callback(div,arreglodata);
                }
            },
            error: function (obj, status, otherr) {
            }
        });
    };

    return {
        legenda: undefined,
        getLegenda: getLegenda,
        getMapas: getMapas,
        getMapa: getMapa,
        getDataGrafico: getDataGrafico,
    }

})(App.service, AppConfig());