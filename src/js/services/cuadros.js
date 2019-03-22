App.service.cuadros = (function (service, config) {

    var getIndicadores = function (ubigeos, appdata, vista, callback) {
        var _this = this;
        service.get({
            //url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos, "vista": [vista]}),
            url: service.getUrlServer('principales/', {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                var dataPivot = pivotData(data, appdata);
                _this.indicadores = dataPivot.data;
                _this.indicadores_hijos = dataPivot.hijos;
                callback(dataPivot.data, dataPivot.titulos, dataPivot.hijos);
            },

            error: function (obj, status, otherr) {
                service.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };

    var pivotData = function(data, appdata){
        var response = {
            "data": {}, "titulos": {}, "hijos": {}
        };

        var registros = {};
        data.forEach( ubigeo => {
            for (var propierty in ubigeo) {
                if(typeof ubigeo[propierty] == 'object'){
                    if(!response.data.hasOwnProperty(propierty)){
                        response.data[propierty] = {};
                    }
                    for (var indicator in ubigeo[propierty]) {
                        if(!response.data[propierty].hasOwnProperty(indicator)){

                            response.data[propierty][indicator] = {};
                            response.data[propierty][indicator]['cod_tematico'] = indicator;
                        }
                        response.data[propierty][indicator]['absoluto_'+ubigeo.cod_territorio] = ubigeo[propierty][indicator].abs;
                        response.data[propierty][indicator]['porcentaje_'+ubigeo.cod_territorio] = ubigeo[propierty][indicator].porcent;
                        response.data[propierty][indicator]['titulo_'+ubigeo.cod_territorio] = ubigeo.titulo;
                        if(!response.titulos.hasOwnProperty(ubigeo.cod_territorio)){
                            response.titulos[ubigeo.cod_territorio] = ubigeo.titulo;
                        }

                        if(!response.hijos.hasOwnProperty(ubigeo.cod_territorio)){
                            response.hijos[ubigeo.cod_territorio] = {"tiene_hijos": ubigeo.tiene_hijos, "hijos": ubigeo.hijos};
                        }
                    }
                    registros[propierty] = response.data[propierty];
                }
            }
        });

        service.cuadros.indicadores_index = registros;
        response.data = objectToArray(response.data);
        return response;
    };

    var objectToArray  = function (data) {

        for(var prop in data){
            data[prop] = Object.values(data[prop]);
        }
        return data;
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
        indicadores: {},
        indicadores_index: {},
        getIndicadores: getIndicadores,
        getIndicador: getIndicador,
        getBusquedaIndicador: getBusquedaIndicador
    }
})(App.service, AppConfig());