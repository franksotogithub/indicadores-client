App.service.mapas = (function (parent, config) {

    /*

    var getLegenda = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,ListLayer,map,indicador,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/legendas/listar-por-mapa-cod-tematico/'+map+'/'+indicador+'/'),
            success: function (data) {

                this.legenda = data;
                callback(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,ListLayer,data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        });
    };
    */
    var getLegenda = function (map,indicador,url,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/legendas/obtener-por-mapa-cod-tematico/'+map+'/'+indicador+'/'),
            success: function (data) {
                callback(data,map,indicador,url);
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