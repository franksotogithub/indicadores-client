App.service.mapas = (function (parent, config) {

    var getLegenda = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,map,indicador,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/legendas/listar-por-mapa-cod-tematico/'+map+'/'+indicador+'/'),
            success: function (data) {

                this.legenda = data;
                callback(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos");
            }
        })
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
        })
    }

    return {
        legenda: undefined,
        getLegenda: getLegenda
    }
})(App.service, AppConfig());