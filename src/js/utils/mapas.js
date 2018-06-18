

App.utils.mapas = (function (parent, config,service) {
    var indexLayer=0;
    var select_all=document.getElementById("widget-select-all");
    var url_dep;
    var url_prov;
    var url_dist;
    var url_map= undefined;
    var cod_tematico=undefined;
    var select_features_tablas_graficos;

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
    var view= undefined;
    var select_features=[];
    var definitionExpression_gloabal="1=1";
    var opacity=0.8;
    var historic_features=undefined;
    var list_maps=undefined;
    var color_2="#caebcc";
    var color_3="#97dabb";
    var color_4="#54b6a7";
    var color_5="#3E857A";

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

    var cod_map='POB';
    var url_map=config.map_config[cod_map].urlMap;
    var cod_tematico=config.map_config[cod_map].cod_tematico_default;

    var sources=undefined;

    var searchWidget=undefined;

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

    var getMaps = function(){
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
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                width: 300
            },
            title: {
                text: 'Total<br>Personas<br>2017',
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            tooltip: {
                pointFormat:
                    'Cant Total: <b>{point.y:.1f}</b> '
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -30,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '65%']
                }
            },
            series: [{
                type: 'pie',
                name: 'porcentaje',
                innerSize: '50%',
                data: [
                    ['Hombres', t_edad_h],
                    ['Mujeres', t_edad_m]
                ]
            }]
        });

    }

    var createContentPopup= function (ubigeo,cod_map) {
        var content = document.createElement("div");
        var bloque1 = document.createElement("div");
        var bloque2 = document.createElement("div");
        var bloque3 = document.createElement("div");

        ////////se declaran ids a los bloques
        bloque1.setAttribute("id","resumen");
        bloque2.setAttribute("id","grafico");
        bloque3.setAttribute("id","tabla");

        ////////se agrega los bloques al content
        content.appendChild(bloque2);
        bloque2.style.width = "200px";

        //////se generan los graficos
        if (cod_map=='POB')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}

        else if (cod_map=='EDU')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}

        return content;
    }

    var crearMapa = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,data) {

        classBreakinfos= data;
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

            }]
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

        view = new MapView({
            container: "viewDiv",
            map: map,
            center: [-75.000, -9.500],
            zoom : zoomGlobal(),

        });
        //view.scale = 24000;
        identifyTask = new IdentifyTask(url_map);
        identifyParams = new IdentifyParameters();
        identifyParams.tolerance = 3;
        identifyParams.returnGeometry = true;
        identifyParams.layerIds = [0];
        identifyParams.layerOption = "top";
        identifyParams.width = view.width;
        identifyParams.height = view.height;
        historic_features=[
            {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[],url:url_dep},
            {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[],url:url_prov},
            {'select_features':[],'where':'','layer':distritoLyr,'nombres':[],url:url_dist},
        ];
        sources=[
            {
                featureLayer: historic_features[0].layer,
                searchFields: ["NOMBDEP"],
                displayField: "LITERAL",
                outFields:['*'],
            },

            {
                featureLayer: historic_features[1].layer,
                searchFields: ["NOMBDEP","NOMBPROV"],
                displayField: "LITERAL",
                outFields:['*'],
            },
            {
                featureLayer: historic_features[2].layer,
                searchFields: ["NOMBDEP","NOMBPROV","NOMBDIST"],
                displayField: "LITERAL",
                outFields:['*'],
            }
        ];
        list_maps.forEach(function (map,index) {
            var newImg = document.createElement("img");
            newImg.setAttribute("src",'/img/'+map.imagen);
            newImg.classList.add("overviewDiv");
            newImg.setAttribute("id","map_"+index);
            document.getElementById("list-maps").appendChild(newImg);
            newImg.addEventListener("click",function (event) {
                selectedMap(index);
            });
        });
        legend = new Legend({
            view: view,
            layerInfos: [{
                layer: layer,
                title:'POBLACION',
            }],

        });
        searchWidget = new Search({
            view: view,
            sources:sources,
            activeSourceIndex:0,
            popupOpenOnSelect :false,

            //activeSource:false
        });


        view.ui.add(legend, "bottom-left");
        view.ui.add(searchWidget, {
            position: "top-left",
            index: 2,
        });
        view.ui.add("list-widgets", "top-left");
        view.ui.add("list-maps", "bottom-right");
        view.ui.add("widget-select-layer", "top-right");
        view.ui.remove("zoom");
        view.constraints.lods=lods;


        var changeIndex=function(newIndex) {
            if(newIndex<historic_features.length)
            {   indexLayer=newIndex;
                identifyParams.layerIds = [newIndex];
                legend = new Legend({
                    view: view,
                    layerInfos: [{
                        layer: historic_features[newIndex].layer,
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
            var query = new Query();
            query.where = definitionExpression;
            return layer.queryExtent(query)
                .then(function(response) {
                    //

                    view.goTo(response.extent);
                    console.log(view.zoom);

                });

            //
        };

        var cleanVars=function(){
            select_features=[];
            historic_features.forEach(function (f) {
                f.nombres=[];
                f.select_features=[];
            })
            view.graphics.removeAll();
            view.popup.close();
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
            popup=view.popup.open({
                    title:title,
                    location:event.mapPoint,
                    content:createContentPopup(codigo)
                }
            );
        }

        var selectedFeature=function(graphic,event){
            select_all.style.display="block";
            if (graphic){
                var codigo=graphic.attributes.CODIGO;
                var nombre='';
                if(indexLayer==0){nombre=graphic.attributes.NOMBDEP;}
                else if(indexLayer==1){nombre=graphic.attributes.NOMBPROV;}
                else if(indexLayer==2){nombre=graphic.attributes.NOMBDIST;}
                var index_graphic=select_features.indexOf(codigo);

                console.log(index_graphic);


                if (index_graphic==-1 || select_features.length==0) {
                    /*popup=view.popup.open({
                            title:codigo,
                            location:event.mapPoint,
                            content:codigo
                        }
                    );*/

                    createPopup(nombre,codigo,event);

                    select_features.push(codigo);
                    historic_features[indexLayer].nombres.push(nombre);

                }
                else{
                    view.popup.close();
                    select_features.splice(index_graphic, 1);
                    historic_features[indexLayer].nombres.splice(index_graphic, 1);
                }

                definitionExpression_gloabal=getDefinitionExpresionByCodigos(select_features);
                historic_features[indexLayer].where=definitionExpression_gloabal;
                historic_features[indexLayer].select_features=select_features;
                layer.findSublayerById(parseInt(indexLayer)).definitionExpression=definitionExpression_gloabal;

                /***aqui se debe llamar a ola funcion q renderiza la tabla****/

                parent.cuadros.crearTablaUigeos(select_features);
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
                definitionExpression_gloabal=getDefinitionExpresion(select_features,indexLayer);
                if (indexLayer==0) { definitionExpressiondep=definitionExpression_gloabal;  }
                if (indexLayer==1) { definitionExpressionprov=definitionExpression_gloabal; }
                setLabelWidgetUbigeos(indexLayer);
                changeIndex(indexLayer+1);
                updateMap(definitionExpression_gloabal,indexLayer);
                select_features=[];
            }
            view.popup.close();
            select_all.style.display="none";
        }


        var selectFeaturesByQuery = function (query,index) {
            var queryCitiesTask = new QueryTask({
                url: historic_features[index].url
            });
            var query = new Query({
                where: query,
                outFields: ["CODIGO"],
            });

            queryCitiesTask.execute(query).then(function(result){
                var features=result.features;
                features.forEach( function (feature) {
                    select_features.push(feature.attributes.CODIGO);
                });

                console.log('select_features-->',select_features);

                parent.cuadros.crearTablaUigeos(select_features);
            });
        }


        var selectAllFeatures=function(checked){
            select_features=[];
            if (checked) {
                var where="1=1";
                if (indexLayer==0){
                    where="1=1";
                    historic_features[0].select_features=[];
                    historic_features[1].select_features=[];
                    historic_features[2].select_features=[];
                }
                else if(indexLayer==1){

                    where=getDefinitionExpresion(historic_features[0].select_features,0);
                    historic_features[1].select_features=[];
                    historic_features[2].select_features=[];

                }

                else if (indexLayer==2){
                    where=getDefinitionExpresion(historic_features[1].select_features,1);
                    historic_features[2].select_features=[];
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
            console.log(definitionExpression);
            zoomToLayer(view,historic_features[parseInt(index)].layer,definitionExpression);
        }

        var setLabelWidgetUbigeos = function(index) {

            var nombres=historic_features[index].nombres;

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
            select_features=historic_features[index].select_features;
            definitionExpression_gloabal=getDefinitionExpresionByCodigos(select_features);

            if (index==0) {
                definitionExpression_back="1=1";
            }
            else {
                var index_old=parseInt(index)-1;
                definitionExpression_back=getDefinitionExpresion(historic_features[index_old].select_features,index_old);
            }

            layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_gloabal;
            layer_back.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_back;
            zoomToLayer(view,historic_features[parseInt(index)].layer,definitionExpression_back);
        }

        var eventHandler=function (event){
            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = view.extent;
            identifyTask.execute(identifyParams).then( function (response) {
                var results=response.results;
                return arrayUtils.map(results, function(result) {
                    var feature=result.feature;
                    var layerName=result.layerName;
                    selectedFeature(feature,event);
                });
            });
        }


        document.getElementById('widget-departamentos').style.display = "none";

        document.getElementById('widget-provincias').style.display = "none";

        select_all.style.display="none";

        document.getElementById('widget-nacional').addEventListener("click", function(){
            changeLayer(0);
        });

        document.getElementById("widget-departamentos").addEventListener("click", function(){
            document.getElementById('widget-provincias').style.display = "none";
            selectWidget(0);
        });

        document.getElementById("widget-provincias").addEventListener("click", function(){
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

                historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                historic_features[0].select_features.push(feature.attributes.CCDD);
            }

            if(index==2){
                historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                historic_features[0].select_features.push(feature.attributes.CCDD);
                historic_features[1].nombres.push(feature.attributes.NOMBPROV);
                historic_features[1].select_features.push(feature.attributes.CCDD+feature.attributes.CCPP);
            }


            if (index<2){
                changeIndex(index);
                console.log(feature.attributes);
                selectedFeature(feature,event);
                for (var i=0;i<index;i++)
                {setLabelWidgetUbigeos(index);}
                openFeature();
            }

            console.log('features select-->',select_features);

        });

        view.on("click", eventHandler);

        view.on('double-click',function (event) {
            openFeature();
        });

        view.popup.on("trigger-action", function(event) {
            openFeature();
        });




        view.when(function () {
            var xsearch=$("[class='esri-search__sources-button esri-widget-button']")
            xsearch.css('display','none');

            var print = new Print({
                view: view,
                printServiceUrl: config.utils.print
            });
            //view.ui.add(print, "top-right");

        });

        changeLayer(0);
    }

    var  cambiarMapa = function(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,cod_map,cod_tematico){

        service.mapas.getLegenda(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,cod_map,cod_tematico,
            function (
            Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,data)

        {
            crearMapa(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,data);
        });
    }

    var requireEvents = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask) {
        list_maps=getMaps();
        cambiarMapa(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,cod_map,cod_tematico);


    };

    return {
        requireEvents: requireEvents,
    }


})(App.utils, AppConfig() ,App.service );