App.service.mapas = (function (parent, config,utils) {
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
        });
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

    var layer = function(global, i,callback){
        var slug = global.capas[i].urlMapLegenda;
        parent.get({
            url: slug,
            success:function (data) {
                var dataJson=data;
                var j= i+1;
                var datosLayers=[];
                dataJson.layers.forEach(function (t,index) {
                    var datosLayer={};
                    if(global.capas[i].idLayers.indexOf(t.layerId)>-1 || global.capas[i].todosLayers==true)
                    {
                        var datoLayer=undefined;
                        if(global.capas[i].datosLayers!==undefined){
                            if(global.capas[i].datosLayers.length>0 )
                            datoLayer=global.capas[i].datosLayers.find(x=>x.id===t.layerId);
                        }

                        if(datoLayer!=undefined){
                            if(datoLayer.id==undefined)
                                datoLayer.id=t.layerId;
                            if(datoLayer.minScale==undefined)
                                datoLayer.minScale=t.minScale;
                            if(datoLayer.maxScale==undefined)
                                datoLayer.maxScale=t.maxScale;
                            if(datoLayer.legend==undefined)
                                datoLayer.legend=t.legend;
                            if(datoLayer.layerName==undefined)
                                datoLayer.legend=t.layerName;

                            datoLayer.layer='';
                            datoLayer.selectUbigeos=[];
                        }
                        else{
                            datosLayer.id=t.layerId;
                            datosLayer.minScale=t.minScale;
                            datosLayer.maxScale=t.maxScale;
                            datosLayer.legend=t.legend;
                            datosLayer.layerName=t.layerName;
                            datosLayer.layer='';
                            datosLayer.selectUbigeos=[];
                            global.capas[i].datosLayers.push(datosLayer);

                        }
                    }
                });


                if(j< (global.capas.length)){
                    service.mapa.layer(global,j,callback);
                }
                else{
                    callback();
                }
            },
            error: function (obj, status, otherr) {
            }
        });
    };

    var tematico = function (global,i,callback){
        var proyecto=global.proyecto;
        var periodo=global.mapaPeriodo;
        var variable=global.variable;
        var tematico=global.capas.find(x=>x.id='tematicos');
        var layersTematicos= tematico.idLayers;
        var ambito=parseInt(layersTematicos[i]);
        var tipoValor=(global.tipoValor==undefined)?1:parseInt(global.tipoValor);
        var colores=[];
        var rangos=[];
        var slug = parent.url('mapa/tematico/{0}/{1}/{2}/{3}/{4}/', [proyecto, periodo,variable,(ambito),tipoValor]);
        parent.get({
            url: parent.getUrlServer(slug),
            success: function (data) {

                tematico.datosLayers[ambito].datos=data.data;
                tematico.datosLayers[ambito].titulo=data.titulo;
                tematico.datosLayers[ambito].ambito=data.ambito;
                tematico.datosLayers[ambito].rangos=data.rangos;
                tematico.datosLayers[ambito].colores=data.colores;

                if(data.colores.length==0){tematico.datosLayers[ambito].colores=global.colores;}

                if(data.rangos.length==0)
                {
                    var datos=data.data.map(x=> x.valor);
                    tematico.datosLayers[ambito].rangos=utils.crearRangos(datos,global.cantNiveles);
                }

                var j=i+1;

                if(j<layersTematicos.length){
                    parent.mapas.tematico(global,j,callback);
                }
                else{
                    callback(data);
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
        getTerritorioSelect2:getTerritorioSelect2,
        getUbigeosHijos:getUbigeosHijos,
        ordenarListaUbigeosSeleccionados:ordenarListaUbigeosSeleccionados,
        getUbigeos:getUbigeos,
        layer:layer,
        tematico:tematico
    }

})(App.service, AppConfig(),App.utils);