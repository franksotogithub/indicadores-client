App.service.mapas = (function (parent, config) {


    var getLegenda = function (options,callback) {
        var codMap=options.codMap;
        var codTematico=options.codTematico;

        parent.get({
            url: parent.getUrlServer('mapa/mapas/mapa_optiones_sublayers/'+codMap+'/'+codTematico+'/'),
            success: function (data) {
                callback(data,options);
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

    var getTerritorioSelect2 = function (ubigeos,callback){
        parent.get({
            url: parent.getUrlServer('dimensiones/territorio/combo_select_2/',{"u":ubigeos}),
            success: function (data) {
                callback(data);
            }

        })

    }

    var getTerritorioAutocomplete = function (callback){
        parent.get({
            url: parent.getUrlServer('dimensiones/territorio/autocomplete/'),
            success: function (data) {
                callback(data);
            }
        })

    }

    var getUbigeosHijos = function (ubigeos,callback){
        parent.get({
            url: parent.getUrlServer('mapa/territorio/get_ubigeos_hijos/',{"u":ubigeos}),
            success: function (data) {
                callback(data);
            }
        })

    }
    var ordenarListaUbigeosSeleccionados = function (ubigeos,callback){
        parent.get({
            url: parent.getUrlServer('mapa/territorio/ordenar_lista_ubigeos_seleccionados/',{"u":ubigeos}),
            success: function (data) {
                callback(data);
            }
        })
    }


    var getUbigeos = function (ubigeos,callback) {
        parent.get({
            url: parent.getUrlServer('mapa/territorio/get_ubigeos/',{"u":ubigeos}),
            success: function (data) {
                callback(data);
            }
        })
    }

    return {
        legenda: undefined,
        getLegenda: getLegenda,
        getMapas: getMapas,
        getMapa: getMapa,
        getDataGrafico: getDataGrafico,
        getTerritorioSelect2:getTerritorioSelect2,
        getUbigeosHijos:getUbigeosHijos,
        ordenarListaUbigeosSeleccionados:ordenarListaUbigeosSeleccionados,
        getUbigeos:getUbigeos
    }

})(App.service, AppConfig());