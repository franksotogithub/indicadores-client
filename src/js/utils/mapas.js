

App.utils.mapas = (function (parent, config,service) {
    var listMapas = undefined;

    var indexLayer=0;

    var select_all=document.getElementById("widget-select-all");

    var url_dep;

    var url_prov;

    var url_dist;

    var url_map= undefined;

    var cod_tematico=undefined;

    var cod_map=undefined;

    var select_features_tablas_graficos;

    var layerList = undefined;

    var identifyTask;

    var identifyParams;

    var legend;

    var layer;

    var layer_back;

    var popup=undefined;

    var layers_inicial=undefined;

    var departamentoLyr=undefined;

    var provinciaLyr=undefined;

    var distritoLyr=undefined;

    var map=undefined;

    var view_map= undefined;

    var select_ubigeos=[];

    var definitionExpression_gloabal="1=1";

    var opacity=0.8;

    var historic_features=undefined;

    var list_maps=undefined;

    var maximizado=false;

    var lods = [
        {
            "level": 0,
            "scale": 160000000
        },

        {   "level": 1,
            "scale": 80000000
        },

        {   "level": 2,
            "scale": 40000000
        },

        {   "level": 3,
            "scale": 20000000
        },
        {   "level": 4,
            "scale": 14000000
            //"scale": 36978595
        },

        {   "level": 5,
            "scale": 12000000
            //"scale": 18489297
        },
        {
            "level": 6,
            "scale": 10000000
        },

        {
            "level": 7,
            "scale": 5000000
        },

        {
            "level": 8,
            "scale": 2311162
        },

        {
            "level": 9,
            "scale": 1600000
            //"scale": 1155581
        },
        {
            "level": 10,
            "scale": 650000,
            //"scale": 577790
        },

        {
            "level": 11,
            "scale": 288895
        },
        {
            "level": 12,
            "scale": 144447
        },
        {
            "level": 13,
            "scale": 72223
        },
        {
            "level": 14,
            "scale": 36111
        },
        {
            "level": 15,
            "scale": 18055
        },
        {
            "level": 16,
            "scale": 9027
        },

        {
            "level": 17,
            "scale": 4513
        },
        {
            "level": 18,
            "scale": 2256
        },

    ];



    //var url_map=config.map_config[cod_map].urlMap;

    //var cod_tematico=config.map_config[cod_map].cod_tematico_default;

    var sources=undefined;

    var searchWidget=undefined;

    var panelDiv=undefined;

    var createSymbol = function(color) {
        return {
            type: "simple-fill",
            color: color,
            outline: {
                width: 1,
                color: [255, 255, 255, 0.4]
            },
            style: "solid"
        };
    };

    var classBreakinfos=undefined;

    var renderizado = function(indicador,classBreakinfo){
        var renderer = {
            type: "class-breaks",
            field: indicador,
            defaultSymbol: {
                type: "simple-fill",
                color: "#F0C1B8",
                outline: {
                    width: 1,
                    color: "white"
                }
            },
            defaultLabel: "Otro",
            classBreakInfos: classBreakinfo,
        };
        return renderer;
    };

    var renderBack=function() {
        var renderer = {
            type: "unique-value",
            field: "OBJECTID",
            defaultSymbol: {
                type: "simple-fill",
                color: "#A8A8A8",
                outline: {
                    width: 1,
                    color: "white"
                }
            },

        };

        return renderer
    };

    var getAccesDirectMaps = function(){
        return [
            {id:1 ,

                where:"CCDD='07'",
                indexLayer:2,
                imagen:"callao.jpg"},
            {id:2 ,

                where:"CCDD='15' AND CCPP='01' ",
                indexLayer:2,
                imagen:"lima_metro.jpg"},
            {id:3 ,
                where:"CCDD='15' AND CCPP<>'01' ",
                indexLayer:1,
                imagen:"lima_provincias.jpg"},

        ];
    }

    var zoomGlobal = function () {
        /* zomm Global */
        var zoom;
        var tamW = $(window).height();
        if(tamW >= 900){zoom=6;
        }else if(tamW <= 899 && tamW >= 715 ){zoom=5;
        }else if(tamW <= 714){zoom=4;}
        console.log(tamW+" Es el ZOom");
        return zoom;
    }

    var grafPopupPop=function (div,data) {
        var edad_h = [];
        var edad_m = [];
        var t_edad_h=0;
        var t_edad_m=0;

        data.forEach(function (i) {
            edad_h.push(-i[0]);
            edad_m.push(i[1]);
            t_edad_h += i[0];
            t_edad_m += i[1];

        });

        Highcharts.chart(div, {
            chart: {
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                //width: 200,
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            colors: ['#25DFA1', '#16C9D5'],
            tooltip: {
                pointFormat:
                    'Cant Total: <b>{point.y:.1f}</b> '
            },
            exporting: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        x:0,
                        y: 50,
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '65%'],
                    borderWidth: 6,
                    borderColor: 'rgba(27, 60, 113, 0.9)',
                }
            },
            series: [{
                type: 'pie',
                name: 'porcentaje',
                innerSize: '50%',
                data: [
                    {
                        name: 'Hombres',
                        y: t_edad_h ,
                        dataLabels: {
                            format: '{point.name}<br>{point.percentage:.1f} %',
                            borderWidth: 0,
                            distance: -8, // Individual distance
                            style: {
                                textShadow: null,
                                textOutline: 0,
                                color:"#FFFFFF"
                            }

                        }

                    },
                    {
                        name: 'Mujeres',
                        y: t_edad_m ,
                        dataLabels: {
                            format: '{point.name}<br>{point.percentage:.1f} %',
                            borderWidth: 0,
                            distance: -8, // Individual distance
                            style: {
                                textShadow: null,
                                textOutline: 0,
                                color:"#FFFFFF",

                            }
                        }

                    }
                ]
            }]
        });

    }

    var createContentPopup= function (ubigeo,cod_map) {
        var content = document.createElement("div");
        var bloque1 = document.createElement("div");
        var bloque2 = document.createElement("div");
        var bloque3 = document.createElement("div");
        var contenidoPopoverBloque1 = '<div class="titPopoverMap"><h3>876542</h3><p>Población Censada</p> </div> ' +
            '<div class="pobGeneroPopoverMap"><div class="pobGeneroPopoverMapMan"><h3 class="icon-user"></h3><p>467 135</p> </div>' +
            '<div class="pobGeneroPopoverMapWoman"><h3 class="icon-user-female"></h3><p>447 895</p> </div></div>';

        ////////se declaran ids a los bloques
        bloque1.setAttribute("id","resumen");
        bloque2.setAttribute("id","mapaGrafico");
        bloque3.setAttribute("id","tabla");


        bloque1.innerHTML=contenidoPopoverBloque1;

        ////////se agrega los bloques al content
        content.appendChild(bloque1);
        content.appendChild(bloque2);
        if (cod_map=='P01')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}

        else if (cod_map=='P02')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}
        return content;
    }

    var uiMaxCallback =function () {
        var _this=parent.mapas;
        _this.maximizado=true;
        _this.panelDiv.style.display='inline';
        _this.view_map.popup.close();
    }

    var uiNormalCallback = function(){
        var _this=parent.mapas;
        _this.maximizado=false;
        _this.panelDiv.style.display='none';
        _this.view_map.popup.visible=true;
        //console.log('vuelve a la normalidad');

    }

    var crearMapa = function (classBreak,cod_map,cod_tematico,url) {
        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",
            "esri/widgets/Legend",
            "esri/widgets/Popup",
            "dojo/dom",
            "dojo/dom-construct",
            "esri/Graphic",
            "esri/widgets/Search",
            "esri/tasks/Locator",
            "esri/tasks/support/Query",
            "esri/tasks/IdentifyTask",
            "esri/tasks/support/IdentifyParameters",
            "dojo/_base/array",
            "esri/PopupTemplate",
            "esri/widgets/Print",
            "esri/tasks/QueryTask",
            "esri/widgets/LayerList",
            "dojo/domReady!"
        ],function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList)
        {
            list_maps=getAccesDirectMaps();
            var _this=parent.mapas;
            classBreakinfos= classBreak;
            url_map=url;
            url_dep=url_map+'/0';
            url_prov=url_map+'/1';
            url_dist=url_map+'/2';
            layer = new MapImageLayer({
                url: url_map,
                opacity:0.8,
                outFields:["*"],
                sublayers: [{
                    id: 0,
                    title: "DEPARTAMENTAL",
                    visible: true,
                    labelsVisible: true,
                    outFields:["*"],
                    renderer:renderizado(cod_tematico,classBreakinfos["0"]),


                }, {
                    id: 1,
                    title: "PROVINCIAL",
                    visible: false,
                    labelsVisible: true,
                    outFields:["*"],
                    renderer:renderizado(cod_tematico,classBreakinfos["1"]),



                }, {
                    id: 2,
                    title: "DISTRITAL",
                    outFields:["*"],
                    visible: false,
                    labelsVisible: true,
                    renderer:renderizado(cod_tematico,classBreakinfos["2"]),

                }],
                title: 'LayerPredominate'
            });
            layer_back= new MapImageLayer({
                url: url_map,
                opacity:0.8,
                outFields:["*"],
                sublayers: [{
                    id: 0,
                    title: "DEPARTAMENTAL",
                    visible: true,
                    labelsVisible: true,
                    outFields:["*"],
                    renderer:renderBack(),

                }, {
                    id: 1,
                    title: "PROVINCIAL",
                    visible: false,
                    labelsVisible: true,
                    outFields:["*"],
                    renderer:renderBack(),

                }, {
                    id: 2,
                    title: "DISTRITAL",
                    outFields:["*"],
                    visible: false,
                    labelsVisible: true,
                    renderer:renderBack(),
                }]
            });
            layers_inicial = [layer_back,layer];

            departamentoLyr = new FeatureLayer({
                url: url_dep,
                renderer: renderizado(cod_tematico,classBreakinfos["0"]),
                opacity:opacity,
                id:"dep",
                outFields:["*"],
                title:'DEPARTAMENTOS',
            });

            provinciaLyr = new FeatureLayer({
                url: url_prov,
                renderer: renderizado(cod_tematico,classBreakinfos["1"]),
                opacity:opacity,
                outFields:["*"],
                title:'PROVINCIAS',
            });

            distritoLyr = new FeatureLayer({
                url: url_dist,
                renderer: renderizado(cod_tematico,classBreakinfos["2"]),
                opacity:opacity,
                outFields:["*"],
                title:'DISTRITOS',

            });

            map = new Map({
                basemap: "gray",
                layers: layers_inicial,
            });

            _this.view_map = new MapView({
                container: "viewDiv",
                map: map,
                center: [-75.000, -9.500],
                zoom : zoomGlobal(),

            });

            identifyTask = new IdentifyTask(url_map);
            identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [0];
            identifyParams.layerOption = "top";
            identifyParams.width = _this.view_map.width;
            identifyParams.height = _this.view_map.height;
            _this.historic_features=[
                {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[],url:url_dep},
                {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[],url:url_prov},
                {'select_features':[],'where':'','layer':distritoLyr,'nombres':[],url:url_dist},
            ];

            sources=[
                {
                    featureLayer: _this.historic_features[0].layer,
                    searchFields: ["NOMBDEP"],
                    displayField: "LITERAL",
                    outFields:['*'],
                },

                {
                    featureLayer: _this.historic_features[1].layer,
                    searchFields: ["NOMBDEP","NOMBPROV"],
                    displayField: "LITERAL",
                    outFields:['*'],
                },
                {
                    featureLayer: _this.historic_features[2].layer,
                    searchFields: ["NOMBDEP","NOMBPROV","NOMBDIST"],
                    displayField: "LITERAL",
                    outFields:['*'],
                }
            ];


            var div_list_maps=document.getElementById("div-list-maps");
            div_list_maps.innerHTML='';

            list_maps.forEach(function (map,index) {
                var newImg = document.createElement("img");
                newImg.setAttribute("src",'/img/'+map.imagen);
                newImg.classList.add("overviewDiv");
                newImg.setAttribute("id","map_"+index);
                div_list_maps.appendChild(newImg);
                newImg.addEventListener("click",function (event) {
                    selectedMap(index);
                });
            });

            legend = new Legend({
                view: _this.view_map,
                layerInfos: [{
                    layer: layer,
                    title:'POBLACION',
                }],
            });

            searchWidget = new Search({
                view: _this.view_map,
                sources:sources,
                activeSourceIndex:0,
                popupOpenOnSelect :false,

                //activeSource:false
            });

            _this.view_map.ui.add(legend, "bottom-left");
            _this.view_map.ui.add(searchWidget, {
                position: "top-left",
                index: 2,
            });
            _this.view_map.ui.add("list-widgets", "top-left");
            _this.view_map.ui.add("list-maps", "bottom-right");
            _this.view_map.ui.add("widget-select-layer", "top-right");
            _this.view_map.ui.remove("zoom");

            _this.view_map.constraints.lods=lods;

            var changeIndex=function(newIndex) {
                if(newIndex<_this.historic_features.length)
                {   indexLayer=newIndex;
                    identifyParams.layerIds = [newIndex];
                    legend = new Legend({
                        view: _this.view_map,
                        layerInfos: [{
                            layer: _this.historic_features[newIndex].layer,
                        }],
                    });

                    layers_inicial.forEach(function (layer) {
                        layer.sublayers.forEach(function (sublayer) {
                            if(parseInt(sublayer.id)=== parseInt(newIndex))
                            {sublayer.visible=true;}
                            else
                            {sublayer.visible=false;}
                        });
                    });

                }
                else
                {console.log('index no existe');}

            }

            var zoomToLayer=function(view,layer,definitionExpression) {

                console.log('view-->',view);
                console.log('layer-->',layer);
                var query = new Query();
                query.where = definitionExpression;
                return layer.queryExtent(query)
                    .then(function(response) {
                        view.goTo(response.extent);
                    });

            };

            var cleanVars=function(){
                _this.select_ubigeos=[];
                _this.historic_features.forEach(function (f) {
                    f.nombres=[];
                    f.select_features=[];
                })
                _this.view_map.graphics.removeAll();
                _this.view_map.popup.close();
            }

            var getDefinitionExpresion=function(array_codigos,index){
                var definitionExpression="";
                var num_features=array_codigos.length;
                if (index==0) { definitionExpression="CCDD IN (";}
                else if (index==1) { definitionExpression=" CCDD+CCPP IN (";}

                array_codigos.forEach(function(select_feature) {
                    num_features--;
                    if (num_features>0) definitionExpression= definitionExpression + select_feature+","
                    else definitionExpression= definitionExpression + select_feature+")"
                });
                return definitionExpression;
            }

            var getDefinitionExpresionByCodigos=function(array_codigos){
                var definitionExpression="";
                var num_features=array_codigos.length;
                definitionExpression=" CODIGO IN (";
                array_codigos.forEach(function(select_feature) {
                    num_features--;
                    if (num_features>0) definitionExpression= definitionExpression + select_feature+","
                    else definitionExpression= definitionExpression + select_feature+")"
                });
                return definitionExpression;
            }

            var createPopup=function(title,codigo,event){

                popup=_this.view_map.popup.open({
                        title:title,
                        location:event.mapPoint,
                        content:createContentPopup(codigo,cod_map),

                    }
                );
                _this.view_map.popup.dockOptions= {
                    buttonEnabled: false,
                };
                _this.view_map.popup.dockEnabled=false;
                _this.view_map.popup.visible=!(_this.maximizado);
            }

            var updatePanel = function(ubigeo,cod_map,div) {

                if(_this.maximizado){
                    _this.panelDiv.style.display="inline";
                }
                else {
                    _this.panelDiv.style.display="none";
                }


                if (cod_map == 'P01') {
                    service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
                }

                else if (cod_map == 'P01') {
                    service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
                }


            }

            _this.panelDiv = document.getElementById("panel");
            _this.panelDiv.style.display="none";
            _this.view_map.ui.add(_this.panelDiv, {position: "top-right"});

            var selectedFeature=function(graphic,event){
                select_all.style.display="block";
                if (graphic){
                    var codigo=graphic.attributes.CODIGO;
                    var nombre='';
                    if(indexLayer==0){nombre=graphic.attributes.NOMBDEP;}
                    else if(indexLayer==1){nombre=graphic.attributes.NOMBPROV;}
                    else if(indexLayer==2){nombre=graphic.attributes.NOMBDIST;}
                    var index_graphic=_this.select_ubigeos.indexOf(codigo);

                    if (index_graphic==-1 || _this.select_ubigeos.length==0) {

                        createPopup(nombre,codigo,event);
                        updatePanel(codigo,cod_map,_this.panelDiv);
                        _this.select_ubigeos.push(codigo);
                        _this.historic_features[indexLayer].nombres.push(nombre);
                    }
                    else{
                        _this.view_map.popup.close();
                        _this.select_ubigeos.splice(index_graphic, 1);
                        _this.historic_features[indexLayer].nombres.splice(index_graphic, 1);
                    }

                    definitionExpression_gloabal=getDefinitionExpresionByCodigos(_this.select_ubigeos);
                    _this.historic_features[indexLayer].where=definitionExpression_gloabal;
                    _this.historic_features[indexLayer].select_features=_this.select_ubigeos;
                    layer.findSublayerById(parseInt(indexLayer)).definitionExpression=definitionExpression_gloabal;

                    /***aqui se debe llamar a ola funcion q renderiza la tabla****/

                    var codigos_anteriores=[];
                    if (indexLayer==0) { codigos_anteriores=['00']}
                    else { codigos_anteriores=_this.historic_features[indexLayer-1].select_features}
                    console.log('codigos_anteriores-->',codigos_anteriores);
                    App.mapasChangeEvent(_this.select_ubigeos,codigos_anteriores);


                }
            };

            var selectedMap=function(indexMap) {
                select_all.style.display="block";
                var index=list_maps[indexMap].indexLayer;
                changeLayer(index);
                definitionExpression_gloabal=list_maps[indexMap].where;
                updateMap(definitionExpression_gloabal,index);

            }

            var changeLayer=function(index){
                cleanVars();
                changeIndex(index);
                definitionExpression_gloabal="1=1";
            }

            var openFeature=function(){
                if(indexLayer>=0 && indexLayer<=1 )
                {
                    definitionExpression_gloabal=getDefinitionExpresion(_this.select_ubigeos,indexLayer);
                    if (indexLayer==0) { definitionExpressiondep=definitionExpression_gloabal;  }
                    if (indexLayer==1) { definitionExpressionprov=definitionExpression_gloabal; }
                    setLabelWidgetUbigeos(indexLayer);
                    changeIndex(indexLayer+1);
                    updateMap(definitionExpression_gloabal,indexLayer);
                    _this.select_ubigeos=[];
                }
                _this.view_map.popup.close();
                select_all.style.display="none";
            }

            var selectFeaturesByQuery = function (query,index) {
                var queryCitiesTask = new QueryTask({
                    url: _this.historic_features[index].url
                });

                var query = new Query({
                    where: query,
                    outFields: ["CODIGO"],
                });

                queryCitiesTask.execute(query).then(function(result){
                    var features=result.features;
                    features.forEach( function (feature) {
                        _this.select_ubigeos.push(feature.attributes.CODIGO);
                    });

                    parent.cuadros.crearTablaUigeos(_this.select_ubigeos);
                });
            }

            var selectAllFeatures=function(checked){
                _this.select_ubigeos=[];
                if (checked) {
                    var where="1=1";
                    if (indexLayer==0){
                        where="1=1";
                        _this.historic_features[0].select_features=[];
                        _this.historic_features[1].select_features=[];
                        _this.historic_features[2].select_features=[];
                    }
                    else if(indexLayer==1){

                        where=getDefinitionExpresion(_this.historic_features[0].select_features,0);
                        _this.historic_features[1].select_features=[];
                        _this.historic_features[2].select_features=[];

                    }

                    else if (indexLayer==2){
                        where=getDefinitionExpresion(_this.historic_features[1].select_features,1);
                        _this.historic_features[2].select_features=[];
                    }


                    layer.findSublayerById(parseInt(indexLayer)).definitionExpression=where;
                    selectFeaturesByQuery(where,indexLayer);

                }
                else {
                    layer.findSublayerById(parseInt(indexLayer)).definitionExpression="1<>1";
                }
            }

            var updateMap = function(definitionExpression,index) {
                layers_inicial.forEach(function (layer) {
                    layer.sublayers.forEach(function (sublayer) {
                        if(parseInt(sublayer.id)=== parseInt(index))
                        {sublayer.visible=true;}
                        else
                        {sublayer.visible=false;}
                    });
                });
                layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression;
                layer_back.findSublayerById(parseInt(index)).definitionExpression=definitionExpression;

                zoomToLayer(_this.view_map,_this.historic_features[parseInt(index)].layer,definitionExpression);

            }

            var setLabelWidgetUbigeos = function(index) {

                var nombres=_this.historic_features[index].nombres;

                if(index==0) {
                    document.getElementById('widget-departamentos').style.display = "block";
                    document.getElementById('widget-provincias').style.display = "none";
                }

                else if (index==1){
                    document.getElementById('widget-provincias').style.display = "block";
                }


                if(nombres.length==1)
                {
                    if (index==0)
                    {document.getElementById("widget-departamentos").innerHTML=nombres[0]}
                    else if (index==1)
                    {document.getElementById("widget-provincias").innerHTML=nombres[0]}
                }

                else if (nombres.length>1)
                {
                    if (index==0)
                    {document.getElementById("widget-departamentos").innerHTML='MULTIPLES <BR> DEPARTAMENTOS'}
                    else if (index==1)
                    {document.getElementById("widget-provincias").innerHTML='MULTIPLES <BR> PROVINCIAS'}
                }


            }

            var selectWidget = function(index){
                changeIndex(index);
                _this.select_ubigeos=_this.historic_features[index].select_features;
                definitionExpression_gloabal=getDefinitionExpresionByCodigos(_this.select_ubigeos);

                if (index==0) {
                    definitionExpression_back="1=1";
                }
                else {
                    var index_old=parseInt(index)-1;
                    definitionExpression_back=getDefinitionExpresion(_this.historic_features[index_old].select_features,index_old);
                }

                layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_gloabal;
                layer_back.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_back;
                zoomToLayer(_this.view_map,_this.historic_features[parseInt(index)].layer,definitionExpression_back);
            }

            var eventHandler=function (event){
                identifyParams.geometry = event.mapPoint;
                identifyParams.mapExtent = _this.view_map.extent;
                identifyTask.execute(identifyParams).then( function (response) {
                    var results=response.results;
                    return arrayUtils.map(results, function(result) {
                        var feature=result.feature;
                        var layerName=result.layerName;
                        selectedFeature(feature,event);
                    });
                });
            }

            var widget_prov=document.getElementById('widget-provincias');

            var widget_dep=document.getElementById('widget-departamentos');

            var widget_nacional=document.getElementById('widget-nacional');

            var custom_widgets=function(indexLayer){

                _this.historic_features.forEach(function (f,index) {
                    if(indexLayer<=index){
                        f.nombres=[];
                        f.select_features=[];
                    }
                });

                _this.view_map.graphics.removeAll();
                _this.view_map.popup.close();

                if (indexLayer==1){
                    widget_prov.style.display = "none";
                }

                else if(indexLayer==0){
                    widget_prov.style.display = "none";
                    widget_dep.style.display = "none";
                }
                select_all.style.display="none";
            }

            widget_nacional.addEventListener("click", function(){
                changeLayer(0);
                custom_widgets(0);
                zoomToLayer(_this.view_map,_this.historic_features[0].layer,"1=1");
            });

            widget_dep.addEventListener("click", function(){
                custom_widgets(1);
                selectWidget(0);
            });

            widget_prov.addEventListener("click", function(){
                selectWidget(1);
            });

            document.getElementById("select-layer").addEventListener("change", function(){
                var index = parseInt(this.value);
                changeLayer(index);
            });

            document.getElementById("select-all").addEventListener("click", function(){
                var checked=document.getElementById("select-all").checked;
                selectAllFeatures(checked);
            });

            searchWidget.on("select-result", function(event){
                var feature=event.result.feature;
                var index= event.sourceIndex;
                cleanVars();

                if(index==1){

                    _this.historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                    _this.historic_features[0].select_features.push(feature.attributes.CCDD);
                }

                if(index==2){
                    _this.historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                    _this.historic_features[0].select_features.push(feature.attributes.CCDD);
                    _this.historic_features[1].nombres.push(feature.attributes.NOMBPROV);
                    _this.historic_features[1].select_features.push(feature.attributes.CCDD+feature.attributes.CCPP);
                }


                if (index<2){
                    changeIndex(index);
                    console.log(feature.attributes);
                    selectedFeature(feature,event);
                    for (var i=0;i<index;i++)
                    {setLabelWidgetUbigeos(index);}
                    openFeature();
                }

            });

            _this.view_map.on("click", eventHandler);

            _this.view_map.on('double-click',function (event) {
                openFeature();
            });

            _this.view_map.popup.on("trigger-action", function(event) {
                openFeature();
            });

            _this.view_map.when(function () {
                var xsearch=$("[class='esri-search__sources-button esri-widget-button']")
                xsearch.css('display','none');

                var print = new Print({
                    view: _this.view_map,
                    printServiceUrl: config.utils.print
                });

            });

            changeLayer(0);
            custom_widgets(0);
        });

    }

    var cambiarMapa = function(cod_map,cod_tematico,url){
        service.mapas.getLegenda(cod_map,cod_tematico, url,function (data,cod_map,cod_tematico,url)
            {
               crearMapa(data,cod_map,cod_tematico,url);
            });
    }

    var requireEvents = function () {
        cambiarMapa(cod_map,cod_tematico);
    };

    var categoriaChangeEvent = function (options) {
        var cod_mapa=options.categoria;
        service.mapas.getMapa(cod_mapa,function (data) {
            var cod_tematico=data.cod_tematico_default;
            var url= data.url;
            cambiarMapa(cod_mapa,cod_tematico,url);
        });

    }


    return {
        requireEvents: requireEvents,
        historic_features: historic_features,
        select_ubigeos: select_ubigeos,
        uiMaxCallback : uiMaxCallback,
        uiNormalCallback : uiNormalCallback,
        maximizado : maximizado,
        view_map: view_map,
        panelDiv: panelDiv,
        categoriaChangeEvent: categoriaChangeEvent,
        crearMapa :crearMapa,
        cambiarMapa:cambiarMapa,
        listMapas : listMapas
    }



})(App.utils, AppConfig() ,App.service );