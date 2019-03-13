

App.utils.mapas = (function (parent, config,service) {
    var listMapas = undefined;

    var indexSubLayer=0;

    var wigdetSelectAll=document.getElementById("widget-select-all");

    var url_dep;

    var url_prov;

    var url_dist;

    var urlMap= undefined;

    var codTematico=undefined;

    var codMap= undefined;

    var classBreakinfos=undefined;
    
    var $selectUbigeo=$('#select-ubigeo');

    var tituloLegend=undefined;

    var datosMap = new Object();



    var ubigeosHijos = [];

    var layerList = undefined;

    var opc_select = undefined;  //select --> layer seleccionanado / unselect --> layer deseleccionado

    var labels_expression=undefined;

    var identifyTask;

    var identifyTaskBaseNacional;

    var identifyParams;

    var identifyParamsBaseNacional;

    var legend;

    var layer;

    var layerBack;

    var ccppLyr;

    var layerBaseNacional;

    var popup=undefined;

    var layers_inicial=undefined;

    var departamentoLyr=undefined;

    var provinciaLyr=undefined;

    var distritoLyr=undefined;

    var map=undefined;

    var view_map= undefined;

    var select_ubigeos=[];

    var listCcpp=[];

    var definitionExpression_gloabal="1=1";

    var opacity=0.8;

    var historic_features = undefined;

    var VALORES_STATIC=
        {0:{"placeholders":"Seleccione un Departamento"},
         1:{"placeholders":"Seleccione una Provincia"},
         2:{"placeholders":"Seleccione un Distrito"},
         3:{"placeholders":"Seleccione una Centro Poblado"},
        };


    var list_maps=undefined;

    var listMiniMapas=[];

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


    var ubigeos=undefined;

    var divMessageContentEmpty = document.getElementById('divMessageContentEmpty');

    var url_ccpp=undefined;


    var ubigeosOrdenadosFinal=[];


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

    var getAccesDirectMaps = function(callbackAccesoDirecto ){
        var dataReturn=[];
        var ubigeosAccesos=['07','26','27'];  // ubigeos accesos directos

        service.mapas.getUbigeos(ubigeosAccesos,function (data) {
            data.forEach(function (el,index) {
                var accesoDirecto= new Object();
                accesoDirecto.id= index+1;

                accesoDirecto.cod_territorio=el.cod_territorio;
                accesoDirecto.imagen= el.imagen;
                accesoDirecto.nivel=el.nivel;
                accesoDirecto.nivelHijo=el.nivelHijo;
                accesoDirecto.hijos2=el.hijos;
                accesoDirecto.hijos=[];
                accesoDirecto.titulo=el.titulo;

                el.hijos.forEach(function (hijo,index2) {
                    accesoDirecto.hijos.push(hijo.cod_territorio);
                });


                dataReturn.push(accesoDirecto);

            });
            //console.log('dataReturn>>>',dataReturn);
            callbackAccesoDirecto(dataReturn);
            //return dataReturn
        });


        //return dataReturn=[];

        /*return [
            {id:1 ,
                selectUbigeos:['07'],
                where:"CCDD='07'",
                indexLayer:2,  // se construye el query a nivel de provincias
                titulo: "REGION CALLAO",
                imagen:"callao.jpg"},
            {id:2 ,
                selectUbigeos:['1501'],
                where:"CCDD='15' AND CCPP='01'", // se construye el query a nivel de provincias
                indexLayer:2,
                titulo: "LIMA METROPOLITANA",
                imagen:"lima_metro.jpg"},
            {id:3 ,
                selectUbigeos:['15'],
                where:"CCDD='15' AND CCPP<>'01'",
                titulo: "REGION LIMA",
                indexLayer:1,          // se construye el quey a nivel de distritos
                imagen:"lima_provincias.jpg"},

        ];*/
    }

    var zoomGlobal = function () {
        /* zomm Global */
        var zoom;
        var tamW = $(window).height();
        if(tamW >= 900){zoom=6;
        }else if(tamW <= 899 && tamW >= 715 ){zoom=5;
        }else if(tamW <= 714){zoom=4;}
        return zoom;
    }

    var createContentPopup= function (ubigeo,codTematico) {
        var content = document.createElement("div");
        var bloque1 = document.createElement("div");
        var bloque2 = document.createElement("div");

        ////////se declaran ids a los bloques

        ////////se agrega los bloques al content
        content.appendChild(bloque1);
        content.appendChild(bloque2);
        bloque1.setAttribute("id","resumen");
        bloque2.setAttribute("id","mapaGrafico");

        App.getContenidoPopupMapaEvent(ubigeo,codTematico,function (data) {

            console.log(">>>> getContenidoPopupMapaEvent", data);
            contenidoPopoverBloque1='<div class="titPopoverMap"><h3>'+data.titulo.y+'</h3><p>'+data.titulo.name+'</p> </div> ' ;
            contenidoPopoverBloque1+='<div class="pobGeneroPopoverMap">';
            data.resumen.forEach(function (el ){
                el.name = (el.adicional == null) ? el.name: "";
                contenidoPopoverBloque1+='<div class="pobGeneroPopoverMapBlock '+el.color+'"> <h3 class="'+el.adicional+'">'+el.name+'</h3><p>'+parent.numberFormat(el.y    )+'</p>  </div>';
            });
            contenidoPopoverBloque1+='</div>';
            bloque1.innerHTML=contenidoPopoverBloque1;
            if(Object.keys(data.grafico).length > 0){
                bloque2.style.display = 'block';
                Highcharts.chart(bloque2, data.grafico);
            }else {
                bloque2.style.display = 'none';
            }

        });

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

    var getDefinitionExpresion=function(arrayUbigeos,index){
        var definitionExpression="";
        var num_features=arrayUbigeos.length;

        if (num_features>0){
            var tamUbigeo=arrayUbigeos[0].length;
            if (tamUbigeo==2){definitionExpression="CCDD IN (";}
            else if (tamUbigeo==4){ definitionExpression=" CCDD+CCPP IN (";}
            else if (tamUbigeo==6) {definitionExpression=" CCDD+CCPP+CCDI IN (";}
            /*if (index==0) { definitionExpression="CCDD IN (";}
            else if (index==1) { definitionExpression=" CCDD+CCPP IN (";}
            else if (index==2) {definitionExpression=" CCDD+CCPP+CCDI IN (";}
*/
            arrayUbigeos.forEach(function(ubigeo) {
                num_features--;
                if (num_features>0) definitionExpression= definitionExpression + ubigeo+","
                else definitionExpression= definitionExpression + ubigeo+")"
            });
        }

        return definitionExpression;
    }

    var crearMinimapa= function(index,where,div,tooltip){

        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",
            "esri/tasks/IdentifyTask",
            "esri/tasks/support/IdentifyParameters",
            "dojo/domReady!"],function (Map, MapView, MapImageLayer,FeatureLayer,IdentifyTask,IdentifyParameters) {
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
                    renderer:_this.datosMap.renderOptionsSublayers[index].renderer,
                    opacity: opacity,
                    id: parseInt(index),
                    outFields: ["*"],
                    definitionExpression: where,
                    labelsVisible: false,
                }],
            });

            var miniMap = new Map({
                layers: [miniSublayer,miniLayer],
                //layers: miniSublayer,
            });

            _this.listMiniMapas.push(miniLayer);

            var miniView = new MapView({
                container: div,
                map: miniMap,
                center: [-75.000, -9.500],
            });

            miniView.ui.components = [];
            //miniView.popup="holasss";


            /*
            miniView.when(function () {
                miniLayer.when(function () {
                    miniSublayer.queryExtent()
                        .then(function (response) {

                            miniView.goTo(response.extent);
                        });
                });
            });

            */


            miniView.when(function () {
                miniLayer.when(function () {
                    miniSublayer.queryExtent()
                        .then(function (response) {

                            miniView.goTo(response.extent);
                        });
                });

            });


            var identifyTask = new IdentifyTask(urlMap);

            var identifyParams = new IdentifyParameters();
            identifyParams.tolerance = 3;
            identifyParams.returnGeometry = true;
            identifyParams.layerIds = [index];


            /*var localizarFeaturePorClick=function (event,callback){
                identifyParams.geometry = event.mapPoint;
                identifyParams.mapExtent = miniView.extent;
                identifyTask.execute(identifyParams).then( function (response) {
                    var results=response.results;
                    var feature=results[0].feature;
                    return callback(feature);
                });
            }*/

            miniView.on('pointer-move',function (evt) {
                var screenPoint = {
                    x: evt.x,
                    y: evt.y
                };


                miniView.hitTest(screenPoint)
                    .then( function(response){
                        var nom='';
                        var attributes=response.results[0].graphic.attributes;

                        if (attributes!==undefined)
                            if(index==1)
                                nom=attributes.NOMBPROV;
                            else if (index==2)
                                nom=attributes.NOMBDIST;



                        //console.log(response.results[0]);

                        //console.log(screenPoint.x);


                        //screenPoint.x;
                        //screenPoint.y;

                        tooltip.innerHTML ="<label>"+nom+"</label>"
                        tooltip.style.top = parseInt(evt.y)  + 'px';
                        tooltip.style.left = parseInt(evt.x) + 'px';

                    });

            });

            miniView.on('click',function (event) {
                /*
                localizarFeaturePorClick(event,function (feature) {
                    console.log('feature>>>',feature.attributes);
                    miniView.popup.open({

                        title: ""+feature.attributes.ccdd,
                        location: event.mapPoint, // Set the location of the popup to the clicked location
                    });


                });*/
            });

        });
    }

    var insertarNuevoMiniMapa = function (nombre,ubigeo) {
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
            var idIniMiniMap="divIniMiniMap_"+ubigeo;
            var divIniMiniMap = document.createElement("div");
            var divMiniMap = document.createElement("div");
            var divTituloMiniMap = document.createElement("div");
            var tooltip= document.createElement("div");
            var list_mini_maps=document.getElementById("listMiniMaps");

            var legendaMiniMapa=document.getElementById('legendaMiniMap');

            divMiniMap.classList.add("miniMap");
            tooltip.classList.add("tooltipMiniMapa");
            divTituloMiniMap.classList.add("tituloMiniMapa");
            divMiniMap.setAttribute("id",idMiniMap);
            divIniMiniMap.setAttribute("id",idIniMiniMap);
            divMiniMap.style.visibility = "visible";
            divTituloMiniMap.innerHTML="<label>"+nombre+"</label>";
            divIniMiniMap.appendChild(divTituloMiniMap);
            divIniMiniMap.appendChild(divMiniMap);
            divMiniMap.appendChild(tooltip);
            list_mini_maps.appendChild(divIniMiniMap);


            legendaMiniMapa.innerHTML=crearLegenda(_this.datosMap.optionsSublayers[stringIndex]);


            crearMinimapa(stringIndex,where,idMiniMap,tooltip);
            _this.cant_mini_maps++;
        }
        _this.divMessageContentEmpty.style.display='none';
    }

    var removerMiniMapa = function (ubigeo){
        var _this=parent.mapas;

        var idMiniMap="divIniMiniMap_"+ubigeo;
        var divMiniMap =document.getElementById(idMiniMap);


        divMiniMap.remove();
        _this.cant_mini_maps--;


    }

    var removerTodosMiniMaps=function(){
        var _this=parent.mapas;
        var listMiniMaps=document.getElementById('listMiniMaps');
        var legendaMiniMapa=document.getElementById('legendaMiniMap');
        legendaMiniMapa.innerHTML="";
        listMiniMaps.innerHTML="";
        _this.divMessageContentEmpty.style.display='inline';
        _this.listMiniMapas=[];
    }

    /*var mostrarTodosMiniMaps=function(){
        var _this=parent.mapas;
        _this.select_ubigeos.forEach(function (ubigeo) {
            var elem=document.getElementById("divMiniMap_" +ubigeo);
            insertarNuevoMiniMapa(ubigeo);

        });
    }
    */


    var uiMaxCallback= undefined;
    var uiNormalCallback= undefined;
    var actualizarMapaPorUbigeos = undefined;

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

            mostrarCargando();

            var template = new PrintTemplate({
                format: "pdf",
                exportOptions: {
                    dpi: 300
                },
                layout: "a4-portrait",
                layoutOptions: {
                    titleText: "PRINCIPALES INDICADORES/PRIMEROS RESULTADOS",
                    authorText: "INEI"
                }
            });

            var params = new PrintParameters({
                view: _this.view_map,
                template: template
            });

            var resp={};
            var options={};
            //options.responseType="blob";


            printTask.execute(params,options).then(function(resolvedVal){
                var url_pdf=resolvedVal.url;
                var cadena=url_pdf.split("/");
                var nom_pdf=cadena[cadena.length-1];

                //var nom_pdf=url_pdf.reverse().split("/")[0];
                resp['success']=true;
                resp['url']=url_pdf;
                resp['nom_pdf']=nom_pdf;
                ocultarCargando();
                console.log('nom_pdf >>>', nom_pdf);

                return callback(resp);
            },
            function(error){
                resp['success']=false;
                resp['error']=error;
                //console.log('error>>>' ,error);
                ocultarCargando();
                return callback(resp);

            });


            function mostrarCargando(){
                $('#cargarDescarga').css('display','inline');
            }

            function ocultarCargando(){
               $('#cargarDescarga').css('display','none');

            }

        });

    };


    var getFeaturesUbigeos = function(queryText,index,callback){
        _this=parent.mapas;
        require(["esri/layers/FeatureLayer","esri/Graphic","esri/tasks/support/Query","esri/tasks/QueryTask","dojo/domReady!"],function (FeatureLayer,Graphic,Query,QueryTask) {
            var queryTask = new QueryTask({
                url: _this.historic_features[index].url
            });

            var query = new Query({
                where: queryText,
                outFields: ['*'],
                returnGeometry : true,
            });

            queryTask.execute(query).then(function(result){
                var features=result.features;
                console.log('getFeaturesUbigeos result>>>',result);
                console.log('queryText>>',queryText);
                console.log('url>>',_this.historic_features[index].url);
                console.log('features>>',features);

                callback(features);
            });
        });
    }

    ///agrega un sombreado de un ubigeo
    //ejemplo: seleccionarUbigeo(options)   : options.ubigeo=[

    var seleccionarUbigeosMapa = function (options) {
        _this=parent.mapas;
        var ubigeos=options.ubigeos;
        var index=options.nivel;

        require(["esri/layers/FeatureLayer","esri/Graphic","dojo/domReady!"],function (FeatureLayer,Graphic) {
            var queryText=getDefinitionExpresion(ubigeos,index);
            _this.view_map.graphics.removeAll();
            getFeaturesUbigeos(queryText,index,function (features) {
                features.forEach( function (feature) {
                    var graphic= new Graphic({
                            geometry : feature.geometry,
                            symbol: symbolSombreado,
                    });
                    _this.view_map.graphics.add(graphic);
                });
            });
        });
    }



    var uiMouseOutTabla = function () {
        _this.view_map.graphics.removeAll();
    }


    var getListSublayerTematico = function (optionsSublayers) {
        var _this=parent.mapas;
        var renderOptionSublayer = undefined;
        var codTematico = _this.datosMap.codTematico;
        var limDep= optionsSublayers[0];
        var res=[];
        var outlineOptions = {width:1};

        optionsSublayers.forEach(function (sublayer) {
            renderOptionSublayer= new Object(),
            renderOptionSublayer.id=parseInt(sublayer.id);
            renderOptionSublayer.title=sublayer.titleLayer;
            renderOptionSublayer.visible=sublayer.visible;
            renderOptionSublayer.labelsVisible=true;
            renderOptionSublayer.outFields=['*'];
            renderOptionSublayer.renderer=renderizadoClassBreaks(codTematico,parent.getClassBreakInfoSublayerTematico(sublayer.renderer,outlineOptions));
            res.push(renderOptionSublayer);
        });


        renderOptionSublayer= new Object();
        renderOptionSublayer.id=limDep.id;
        renderOptionSublayer.labelsVisible=true;
        renderOptionSublayer.visible=false;
        renderOptionSublayer.renderer=  parent.renderLines();
        res.push(renderOptionSublayer);

        return res;
    }



    var getListSublayerTematicoBack = function (optionsSublayers) {
        var _this=parent.mapas;
        var renderOptionSublayer = undefined;
        var renderOptionsSublayersBack=[]

        optionsSublayers.forEach(function (sublayer) {
            renderOptionSublayer= new Object(),
            renderOptionSublayer.id=parseInt(sublayer.id);
            renderOptionSublayer.visible=sublayer.visible;
            renderOptionSublayer.labelsVisible=true;
            renderOptionSublayer.outFields=['*'];
            renderOptionSublayer.renderer=parent.renderBack();
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
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--symbols" style="height:20px; padding-right: 7px !important; ">';
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

    //var ubigeosOrdenados=[];

    var esPadre= function(ubigeoPadre,ubigeoHijo){
        var tamPadre=ubigeoPadre.length;
        var tamHijo=ubigeoHijo.length;
        var esPadre=false;
        if(ubigeoPadre=='00' && (ubigeoHijo!='00' && tamHijo==2) ) esPadre =true;
        if(tamPadre==2 && tamHijo==4 && ubigeoHijo.substring(0,2)== ubigeoPadre) esPadre=true;
        if(tamPadre==4 && tamHijo==6 && ubigeoHijo.substring(0,4)== ubigeoPadre) esPadre=true;
        if(tamPadre==6 && tamHijo>6 && ubigeoHijo.substring(0,6)== ubigeoPadre) esPadre=true;
        return esPadre;
    }



    var ordenarUbigeos=function (ubigeosDesordenados,ubigeosOrdenados,ubigeoPadre) {
        var _this=parent.mapas;
        var ubigeos= ubigeosDesordenados;
        var encontrado=false;
        var indice =-1;

        if(ubigeos.length>0)
        {
            ubigeos.forEach(function (ubigeo) {

                if(ubigeo=="00" || esPadre(ubigeoPadre,ubigeo)){
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

               _this.ubigeosOrdenadosFinal = ubigeosOrdenados;
               console.log('_this.ubigeosOrdenadosFinal>>>', _this.ubigeosOrdenadosFinal);
        }

    }

    var actualizarTablasyGraficos = function(ubigeosDes,selectUbigeos,index){
        var _this=parent.mapas;

        if(ubigeosDes.indexOf('00')<0){ubigeosDes.unshift('00')}

        ordenarUbigeos(ubigeosDes,[],"00");

        var options= {'ubigeosOdenados':_this.ubigeosOrdenadosFinal,
                'ubigeosSeleccionados':selectUbigeos,
                'nivel': index,
            }


        App.mapasChangeEvent(options);
        /*service.mapas.ordenarListaUbigeosSeleccionados(ubigeosDes,function (ubigeosOrd) {

            var options= {'ubigeosOdenados':ubigeosOrd,
                'ubigeosSeleccionados':selectUbigeos,
                'nivel': index,
            }
            //console.log('options>>>',options);
            App.mapasChangeEvent(options);
        });*/

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
            "esri/widgets/Expand",
            "dojo/domReady!"
        ],function (Map, MapView, MapImageLayer,FeatureLayer, Legend,Popup,dom,domConstruct,Graphic, Search , Locator , Query,IdentifyTask,
                    IdentifyParameters,arrayUtils,PopupTemplate,Print,QueryTask,LayerList,PrintTask,PrintTemplate,PrintParameters,LabelClass,Expand)
        {

            var _this=parent.mapas;
            var listMiniMaps=document.getElementById("listMiniMaps");
            var widgetProv=document.getElementById('widget-provincias');
            var widgetDep=document.getElementById('widget-departamentos');
            var widgetDist=document.getElementById('widget-distritos');
            var widgetNacional=document.getElementById('widget-nacional');
            var divListMaps=document.getElementById("div-list-maps");
            var selectAll=document.getElementById("select-all");
            var selectGraphics=[];


            var symbolMarker = {
              type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
              style: "circle",
              color: [ 255, 255, 0,0.5 ],
              size: "12px",  // pixels

              outline: {  // autocasts as new SimpleLineSymbol()
                color: [ 255, 255, 0, 1 ],
                width: 1  // points
              }
            };

            /////////////*
            //
            // datos
            //** /////////////
            _this.datosMap.optionsSublayers=optionsSublayers;
            _this.datosMap.renderOptionsSublayers=getListSublayerTematico(optionsSublayers);
            _this.datosMap.renderOptionsSublayersBack=getListSublayerTematicoBack(optionsSublayers);
            codMap=_this.datosMap.codMap;
            codTematico=_this.datosMap.codTematico;
            urlMap=_this.datosMap.urlMap;

            //tituloLegend=_this.datosMap.tituloLegend;

            url_dep=urlMap+'/0';
            url_prov=urlMap+'/1';
            url_dist=urlMap+'/2';
            url_ccpp=_this.datosMap.urlMapBaseNacional+'/0'


            //_this.panelDiv.style.visibility="none";
            //_this.panelDiv.style.visibility="none";


            _this.layer = new MapImageLayer({
                url: urlMap,
                outFields:["*"],
                sublayers:  _this.datosMap.renderOptionsSublayers,
                title: _this.datosMap.optionsSublayers[0].title,
                "onsublayer-update": function (data,data2,data3) {
                    mostrarCargando();
                },
            });

            _this.layerBack= new MapImageLayer({
                url: urlMap,
                outFields:["*"],
                sublayers: _this.datosMap.renderOptionsSublayersBack,

            });

            _this.layerBaseNacional = new MapImageLayer({
                url: _this.datosMap.urlMapBaseNacional,
                outFields:["*"],
                sublayers: [{ id: 0,
                            visible : false,
                }],
            });



            _this.ccppLyr = new FeatureLayer({
                url: url_ccpp,
                outFields:["*"],
                visible : true,
                labelsVisible :true,
            });


            layers_inicial = [_this.layerBack,_this.layer];

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
                //layers: layers_inicial,
                layers: [_this.layerBack,_this.layer,_this.layerBaseNacional,_this.ccppLyr]
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


            identifyTaskBaseNacional = new IdentifyTask(_this.datosMap.urlMapBaseNacional);
            identifyParamsBaseNacional = new IdentifyParameters();

            identifyParamsBaseNacional.returnGeometry = true;
            identifyParamsBaseNacional.layerIds = [0];


            _this.historic_features=[
                {'select_features':[],'where':'','layer':departamentoLyr,'nombres':[],url:url_dep ,label:'$feature.NOMBDEP',placeholders:'Seleccione un Departamento'},
                {'select_features':[],'where':'','layer':provinciaLyr,'nombres':[],url:url_prov,label:'$feature.NOMBPROV',placeholders:'Seleccione una Provincia'},
                {'select_features':[],'where':'','layer':distritoLyr,'nombres':[],url:url_dist,label:'$feature.NOMBDIST',placeholders:'Seleccione un Distrito'},
                {'select_features':[],'where':'','layer':ccppLyr,'nombres':[],url:url_ccpp,label:'$feature.DESCRIPCION',placeholders:'Seleccione un Centro Poblado'},
                
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


            divListMaps.innerHTML='';

            getAccesDirectMaps(function (data) {
                 data.forEach(function (map,index) {
                    var newImg = document.createElement("img");
                    newImg.setAttribute("src",map.imagen);
                    newImg.classList.add("overviewDiv");
                    newImg.setAttribute("id","map_"+map.id);
                    divListMaps.appendChild(newImg);
                    newImg.addEventListener("click",function (event) {
                        var dataSelect2=[];
                        var el= new Object();
                        var children=[];
                        map.hijos2.forEach(function (hijo) {
                            var child=new Object();
                            child.id=hijo.cod_territorio;
                            child.text=hijo.titulo;
                            children.push(child);
                        });

                        el.text=map.titulo;
                        el.children=children;
                        dataSelect2.push(el);
                        ubigeosHijos=map.hijos;
                        seleccionarAccesoRapido(map.hijos,map.nivelHijo);
                        actualizarDatosComboUbigeo(dataSelect2,map.nivelHijo);
                        _this.historic_features[map.nivel].select_features=[map.cod_territorio.trim()];
                        actualizarTablasyGraficos([map.cod_territorio.trim()],[map.cod_territorio.trim()],map.nivel);

                    });
                 });
            });

            _this.uiMaxCallback =function () {
                 _this.panelDiv.style.display='inline';
                 _this.maximizado=true;
            }

            _this.uiNormalCallback = function(){
                //var _this=parent.mapas;
                /*
                _this.maximizado=false;
                removerTodosMiniMaps();
                visibilityAllChildDiv(_this.panelDiv,'hidden');
                _this.cant_mini_maps=1;
                if(_this.opc_select=="select") _this.view_map.popup.visible=true;
                _this.view_map.ui.move("widget-select-layer","top-right");*/
                _this.panelDiv.style.display='none';
                _this.maximizado=false;


            }


            _this.actualizarMapaPorUbigeos = function (options) {
                seleccionarAccesoRapido(options.ubigeos,options.nivel);
                actualizarComboUbigeo(options.ubigeos);

            }

            /**
             * funcion que actualiza el mapa con algun acceso rapido seleccionado
             * **/
            var seleccionarAccesoRapido=function(selectUbigeos,indexLayer) {
                //var where='';
                var where=getDefinitionExpresion(selectUbigeos,indexLayer);
                definitionExpression_gloabal=where;
                updateMap(where,indexLayer,true);  // actualizando el mapa
                desplegarWidgetsNavegacion(0);  //limpiando widgets
                changeLayer(indexLayer);  // cambiado la capa del mapa
                wigdetSelectAll.style.display="none"; // ocultando el checkbox de seleccion completa
            }

            searchWidget = new Search({
                view: _this.view_map,
                sources:sources,
                popupOpenOnSelect :false,
            });

            _this.view_map.ui.add( _this.datosMap.divLegend, "bottom-left");
            _this.view_map.ui.add(["div-buscador-ubigeo","div-select-ubigeo","widget-select-layer","list-widgets"], "top-left");
            _this.view_map.ui.add("list-maps", "bottom-right");
            _this.view_map.ui.add(["panel"], "top-right");
            _this.view_map.ui.remove("zoom");
            _this.view_map.constraints.lods=lods;


            /**
             * Muestra la capa del mapa con  indice=index
             * **/
            var changeIndex=function(newIndex) {
                var i = parseInt(newIndex);
                _this.indexSubLayer=i;
                if(newIndex<3)
                {
                    var htmlLengenda=crearLegenda(_this.datosMap.optionsSublayers[i]);
                    identifyParams.layerIds = [i];
                    _this.listCcpp=[];
                    _this.datosMap.divLegend.innerHTML=htmlLengenda;
                    layers_inicial.forEach(function (layer) {
                        layer.sublayers.forEach(function (sublayer) {
                            sublayer.visible=false;
                        });
                        layer.sublayers.items[i].visible=true;
                    });

                    _this.layerBaseNacional.sublayers.forEach(function (sublayer) {
                        sublayer.visible=false;
                    });

                    _this.ccppLyr.visible=false;
                    _this.view_map.graphics.removeAll();
                }

                else{
                    _this.ccppLyr.visible=true;
                    _this.layerBaseNacional.sublayers.forEach(function (sublayer) {
                            sublayer.visible=true;
                    });
                }

            }


            var zoomToLayer=function(view,layer,definitionExpression,featurePoint) {
                if(featurePoint==undefined)
                {
                    var query = new Query();
                    query.where = definitionExpression;
                    return layer.queryExtent(query)
                        .then(function(response) {

                            console.log('zoomToLayer response>>>', response);
                            if(response){

                                    view.goTo(response.extent).then(function(resp){
                                    console.log('zoomToLayer>>>',view.zoom);
                                    if(view.zoom>14){
                                        view.zoom=14;

                                    }
                                });
                            }
                   });
                }

                else{

                    //console.log('featurePoint>>>',featurePoint)
                    /*view.center=featurePoint.geometry.point;
                    view.zoom=view.zoom+2;*/
                }
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


            var createPopup=function(title,codigo,centro){
                popup=_this.view_map.popup.open({
                        title:title,
                        location:centro,
                        content:createContentPopup(codigo,_this.datosMap.codMap),
                    }
                );
                _this.view_map.popup.dockOptions= {
                    buttonEnabled: false,
                };
                _this.view_map.popup.dockEnabled=false;
                //_this.view_map.popup.visible=!(_this.maximizado);
            }

            var updateBloqueGrafico = function (ubigeo,cod_map,div) {
                if(_this.maximizado){
                    div.style.display="inline";
                }
                else {
                    div.style.display="none";
                }
            }

            var updatePanel = function(nombre,ubigeo,cod_map,div_grafico,index) {
                /*updateBloqueGrafico(ubigeo,cod_map,div_grafico);*/

                if(_this.maximizado==true)
                {
                    insertarNuevoMiniMapa(nombre,ubigeo,index);
                }

            }

            /**
             * seleccion del feature
             * **/
            var selectedFeature=function(feature){

                wigdetSelectAll.style.display="block";
                if (feature && _this.indexSubLayer<3){
                    var ubigeo=feature.attributes.CODIGO;
                    var nombre='';
                    if(_this.indexSubLayer==0){nombre=feature.attributes.NOMBDEP;}
                    else if(_this.indexSubLayer==1){nombre=feature.attributes.NOMBPROV;}
                    else if(_this.indexSubLayer==2){nombre=feature.attributes.NOMBDIST;}
                    var indiceUbigeoEncontrado=_this.select_ubigeos.indexOf(ubigeo);

                    if (indiceUbigeoEncontrado==-1 || _this.select_ubigeos.length==0) {
                        _this.opc_select="select";
                        createPopup(nombre,ubigeo,feature.geometry.centroid);
                        updatePanel(nombre,ubigeo,_this.cod_map,_this.panelDivGrafico,_this.indexSubLayer);
                        _this.select_ubigeos.push(ubigeo);
                        _this.historic_features[_this.indexSubLayer].nombres.push(nombre);
                    }
                    else{
                        _this.opc_select="unselect";
                        _this.view_map.popup.close();
                        _this.select_ubigeos.splice(indiceUbigeoEncontrado, 1);
                        _this.historic_features[_this.indexSubLayer].nombres.splice(indiceUbigeoEncontrado, 1);
                        if(_this.maximizado==true)
                        {removerMiniMapa(ubigeo);}

                    }

                    definitionExpression_gloabal=getDefinitionExpresionByCodigos(_this.select_ubigeos);
                    _this.historic_features[_this.indexSubLayer].where=definitionExpression_gloabal;
                    _this.historic_features[_this.indexSubLayer].select_features=_this.select_ubigeos;
                    _this.layer.findSublayerById(parseInt(_this.indexSubLayer)).definitionExpression=definitionExpression_gloabal;
                    _this.select_ubigeos=$.unique(_this.select_ubigeos);

                    /***aqui se debe llamar a ola funcion q renderiza la tabla****/
                    console.log('_this.historic_features>>>',_this.historic_features);
                    var ubigeosDes = _this.historic_features[0].select_features.concat(_this.historic_features[1].select_features,_this.historic_features[2].select_features);
                    actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,_this.indexSubLayer);

                }

                else if(_this.indexSubLayer>=3 )
                {


                    var symbol ='';
                    var ubigeo = feature.attributes.CODIGO;
                    var grupo = feature.attributes.COD_GRUPO;
                    var indiceUbigeoEncontrado=_this.select_ubigeos.indexOf(ubigeo);

                    var gruposCcpp =[];
                    if(feature.geometry.type=='point')
                    {
                        symbol=symbolMarker;
                    }

                    var graphic= new Graphic({
                        geometry: feature.geometry,   // Add the geometry created in step 4
                        symbol: symbol,   // Add the symbol created in step 5
                        attributes: feature.attributes,
                    });

                    if (indiceUbigeoEncontrado==-1 || _this.select_ubigeos.length==0) {
                        _this.select_ubigeos.push(ubigeo);
                        _this.listCcpp.push({ubigeo:ubigeo,grupo:grupo});
                        _this.view_map.graphics.add(graphic);
                    }

                    else{
                        _this.select_ubigeos.splice(indiceUbigeoEncontrado, 1);
                        var remove=_this.view_map.graphics.items.find(x=>x.attributes.CODIGO==ubigeo);
                        _this.view_map.graphics.remove(remove);
                    }


                    _this.listCcpp.forEach(function (value) {
                        gruposCcpp.push(value.grupo);
                    });

                    var grupos=Array.from(new Set(gruposCcpp));

                    var ubigeosDes = _this.historic_features[0].select_features.concat(_this.historic_features[1].select_features,_this.historic_features[2].select_features
                        , grupos
                    );

                    actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,_this.indexSubLayer);
                }

                else{
                 console.log('feature no encontrado');
                }

            };


            var changeLayer=function(index){
                cleanVars();
                changeIndex(index);
                definitionExpression_gloabal="1=1";

            }
            
            /**
             * Apertura de un feature: en caso sea nivel departamental o provincial
             * **/
            var openFeature=function(){
                _this.cant_mini_maps=1;


                if(_this.indexSubLayer>=0 && _this.indexSubLayer<=1 )
                {



/*
                    service.mapas.getUbigeos(_this.select_ubigeos,function (data){
                        data.forEach(function (el) {
                            var hijos=el.hijos;
                            hijos.forEach(function (hijo) {
                                ubigeosHijos.push(hijo.ubigeo);
                            });
                        });*/



                        //actualizarComboUbigeo(_this.select_ubigeos); // actualizamos el combo select2 : select-ubigeos
                        definitionExpression_gloabal=getDefinitionExpresion(ubigeosHijos,_this.indexSubLayer);
                        setLabelWidgetUbigeos(_this.indexSubLayer);
                        //changeIndex(_this.indexSubLayer+1);
                        updateMap(definitionExpression_gloabal,_this.indexSubLayer+1,true);
                        _this.select_ubigeos=[];
                    //});

                }

                else if(_this.indexSubLayer==2){
                    //actualizarComboUbigeo(_this.select_ubigeos);
                    definitionExpression_gloabal=getDefinitionExpresion(_this.select_ubigeos,_this.indexSubLayer);
                    setLabelWidgetUbigeos(_this.indexSubLayer);
                    updateMap(definitionExpression_gloabal,_this.indexSubLayer+1,true);
                    _this.select_ubigeos=[];
                }


                _this.view_map.popup.close();
                wigdetSelectAll.style.display="none";



                if(_this.maximizado)
                    removerTodosMiniMaps();
            }



            /**
             * Selecciona o deselecciona todos los features del layer especificado por el indexLayer
             * **/
            var selectAllFeatures=function(checked){
                var i=_this.indexSubLayer;
                var where='';
                var gruposCCpp=[];
                if (i==0){
                    where="1=1";
                }
                else{
                    where=getDefinitionExpresion(_this.historic_features[i-1].select_features,i);
                }

                if(checked) {


                    //_this.select_ubigeos=ubigeosHijos;


                    if(i<3) {
                        _this.select_ubigeos=ubigeosHijos;
                        _this.layer.findSublayerById(i).definitionExpression=where;
                    }


                    else{
                        //_this.select_ubigeos=ubigeosHijos;

                        //_this.select_ubigeos=ubigeosHijos;
                        _this.select_ubigeos=[];
                        var conjunto=[];
                        ubigeosHijos.forEach(function (value) {
                              conjunto.push(value.grupo);
                        });
                        gruposCCpp=Array.from(new Set(conjunto));

                        console.log('where select all features>>>',where);

                        getFeaturesUbigeos(where,i,function (features) {
                            features.forEach(function (feature) {
                                    console.log('feature>>>',feature);
                                    var ubigeo = feature.attributes.CODIGO;
                                    var grupo = feature.attributes.COD_GRUPO;
                                    var symbol='';
                                    //var indiceUbigeoEncontrado=_this.select_ubigeos.indexOf(ubigeo);
                                    if(feature.geometry.type=='point')
                                    {
                                        symbol=symbolMarker;
                                    }
                                    var graphic= new Graphic({
                                        geometry: feature.geometry,   // Add the geometry created in step 4
                                        symbol: symbol,   // Add the symbol created in step 5
                                        attributes: feature.attributes,
                                    });
                                    //console.log('centros poblados',graphic);

                                    //if (indiceUbigeoEncontrado==-1 || _this.select_ubigeos.length==0) {
                                        //_this.select_ubigeos.push(grupo);
                                        //_this.listCcpp.push({ubigeo:ubigeo,grupo:grupo});
                                    _this.view_map.graphics.add(graphic);
                                    //}


                                }
                            );
                        });

                    }

                }

                else {
                    _this.select_ubigeos = [];
                    if(i<3) {
                        _this.layer.findSublayerById(parseInt(i)).definitionExpression = "1<>1";
                    }
                    else{
                        _this.view_map.graphics.removeAll();
                        _this.listCcpp=[]
                    }

                }


                _this.historic_features[i].select_features=_this.select_ubigeos;

                var ubigeosDes = _this.historic_features[0].select_features.concat(_this.historic_features[1].select_features,_this.historic_features[2].select_features,gruposCCpp);

                //console.log('ubigeosDes>>',ubigeosDes);
                if(i<3){
                    actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,_this.indexSubLayer);
                }
                else{
                    actualizarTablasyGraficos(ubigeosDes,gruposCCpp,_this.indexSubLayer);
                }

            }

            var updateMap = function(definitionExpression,index,opZoom) {
                    changeIndex(index);
                    if(index<=2){
                        _this.layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression;
                        _this.layerBack.findSublayerById(parseInt(index)).definitionExpression=definitionExpression;

                        if (opZoom)
                            zoomToLayer(_this.view_map,_this.historic_features[parseInt(index)].layer,definitionExpression);
                        }

                    else {
                        var origen="cpv2017_v2";
                        _this.layerBaseNacional.findSublayerById(0).definitionExpression= definitionExpression + " and origen='"+origen+"' and poblacion>0";
                        _this.ccppLyr.definitionExpression= definitionExpression + " and origen='"+origen+"' and poblacion>0";


                        if (opZoom)
                            zoomToLayer(_this.view_map,_this.historic_features[2].layer,definitionExpression);

                    }

            }


            var setLabelWidgetUbigeos = function(index) {
                var nombres=_this.historic_features[index].nombres;
                if(index==0) {
                    widgetDep.style.display = "block";
                    widgetProv.style.display = "none";
                    widgetDist.style.display = "none";
                }

                else if (index==1){
                    widgetProv.style.display = "block";
                    widgetDist.style.display = "none";
                }
                else if (index==2){
                    widgetDist.style.display = "block";

                }


                if(nombres.length==1)
                {
                    if (index==0)
                    {widgetDep.innerHTML=nombres[0]}
                    else if (index==1)
                    {widgetProv.innerHTML=nombres[0]}
                    else if (index==2)
                    {widgetDist.innerHTML=nombres[0]}
                }

                else if (nombres.length>1)
                {
                    if (index==0)
                    {widgetDep.innerHTML='MULTIPLES <BR> DEPARTAMENTOS'}
                    else if (index==1)
                    {widgetProv.innerHTML='MULTIPLES <BR> PROVINCIAS'}
                    else if (index==2)
                    {widgetProv.innerHTML='MULTIPLES <BR> DISTRITOS'}
                }
            }

            /**
             * Retorna pintado en el mapa los departamentos, provincias o distritos seleccionados previamente en el sistema
             * **/
            var selectWidget = function(index){
                var definitionExpression_back;
                var selectHistorico=[];
                var ubigeosDes=['00'];
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
                    _this.layerBack.findSublayerById(parseInt(indexLocal)).definitionExpression=definitionExpression_back;
                    zoomToLayer(_this.view_map,_this.historic_features[parseInt(indexLocal)].layer,definitionExpression_back);

                    if( (indexLocal-1) >=0)
                        selectHistorico=_this.historic_features[indexLocal-1];
                    else
                        selectHistorico=['00'];


                    ubigeosDes = _this.historic_features[0].select_features.concat(_this.historic_features[1].select_features,_this.historic_features[2].select_features);
                    //actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,_this.indexSubLayer);
                    //App.mapasChangeEvent(_this.select_ubigeos,selectHistorico);

                }

                else{
                    _this.select_ubigeos=[];
                    definitionExpression_gloabal="1=1";
                    definitionExpression_back="1=1";
                    _this.layer.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_gloabal;
                    _this.layerBack.findSublayerById(parseInt(index)).definitionExpression=definitionExpression_back;
                    zoomToLayer(_this.view_map,_this.historic_features[parseInt(index)].layer,definitionExpression_back);
                    //actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,index);
                }

                actualizarTablasyGraficos(ubigeosDes,_this.select_ubigeos,index);
                actualizarComboUbigeo(_this.select_ubigeos);
            }


            var localizarFeaturePorClick=function (event,callback){

                if(_this.indexSubLayer<3){
                    identifyParams.geometry = event.mapPoint;
                    identifyParams.mapExtent = _this.view_map.extent;

                    identifyTask.execute(identifyParams).then( function (response) {
                        var results=response.results;



                        var feature=results[0].feature;

                        return callback(feature);
                    });
                }

                else {
                    var screenPoint = {
                          x: event.x,
                          y: event.y
                        };
                    _this.view_map.hitTest(screenPoint).then(function (response) {
                        var results=response.results;
                        var graphic=results[0].graphic;
                        return callback(graphic);
                    });

                }


            }

            /**
             * Despliega los widgets correctos segun la navegacion en el mapa (Peru, Departamento,Provincia,Distrito)
             * **/
            var desplegarWidgetsNavegacion=function(indexLayer){
                _this.historic_features.forEach(function (f,index) {
                    if(indexLayer<=index){
                        f.nombres=[];
                        f.select_features=[];
                    }
                });
                _this.view_map.graphics.removeAll();
                _this.view_map.popup.close();

                if (indexLayer==2){
                    widgetDist.style.display = "none";
                }


                if (indexLayer==1){
                    widgetDist.style.display = "none";
                    widgetProv.style.display = "none";
                }

                else if(indexLayer==0){
                    widgetDist.style.display = "none";
                    widgetProv.style.display = "none";
                    widgetDep.style.display = "none";
                }
                wigdetSelectAll.style.display="none";
            }

            widgetNacional.addEventListener("click", function(){
                changeLayer(0);
                desplegarWidgetsNavegacion(0);
                selectWidget(0);

            });

            widgetDep.addEventListener("click", function(){
                desplegarWidgetsNavegacion(1);
                selectWidget(1);

            });

            widgetProv.addEventListener("click", function(){
                desplegarWidgetsNavegacion(2);
                selectWidget(2);
                //actualizarSelectUbigeo(_this.select_ubigeos);
            });
            widgetDist.addEventListener("click", function(){
                selectWidget(3);
            });


            /**Selecciona la vista del mapa segun sea el caso
             * 0 departamental
             * 1 provincial
             * 2 distrital
             * **/
            var seleccionarVista = function (index) {
                var i=parseInt(index);
                changeIndex(i);
                selectWidget(0);
                desplegarWidgetsNavegacion(0);
                _this.layer.findSublayerById(i).definitionExpression="1=1";
                _this.layerBack.findSublayerById(i).definitionExpression="1=1";
                /**
                 * Si la vista es provincial o distrital se oculatan los labels y se visualiza las limites departamentals
                 * **/
                if(i>0){
                    identifyParams.layerIds = i; // mediante esta sentencia se bloquea la seleccion a nivel de distrital o provincial del mapa
                    _this.layer.sublayers.items[i].renderer=renderizadoClassBreaks(_this.datosMap.codTematico,parent.getClassBreakInfoSublayerTematico(_this.datosMap.optionsSublayers[i].renderer));
                    _this.layer.sublayers.items[3].visible=true;
                    _this.layer.sublayers.items[i].labelsVisible=false; // se ocultan los labels
                    _this.layerBack.sublayers.items[i].labelsVisible=false; // se ocultan los labels


                }




                /**
                    Si la vista es departamental se reinician los layers con su version original (sin limites departamentales y con ancho  de 1 en los  limites de cada sublayer)
                 **/
                else{
                    _this.layer.sublayers=_this.datosMap.renderOptionsSublayers;
                    _this.layerBack.sublayers=_this.datosMap.renderOptionsSublayersBack;

                }
                zoomToLayer(_this.view_map,_this.historic_features[0].layer,"1=1");

            }


            $('.mostrarListaMapa').on('click', 'div',function () {
                var index=parseInt($(this).attr('index'));
                seleccionarVista(index);

                if(index>0)
                    $("#div-select-ubigeo").css("visibility","hidden");
                else
                    $("#div-select-ubigeo").css("visibility","visible");

            });

            selectAll.addEventListener("click", function(){
                var checked=selectAll.checked;
                selectAllFeatures(checked);
            });
            /**
             * Evento callback de busqueda
             * **/

            _this.$selectUbigeo.on('select2:select', function (e) {
                var data = e.params.data;
                var codigo=data.id;
                var where=" CODIGO="+codigo;
                var origen='cpv2017_v2';
                (_this.indexSubLayer==3)?where=" CODIGO='"+codigo+"' and origen='"+origen+"'": where= " CODIGO="+codigo;

                getFeaturesUbigeos(where,_this.indexSubLayer,function (features) {
                    features.forEach(function (feature) {
                        selectedFeature(feature);
                        if(_this.indexSubLayer==3){
                                var point=[feature.geometry.x,feature.geometry.y];
                                _this.view_map.center=point;
                                _this.view_map.zoom=14;
                            }
                        }
                    );
                    if(_this.indexSubLayer<3) {
                        //openFeature();
                        actualizarComboUbigeo(_this.select_ubigeos,1);
                    }
                });
            });

            _this.view_map.on("click",function (event) {
                //console.log('click');
                localizarFeaturePorClick(event,function (feature) {
                      //console.log('feature>>>',feature);
                      selectedFeature(feature);
                });
            });

            _this.view_map.graphics.on('click',function (event) {
                console.log('click graphics',event);
            })

            _this.view_map.on('double-click',function (event) {
                if (_this.select_ubigeos.length==0 || ( _this.select_ubigeos.length==2 && _this.select_ubigeos[0]=='00')){
                    localizarFeaturePorClick(event,function (feature) {
                        selectedFeature(feature);
                        actualizarComboUbigeo(_this.select_ubigeos,1);
                        //openFeature();
                    });
                }
                else {
                    actualizarComboUbigeo(_this.select_ubigeos,1);
                    //openFeature();
                }

            });

            var seleccionarUbigeoPorBuscador= function (feature,index) {

                cleanVars();

                console.log('feature>>',feature);

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

                if(index==3){
                    _this.historic_features[0].nombres.push(feature.attributes.DEPARTAMENTO);
                    _this.historic_features[0].select_features.push(feature.attributes.CCDD);
                    _this.historic_features[1].nombres.push(feature.attributes.PROVINCIA);
                    _this.historic_features[1].select_features.push(feature.attributes.CCDD+feature.attributes.CCPP);
                    _this.historic_features[2].nombres.push(feature.attributes.DISTRITO);
                    _this.historic_features[2].select_features.push(feature.attributes.CCDD+feature.attributes.CCPP+feature.attributes.CCDI);
                }

                for (var i=0;i<index;i++) setLabelWidgetUbigeos(i);



                /**
                 * Tratamiento a nivel Departamental y Provincial
                 * **/

                if (index<3){
                    changeIndex(index);
                    selectedFeature(feature,event);
                    actualizarComboUbigeo(_this.select_ubigeos);
                    //openFeature();
                }

                /**Tratamiento especial a nivel Distrital
                 * **/


                /*else {
                    var i=index-1;
                    var def=getDefinitionExpresion(_this.historic_features[2].select_features,i);
                    updateMap(def,2,false);
                    selectedFeature(feature);
                    actualizarComboUbigeo(_this.historic_features[2].select_features);
                }*/

                else {
                    var i=index-1;
                    var def=getDefinitionExpresion(_this.historic_features[2].select_features,i);
                    updateMap(def,2,false);
                    changeIndex(index);
                    selectedFeature(feature,event);
                    updateMap(def,3,false);
                    actualizarComboUbigeo(_this.historic_features[2].select_features);
                    //console.log('feature>>',feature);
                }

                /*else {
                    var i=index-1;
                    var def=getDefinitionExpresion(_this.historic_features[1].select_features,i);
                    updateMap(def,2,false);
                    selectedFeature(feature);
                    //_this.view_map.goTo(feature.geometry.extent);
                    actualizarComboUbigeo(_this.historic_features[1].select_features);
                }*/
            }

            var actualizarBuscador = function (buscador){
                $(buscador).autocomplete({
                    serviceUrl: service.getUrlServer('dimensiones/territorio/autocomplete/'),
                    onSelect: function (Response) {
                        var codigo=Response.data;
                        var where=" CODIGO="+codigo;
                        var index=parseInt(Response.index)-2;
                        var indiceUbigeoEncontrado=_this.select_ubigeos.indexOf(codigo);
                        var origen='cpv2017_v2';
                        (index==3)?where=" CODIGO='"+codigo+"' and origen='"+origen+"'": where= " CODIGO="+codigo;

                        if(indiceUbigeoEncontrado<0){

                            getFeaturesUbigeos(where,index,function (features) {
                                features.forEach(function (feature) {
                                        seleccionarUbigeoPorBuscador(feature,index);
                                        if(index==3){
                                                var point=[feature.geometry.x,feature.geometry.y];
                                                _this.view_map.center=point;
                                                _this.view_map.zoom=14;
                                            }
                                        else{
                                            zoomToLayer(_this.view_map,_this.historic_features[_this.indexSubLayer].layer,where);
                                        }

                                    }

                                );

                            });

                        }







/*
                        if (indiceUbigeoEncontrado==-1){
                            getFeaturesUbigeos(where,index,function (features) {
                                features.forEach(function (feature) {
                                        seleccionarUbigeoPorBuscador(feature,index);
                                        zoomToLayer(_this.view_map,_this.historic_features[_this.indexSubLayer].layer,where);
                                    }
                                );
                            });

                        }*/
                    },
                    width:"flex",
                });
            }


            _this.view_map.popup.on("trigger-action", function(event) {
                actualizarComboUbigeo(_this.select_ubigeos,1);
            });

            _this.view_map.when(function () {
                var xsearch=$("[class='esri-search__sources-button esri-widget-button']")
                xsearch.css('display','none');
                _this.datosMap.divLegend.innerHTML=crearLegenda(_this.datosMap.optionsSublayers[0]);
            });

            _this.view_map.whenLayerView(_this.layer)
                .then(function (layerView) {
                    console.log('layerView',layerView.layer.sublayers["onafter-changes"]);
                })
                .catch(function (error) {
                    console.log('error',error);
                });
            _this.view_map.watch("animation", function(response){
                if(response && response.state === "running"){
                //    $('#cargarMapaDiv').css('display','inline');
                }

            });


            function mostrarCargando(){
                $('#cargarMapaDiv').css('display','inline');
            }

            function ocultarCargando(){
                if(!(_this.view_map.updating)){
                    $('#cargarMapaDiv').css('display','none');
                }
            }

            var actualizarDatosComboUbigeo = function (data,i){
                //var _this=parent.mapas;
                var placeholder="Seleccione una opcion";
                $selectUbigeo.html('').select2({data: [{id:"",text:""}]});
                $selectUbigeo.select2({
                    tags: "true",
                    placeholder: _this.VALORES_STATIC[i].placeholders,
                    allowClear: true,
                    data:data
                });
            }

    var actualizarComboUbigeo=function(ubigeos,flagAbrir){ //
        var results= new Object();
        results["results"]='';
        service.mapas.getTerritorioSelect2(ubigeos,function(data){

            ubigeosHijos=[];
            if(ubigeos.length==0)
            {
                actualizarDatosComboUbigeo(data.results,0);
                data.results.forEach(function (hijo) {
                ubigeosHijos.push(hijo.id.trim());
                });
            }


            else {
                actualizarDatosComboUbigeo(data.results,_this.indexSubLayer+1);
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
                if(flagAbrir) openFeature();
            }





            //console.log('ubigeosHijos>>>',ubigeosHijos);

            });
        }



            setInterval(ocultarCargando,1000);
            changeLayer(0);
            actualizarComboUbigeo(_this.select_ubigeos);

            actualizarBuscador('#buscador-ubigeo');
            actualizarBuscador('#buscador-ubigeo2');
            desplegarWidgetsNavegacion(0);




        });

    };


    var cambiarMapaRender = function (optionsSublayers) {

        require([
            "esri/widgets/Legend",
            "dojo/domReady!"
        ],function (Legend){
            var _this=parent.mapas;
            var i=_this.indexSubLayer
            var codTematico=_this.datosMap.codTematico;
            var htmlLengenda=crearLegenda(optionsSublayers[i]);
            var op=_this.layer.sublayers.items[3].visible;

            _this.datosMap.optionsSublayers=optionsSublayers;
            _this.layer.url=_this.datosMap.urlMap;
            _this.layerBack.url=_this.datosMap.urlMap;
            _this.datosMap.renderOptionsSublayers=getListSublayerTematico(optionsSublayers);
            _this.datosMap.renderOptionsSublayersBack=getListSublayerTematicoBack(optionsSublayers);


            optionsSublayers.forEach(function (sublayer,j) {
                var breaks=parent.getClassBreakInfoSublayerTematico(sublayer.renderer,{width:1});
                if(j==i && op==true)
                {breaks=parent.getClassBreakInfoSublayerTematico(sublayer.renderer);
                 _this.layerBack.sublayers.items[j].labelsVisible=false;
                }


                _this.layer.sublayers.items[j].renderer=renderizadoClassBreaks(codTematico,breaks);
                _this.layerBack.sublayers.items[j].renderer=parent.renderBack();
            });
            _this.layer.title= _this.datosMap.optionsSublayers[0].title;
            _this.datosMap.divLegend.innerHTML=htmlLengenda;

            var indexMinimap=i;
            if(indexMinimap<2){indexMinimap++;}
            _this.listMiniMapas.forEach(function (layer) {
                layer.url=_this.datosMap.urlMap;
                layer.sublayers.items[0].renderer = _this.datosMap.renderOptionsSublayers[indexMinimap].renderer;
            });

            var legend=document.getElementById("legendaMiniMap");
            legend.innerHTML=crearLegenda(_this.datosMap.optionsSublayers[indexMinimap]);
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
        _this.panelDivGrafico= document.getElementById("mapaGraficoPanel");
        _this.panelDiv= document.getElementById("panel");
        _this.ubigeos = [];

        if (options.vista == 'indicadores') {
            list_mapas=[{div:'viewDiv',cod_mapa:'P01'}];
        }

        list_mapas.forEach(
            function (el,index) {
                service.mapas.getMapa(el.cod_mapa,function (data) {
                    _this.datosMap.codMap=el.cod_mapa;
                    _this.datosMap.urlMap=data.url;
                    _this.datosMap.urlMapBaseNacional="https://devindica.inei.gob.pe/mapa/arcgis/rest/services/CARTOGRAFIA_BASE_INEI/BASE_NACIONAL/MapServer";
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
        listCcpp: listCcpp,
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
        layerBack: layerBack,
        ccppLyr: ccppLyr,
        layerBaseNacional : layerBaseNacional,
        cod_map:codMap,
        datosMap: datosMap,
        legend: legend,
        indexSubLayer :indexSubLayer,
        uiMouseOutTabla:uiMouseOutTabla,
        VALORES_STATIC: VALORES_STATIC,
        $selectUbigeo: $selectUbigeo,
        ubigeos: ubigeos,
        actualizarMapaPorUbigeos:actualizarMapaPorUbigeos,
        seleccionarUbigeosMapa: seleccionarUbigeosMapa,
        divMessageContentEmpty:divMessageContentEmpty,
        listMiniMapas:listMiniMapas,
        ordenarUbigeos:ordenarUbigeos,
        ubigeosOrdenadosFinal: ubigeosOrdenadosFinal,
    }

})(App.utils, AppConfig() ,App.service );