

App.utils.mapas = (function (parent, config,service) {
    var indexLayer=0;
    var select_all=document.getElementById("widget-select-all");
    var url_dep;
    var url_prov;
    var url_dist;
    var url_map= undefined;
    var cod_tematico=undefined;
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
                backgroundColor: 'transparent',
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false,
                width: 200,
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

                        x:0,
                        y:70
                    },
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '65%'],
                    borderWidth: 6,
                    borderColor: 'rgba(27, 60, 113, 0.9)'
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
                            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            borderWidth: 0,
                            distance: -8, // Individual distance
                            style: {
                                textShadow: null,
                                textOutline: 0,
                                color:"#FFFFFF",
                                textAlign:"center"

                            }

                        }

                    },
                    {
                        name: 'Mujeres',
                        y: t_edad_m ,
                        dataLabels: {
                            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                            borderWidth: 0,
                            distance: -8, // Individual distance
                            style: {
                                textShadow: null,
                                textOutline: 0,
                                color:"#FFFFFF",
                                textAlign:"center"
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
        bloque1.setAttribute("id","resumen");
        bloque2.setAttribute("id","mapaGrafico");
        bloque3.setAttribute("id","tabla");
        content.appendChild(bloque1);
        content.appendChild(bloque2);
        if (cod_map=='POB')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}

        else if (cod_map=='EDU')
        {service.mapas.getDataGrafico(ubigeo,'P01',bloque2,grafPopupPop);}
        return content;
    }

    var uiMaxCallback =function () {
        this.view_map.popup.close();
        this.panelDiv.style.display='inline';
        //console.log('uiMaxCallback');
    }
    
    var uiNormalCallback = function(){
        this.view_map.popup.close();
        this.panelDiv.style.display='none';

    }
    
    var crearMapa = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,data) {
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

        this.view_map = new MapView({
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
        identifyParams.width = this.view_map.width;
        identifyParams.height = this.view_map.height;
        this.historic_features=[
            {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[],url:url_dep},
            {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[],url:url_prov},
            {'select_features':[],'where':'','layer':distritoLyr,'nombres':[],url:url_dist},
        ];

        sources=[
            {
                featureLayer: this.historic_features[0].layer,
                searchFields: ["NOMBDEP"],
                displayField: "LITERAL",
                outFields:['*'],
            },

            {
                featureLayer: this.historic_features[1].layer,
                searchFields: ["NOMBDEP","NOMBPROV"],
                displayField: "LITERAL",
                outFields:['*'],
            },
            {
                featureLayer: this.historic_features[2].layer,
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
            view: this.view_map,
            layerInfos: [{
                layer: layer,
                title:'POBLACION',
            }],
        });

        searchWidget = new Search({
            view: this.view_map,
            sources:sources,
            activeSourceIndex:0,
            popupOpenOnSelect :false,

            //activeSource:false
        });

        /*layerList = new LayerList(
            {   view:view,
                container: document.createElement("div"),
                listItemCreatedFunction: function(event) {
                    const item = event.item;
                    console.log('item-->',item);
                    console.log('item.title-->',item.title);
                    // add the pie chart to the Predominance layer list item panel
                    if (item.title === 'LayerPredominate') {
                        item.panel = {
                            content: [
                                [
                                    "<b>Educational attainment</b> refers to the highest level of education that an individual has completed. ",
                                    "This chart categorizes the population living within the current ",
                                    "view extent by their educational attainment."
                                ].join(""),

                                document.createElement("canvas"),

                                [
                                    "Notice that while one attainment level appears to dominate certain regions, it doesn't ",
                                    "necessarily mean it represents the majority of the population. In fact, as ",
                                    "you explore most areas, you will find the predominant educational attainment makes up ",
                                    "just a fraction of the population due to the number of categories considered."
                                ].join("")
                            ],
                            className: "esri-icon-pie-chart",
                            open: item.visible
                        };
                    }
                    else{ item.panel={open:false}}
                }
            }

        );*/




        this.view_map.ui.add(legend, "bottom-left");
        this.view_map.ui.add(searchWidget, {
            position: "top-left",
            index: 2,
        });
        this.view_map.ui.add("list-widgets", "top-left");
        this.view_map.ui.add("list-maps", "bottom-right");
        this.view_map.ui.add("widget-select-layer", "top-right");
        this.view_map.ui.remove("zoom");

        this.view_map.constraints.lods=lods;

        var changeIndex=function(newIndex) {
            if(newIndex<this.historic_features.length)
            {   indexLayer=newIndex;
                identifyParams.layerIds = [newIndex];
                legend = new Legend({
                    view: this.view_map,
                    layerInfos: [{
                        layer: this.historic_features[newIndex].layer,
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
            this.select_ubigeos=[];
            this.historic_features.forEach(function (f) {
                f.nombres=[];
                f.select_features=[];
            })
            this.view_map.graphics.removeAll();
            this.view_map.popup.close();
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
            popup=this.view_map.popup.open({
                    title:title,
                    location:event.mapPoint,
                    content:createContentPopup(codigo,cod_map),

                }
            );
            this.view_map.popup.dockOptions= {
                buttonEnabled: false,
            };
            this.view_map.popup.dockEnabled=false;
        }

        var updatePanel = function(ubigeo,cod_map,div) {
            this.panelDiv.style.display="inline";
            if (cod_map == 'POB') {
                service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
            }

            else if (cod_map == 'EDU') {
                service.mapas.getDataGrafico(ubigeo, 'P01', div, grafPopupPop);
            }

        }

        this.panelDiv = document.getElementById("panel");
        this.panelDiv.style.display="none";
        this.view_map.ui.add(this.panelDiv, {position: "top-right"});

        var selectedFeature=function(graphic,event){
            select_all.style.display="block";
            if (graphic){
                var codigo=graphic.attributes.CODIGO;
                var nombre='';
                if(indexLayer==0){nombre=graphic.attributes.NOMBDEP;}
                else if(indexLayer==1){nombre=graphic.attributes.NOMBPROV;}
                else if(indexLayer==2){nombre=graphic.attributes.NOMBDIST;}
                var index_graphic=this.select_ubigeos.indexOf(codigo);

                if (index_graphic==-1 || this.select_ubigeos.length==0) {
                    createPopup(nombre,codigo,event);

                    
                    this.select_ubigeos.push(codigo);
                    this.historic_features[indexLayer].nombres.push(nombre);
                }
                else{
                    this.view_map.popup.close();
                    this.select_ubigeos.splice(index_graphic, 1);
                    this.historic_features[indexLayer].nombres.splice(index_graphic, 1);
                }

                definitionExpression_gloabal=getDefinitionExpresionByCodigos(this.select_ubigeos);
                this.historic_features[indexLayer].where=definitionExpression_gloabal;
                this.historic_features[indexLayer].select_features=this.select_ubigeos;
                layer.findSublayerById(parseInt(indexLayer)).definitionExpression=definitionExpression_gloabal;

                /***aqui se debe llamar a ola funcion q renderiza la tabla****/

                var codigos_anteriores=[];
                if (indexLayer==0) { codigos_anteriores=['00']}
                else { codigos_anteriores=this.historic_features[indexLayer-1].select_features}
                console.log('codigos_anteriores-->',codigos_anteriores);
                App.mapasChangeEvent(this.select_ubigeos,codigos_anteriores);

                //parent.cuadros.crearTablaUigeos(this.select_ubigeos);
            }
        };

        var selectedMap=function(indexMap) {
            select_all.style.display="block";
            var index=list_maps[indexMap].indexLayer;
            changeLayer(index);

            definitionExpression_gloabal=list_maps[indexMap].where;
            updateMap(definitionExpression_gloabal,index);

            //select_features=selectFeaturesByQuery(definitionExpression_gloabal,index);

        }

        var changeLayer=function(index){
            cleanVars();
            changeIndex(index);
            definitionExpression_gloabal="1=1";
        }

        var openFeature=function(){
            if(indexLayer>=0 && indexLayer<=1 )
            {
                definitionExpression_gloabal=getDefinitionExpresion(this.select_ubigeos,indexLayer);
                if (indexLayer==0) { definitionExpressiondep=definitionExpression_gloabal;  }
                if (indexLayer==1) { definitionExpressionprov=definitionExpression_gloabal; }
                setLabelWidgetUbigeos(indexLayer);
                changeIndex(indexLayer+1);
                updateMap(definitionExpression_gloabal,indexLayer);
                this.select_ubigeos=[];
            }
            this.view_map.popup.close();
            select_all.style.display="none";
        }


        var selectFeaturesByQuery = function (query,index) {
            var queryCitiesTask = new QueryTask({
                url: this.historic_features[index].url
            });
            var query = new Query({
                where: query,
                outFields: ["CODIGO"],
            });

            queryCitiesTask.execute(query).then(function(result){
                var features=result.features;
                features.forEach( function (feature) {
                    this.select_ubigeos.push(feature.attributes.CODIGO);
                });

                //console.log('select_features-->',select_features);

                parent.cuadros.crearTablaUigeos(this.select_ubigeos);
            });
        }


        var selectAllFeatures=function(checked){
            this.select_ubigeos=[];
            if (checked) {
                var where="1=1";
                if (indexLayer==0){
                    where="1=1";
                    this.historic_features[0].select_features=[];
                    this.historic_features[1].select_features=[];
                    this.historic_features[2].select_features=[];
                }
                else if(indexLayer==1){

                    where=getDefinitionExpresion(this.historic_features[0].select_features,0);
                    this.historic_features[1].select_features=[];
                    this.historic_features[2].select_features=[];

                }

                else if (indexLayer==2){
                    where=getDefinitionExpresion(this.historic_features[1].select_features,1);
                    this.historic_features[2].select_features=[];
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
            zoomToLayer(this.view_map,this.historic_features[parseInt(index)].layer,definitionExpression);

        }

        var setLabelWidgetUbigeos = function(index) {

            var nombres=this.historic_features[index].nombres;

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
            this.select_ubigeos=this.historic_features[index].select_features;
            definitionExpression_gloabal=getDefinitionExpresionByCodigos(this.select_ubigeos);

            if (index==0) {
                definitionExpression_back="1=1";
            }
            else {
                var index_old=parseInt(index)-1;
                definitionExpression_back=getDefinitionExpresion(this.historic_features[index_old].select_features,index_old);
            }

            layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_gloabal;
            layer_back.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_back;
            zoomToLayer(this.view_map,this.historic_features[parseInt(index)].layer,definitionExpression_back);
        }

        var eventHandler=function (event){
            identifyParams.geometry = event.mapPoint;
            identifyParams.mapExtent = this.view_map.extent;
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

                this.historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                this.historic_features[0].select_features.push(feature.attributes.CCDD);
            }

            if(index==2){
                this.historic_features[0].nombres.push(feature.attributes.NOMBDEP);
                this.historic_features[0].select_features.push(feature.attributes.CCDD);
                this.historic_features[1].nombres.push(feature.attributes.NOMBPROV);
                this.historic_features[1].select_features.push(feature.attributes.CCDD+feature.attributes.CCPP);
            }


            if (index<2){
                changeIndex(index);
                console.log(feature.attributes);
                selectedFeature(feature,event);
                for (var i=0;i<index;i++)
                {setLabelWidgetUbigeos(index);}
                openFeature();
            }

            console.log('features select-->',this.select_ubigeos);

        });

        this.view_map.on("click", eventHandler);

        this.view_map.on('double-click',function (event) {
            openFeature();
        });

        this.view_map.popup.on("trigger-action", function(event) {
            openFeature();
        });


        this.view_map.when(function () {
            var xsearch=$("[class='esri-search__sources-button esri-widget-button']")
            xsearch.css('display','none');

            var print = new Print({
                view: this.view_map,
                printServiceUrl: config.utils.print
            });
            //view.ui.add(print, "top-right");

        });

        changeLayer(0);


    }

    var  cambiarMapa = function(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,cod_map,cod_tematico){
        service.mapas.getLegenda(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,cod_map,cod_tematico,
            function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,data)
                {
                    crearMapa(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,data);
                });
    }

    var requireEvents = function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList) {
        list_maps=getMaps();
        cambiarMapa(Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask, IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,cod_map,cod_tematico);
    };



    return {
        requireEvents: requireEvents,
        historic_features: historic_features,
        select_ubigeos: select_ubigeos,
        uiMaxCallback : uiMaxCallback,
        view_map: view_map
    }


})(App.utils, AppConfig() ,App.service );