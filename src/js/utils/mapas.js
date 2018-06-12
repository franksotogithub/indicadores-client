

App.utils.mapas = (function (parent, config) {
    var indexLayer=0;
    var url_map=config.urlMap.poblacion;
    var url_dep=url_map+'/0';
    var url_prov=url_map+'/1';
    var url_dist=url_map+'/2';
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
            "scale": 591657527
        },

        {   "level": 1,
            "scale": 295828763
        },

        {   "level": 2,
            "scale": 147914381
        },

        {   "level": 3,
            "scale": 73957190
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
            //"scale": 4622324
        },

        {
            "level": 8,
            "scale": 2311162
        },

        {
            "level": 9,
            "scale": 1155581
        },
        {
            "level": 10,
            "scale": 577790
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

    var classBreakinfos=undefined;

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

    var getClassBreakinfos = function () {
        return {"poblacion" :
                    {  "indicador":"P010100",
                         "dep" : [
                        {
                            minValue: 0,
                            maxValue: 109554,
                        },

                        {
                            minValue: 109555,
                            maxValue: 499999,
                            label: "De 109 555 a 499 999 ",
                            symbol: createSymbol(color_2)
                        },
                        {
                            minValue: 500000,
                            maxValue: 999999,
                            label: "De 500 000 a 999 999  ",
                            symbol: createSymbol(color_3)
                        },
                        {
                            minValue: 1000000,
                            maxValue: 4999999,
                            label: "De 1,000,000 a 4,999,999",
                            symbol: createSymbol(color_4)
                        },{
                            minValue: 5000000,
                            maxValue: 8445211,
                            label: "De 5,000,000 a 8,445,211",
                            symbol: createSymbol(color_5)
                        }
            ],
                "prov": [
                        {
                            minValue: 0,
                            maxValue: 0,
                        },

                        {
                            minValue: 0,
                            maxValue: 29999,
                            label: "De 0 a 29999",
                            symbol: createSymbol(color_2)
                        },
                        {
                            minValue: 30000,
                            maxValue: 56999,
                            label: "De 30000 a 56999 ",
                            symbol: createSymbol(color_3)
                        },
                        {
                            minValue: 56999,
                            maxValue: 112999,
                            label: "De 56999 a 112999 ",
                            symbol: createSymbol(color_4)
                        },
                        {
                            minValue: 113000,
                            maxValue: 7605740,
                            label: "De 113000 a 7605740 ",
                            symbol: createSymbol(color_5)
                        },


            ],
                "dist": [
                {
                    minValue: 0,
                    maxValue: 0,
                },

                {
                    minValue: 0,
                    maxValue: 1999,
                    label: "De 0 a 1999",
                    symbol: createSymbol(color_2)
                },

                {
                    minValue: 2000,
                    maxValue: 4199,
                    label: "De 2000 a 4199",
                    symbol: createSymbol(color_3)
                },
                {
                    minValue: 4200,
                    maxValue: 9999,
                    label: "De 4200 a 9999",
                    symbol: createSymbol(color_4)
                },
                {
                    minValue: 9999,
                    maxValue: 898443,
                    label: "De 9999 a 898443",
                    symbol: createSymbol(color_5)
                },



            ],
            },
        };
    }

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
                codigos:[
                '150138',
                '151011',
                '150302',
                '150303',
                ],
                where:"CCDD='07'",
                indexLayer:2,
                imagen:"callao.jpg"},
            {id:2 ,
                codigos:[
                '0101',
                '0102',
            ] ,
                where:"CCDD='15' AND CCPP='01' ",
                indexLayer:2,
                imagen:"lima_metro.jpg"},
            {id:3 , codigos:[
                '01',
                '02',
                '03',
                 ] ,
                where:"CCDD='15' AND CCPP<>'01' ",
                indexLayer:1,
                imagen:"lima_provincias.jpg"},

        ];
    }

    var zoomGlobal = function () {
        /* zomm Global */
        var zoom;
        var tamW = $(window).height();
        if(tamW > 900){zoom=6;}
        else if(tamW <= 899 && tamW >= 715 ){zoom=5;}
        else if(tamW <= 714){zoom=4;}
        console.log(zoom);
        return zoom;
    }

    var requireEvents = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate) {
        list_maps=getMaps();
        classBreakinfos=getClassBreakinfos();
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
                renderer:renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["dep"]),
                /*popupTemplate: {
                    title: " {CODIGO} {NOMBDEP}",
                    content: "{CODIGO} {NOMBDEP}.",
                },*/

            }, {
                id: 1,
                title: "PROVINCIAL",
                visible: false,
                labelsVisible: true,
                outFields:["*"],
                renderer:renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["prov"]),
                /*popupTemplate: {
                    title: " {CODIGO} {NOMBPROV}",
                    content: "{CODIGO} {NOMBPROV}.",
                },
                */


            }, {
                id: 2,
                title: "DISTRITAL",
                outFields:["*"],
                visible: false,
                labelsVisible: true,

                renderer:renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["dist"]),
                /*popupTemplate: {
                    title: " {CODIGO} {NOMBDIST}",
                    content: "{CODIGO} {NOMBDIST}.",
                },*/

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
            renderer: renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["dep"]),
            opacity:opacity,
            id:"dep",
            outFields:["*"],
            title:'DEPARTAMENTOS',
        });
        provinciaLyr = new FeatureLayer({
            url: url_prov,
            renderer: renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["prov"]),
            opacity:opacity,
            outFields:["*"],
            title:'PROVINCIAS',
        });
        distritoLyr = new FeatureLayer({
            url: url_dist,
            renderer: renderizado(classBreakinfos["poblacion"]["indicador"],classBreakinfos["poblacion"]["dist"]),
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
            {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[]},
            {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[]},
            {'select_features':[],'where':'','layer':distritoLyr,'nombres':[]},
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
/*---->fijate aqui*/

        var selectedFeature=function(graphic,event){
            if (graphic){
                var codigo=graphic.attributes.CODIGO;
                var nombre='';
                if(indexLayer==0){nombre=graphic.attributes.NOMBDEP;}
                else if(indexLayer==1){nombre=graphic.attributes.NOMBPROV;}
                else if(indexLayer==2){nombre=graphic.attributes.NOMBDIST;}


                var index_graphic=select_features.indexOf(codigo);
                if (index_graphic==-1 || select_features.length==0) {
                    popup=view.popup.open({
                            title:codigo,
                            location:event.mapPoint,
                            content:codigo
                        }
                    );

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
            }
        }

        var selectedMap=function(indexMap) {
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
        }

        var selectAllFeatures=function(checked){
            select_features=[];
            if (checked) {
                layer.findSublayerById(parseInt(indexLayer)).definitionExpression=definitionExpression_gloabal;
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

        /*view.onzoom= function () {
            console.log("zoom out finished");
        }*/


        view.when(function () {
            console.log(view.constraints.effectiveLODS);
        })





        changeLayer(0);
    };

    return {
        requireEvents: requireEvents,
    }


})(App.utils, AppConfig() );