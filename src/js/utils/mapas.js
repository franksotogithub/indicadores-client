

App.utils.mapas = (function (parent, config,service) {
    var listMapas = undefined;

    var indexSubLayer=0;

    var select_all=document.getElementById("widget-select-all");

    var url_dep;

    var url_prov;

    var url_dist;

    var urlMap= undefined;

    var codTematico=undefined;

    var codMap= undefined;

    var classBreakinfos=undefined;


    var tituloLegend=undefined;

    /*var datosMap={
        urlMap:undefined,
        codTematico:undefined,
        codMap:undefined,
        classBreakinfos:undefined,
        tituloLegend:undefined,
        optionsSublayers:undefined,
        renderOptionsSublayers:undefined,
        renderOptionsSublayersBack:undefined,
    };*/

    var datosMap = new Object();

    var select_features_tablas_graficos;

    var layerList = undefined;

    var opc_select = undefined;  //select --> layer seleccionanado / unselect --> layer deseleccionado

    var labels_expression=undefined;

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

    var cantMiniMaps=1;

    var cantMaxMiniMaps=50;

    var labelClass=undefined;

    var sources=undefined;

    var searchWidget=undefined;

    var panelDiv=undefined;

    var panelDivGrafico =undefined;


    var symbolSombreado= {
        type: "simple-fill",
        color: [ 255, 128, 0, 0.1],
        outline: {
            width: 2,
            color: "cyan"
        }
    }

    var renderizadoClassBreaks = function(indicador,classBreakinfo){
        var renderer = {
            type: "class-breaks",
            field: indicador,
            defaultSymbol: {
                type: "simple-fill",
                color: "white",
                outline: {
                    width: 1,
                    //color: "white"
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
    }

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
        console.log('crear div grafico-->',div)
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
                enabled:false
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
                animation: false,
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

        console.log('bloque2-->',bloque2);
        console.log('cod_map-->',cod_map);
        content.appendChild(bloque2);
        if (cod_map=='P01')
        {   console.log('aqui');
            service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);

        }

        else if (cod_map=='P02')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}
        return content;
    }

    var visibilityAllChildDiv=function(div,visibility){
          if (div.hasChildNodes()) {
            var children = div.childNodes;

            for(var c=0; c < children.length; c++) {
                if(children[c].style) {
                    children[c].style.visibility = visibility;
                }
            }
        }
        div.style.visibility = visibility;
    }

    var getDefinitionExpresion=function(array_codigos,index){
        var definitionExpression="";
        var num_features=array_codigos.length;
        if (index==0) { definitionExpression="CCDD IN (";}
        else if (index==1) { definitionExpression=" CCDD+CCPP IN (";}
        else if (index==2) {definitionExpression=" CCDD+CCPP+CCDI IN (";}

        array_codigos.forEach(function(select_feature) {
            num_features--;
            if (num_features>0) definitionExpression= definitionExpression + select_feature+","
            else definitionExpression= definitionExpression + select_feature+")"
        });
        return definitionExpression;
    }

    var crearMinimapa= function(index,where,div){

        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",

            "dojo/domReady!"],function (Map, MapView, MapImageLayer,FeatureLayer) {
            var _this = parent.mapas;
            var classBreakinfos = _this.datosMap.classBreakinfos;
            var codMap = _this.datosMap.codMap;
            var codTematico = _this.datosMap.codTematico;
            var urlMap = _this.datosMap.urlMap;
            var miniSublayer = new FeatureLayer({
                url: urlMap + '/' + index,
                definitionExpression: where,
            });


            var miniLayer = new MapImageLayer({
                url: urlMap,
                sublayers: [{
                    renderer: renderizadoClassBreaks(codTematico, classBreakinfos[index + ""]),
                    opacity: opacity,
                    id: parseInt(index),
                    outFields: ["*"],
                    definitionExpression: where,
                    labelsVisible: true,
                }],


            });

            var miniMap = new Map({
                layers: miniLayer,
            });

            var miniView = new MapView({
                container: div,
                map: miniMap,
                center: [-75.000, -9.500],
            });

            miniView.ui.components = [];

            miniView.when(function () {
                miniLayer.when(function () {
                    miniSublayer.queryExtent()
                        .then(function (response) {

                            miniView.goTo(response.extent);
                        });
                });
            })
        });
    }


    var insertarNuevoMiniMapa = function (ubigeo) {
        var _this=parent.mapas;
        var index=_this.indexSubLayer
        if(index<2){
            var stringIndex=String(index+1);
        }
        else {
            var stringIndex=String(index);
        }
        var where=getDefinitionExpresion([ubigeo],index);

        if(_this.cant_mini_maps<=cantMaxMiniMaps)
        {
            var idMiniMap="divMiniMap_"+ubigeo;
            var divMiniMap = document.createElement("div");
            var list_mini_maps=document.getElementById("listMiniMaps");
            divMiniMap.classList.add("miniMap");
            divMiniMap.setAttribute("id",idMiniMap);
            divMiniMap.style.visibility = "visible";
            list_mini_maps.appendChild(divMiniMap);
            crearMinimapa(stringIndex,where,idMiniMap);
            _this.cant_mini_maps++;
        }
    }


    var removerMiniMapa = function (ubigeo){
        var _this=parent.mapas;
        var idMiniMap="divMiniMap_"+ubigeo;
        var divMiniMap =document.getElementById(idMiniMap);
        divMiniMap.remove();
        _this.cant_mini_maps--;


    }

    var removerTodosMiniMaps=function(){
        var _this=parent.mapas;
        console.log('indexLayer-->',_this.indexSubLayer);
        _this.select_ubigeos.forEach(function (ubigeo) {
            removerMiniMapa(ubigeo);
        });
    }

    var mostrarTodosMiniMaps=function(){
        var _this=parent.mapas;
        _this.select_ubigeos.forEach(function (ubigeo) {
            var elem=document.getElementById("divMiniMap_" +ubigeo);
            insertarNuevoMiniMapa(ubigeo);

        });
    }

    var uiMaxCallback =function () {
        var _this=parent.mapas;
        var list_mini_maps=document.getElementById("listMiniMaps");
        _this.maximizado=true;
        visibilityAllChildDiv(_this.panelDiv,'visible');
        mostrarTodosMiniMaps();
        _this.view_map.popup.close();
        _this.view_map.ui.move("widget-select-layer","top-left");
    }

    var uiNormalCallback = function(){
        var _this=parent.mapas;
        _this.maximizado=false;
        removerTodosMiniMaps();
        visibilityAllChildDiv(_this.panelDiv,'hidden');
        _this.cant_mini_maps=1;
        if(_this.opc_select=="select") _this.view_map.popup.visible=true;
        _this.view_map.ui.move("widget-select-layer","top-right");
    }

    var descargarMapaEvent = function(callback){
        require([

            "esri/tasks/PrintTask",
            "esri/tasks/support/PrintTemplate",
            "esri/tasks/support/PrintParameters",

            "dojo/domReady!"
        ],function (PrintTask,PrintTemplate,PrintParameters){
            var _this=parent.mapas;
            var printTask = new PrintTask({
                url: config.utils.print,
            });

            var template = new PrintTemplate({
                format: "pdf",
                exportOptions: {
                    dpi: 300
                },
                layout: "a4-portrait",
                layoutOptions: {
                    titleText: "Warren Wilson College Trees",
                    authorText: "Sam"
                }
            });

            var params = new PrintParameters({
                view: _this.view_map,
                template: template
            });

            var resp={};

            printTask.execute(params).then(function(resolvedVal){
                var url_pdf=resolvedVal.url;
                resp['success']=true;
                resp['url']=url_pdf;
                return callback(resp);
            },
            function(error){
                resp['success']=false;
                resp['error']=error;
                return callback(resp);

            });

        });

    };
    /*
    var uiMouseOverTabla = function (options){
        var ubigeo=options.ubigeo;

        if(ubigeo!='' || ubigeo!='00'){

            require(["esri/layers/FeatureLayer","esri/Graphic","esri/tasks/support/Query","esri/tasks/QueryTask","dojo/domReady!"],function (FeatureLayer,Graphic,Query,QueryTask) {
                var _this=parent.mapas;
                var queryText='CODIGO='+ubigeo;
                var queryTask = new QueryTask({
                    url: _this.historic_features[_this.indexSubLayer].url
                });
                var query = new Query({
                    where: queryText,
                    outFields: ["CODIGO"],
                    returnGeometry : true,
                });
                _this.view_map.graphics.removeAll();
                queryTask.execute(query).then(function(result){
                    var features=result.features;


                    features.forEach( function (feature) {

                        console.log('feature seleccionado-->',feature);
                        var graphic= new Graphic({
                                geometry : feature.geometry,
                                symbol: symbolSombreado,
                                //attributes:feature.attributes,
                            }
                        );

                        _this.view_map.graphics.add(graphic);


                    });


                });



            });
        }

    }*/

    var uiMouseOutTabla = function () {
        _this.view_map.graphics.removeAll();
    }



    var getListSublayerTematico = function () {
        var _this=parent.mapas;
        var renderOptionSublayer = undefined;
        var codTematico = _this.datosMap.codTematico;
        //_this.datosMap.renderOptionsSublayers=[];
        var res=[];
        var outlineOptions = {width:1};

        _this.datosMap.optionsSublayers.forEach(function (sublayer) {
            renderOptionSublayer= new Object(),
            renderOptionSublayer.id=parseInt(sublayer.id);
            renderOptionSublayer.title=sublayer.titleLayer;
            renderOptionSublayer.visible=sublayer.visible;
            renderOptionSublayer.labelsVisible=sublayer.labelsVisible;
            renderOptionSublayer.outFields=['*'];
            renderOptionSublayer.renderer=renderizadoClassBreaks(codTematico,parent.getClassBreakInfoSublayerTematico(sublayer.renderer,outlineOptions));
            res.push(renderOptionSublayer);
        });

        var limDep= _this.datosMap.optionsSublayers[0];
        renderOptionSublayer= new Object();
        renderOptionSublayer.id=limDep.id;
        renderOptionSublayer.labelsVisible=true;
        renderOptionSublayer.visible=false;
        renderOptionSublayer.renderer=  parent.renderLines();
        res.push(renderOptionSublayer);



        return res;
    }


    var getListSublayerTematicoBack = function () {
        var _this=parent.mapas;
        var renderOptionSublayer = undefined;
        var renderOptionsSublayersBack=[]
        //_this.datosMap.renderOptionsSublayersBack=[];

        _this.datosMap.optionsSublayers.forEach(function (sublayer) {
            renderOptionSublayer= new Object(),
            renderOptionSublayer.id=parseInt(sublayer.id);
            renderOptionSublayer.visible=sublayer.visible;
            renderOptionSublayer.labelsVisible=sublayer.labelsVisible;
            renderOptionSublayer.outFields=['*'];
            renderOptionSublayer.renderer=renderBack();
            renderOptionsSublayersBack.push(renderOptionSublayer);
        });



        return renderOptionsSublayersBack;
    }


    var crearLegenda=function(data){
        var html=
            '<div class="esri-legend__service">'+
            '<div class="esri-legend__service-label">'+data.title+'</div>'+
            '<div class="esri-legend__layer">'+
            '<div class="esri-legend__layer-table esri-legend__layer-table--size-ramp">' +
            '<div class="esri-legend__layer-caption" >'+data.titleLayer+'</div>'+
            '<div class="esri-legend__layer-body" >' ;

        data.renderer.forEach(function (el,index) {
            html+='<div class="esri-legend__layer-row" style="height:20px; width: 180px" >';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--symbols" style="height:20px;">';
            html+='<div style="opacity: 1; background-color:'+el.color+';  width:20px;height:20px "></div>';
            html+='</div>';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px;">'+el.label+'</div>';

            html+='</div>';
        });

        html+=
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';
        return html;

    }



    var crearMapaRender = function (optionsSublayers) {
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
            "esri/tasks/PrintTask",
            "esri/tasks/support/PrintTemplate",
            "esri/tasks/support/PrintParameters",
            "esri/layers/support/LabelClass",
            "dojo/domReady!"
        ],function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask,
                    IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,PrintTask,PrintTemplate,PrintParameters,LabelClass)
        {

            var _this=parent.mapas;
            var list_mini_maps=document.getElementById("listMiniMaps");


            _this.panelDivGrafico= document.getElementById("mapaGraficoPanel");

            list_maps=getAccesDirectMaps();
            //_this.datosMap.classBreakinfos=optionsSublayers;
            /////////////*
            //
            // datos
            //** /////////////
            _this.datosMap.optionsSublayers=optionsSublayers;
            _this.datosMap.renderOptionsSublayers=getListSublayerTematico();
            _this.datosMap.renderOptionsSublayersBack=getListSublayerTematicoBack();
            codMap=_this.datosMap.codMap;
            codTematico=_this.datosMap.codTematico;
            urlMap=_this.datosMap.urlMap;

            //tituloLegend=_this.datosMap.tituloLegend;

            url_dep=urlMap+'/0';
            url_prov=urlMap+'/1';
            url_dist=urlMap+'/2';

            _this.panelDiv = document.getElementById("panel");
            _this.panelDiv.style.visibility="hidden";


            _this.layer = new MapImageLayer({
                url: urlMap,
                //opacity:0.8,
                outFields:["*"],
                sublayers:  _this.datosMap.renderOptionsSublayers,
                title: _this.datosMap.optionsSublayers[0].title,
            });

            layer_back= new MapImageLayer({
                url: urlMap,
                //opacity:0.8,
                outFields:["*"],
                sublayers: _this.datosMap.renderOptionsSublayersBack,

            });

            layers_inicial = [layer_back,_this.layer];


            departamentoLyr = new FeatureLayer({
                url: url_dep,
                renderer:_this.datosMap.renderOptionsSublayers[0].renderer,
                opacity:opacity,
                id:"dep",
                outFields:["*"],
                title:'DEPARTAMENTOS',
            });

            provinciaLyr = new FeatureLayer({
                url: url_prov,
                renderer:_this.datosMap.renderOptionsSublayers[1].renderer,
                opacity:opacity,
                outFields:["*"],
                title:'PROVINCIAS',
            });

            distritoLyr = new FeatureLayer({
                url: url_dist,
                renderer:_this.datosMap.renderOptionsSublayers[2].renderer,
                opacity:opacity,
                outFields:["*"],
                title:'DISTRITOS',

            });

            map = new Map({
                basemap: "osm",
                layers: layers_inicial,
            });

            _this.view_map = new MapView({
                container: _this.datosMap.div,
                map: map,
                center: [-75.000, -9.500],
                zoom : zoomGlobal(),

            });

            identifyTask = new IdentifyTask(urlMap);
            identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [0];
            identifyParams.layerOption = "top";
            identifyParams.width = _this.view_map.width;
            identifyParams.height = _this.view_map.height;
            _this.historic_features=[
                {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[],url:url_dep ,label:'$feature.NOMBDEP'},
                {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[],url:url_prov,label:'$feature.NOMBPROV'},
                {'select_features':[],'where':'','layer':distritoLyr,'nombres':[],url:url_dist,label:'$feature.NOMBDIST'},
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
            /*
            _this.legend = new Legend({
                view: _this.view_map,
                layerInfos: [{
                    layer: _this.layer,
                    title:tituloLegend,
                }],
            });*/


            searchWidget = new Search({
                view: _this.view_map,
                sources:sources,
                activeSourceIndex:0,
                popupOpenOnSelect :false,

                //activeSource:false
            });

            _this.view_map.ui.add( _this.datosMap.divLegend, "bottom-left");

            _this.view_map.ui.add(searchWidget, {
                position: "top-left",
                index: 2,
            });
            _this.view_map.ui.add("list-widgets", "top-left");
            _this.view_map.ui.add("list-maps", "bottom-right");
            _this.view_map.ui.add("widget-select-layer", "top-right");
            _this.view_map.ui.remove("zoom");
            _this.view_map.constraints.lods=lods;


            /**
             * Muestra la capa del mapa con  indice=index
             * **/
            var changeIndex=function(newIndex) {
                var i = parseInt(newIndex);
                if(newIndex<_this.historic_features.length)
                {
                    var htmlLengenda=crearLegenda(_this.datosMap.optionsSublayers[i]);
                    _this.indexSubLayer=i;
                    console.log('index>>>',i);
                    identifyParams.layerIds = i;
                    _this.datosMap.divLegend.innerHTML=htmlLengenda;



                    //console.log('view>>>>',_this.view_map);

                    layers_inicial.forEach(function (layer) {
                        layer.sublayers.forEach(function (sublayer) {
                            sublayer.visible=false;
                            /*
                            if(parseInt(sublayer.id)=== parseInt(newIndex))
                            {sublayer.visible=true;}
                            else
                            {sublayer.visible=false;}
                            */

                        });

                        layer.sublayers.items[i].visible=true;


                    });
                }
                else
                {
                    console.log('index no existe');
                }

            }

            var zoomToLayer=function(view,layer,definitionExpression) {
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
                        content:createContentPopup(codigo,_this.datosMap.codMap),

                    }
                );
                _this.view_map.popup.dockOptions= {
                    buttonEnabled: false,
                };
                _this.view_map.popup.dockEnabled=false;
                _this.view_map.popup.visible=!(_this.maximizado);
            }

            var updateBloqueGrafico = function (ubigeo,cod_map,div) {
                if(_this.maximizado){
                    div.style.display="inline";
                }
                else {
                    div.style.display="none";
                }

                if (cod_map == 'P01') {
                    service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
                }

                else if (cod_map == 'P01') {
                    service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
                }

            }

            var updatePanel = function(ubigeo,cod_map,div_grafico,index) {
                updateBloqueGrafico(ubigeo,cod_map,div_grafico);

                if(_this.maximizado==true)
                {insertarNuevoMiniMapa(ubigeo,index);}

            }

            _this.view_map.ui.add(_this.panelDiv, {position: "top-right"});

            /**
             * seleccion del feature
             * **/
            var selectedFeature=function(graphic,event){
                select_all.style.display="block";
                if (graphic){
                    var codigo=graphic.attributes.CODIGO;
                    var nombre='';
                    if(_this.indexSubLayer==0){nombre=graphic.attributes.NOMBDEP;}
                    else if(_this.indexSubLayer==1){nombre=graphic.attributes.NOMBPROV;}
                    else if(_this.indexSubLayer==2){nombre=graphic.attributes.NOMBDIST;}
                    var index_graphic=_this.select_ubigeos.indexOf(codigo);

                    if (index_graphic==-1 || _this.select_ubigeos.length==0) {

                        _this.opc_select="select";
                        createPopup(nombre,codigo,event);
                        updatePanel(codigo,_this.cod_map,_this.panelDivGrafico,_this.indexSubLayer);
                        _this.select_ubigeos.push(codigo);
                        _this.historic_features[_this.indexSubLayer].nombres.push(nombre);
                    }
                    else{
                        _this.opc_select="unselect";
                        _this.view_map.popup.close();
                        _this.select_ubigeos.splice(index_graphic, 1);
                        _this.historic_features[_this.indexSubLayer].nombres.splice(index_graphic, 1);

                        if(_this.maximizado==true)
                        {removerMiniMapa(codigo);}

                    }

                    definitionExpression_gloabal=getDefinitionExpresionByCodigos(_this.select_ubigeos);
                    _this.historic_features[_this.indexSubLayer].where=definitionExpression_gloabal;
                    _this.historic_features[_this.indexSubLayer].select_features=_this.select_ubigeos;
                    _this.layer.findSublayerById(parseInt(_this.indexSubLayer)).definitionExpression=definitionExpression_gloabal;

                    /***aqui se debe llamar a ola funcion q renderiza la tabla****/

                    var codigos_anteriores=[];
                    if (_this.indexSubLayer==0) { codigos_anteriores=['00']}
                    else { codigos_anteriores=_this.historic_features[_this.indexSubLayer-1].select_features}

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
                _this.cant_mini_maps=1;
                if(_this.indexSubLayer>=0 && _this.indexSubLayer<=1 )
                {
                    definitionExpression_gloabal=getDefinitionExpresion(_this.select_ubigeos,_this.indexSubLayer);
                    if (_this.indexSubLayer==0) { definitionExpressiondep=definitionExpression_gloabal;  }
                    if (_this.indexSubLayer==1) { definitionExpressionprov=definitionExpression_gloabal; }
                    setLabelWidgetUbigeos(_this.indexSubLayer);
                    changeIndex(_this.indexSubLayer+1);
                    updateMap(definitionExpression_gloabal,_this.indexSubLayer);
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
                    if (_this.indexSubLayer==0){
                        where="1=1";
                        _this.historic_features[0].select_features=[];
                        _this.historic_features[1].select_features=[];
                        _this.historic_features[2].select_features=[];
                    }
                    else if(_this.indexSubLayer==1){

                        where=getDefinitionExpresion(_this.historic_features[0].select_features,0);
                        _this.historic_features[1].select_features=[];
                        _this.historic_features[2].select_features=[];

                    }

                    else if (_this.indexSubLayer==2){
                        where=getDefinitionExpresion(_this.historic_features[1].select_features,1);
                        _this.historic_features[2].select_features=[];
                    }


                    _this.layer.findSublayerById(parseInt(_this.indexSubLayer)).definitionExpression=where;
                    selectFeaturesByQuery(where,_this.indexSubLayer);

                }
                else {
                    _this.layer.findSublayerById(parseInt(_this.indexSubLayer)).definitionExpression="1<>1";
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
                _this.layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression;
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

            /**
             * Retorna pintado en el mapa los departamentos, provincias o distritos deleccionados previamente en el sistema
             * **/
            var selectWidget = function(index){
                var definitionExpression_back;
                var selectHistorico=[];

                if(index>0){
                    var  indexLocal=index-1;
                    changeIndex(indexLocal);
                    _this.select_ubigeos=_this.historic_features[indexLocal].select_features;

                    definitionExpression_gloabal=getDefinitionExpresionByCodigos(_this.select_ubigeos);

                    if (indexLocal<=0) {
                        definitionExpression_back="1=1";
                    }
                    else {
                        var index_old=parseInt(indexLocal)-1;
                        definitionExpression_back=getDefinitionExpresion(_this.historic_features[index_old].select_features,index_old);
                    }

                    _this.layer.findSublayerById(parseInt(indexLocal)).definitionExpression=definitionExpression_gloabal;
                    layer_back.findSublayerById(parseInt(indexLocal)).definitionExpression=definitionExpression_back;
                    zoomToLayer(_this.view_map,_this.historic_features[parseInt(indexLocal)].layer,definitionExpression_back);

                    if( (indexLocal-1) >=0)
                        selectHistorico=_this.historic_features[indexLocal-1];
                    else
                        selectHistorico=['00'];
                    App.mapasChangeEvent(_this.select_ubigeos,selectHistorico);
                }

                else{
                    _this.select_ubigeos=['00'];
                    definitionExpression_gloabal="1=1";
                    definitionExpression_back="1=1";
                    _this.layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_gloabal;
                    layer_back.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_back;
                    zoomToLayer(_this.view_map,_this.historic_features[parseInt(index)].layer,definitionExpression_back);
                    App.mapasChangeEvent(_this.select_ubigeos,['00']);
                }


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

            /**
             * Despliega los widgets correctos segun la navegacion en el mapa (Peru, Departamento,Provincia,Distrito)
             * **/
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

            var widget_prov=document.getElementById('widget-provincias');

            var widget_dep=document.getElementById('widget-departamentos');

            var widget_nacional=document.getElementById('widget-nacional');

            widget_nacional.addEventListener("click", function(){
                changeLayer(0);
                custom_widgets(0);
                selectWidget(0);

            });

            widget_dep.addEventListener("click", function(){
                custom_widgets(1);
                selectWidget(1);

            });

            widget_prov.addEventListener("click", function(){
                selectWidget(2);
            });

            var seleccionarVista = function (index) {
                var i=parseInt(index);
                var renderOptionSublayer= new Object();
                cleanVars();
                changeIndex(index);
                custom_widgets(0);
                _this.layer.findSublayerById(i).definitionExpression="1=1";
                layer_back.findSublayerById(i).definitionExpression="1=1";

                if(i>0){
                    _this.layer.findSublayerById(i).renderer=renderizadoClassBreaks(codTematico,parent.getClassBreakInfoSublayerTematico(_this.datosMap.optionsSublayers[i].renderer));
                    _this.layer.sublayers.items[3].visible=true;
                }

                zoomToLayer(_this.view_map,_this.historic_features[0].layer,"1=1");
            }



            document.getElementById("select-layer").addEventListener("change", function(){
                var index = parseInt(this.value);
                seleccionarVista(index);
            });

            document.getElementById("select-all").addEventListener("click", function(){
                var checked=document.getElementById("select-all").checked;
                selectAllFeatures(checked);
            });


            /**
             * Evento callback de busqueda
             * **/
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

                //console.log(index);
                //console.log(feature);


                changeIndex(index);
                selectedFeature(feature,event);
                for (var i=0;i<index;i++) {setLabelWidgetUbigeos(index);}

                if (index<2){
                    openFeature();
                }

                /*else{
                    changeIndex(index);
                }*/

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
                _this.datosMap.divLegend.innerHTML=crearLegenda(_this.datosMap.optionsSublayers[0]);
            });
            changeLayer(0);
            custom_widgets(0);
        });

    };

    var cambiarMapaRender = function (optionsSublayers) {

        require([
            "esri/widgets/Legend",
            "dojo/domReady!"
        ],function (Legend){
            var _this=parent.mapas;
            //var tituloLegend = _this.datosMap.tituloLegend;
            var htmlLengenda=crearLegenda(optionsSublayers[0]);
            _this.datosMap.optionsSublayers=optionsSublayers;
            _this.datosMap.classBreakinfos=classBreakinfos;
            _this.layer.url=_this.datosMap.urlMap;
            _this.datosMap.renderOptionsSublayers=getListSublayerTematico();
            _this.layer.sublayers=_this.datosMap.renderOptionsSublayers;
            _this.layer.title= _this.datosMap.optionsSublayers[0].title;
            _this.datosMap.divLegend.innerHTML=htmlLengenda;
        });
    };

    var cambiarMapa = function(){
        var _this=parent.mapas;
        service.mapas.getLegenda(_this.datosMap, cambiarMapaRender);
    }

    var crearMapa = function(){
        var _this=parent.mapas;

        service.mapas.getLegenda(_this.datosMap,crearMapaRender);

    }

    var requireEvents = function () {
        cambiarMapa(codMap,codTematico,url,titulo);
    };

    var categoriaChangeEvent = function (options) {
        var cod_mapa=options.categoria;
        service.mapas.getMapa(cod_mapa,function (data) {
            var _this=parent.mapas;
            _this.datosMap.codMap=cod_mapa;
            _this.datosMap.urlMap=data.url;
            _this.datosMap.codTematico=data.cod_tematico_default;
            _this.datosMap.tituloLegend=data.descripcion;
            cambiarMapa();
        });
    }

    var init = function (options) {
        var _this=parent.mapas;
        var list_mapas=[];

        var divLegend=document.getElementById("legendMap");

        if (options.vista == 'indicadores') {
            list_mapas=[{div:'viewDiv',cod_mapa:'P01'}];
        }

        list_mapas.forEach(
            function (el,index) {

                service.mapas.getMapa(el.cod_mapa,function (data) {
                    _this.datosMap.codMap=el.cod_mapa;
                    _this.datosMap.urlMap=data.url;
                    _this.datosMap.codTematico=data.cod_tematico_default;
                    _this.datosMap.tituloLegend=data.descripcion;
                    _this.datosMap.div=el.div;
                    _this.datosMap.divLegend=divLegend;
                    crearMapa();
                });
            }
        );

    }
    return {
        init:init,
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
        listMapas : listMapas,
        cant_mini_maps:cantMiniMaps,
        opc_select:opc_select,
        descargarMapaEvent:descargarMapaEvent,
        panelDivGrafico:panelDivGrafico,
        layer:layer,
        cod_map:codMap,
        datosMap: datosMap,
        legend: legend,
        indexSubLayer :indexSubLayer,
        //uiMouseOverTabla:uiMouseOverTabla,
        uiMouseOutTabla:uiMouseOutTabla
    }

})(App.utils, AppConfig() ,App.service );