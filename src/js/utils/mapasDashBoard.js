App.utils.mapasDashBoard = (function (parent, config,service) {
    var listMapas = undefined;

    var listLayers= new Object();

    var map = undefined;

    var estadoResize = 1;

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

    var datosMap={
        urlMap:undefined,
        codTematico:undefined,
        codMap:undefined,
        classBreakinfos:undefined,
        tituloLegend:undefined,
        optionsSublayers:undefined,
        renderOptionsSublayers:undefined,
        renderOptionsSublayersBack:undefined,
    };

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

    var  createSymbol=function(color,type,style,outlineOptions,size) {
        var symbol={};

        symbol= {
            type: type,
            color: color,
            outline: outlineOptions,
            style: style,
        };
        if (size!==undefined)
            symbol.size=size;

        return symbol;
    }

    var renderizadoClassBreaks = function(indicador,classBreakinfo){
        var renderer = {
            type: "class-breaks",
            field: indicador,
            defaultSymbol: {
                type: "simple-fill",
                color: "white",
                outline: {
                    width: 0,
                }
            },
            defaultLabel: "Otro",
            classBreakInfos: classBreakinfo,
        };
        return renderer;
    };

    var zoomGlobal = function () {

        var zoom;
        var tamW = $(window).height();
        if(tamW >= 900){zoom=6;
        }else if(tamW <= 899 && tamW >= 715 ){zoom=5;
        }else if(tamW <= 714){zoom=4;}
        console.log(tamW+" Es el ZOom");
        return zoom;
    }


    var descargarMapaEvent = function(callback){
        require([

            "esri/tasks/PrintTask",
            "esri/tasks/support/PrintTemplate",
            "esri/tasks/support/PrintParameters",

            "dojo/domReady!"
        ],function (PrintTask,PrintTemplate,PrintParameters){

        });

    };



    var getListSublayerTematico = function (optionsSublayers,datosMap) {
        var _this=parent.mapasDashBoard;
        var renderOptionSublayer = undefined;
        var codTematico = datosMap.codTematico;
        var res=[];
        var layer=undefined;

        var oulineOptions={width:1};
        if(datosMap.layer!==null && datosMap.layer!==undefined)
            layer=parseInt(datosMap.layer);

        optionsSublayers.forEach(function (sublayer) {
            renderOptionSublayer= new Object();
            renderOptionSublayer.id=parseInt(sublayer.id);
            renderOptionSublayer.title=sublayer.title;
            renderOptionSublayer.labelsVisible=sublayer.labelsVisible;
            renderOptionSublayer.outFields=['*'];
            renderOptionSublayer.visible=true;

            renderOptionSublayer.renderer=renderizadoClassBreaks(codTematico,parent.getClassBreakInfoSublayerTematico(sublayer.renderer,oulineOptions));


            if(layer==undefined)
                res.push(renderOptionSublayer);
            else
            {
                if(layer==parseInt(sublayer.id))
                {
                    if (layer==2)
                    {   oulineOptions=undefined;
                        renderOptionSublayer.renderer=renderizadoClassBreaks(codTematico,parent.getClassBreakInfoSublayerTematico(sublayer.renderer,oulineOptions));
                        renderOptionSublayer.labelsVisible=false;
                    }
                    else if(layer==1)
                    {
                        renderOptionSublayer.labelsVisible=false;
                    }
                    res.push(renderOptionSublayer);
                }

            }
        });

        if(layer>0){
            var limDep=optionsSublayers[0];
            renderOptionSublayer= new Object();
            renderOptionSublayer.id=limDep.id;
            renderOptionSublayer.labelsVisible=true;
            renderOptionSublayer.visible=true;
            renderOptionSublayer.renderer=parent.renderLines();
            res.push(renderOptionSublayer);
        }

        return res
    }

    var crearLegenda=function(datosMap,data){


        console.log('datosMap>>',datosMap);
        console.log('data>>>',data);
        var html=

            '<div class="esri-legend__layer-table esri-legend__layer-table--size-ramp">' +
            '<div class="esri-legend__layer-body" >' ;

             html+='<div class="esri-legend__layer-row" style="height:20px; width: 180px" >';
             html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--symbols" style="height:20px;">';
             html+='<div style="opacity: 1; background-color:transparent;  width:20px;height:20px "></div>';
             html+='</div>';
             html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; font-weight: bold;">'+data.title+'</div>';

            if (datosMap.layer>0){
             html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px; font-weight: bold;">2007</div>';
             html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px; font-weight: bold;">2017</div>';
            }

             html+='</div>';

        if(datosMap.layer>0){

            var total1=0;
            var total2=0;
            data.renderer.forEach(function (el,index) {
                total1=parseFloat(el.label1)+total1;
                total2=parseFloat(el.label2)+total2;
            });

            html+='<div class="esri-legend__layer-row" style="height:20px; width: 180px" >';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--symbols" style="height:20px;">';
            html+='<div style="opacity: 1; background-color:transparent;  width:20px;height:20px "></div>';
            html+='</div>';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px;">Total</div>';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px;">'+total1+'</div>';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px;">'+total2+'</div>';
            html+='</div>';
        }




        data.renderer.forEach(function (el,index) {
            html+='<div class="esri-legend__layer-row" style="height:20px; width: 180px" >';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--symbols" style="height:20px;">';
            html+='<div style="opacity: 1; background-color:'+el.color+';  width:20px;height:20px "></div>';
            html+='</div>';
            html+='<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px;">'+el.label+'</div>';
            if(datosMap.layer>0) {
                html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px;">' + el.label1 + '</div>';
                html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px;width: 60px;">' + el.label2 + '</div>';

                /*if (_this.maximizado){
                    html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px;">' + el.label1 + '</div>';
                    html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px;width: 60px;">' + el.label2 + '</div>';
                }
                else{
                    if (datosMap.anio=='2007')
                    {html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px">' + el.label1 + '</div>';}
                    else(datosMap.anio=='2017')
                    {html += '<div class="esri-legend__layer-cell esri-legend__layer-cell--info" style="height:20px; width: 60px">' + el.label2 + '</div>';}
                }*/
            }
            html+='</div>';
        });


        html+=
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</div>';
        datosMap.divLegend.innerHTML=html;
    }

    var crearMapaRender= function(optionsSublayers,datosMap){

        require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",
            "esri/widgets/Legend",
            "dojo/domReady!"],function (Map, MapView, MapImageLayer,FeatureLayer,Legend) {

            var _this=parent.mapasDashBoard;
            var urlMap = datosMap.urlMap;
            var titulo=datosMap.tituloLegend;
            var renderOptionsSublayers=getListSublayerTematico(optionsSublayers,datosMap);


            _this.listLayers[datosMap.div] = new MapImageLayer({
                url: urlMap,
                sublayers: renderOptionsSublayers,
                title: titulo
            });

            /*
            var map = new Map({
                layers: _this.listLayers[datosMap.div],

            });*/

            _this.map = new Map({
                layers: _this.listLayers[datosMap.div],
                //layers: layer,
            });

            _this.map.on("load",function(){

            });

            var center=[-70.000, -9.500];
            if (_this.maximizado){center=[-70.000, -9.500];}

            var view = new MapView({
                container: datosMap.div,
                map: _this.map,
                center: center,
                zoom : zoomGlobal(),
            });
            view.ui.components = [];

            view.when(function () {
                if(datosMap.divWidgetSelect!=null && datosMap.divWidgetSelect!=undefined){view.ui.add(datosMap.divWidgetSelect, "top-left");}
                if(datosMap.divLegend!=null && datosMap.divLegend!=undefined){view.ui.add(datosMap.divLegend, "top-right");}
                if(datosMap.buttomInfo!=null && datosMap.buttomInfo!=undefined){view.ui.add(datosMap.buttomInfo, "top-left");}
                if(datosMap.divAnio!=undefined){view.ui.add(datosMap.divAnio, "top-left");}


            });

            if(!(datosMap.divLegend==null )){crearLegenda(datosMap,optionsSublayers[datosMap.layer]);}

        });
    }

    var cambiarMapaRender = function (optionsSublayers,datosMap) {
        require([
            "esri/widgets/Legend",
            "dojo/domReady!"
        ],function (Legend){
            var _this=parent.mapasDashBoard;
            var renderOptionsSublayers=getListSublayerTematico(optionsSublayers,datosMap);
            _this.listLayers[datosMap.div].url=datosMap.urlMap;
            _this.listLayers[datosMap.div].sublayers=renderOptionsSublayers;
            crearLegenda(datosMap,optionsSublayers[datosMap.layer]);
        });
    };

    var cambiarMapa = function(datosMap){
        service.mapas.getLegenda(datosMap, cambiarMapaRender);
    }

    var crearMapa = function(datosMap){
        service.mapas.getLegenda(datosMap,crearMapaRender)
    }

    var requireEvents = function () {
        cambiarMapa(codMap,codTematico,url,titulo);
    };



    var dashboardWidgetChangeEvent = function (options) {



    }
    var listBloques=['bloque1','bloque2','bloque3','bloque4'];


    var listMapas=
        [
            {divParent:'location_on_bloque2',id:'mapa1',div:'mapa21',codMapa:'DASH2007',anio:'2007',inicial:true,visibility:'visible',display:'inline-block',bloque:'bloque2',vista:'vista0',codTematico:'P0001' ,inicialVista:true ,layer:0,titulo:"PERÚ:POBLACION CENSADA,2007 Y 2017",
                info:'1/ Comprende los 43 distritos de la provincia de Lima.<br>' +
                     '2/ Comprende las provincias de Barranca, Cajatambo,' +
                     'Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br><br>' +
                     'Fuente: Instituto Nacional de Estadística e Informática <br>'+
                     'Censos Nacionales de Población y Vivienda.<br><br>'+
                     'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización'+
                     'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la'+
                     'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones'+
                     'existentes son de carácter referencial”.',

            },
            {divParent:'location_on_bloque2',id:'mapa2',div:'mapa22',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'hidden',display:'inline-block',bloque:'bloque2',vista:'vista0',codTematico:'P0001' ,inicialVista:false,layer:0,titulo:"PERÚ:POBLACION CENSADA,2007 Y 2017",
                info:''
            },
            {divParent:'location_on_bloque2',id:'mapa3',div:'mapa21',codMapa:'DASH2007',anio:'2007',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque2',vista:'vista1',codTematico:'D0002',inicialVista:true ,layer:0,titulo:"PERÚ: DEPENDENCIA DEMOGRÁFICA, 2007 Y 2017 (Razón de dependencia demográfica(1))",
                info:'(1) Es la relación de la población de 0 a 14 años más la población\n' +
                'de 65 y más, entre la población de 15 a 64 años de edad.<br>' +
                '1/ Comprende los 43 distritos de la provincia de Lima.<br>' +
                '2/ Comprende las provincias de Barranca, Cajatambo,\n' +
                'Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br><br>' +
                'Fuente: Instituto Nacional de Estadística e Informática -\n' +
                'Censos Nacionales de Población y Vivienda<br><br> ' +
                'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización\n' +
                'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la\n' +
                'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones\n' +
                'existentes son de carácter referencial”.',

            },
            {divParent:'location_on_bloque2',id:'mapa4',div:'mapa22',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'hidden',display:'inline-block',bloque:'bloque2',vista:'vista1',codTematico:'D0002' ,inicialVista:false,layer:0,titulo:"PERÚ: DEPENDENCIA DEMOGRÁFICA, 2007 Y 2017 (Razón de dependencia demográfica(1))",
                info:''
            },
            {divParent:'location_on_bloque2',id:'mapa5',div:'mapa21',codMapa:'DASH2007',anio:'2007',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque2',vista:'vista2',codTematico:'I0003',inicialVista:true ,layer:0,titulo:"PERÚ: ÍNDICE DE MASCULINIDAD,SEGÚN DEPARTAMENTO, 2007 Y 2017",
                info:'1/ Comprende los 43 distritos de la provincia de Lima.<br>\n' +
                '2/ Comprende las provincias de Barranca, Cajatambo,\n' +
                'Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br><br>' +
                'Fuente: Instituto Nacional de Estadística e Informática -\n' +
                'Censos Nacionales de Población y Vivienda.<br><br>\n' +
                'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización\n' +
                'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la\n' +
                'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones\n' +
                'existentes son de carácter referencial”. '
            },
            {divParent:'location_on_bloque2',id:'mapa6',div:'mapa22',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'hidden',display:'inline-block',bloque:'bloque2',vista:'vista2',codTematico:'I0003' ,inicialVista:false,layer:0,titulo:"PERÚ: ÍNDICE DE MASCULINIDAD,SEGÚN DEPARTAMENTO, 2007 Y 2017",
                info:''
            },
            {divParent:'location_on_bloque3',id:'mapa7',div:'mapa31',codMapa:'DASH2007',anio:'2007',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque3',vista:'vista2',codTematico:'D0004',inicialVista:true ,layer:0,titulo:"PERÚ: DENSIDAD POBLACIONAL POR AÑOS CENSALES,SEGÚN DEPARTAMENTO, 2007 Y 2017 (Hab./ Km2)",
                info:'1/ Comprende los 43 distritos de la provincia de Lima.<br>\n' +
                '2/ Comprende las provincias de Barranca, Cajatambo,\n' +
                'Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br><br>' +
                'Fuente: Instituto Nacional de Estadística e Informática -\n' +
                'Censos Nacionales de Población y Vivienda.<br><br>' +
                'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización\n' +
                'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la\n' +
                'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones\n' +
                'existentes son de carácter referencial”.'
            },
            {divParent:'location_on_bloque3',id:'mapa8',div:'mapa32',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'hidden',display:'inline-block',bloque:'bloque3',vista:'vista2',codTematico:'D0004' ,inicialVista:false,layer:0,titulo:"PERÚ: DENSIDAD POBLACIONAL POR AÑOS CENSALES,SEGÚN DEPARTAMENTO, 2007 Y 2017 (Hab./ Km2)",
                info:''
            },
            {divParent:'location_on_bloque4',id:'mapa9',div:'mapa41',codMapa:'DASH2007',anio:'2007',inicial:true,visibility:'visible',display:'inline-block',bloque:'bloque4',vista:'vista0',codTematico:'P0001' ,inicialVista:true ,layer:1,titulo:"PERÚ: NÚMERO DE PROVINCIAS Y POBLACIÓN CENSADA,SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                info:'Fuente: Instituto Nacional de Estadística e Informática -\n' +
                'Censos Nacionales de Población y Vivienda<br><br>' +
                'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización\n' +
                'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la\n' +
                'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones\n' +
                'existentes son de carácter referencial”.'
            },
            {divParent:'location_on_bloque4',id:'mapa10',div:'mapa42',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque4',vista:'vista0',codTematico:'P0001' ,inicialVista:false ,layer:1,titulo:"PERÚ: NÚMERO DE PROVINCIAS Y POBLACIÓN CENSADA,SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                info:''
            },
            {divParent:'location_on_bloque4',id:'mapa9',div:'mapa41',codMapa:'DASH2007',anio:'2007',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque4',vista:'vista1',codTematico:'P0001' ,inicialVista:true ,layer:2,titulo:"PERÚ: NÚMERO DE DISTRITOS Y POBLACIÓN CENSADA,SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                info:'<strong>Nota:</strong> En 2007 autoridades no permitieron censo en el distrito de Carmen Alto, provincia\n' +
                'de Huamanga, departamento de Ayacucho.<br><br>' +
                'Fuente: Instituto Nacional de Estadística e Informática -\n' +
                'Censos Nacionales de Población y Vivienda.<br><br>' +
                'Ley Nº 27795 - Quinta Disposición Transitoria y Final de la Ley de Demarcación y Organización\n' +
                'Territorial: “En tanto se determina el saneamiento de los límites territoriales, conforme a la\n' +
                'presente Ley, las delimitaciones censales y/u otros relacionados con las circunscripciones\n' +
                'existentes son de carácter referencial”.'
            },
            {divParent:'location_on_bloque4',id:'mapa10',div:'mapa42',codMapa:'DASH2017',anio:'2017',inicial:false,visibility:'visible',display:'inline-block',bloque:'bloque4',vista:'vista1',codTematico:'P0001' ,inicialVista:false ,layer:2,titulo:"PERÚ: NÚMERO DE DISTRITOS Y POBLACIÓN CENSADA,SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                info:''
            },
        ];

    var limpiarContenedor=function(bloque){
        var content=document.getElementById('location_on_'+bloque);
        content.innerHTML="";
    }

    var iniciarMapas=function (listMapas,max) {
        var _this=parent.mapasDashBoard;
        var tam=listMapas.length;

        listMapas.forEach(
            function (el,index) {
                var divAnio=undefined;
                var tituloMapa=document.getElementById('location_on_titulo_'+el.bloque);
                var divLegend=undefined;
                var divWidgetSelect= undefined;
                var buttomInfo=undefined;
                var div=document.getElementById(el.div);
                var divParent=document.getElementById(el.divParent);

                if (tituloMapa==null )
                {
                    tituloMapa=document.createElement('h2')
                    tituloMapa.setAttribute('id','location_on_titulo_'+el.bloque);
                    divParent.appendChild(tituloMapa);
                }

                tituloMapa.innerHTML=el.titulo;

                var htmlSelect= '<option value="2007" selected>2007</option>' +
                                '<option value="2017">2017</option>'

                var w=parseInt(100.0/tam);


                if(div!==null) {
                    div.remove();
                }

                div = document.createElement("div");
                div.setAttribute("id",el.div);
                div.style.width=String(w)+'%';
                div.classList.add('height100');
                div.style.padding=0;
                div.style.margin=0;
                divParent.appendChild(div);
                div.style.display='inline-block';
                div.style.position='relative';


                if(index==0){
                    if(!(max)){
                        divWidgetSelect = document.createElement("select");
                        divWidgetSelect.classList.add('selectMapAnio');
                        divWidgetSelect.innerHTML=htmlSelect;
                        divWidgetSelect.setAttribute("id","select_"+el.bloque);
                        divWidgetSelect.addEventListener('change', function(){
                                var anio=this.value;
                                var maps=_this.listMapas.forEach(function (e) {
                                    if(e.anio==anio && e.vista==el.vista && e.bloque==el.bloque) {
                                        service.mapas.getMapa(e.codMapa,function (data) {
                                            var datosMap = new Object();
                                            datosMap.codMap=e.codMapa;
                                            datosMap.urlMap=data.url;
                                            datosMap.codTematico=e.codTematico;
                                            datosMap.div=el.div;
                                            datosMap.divLegend=divLegend;
                                            datosMap.layer=el.layer;
                                            datosMap.anio=anio;
                                            cambiarMapa(datosMap);
                                        });
                                    }

                                });
                            }
                        );
                    }
                    else{
                        divAnio=document.createElement('h2');
                        divAnio.innerHTML=el.anio;
                    }

                    buttomInfo=document.createElement("button");
                    buttomInfo.classList.add("locationInfo");
                    buttomInfo.innerHTML='<i class=\"material-icons \">info</i><div class=\"boxInfoMap\" style="text-align: left;font-size:10px "> '+el.info+'</div>';
                    divLegend= document.createElement("div");
                    divLegend.setAttribute("id","legend_"+el.bloque);
                    divLegend.style.backgroundColor='white';
                }

                else{

                    if(max){
                    divAnio=document.createElement('h2');
                    divAnio.innerHTML=el.anio;}
                }


                service.mapas.getMapa(el.codMapa,function (data) {
                    var datosMap = new Object();
                    datosMap.codMap=el.codMapa;
                    datosMap.urlMap=data.url;
                    datosMap.codTematico=el.codTematico;
                    datosMap.div=el.div;
                    datosMap.layer=el.layer;
                    datosMap.anio=el.anio;
                    datosMap.buttomInfo=buttomInfo;
                    datosMap.divAnio=divAnio;
                    datosMap.divWidgetSelect=divWidgetSelect;
                    datosMap.divLegend=divLegend;
                    crearMapa(datosMap);
                });

            }
        );
    }

    var dashboardVistaChangeEvent =function (options) {
        var _this=parent.mapasDashBoard;
        var bloque=options.bloque.id;
        var vista=options.vista.id;

        var list = _this.listMapas.filter(function (el) {
            if(_this.maximizado) {
                if(_this.estadoResize==2)
                {
                    return el.bloque == bloque && el.vista == vista;
                }

                else
                {
                    return el.bloque == bloque && el.vista == vista && el.inicialVista==true;
                }
            }
            else
            {return el.bloque==bloque && el.vista ==vista && el.inicialVista==true}

        });

        limpiarContenedor(bloque);

        if (_this.estadoResize==2 && _this.maximizado==true ){
            console.log('maximizado')
            iniciarMapas(list,true);
        }

        else{

            iniciarMapas(list,false);
        }


    }

    var uiMaxCallbackDashBoardEvent=function(options){
        var _this= parent.mapasDashBoard;
        var bloque=options.bloque;
        var vista=options.vista;

        var list = _this.listMapas.filter(function (el) {
            if(_this.estadoResize==2)
            {
                return el.bloque == bloque && el.vista == vista;
            }

            else
            {
                return el.bloque == bloque && el.vista == vista && el.inicialVista==true;
            }

        });

        _this.maximizado=true;
        limpiarContenedor(bloque);
        console.log('estadoResize>>>',_this.estadoResize);
        if (_this.estadoResize==1)
        {iniciarMapas(list,false);}
        else{iniciarMapas(list,true);}

    }

    var uiNormalCallbackDashBoardEvent=function(options){
        var _this= parent.mapasDashBoard;
        var bloque=options.bloque;
        var vista=options.vista;
        var list = _this.listMapas.filter(function (el) {
            return el.bloque==bloque && el.vista ==vista && el.inicialVista==true
        });

        _this.maximizado=false;
        limpiarContenedor(bloque);
        iniciarMapas(list,false);
    }

    var uiResizeCallbackDashBoardEvent=function (options) {
        var _this=parent.mapasDashBoard;
        var list=options.list;
        var anchoPantalla=options.anchoPantalla;
        var listaFinal=[];
        var estadoResizeTemp=1;


        console.log('anchoPantalla>>>',anchoPantalla);
        if (anchoPantalla<1080)
            estadoResizeTemp=1;

        else
            estadoResizeTemp=2;

        if (_this.estadoResize!=estadoResizeTemp) {  //se cambia el tamaño de la ventana
            list.forEach(function (element1) {
                _this.listMapas.forEach(function (element2) {
                    if (_this.maximizado) {
                        if (estadoResizeTemp==1){
                            if (element1.bloque == element2.bloque && element1.vista == element2.vista && element2.inicialVista==true) {
                                listaFinal.push(element2);
                            }

                        }

                        else {
                            if (element1.bloque == element2.bloque && element1.vista == element2.vista) {
                                listaFinal.push(element2);
                            }

                        }



                    }

                });
            });

            _this.listBloques.forEach(
                function (bloque) {
                    var mapasInicial = listaFinal.filter(function (el) {
                        return el.bloque == bloque
                    });

                    if(_this.maximizado) {
                        limpiarContenedor(bloque);
                        if (estadoResizeTemp == 1) {
                            iniciarMapas(mapasInicial, false);
                        }
                        else if (estadoResizeTemp == 2) {
                            iniciarMapas(mapasInicial, true);
                        }
                    }


                }
            );

            _this.estadoResize=estadoResizeTemp;

        }

    }

    var init = function (options) {
        var _this= parent.mapasDashBoard;
        var list = _this.listMapas.filter(function (el) {
            return el.inicial==true
        });

        //var bodys=document.width;

        var anchoPantalla=document.body.clientWidth;

        if(anchoPantalla<1080)
            _this.estadoResize=1
        else
            _this.estadoResize=2

        console.log('init estadoResize>>>',_this.estadoResize);
        console.log('init anchoPantalla>>>',anchoPantalla);

        _this.listBloques.forEach(
            function (bloque) {
                var mapasInicial=list.filter(function (el) {
                   return  el.bloque==bloque
                });

                iniciarMapas(mapasInicial,false);
            }
        );
    }

    return {
        init:init,
        requireEvents: requireEvents,
        historic_features: historic_features,
        select_ubigeos: select_ubigeos,
        maximizado : maximizado,
        view_map: view_map,
        panelDiv: panelDiv,
        crearMapa :crearMapa,
        cambiarMapa:cambiarMapa,
        listMapas : listMapas,
        cant_mini_maps:cantMiniMaps,
        opc_select:opc_select,
        panelDivGrafico:panelDivGrafico,
        layer:layer,
        cod_map:codMap,
        datosMap: datosMap,
        legend: legend,
        indexSubLayer :indexSubLayer,
        dashboardWidgetChangeEvent: dashboardWidgetChangeEvent,
        dashboardVistaChangeEvent :dashboardVistaChangeEvent ,
        uiMaxCallbackDashBoardEvent:uiMaxCallbackDashBoardEvent,
        uiNormalCallbackDashBoardEvent:uiNormalCallbackDashBoardEvent,
        uiResizeCallbackDashBoardEvent: uiResizeCallbackDashBoardEvent,
        maximizado:maximizado,
        listLayers: listLayers,
        listBloques:listBloques,
        estadoResize: estadoResize,
        map:map,

    }

})(App.utils, AppConfig() ,App.service );