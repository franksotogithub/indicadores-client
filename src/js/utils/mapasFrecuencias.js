App.utils.mapasFrecuencias = (function (config, appData, utils, service) {
    var global={
        ui: {
            cursor: $("#cursor_info")
        },
        ambito:0,
        selectUbigeos:[],
        map:'',
        divMap: 'map',

        zoomLocalizacion:6,
        mapOptions:{
                   center: [-74.999999999998751, -9.304902982781664],
                   zoom: 6,
                   showLabels:true,

        },
        layers:[],
        listPaletas:[],
        centerPt:null,
        activeDrawCircle:false,
        legendTituloTematico:'legendTituloTematico',
        legendBodyTematico:'legendBodyTematico',
        legendBodyCapas:'legendBodyCapas',
        legendBodyCapasDelitos:'legendBodyCapasDelitos',
        legendBodyCapasComisarias:'legendBodyCapasComisarias',
        legendaItemClass:'leyenda-item',
        legendaTematico:'legendaTematico',
        idLegenda:'legenda',
        elementLegenda:document.getElementById('legenda'),
        btnPeru:'',
        btnAumentarZoom:'',
        btnDisminuirZoom:'',
        selectDepartamento:'',
        selectProvincia:'',
        selectDistrito:'',
        urlServiceUbigeos :'http://192.168.34.39:8045/dimensiones/territorio/combo_select_2',
        layersTematicos:[0,1,2],
        urlServiceDatos:'http://192.168.34.14:8001/mapa/tematico',
        proyecto: 'frecuencias',
        mapaPeriodo : 'P01',
        variable: 'P010100',
        colorGris :'#9c9c9c',
        buscadorTerritorio:'buscador_territorio',
        graphicMarker:{grafico:'',options:{backgroundColor:[210, 105, 30, 0.5],size:20,borderColor:[210, 105, 30, 0.9],widthBorder:8},datos:{}},
        graphicSelectionLimite:{options:'',grafico:''},
        editToolbar:'',
        graphicDraw:'',
        graphicCirculo:'',
        drawToolbar:'',
        radiusMax:600,
        graphicSeleccionPuntos:{options:{backgroundColor:[205,255,216,0.3],borderColor:[24,202,0],widthBorderColor:2,size:30},datos:{}},
        graphicsSeleccion:[],
        cantNiveles:5,
        colores:[],
        ambito:0,
        ubigeosOrdenadosFinal:[],
        VALORES_STATICOS:
        {0:{"placeholders":"Seleccione un Departamento","etiquetaWidgetMultiples":"MULTIPLES DEPATAMENTOS"},
         1:{"placeholders":"Seleccione una Provincia","etiquetaWidgetMultiples":"MULTIPLES PROVINCIAS"},
         2:{"placeholders":"Seleccione un Distrito","etiquetaWidgetMultiples":"MULTIPLES DISTRITOS"},
         3:{"placeholders":"Seleccione un Centro Poblado","etiquetaWidgetMultiples":"MULTIPLES CCPP"},
         'origen':"cpv2017_v2"
        },

        capas:[
            {
                id:'tematicos',
                urlMap: service.getUrlGis('/CARTOGRAFIA_BASE_INEI/LIMITE_TEMATICOS/MapServer'),
                idLayers:[2,1,0],
                idSubGruposLayers:[],
                idDefaultLayers:[0],
                todosSubGruposLayers:false,
                todosLayers:false,
                datosLayers:[],
                featureLayers:[],
                tieneReporte:true,
                infoTemplate:false,
                isImageLayer: false,
            },

            /*
            {
                id:'baseAuxiliarPuntos',
                urlMap: service.getUrlGis('CRIMINALIDAD/PUNTOS_CRI_MODULO_CIUDADANO/MapServer'),
                idLayers:[2],
                idDefaultLayers:[41,42,43,44], //22, 23, 24, 25
                idSubGruposLayers:[10, 20, 30, 40],
                subGruposLayers:[],
                todosSubGruposLayers:false,
                todosLayers:false,
                datosLayers:[],
                featureLayers:[],
                tieneReporte:true,
                infoTemplate:true,
                isImageLayer: true,
                idsImageLayers:[],
                dynamicMapServiceLayer:'',
                zoomMax:100,
                zoomMin:17
            },
            */



        ],


    };

    var obtenerColores=function (index,cantNiveles) {
        var p = palette(global.listPaletas[index],cantNiveles);
        return p.map(function (obj,index) {
            var rObj={color:'#'+obj,id:(index+1),nro_break:(index+1)}
            return rObj;
        } );
    };

    var crearSimbolo=function(color, borderLine,SimpleFillSymbol,SimpleLineSymbol,Color) {
                    return new SimpleFillSymbol(
                        "solid"
                        , new SimpleLineSymbol().setWidth(borderLine)
                        , new Color(color));
    }

    var defaultSymbol = function(SimpleFillSymbol,SimpleLineSymbol,Color){
        return new SimpleFillSymbol(
                    "solid"
                    , new SimpleLineSymbol("solid", new Color(global.colorGris), 1)
                    , new Color([0,0,0,0]));
    }


    var crearLegendaTematico = function(data,ambito){
        var html='';
        //var display = displayLegenda(minScale,maxScale,escala);

        if(data.titulo==undefined) data.titulo='';
        if(data.ambito==undefined) data.ambito='';
        if(data.minScale==undefined) data.minScale=0;
        if(data.maxScale==undefined) data.maxScale=0;
        if(data.escala==undefined) data.escala=0;

        html+='<div id="legendaTematico"  minScale='+data.minScale+' maxScale='+data.maxScale+'>';
        html+='<div class="legendTituloTematico" >'+data.titulo+'</div>';
        html+='<div class="legendTituloAmbito" >'+data.ambito+'</div>';

        html+='<div class="legendBodyTematico" >';

        for (var x=(data.rangos.length-1);x>=0;x--){
            var el=data.rangos[x];
            html+='<div class="legenda-item" > ';
            html+='<div class="box-Grafico onInline" style="background-color: '+data.colores[x].color+'"></div>';
            html+='<div class="text-item-grafico onInline">'+el.label+'</div>';
            html+='</div>';
        }
        html+='</div>';
        html+='</div>';
        html+='</div>';
        html+='</div>';

        return html;

    };

    var actualizarTablasyGraficos = function(ambito){
        var datos=global.capas.find(x=>x.id='tematicos').datosLayers;
        var ubigeosDes=[];
        var options={};
        global.selectUbigeos=datos[ambito].selectUbigeos.map(x=>x.codigo);
        datos.forEach(function (dato,i) {
            if(i<=ambito){
                ubigeosDes=ubigeosDes.concat(datos[i].selectUbigeos.map(x=>x.codigo));
            }

        });
        (ubigeosDes.indexOf('00')<0)?ubigeosDes.unshift('00'):true;
        ordenarUbigeos(ubigeosDes,[],"00");
        options= {
            'ubigeosOdenados':global.ubigeosOrdenadosFinal,
            'ubigeosSeleccionados':global.selectUbigeos,
            'nivel': ambito,
        }
        console.log('options>>>',options);
        App.mapasChangeEvent(options);
    };

    var seleccionarWidgetsNavegacion=function(ambito){
        var datos=global.capas.find(x=>x.id='tematicos').datosLayers;
        var url='';
        var exp='';
        var ubigeos;
        if(ambito<1){
            //(ambito==0)?global.selectUbigeos=datos[ambito].selectUbigeos:global.selectUbigeos=[];
            cambiarAmbito(0);
            global.map.centerAndZoom(global.mapOptions.center, global.mapOptions.zoom);
        }
        else {
            url=datos[ambito-1].layer.url;
            ubigeos=datos[ambito-1].selectUbigeos.map(x=>x.codigo);
            exp=utils.getDefExpr(ubigeos);
            console.log(exp,url);
            //datos[ambito].layer.setDefinitionExpression(exp);
            getFeaturesUbigeos(exp,url,function () {
                console.log(ambito);
                cambiarAmbito(ambito);
            });
        }
        actualizarWidgetNavegacion(ambito);

    }

    var actualizarWidgetNavegacion = function(ambito){
        var tematicos=global.capas.find(x=>x.id='tematicos');
        var text='';
        if(ambito==-1){
            text='PERU';
        }

        else{
            var nombres=tematicos.datosLayers[ambito].selectUbigeos.map(x=>x.desc);
            text=(nombres.length>1)? global.VALORES_STATICOS[ambito]["etiquetaWidgetMultiples"]:(nombres.length==1)?nombres[0]:'';
        }

        $('#list-widgets-ubigeo .widget-ubigeo').map(function(index,el){
            var am= parseInt($(el).attr('ambito'));
            if(am<=ambito){
                $(el).css('display','block');
                (am==ambito)? $(el).text(text):true;
            }
            else{
                $(el).css('display','none');
            }
        });
    }


    var desplegarWidgetsNavegacion=function(){
        var ambitos=[-1].concat(global.layersTematicos);
        var html;
        var display='';

        ambitos.forEach(function (ambito) {
            (ambito>-1)?display='none':true;
            html='<div class="widget-ubigeo"  ambito="'+ambito+'" >';
            html+= (ambito==-1)? 'PERU':global.VALORES_STATICOS[ambito]["etiquetaWidgetMultiples"];
            html+='</div>';

            $('#list-widgets-ubigeo').append(
                function() {
                    return $(html).css('display',display).click(function(){
                        seleccionarWidgetsNavegacion(ambito);
                    });
            });

        });

        /*$('#list-widgets-ubigeo .widget-ubigeo').map(function(index,el){
            var am= parseInt($(el).attr('ambito'));
            (am>=ambito)? $('#list-widgets-ubigeo').remove(el):true;
        });*/

    }


    var abrirUbigeo = function (ambito) {
        var datos=global.capas.find(x=>x.id='tematicos').datosLayers;
        var layer=datos[ambito+1].layer;

        var exp='1=1';

        var ubigeos=datos[ambito].selectUbigeos.map(x=>x.codigo);
        exp=utils.getDefExpr(ubigeos);
        layer.setDefinitionExpression(exp);
        actualizarWidgetNavegacion(ambito);

        getFeaturesUbigeos(exp,layer.url,function(){
            cambiarAmbito(ambito+1);
        });
    }

    var getFeaturesUbigeos = function (queryText,urlService,callback){
        require([
                    "esri/map", "esri/geometry/Extent",
                    "esri/layers/FeatureLayer","esri/dijit/Legend",
                    "dojo/dom","dojo/dom-construct","esri/layers/ArcGISDynamicMapServiceLayer","esri/layers/ImageParameters",
                    "esri/arcgis/utils",
                    "esri/dijit/LayerList",
                    "dojo/_base/array",
                    "esri/dijit/BasemapToggle",
                     "esri/InfoTemplate",
                    "esri/tasks/QueryTask",
                    "esri/tasks/query",
                    "dojo/domReady!",

                ],
                function ( Map, Extent,
                           FeatureLayer,Legend,
                           dom,domConstruct,ArcGISDynamicMapServiceLayer,ImageParameters,
                           arcgisUtils,LayerList, arrayUtils,BasemapToggle,InfoTemplate,
                           QueryTask,Query
                           )

                {

                    var queryTask = new QueryTask(urlService);
                    var query = new Query();
                    query.returnGeometry = true;
                    query.outFields = ["*"];
                    query.where = queryText;

                    //queryTask.execute(query, function (featureSet){

                        //if(featureSet){
                            queryTask.executeForExtent(query, function (result){
                               global.map.setExtent(result.extent);
                               callback(result);

                            });
                       // }

                    //});
                });
    }


    /*var getUniqueValuesInfosSelectUbigeo= function(ambito,SimpleFillSymbol,SimpleLineSymbol,Color){
        var tematicos=global.capas.find(x=>x.id='tematicos');
        var uniqueValuesInfos = [];
        var data=tematicos.datosLayers[ambito].datos;
        var selectUbigeos=tematicos.datosLayers[ambito].selectUbigeos;
        var ubigeo;
        var color;
        var valueInfo;

        data.forEach( function (el) {
            if(selectUbigeos!==undefined && selectUbigeos.length>0){
                ubigeo=selectUbigeos.find(x=>x.codigo==el.codigo);
                (ubigeo!=undefined)? color=el.color : color=global.colorGris;
            }
            valueInfo = {
                "value": el.codigo,
                "symbol": crearSimbolo(color,1,SimpleFillSymbol,SimpleLineSymbol,Color)
            };
            uniqueValuesInfos.push(valueInfo);
        });
        return uniqueValuesInfos;
    }*/
    var getUniqueValuesInfosSelectUbigeo= function (ambito,callback) {
        require([
                "esri/map",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
                "esri/renderers/UniqueValueRenderer",
                "dojo/domReady!",

            ], function (
                Map,
                SimpleRenderer, Color,
                SimpleFillSymbol, SimpleLineSymbol,UniqueValueRenderer
            ) {

                var tematicos=global.capas.find(x=>x.id='tematicos');
                var uniqueValuesInfos = [];
                var data=tematicos.datosLayers[ambito].datos;
                var selectUbigeos=tematicos.datosLayers[ambito].selectUbigeos;
                var ubigeo;
                var color;
                var valueInfo;

                data.forEach( function (el) {
                    if(selectUbigeos!==undefined && selectUbigeos.length>0){
                        ubigeo=selectUbigeos.find(x=>x.codigo==el.codigo);
                        (ubigeo!=undefined)? color=el.color : color=global.colorGris;
                    }
                    valueInfo = {
                        "value": el.codigo,
                        "symbol": crearSimbolo(color,1,SimpleFillSymbol,SimpleLineSymbol,Color)
                    };
                    uniqueValuesInfos.push(valueInfo);
                    });


                    var layerRenderer = new UniqueValueRenderer({
                            "type": "uniqueValue",
                            "field1": "CODIGO",
                            "uniqueValueInfos": uniqueValuesInfos,
                            "uniqueValueInfos": response,
                            "defaultSymbol":defaultSymbol(SimpleFillSymbol,SimpleLineSymbol,Color)
                    });

                    tematicos.datosLayers[ambito].layer.setRenderer(layerRenderer);
                    tematicos.datosLayers[ambito].layer.redraw();


                    return callback(uniqueValuesInfos);
                });

    }



    var iniciarMapa = function (){
        require([
                "esri/map", "esri/geometry/Extent",
                "esri/layers/FeatureLayer", "esri/InfoTemplate", "esri/dijit/Legend",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "esri/layers/ImageParameters","esri/renderers/UniqueValueRenderer",
                "esri/renderers/ClassBreaksRenderer",
                "esri/symbols/TextSymbol",
                "esri/layers/LabelClass",
                "esri/dijit/BasemapGallery",
                "esri/dijit/Basemap",
                "esri/dijit/BasemapLayer",
                "esri/tasks/QueryTask",
                "esri/tasks/query",
                "esri/geometry/Extent",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/graphic",
                "dojo/domReady!",

            ],
            function (
                Map, Extent,
                FeatureLayer, InfoTemplate, Legend,
                SimpleRenderer, Color,
                SimpleFillSymbol, SimpleLineSymbol,
                ArcGISDynamicMapServiceLayer,ImageParameters,
                UniqueValueRenderer,ClassBreaksRenderer,TextSymbol,LabelClass,
                BasemapGallery,Basemap,BasemapLayer,QueryTask,Query,Extent,SimpleMarkerSymbol,Graphic

            ) {



                var tematicos=global.capas.find(x=>x.id='tematicos');

                global.map = new Map(global.divMap, global.mapOptions);
                /**
                 **Base map Gallery
                 *****/
                var basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: true,
                    toggleReference: false,
                    map: global.map
                }, "basemapGallery");


                /***
                 * Base map
                 * **/
                var mapGMapSat = new Basemap({
                    layers: [new BasemapLayer({
                        type: "WebTiledLayer",
                        url : "https://mts1.google.com/vt/lyrs=m@186112443&hl=x-local&src=app&x={col}&y={row}&z={level}&s=Galile&apistyle=s.t:33|p.v:off,s.t:17|p.v:off",
                        copyright: "Google Maps"
                    })],
                    id: "gmapsat",
                    thumbnailUrl: "https://maps.ngdc.noaa.gov/viewers/dijits/agsjs/xbuild/agsjs/dijit/images/googleroad.png",
                    title: "Google Imagery"
                });

                basemapGallery.add(mapGMapSat);
                basemapGallery.startup();
                basemapGallery.select("gmapsat");


                /***
                 * Callback despues de cargar el mapa
                 * ***/
                var iniciarCapas=function() {
                    global.capas.forEach(function(capa,index){
                        var urlMap=capa.urlMap;
                        var datosLayers = capa.datosLayers;
                        var isImageLayer = capa.isImageLayer;

                        if(isImageLayer){
                            var imageParameters = new ImageParameters();

                            imageParameters.layerIds = capa.idDefaultLayers;
                            imageParameters.layerOption = ImageParameters.LAYER_OPTION_SHOW;
                            var dynamicMapServiceLayer = new ArcGISDynamicMapServiceLayer(urlMap,
                                        {"imageParameters": imageParameters}
                                        );

                             if(capa.infoTemplate){
                                 var infoTemplates = {};
                                 var template = {
                                    infoTemplate: new InfoTemplate(function (target) {
                                        if (App.global.tools == "registro") {
                                            return "Confirmar ubicación"
                                        }else {
                                            return 'Detalle de punto';
                                        }
                                    }, pointInfoTemplate ),
                                    layerUrl: null
                                    }

                                 datosLayers.forEach(function (dato) {
                                     infoTemplates[dato.id] = template;
                                 });


                                dynamicMapServiceLayer.setInfoTemplates(infoTemplates);
                             }
                             global.map.addLayer(dynamicMapServiceLayer);
                             capa.dynamicMapServiceLayer=dynamicMapServiceLayer;
                             capa.idsImageLayers=capa.idDefaultLayers;
                        }

                        else{
                            datosLayers.forEach(function (dato) {

                                var urlLayer= urlMap.concat('/',dato.id);

                                var newLayer= new FeatureLayer(urlLayer,{
                                    outFields:['*'],
                                    opacity:1,
                                    mode: FeatureLayer.MODE_AUTO,
                                    minScale:0,
                                    maxScale:0,
                                    showLabels: false

                                });




                                /**seteando tematico**/



                                dato.layer=newLayer;

                                if(capa.tieneReporte==true){
                                    newLayer.on("click",function (event) {
                                        var graphic=event.graphic;
                                        var atributos=graphic.attributes;
                                        selectFeature(atributos);


                                    });
                                }

                                if(capa.idDefaultLayers.indexOf(dato.id)==-1){
                                    newLayer.setVisibility(false);
                                }

                                if(capa.infoTemplate){
                                    var template = new InfoTemplate("Detalle",pointInfoTemplate);
                                }

                                if(dato.isHeadMap){

                                    var heatmapRenderer = new HeatmapRenderer(dato.optionsHeatMapRenderer);
                                    newLayer.setRenderer(heatmapRenderer);
                                    newLayer.setOpacity(dato.opacity);

                                }

                                if(capa.zoomMin!==undefined){
                                    activarCapaPorZoom(zoom, newLayer,capa.zoomMin,capa.zoomMax);
                                }

                                global.map.addLayer(newLayer);

                            });
                        }
                    });
                }



                var selectFeature = function(options,abrirPopup){
                    var ubigeoSelect={codigo:options['CODIGO'],desc:options['DESCRIPCION']};
                    var ambito=global.ambito;

                    if(tematicos.datosLayers[ambito].selectUbigeos!=undefined) {
                        var item=tematicos.datosLayers[ambito].selectUbigeos.find(item => item.codigo == ubigeoSelect.codigo);
                        if(item==undefined)
                            tematicos.datosLayers[ambito].selectUbigeos.push(ubigeoSelect);
                        else
                            tematicos.datosLayers[ambito].selectUbigeos = tematicos.datosLayers[ambito].selectUbigeos.filter(item => item.codigo !== ubigeoSelect.codigo);
                    }
                    else {
                        tematicos.datosLayers[ambito].selectUbigeos=[ubigeoSelect];
                    }

                    /**seteando tematico**/
                    getUniqueValuesInfosSelectUbigeo(ambito,function (response) {

                        global.selectUbigeos=tematicos.datosLayers[ambito].selectUbigeos;
                        actualizarTablasyGraficos(ambito);
                    });


                }

                var initFunc = function() {
                    iniciarCapas();
                }

                var actualizarDatosComboUbigeo = function (data,i){
                    var placeholder="Seleccione una opcion";
                    $('#select-ubigeo').html('').select2({data: [{id:"",text:""}]});
                    $('#select-ubigeo').select2({
                        tags: "true",
                        placeholder: placeholder,
                        //placeholder: _this.VALORES_STATIC[i].placeholders,
                        allowClear: true,
                        data:data
                    });
                }

                var actualizarComboUbigeo=function(ubigeos,flagAbrir){ //
                    var results= {};
                    results["results"]='';
                    service.mapas.getTerritorioSelect2(ubigeos,function(data){

                        var ubigeosHijos=[];
                        if(ubigeos.length==0)
                        {
                            actualizarDatosComboUbigeo(data.results,0);
                            data.results.forEach(function (hijo) {
                            ubigeosHijos.push(hijo.id.trim());
                            });
                        }


                        else {
                            actualizarDatosComboUbigeo(data.results,global.ambito);
                            data.results.forEach(function (padres) {
                                padres.children.forEach(function (hijo) {
                                    if(hijo.id.trim().length>6){
                                        ubigeosHijos.push({ubigeo:hijo.id.trim(),grupo:hijo.cod_grupo.trim()});
                                    }

                                    else{
                                        ubigeosHijos.push(hijo.id.trim());
                                    }
                                });
                            });

                            if(flagAbrir)abrirUbigeo(global.ambito);
                        }

                    });
                }


                $('.ambitosMapa').on('click', 'div',function () {
                    var ambito=parseInt($(this).attr('index'));
                    cambiarAmbito(ambito);
                });

                $('#select-ubigeo').on('select2:select', function (e) {
                    var data = e.params.data;
                    var codigo=data.id.trim();
                    var descripcion= data.text;
                    var where=" CODIGO="+codigo;


                    var url = tematicos.datosLayers[global.ambito].layer.url;


                    getFeaturesUbigeos(where,url,function (results) {
                        var atributos={'CODIGO':codigo,'DESCRIPCION':descripcion};

                        selectFeature(atributos,1);
                        actualizarComboUbigeo(tematicos.datosLayers[global.ambito].selectUbigeos.map(x=>x.codigo),1);
                    });
                    });


                global.map.on('dbl-click',function (e) {
                    console.log('evento>>>',e);
                    var ubigeos=tematicos.datosLayers[global.ambito].selectUbigeos.map(x=>x.codigo);
                    actualizarComboUbigeo(ubigeos,1);
                });

                initFunc();
                actualizarComboUbigeo([]);
                desplegarWidgetsNavegacion();

            });


    }

    var cambiarAmbito=function(ambito){
        var tematicos=global.capas.find(x=>x.id='tematicos');
        var datosLayers=tematicos.datosLayers;
        datosLayers.forEach(function (dato,index) {
                            if(index!==ambito)
                                dato.layer.setVisibility(false);
                            else {
                                dato.layer.setVisibility(true);
                                dato.layer.setMaxScale(0);
                                dato.layer.setMinScale(0);
                                if(index>ambito){
                                    dato.selectUbigeos=[];
                                }
                            }
                        });
        global.ambito=ambito;
        global.elementLegenda.innerHTML=crearLegendaTematico(datosLayers[global.ambito],global.ambito);

    }

    var actualizarMapasTematicos = function(){
                require([
                "esri/map", "esri/geometry/Extent",
                "esri/layers/FeatureLayer", "esri/InfoTemplate", "esri/dijit/Legend",
                "esri/renderers/SimpleRenderer", "esri/Color",
                "esri/symbols/SimpleFillSymbol", "esri/symbols/SimpleLineSymbol",
                "esri/layers/ArcGISDynamicMapServiceLayer",
                "esri/layers/ImageParameters","esri/renderers/UniqueValueRenderer",
                "esri/renderers/ClassBreaksRenderer",
                "esri/symbols/TextSymbol",
                "esri/layers/LabelClass",
                "esri/dijit/BasemapGallery",
                "esri/dijit/Basemap",
                "esri/dijit/BasemapLayer",
                "esri/tasks/QueryTask",
                "esri/tasks/query",
                "esri/geometry/Extent",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/graphic",
                "dojo/domReady!",

            ],
            function (
                Map, Extent,
                FeatureLayer, InfoTemplate, Legend,
                SimpleRenderer, Color,
                SimpleFillSymbol, SimpleLineSymbol,
                ArcGISDynamicMapServiceLayer,ImageParameters,
                UniqueValueRenderer,ClassBreaksRenderer,TextSymbol,LabelClass,
                BasemapGallery,Basemap,BasemapLayer,QueryTask,Query,Extent,SimpleMarkerSymbol,Graphic

            ) {
                    var tematicos=global.capas.find(x=>x.id='tematicos');
                    var datosLayers = tematicos.datosLayers;

                    var actualizandoCapas= function(){
                        datosLayers.forEach(function (dato,index) {
                            var layer=dato.layer;
                            var uniqueValuesInfos = getUniqueValuesInfos(dato.datos,dato.rangos,dato.colores,1,index);
                            var layerRenderer = new UniqueValueRenderer({
                                            "type": "uniqueValue",
                                            "field1": "CODIGO",
                                            "uniqueValueInfos": uniqueValuesInfos,
                                            "defaultSymbol":defaultSymbol(SimpleFillSymbol,SimpleLineSymbol,Color)
                            });
                            layer.setRenderer(layerRenderer);

                            layer.redraw();
                        });
                    };
                    var getUniqueValuesInfos=function(data, rangos,colores,borderLine,ambito){
                        var uniqueValuesInfos = [];
                        var j = 0;
                        var valor = undefined;
                        var codigo = '';
                        var valueInfo = {};
                        var color = '';
                        var selectUbigeos=tematicos.datosLayers[ambito].selectUbigeos;
                        var ubigeo='';

                        data.forEach(function (el) {
                            codigo = el.codigo;
                            valor = parseFloat(el.valor);



                            if (!(valor==null || valor==undefined)) {
                                for (j = 0; j < rangos.length; j++) {
                                    if (rangos[j].min_valor <= valor && rangos[j].max_valor >= valor) {
                                        color = colores[j].color;
                                        el['estrato'] = j;
                                        el['color'] = color;


                                        if(selectUbigeos!==undefined && selectUbigeos.length>0){
                                            ubigeo=selectUbigeos.find(x=>x.codigo==el.codigo);
                                            (ubigeo!=undefined)? color=el.color : color=global.colorGris;
                                        }

                                        valueInfo = {
                                            "value": codigo,
                                            "symbol": crearSimbolo(color, borderLine,SimpleFillSymbol,SimpleLineSymbol,Color)
                                        };

                                        uniqueValuesInfos.push(valueInfo);
                                        break;
                                    }
                                }
                            }

                            else{
                                el['estrato'] = -1;
                                el['color'] = global.colorGris;
                                valueInfo = {
                                    "value": codigo,
                                    "symbol": crearSimbolo(global.colorGris, borderLine,SimpleFillSymbol,SimpleLineSymbol,Color)
                                };
                                uniqueValuesInfos.push(valueInfo);
                            }

                        });
                        return uniqueValuesInfos;
                };
                    actualizandoCapas();
                    global.elementLegenda.innerHTML=crearLegendaTematico(datosLayers[global.ambito],global.ambito);


            });
    }

    var obtenerColoresRandom=function(){
        var index=0;
        index=utils.getRandomInt(0,global.listPaletas.length-1);
        return obtenerColores(index,global.cantNiveles);
    }

    var ordenarUbigeos=function (ubigeosDesordenados,ubigeosOrdenados,ubigeoPadre) {
        var ubigeos= ubigeosDesordenados;
        var encontrado=false;
        var indice =-1;

        if(ubigeos.length>0)
        {
            ubigeos.forEach(function (ubigeo) {

                if(ubigeo=="00" || utils.esPadre(ubigeoPadre,ubigeo)){
                    var indice = ubigeosDesordenados.indexOf(ubigeo);
                    ubigeosOrdenados.push(ubigeo);
                    ubigeosDesordenados.splice(indice,1);
                    encontrado=true;
                    ordenarUbigeos(ubigeosDesordenados,ubigeosOrdenados,ubigeo);
                }
            });

            if(!(encontrado))
            {
                ubigeosOrdenados.push(ubigeos[0]);
                ubigeosDesordenados.splice(0,1);
                ordenarUbigeos(ubigeosDesordenados,ubigeosOrdenados,ubigeos[0]);
            }
        }
        else{
               global.ubigeosOrdenadosFinal = ubigeosOrdenados;

        }

    }

    var init = function (options) {

        palette.listSchemes('cb-sequential').forEach(function(e){ global.listPaletas.push(e.scheme_name)});

        global.capas.forEach(function (capa) {
            capa.urlMapSubgrupo=capa.urlMap.concat('?f=pjson')
            capa.urlMapLegenda=capa.urlMap.concat('/','legend?f=pjson');
        });

        global.colores=obtenerColoresRandom();

        service.mapas.layer(global,0,function (data) {
            iniciarMapa();
            service.mapas.tematico(global,0,actualizarMapasTematicos);
        });
        _initEvents();
    };

    var actualizarMapasTematicosPorVariable = function (variable){
        global.variable=variable;
        global.colores=obtenerColoresRandom();
        service.mapas.tematico(global,0,actualizarMapasTematicos);
    }

    var _initEvents = function () {
        App.events.mapas(service,parent);
    }


    return {
        init: init,
        global:global,
        cambiarAmbito: cambiarAmbito,
        //seleccionarAmbito: seleccionarAmbito,
        actualizarMapasTematicosPorVariable:actualizarMapasTematicosPorVariable
    }

})(AppConfig(), Appdata, App.utils, App.service);