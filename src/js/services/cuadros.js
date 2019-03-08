App.service.cuadros = (function (service, config) {

    var getIndicadores = function (ubigeos, appdata, vista, callback) {
        var _this = this;
        service.get({
            //url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos, "vista": [vista]}),
            url: service.getUrlServer('principales/', {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                _this.indicadores = data;
                callback(pivotData(data, appdata));
            },

            error: function (obj, status, otherr) {
                service.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    var pivotData = function(data, appdata){
        var response = {};
        data.forEach( ubigeo => {
            for (var propierty in ubigeo) {
                if(typeof ubigeo[propierty] == 'object'){
                    if(!response.hasOwnProperty(propierty)){
                        response[propierty] = {};
                    }
                    for (var indicator in ubigeo[propierty]) {
                        if(!response[propierty].hasOwnProperty(indicator)){
                            response[propierty][indicator] = [];
                            response[propierty][indicator]['cod_tematico'] = indicator;
                        }
                        response[propierty][indicator]['absoluto_'+ubigeo.cod_territorio] = ubigeo[propierty][indicator].abs;
                        response[propierty][indicator]['porcentaje_'+ubigeo.cod_territorio] = ubigeo[propierty][indicator].porcent;
                        response[propierty][indicator]['titulo_'+ubigeo.cod_territorio] = ubigeo.titulo;
                    }
                }
            }
        });
        for(var prop in response){
            response[prop] = Object.values(response[prop]);
        }
        return response;
    };

    var getIndicador = function (indicador, ubigeos, vista, callback) {
        var _this = this;
        var url = service.url('indicadores/tabla/{0}/', [indicador]);
        service.get({
            url: service.getUrlServer(url, {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                //_this.indicadores = data;
                callback();
            },

            error: function (obj, status, otherr) {
                service.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    var getBusquedaIndicador = function (codigo_subcategoria, cod_tematico, ubigeos, cod_nivel, callback) {
        var url = service.url('indicadores/tabla/{0}/{1}/', [codigo_subcategoria, cod_tematico]);
        service.get({
            url: service.getUrlServer(url, {"u": ubigeos, "cod_nivel": [cod_nivel]}),
            success: function (data) {
                callback(data);
            },
            error: function (obj, status, otherr) {
                service.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    return {
        indicadores: undefined,
        getIndicadores: getIndicadores,
        getIndicador: getIndicador,
        getBusquedaIndicador: getBusquedaIndicador
    }
})(App.service, AppConfig());