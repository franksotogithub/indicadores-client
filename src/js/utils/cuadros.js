/**
 * Utils para manejar las tablas de indicadores Online
 * @memberOf App.utils
 */
App.utils.cuadros = (function (config, appData, parent, service) {
    // Atributos privados
    var cuadrosData = {
        categoria: "01",
        ubigeo: "00",
        ubigeos: ["00"],
        poblacion: {

        }
    };

    /**
     * constructor del modululo cuadros
     * @constructor
     * @param {{}} options - json con la vista que llama el metodo
     */
    var init = function (options) {
        appData = appData();
        this.vista = options.vista;
        if (options.vista == 'indicadores') {
            _initIndicadores(this, options.vista);
            parent.graficos.initIndicador(this);
        }
        else if (options.vista == 'pobreza') {
            _initPobreza(this, options.vista);
        }
    };

    // Metodos privados

    var _initIndicadores = function (_this, vista) {
        _crearTabsCategorias(appData.categorias, vista);
        _this.crearTablaUigeos(['00'], []);
    };

    var _initPobreza = function (_this, vista) {
        App.categoria = 'P07';
        _this.expardirVentana = true;
        _crearTabsCategorias(appData.categorias, vista);
        _this.crearTablaUigeos([], []);
    };

    var _crearTabsCategorias = function (datos, vista) {
        var tabsTemplate = function (dato) {
            var clase='';
            if (dato.esActivo) {
                clase = ' btnTabTabla-activo';
            }
            return '<button class="tablaTabButton'+clase+'" data-categoria="'+dato.codigo+'">'+dato.titulo+'</button>';
        };

            // Agregado por DMK

            var listaTemplate = function (dato) {
                var clase='';
                if (dato.esActivo) {
                    clase = 'selected';
                }
                return '<li data-selected="'+clase+'" data-categoria="'+dato.codigo+'">'+dato.titulo+'</li>';
            };


        var html = '';
        var html2 = '';
        for (var i=0;i<datos.length;i++) {
            if (datos[i]["sistema"] == vista) {
                html += tabsTemplate(datos[i]);
                html2 += listaTemplate(datos[i]);
            }
        }

        $("#tabsCategoria").html(html);
        $("#comboCategoria ul").html(html2);

    };

    /**
     * @module CabeceraTabla
     *
     * @memberOf module:CabeceraTabla
     * @param ubigeo
     * @returns {{titulo: string, colspan: string, children: [null,null], ubigeo: *}}
     * @private
     */
    var _cabeceraTemplate = function (ubigeo) {
        return {
            "titulo": (appData.titulo.hasOwnProperty('U'+ubigeo)) ? appData.titulo['U'+ubigeo] : '',
            "colspan": "2",
            "children": [
                {
                    "titulo": "Absoluto"
                },

                {
                    "titulo": "%"
                }
            ],
            "ubigeo": ubigeo
        };
    };

    /**
     * Crea el titilo de la cabecera de la tabla segun nivel de territorio
     * @memberOf module:CabeceraTabla
     * @param ubigeo
     * @param titulo
     * @returns {*}
     * @private
     */
    var _tituloNivel = function (ubigeo, titulo) {
        if (ubigeo.length == 2 && ubigeo !="00") {
            return "DPTO<br />"+titulo;
        }else if (ubigeo.length == 4) {
            return "PROV<br />"+titulo;
        }else if (ubigeo.length == 6) {
            return "DIST<br />"+titulo;
        }else {
            return titulo;
        }
    };

    /**
     * Genera el thead de la cabecera de la tabla
     * @param cabecera - estructura json jerárquico de la cabecera de la tabla
     * @private
     */
    var _crearCabecera = function (cabecera) {
        var thead = '<tr>';
        var childrens = [];
        for (var i=0; i<cabecera.length;i++) {
            var v = cabecera[i];
            var rowspan = (v.rowspan !== undefined) ? ' rowspan="'+v.rowspan+'"' : '';
            var colspan = (v.colspan !== undefined) ? ' colspan="'+v.colspan+'"' : '';
            var clase = '';
            if (v.codigo == '01') {
                clase = ' class="thorden" style="display: none;"';
            }else if (v.codigo == '02') {
                clase = ' class="thindicador"';
            }

            var th = '<th'+rowspan+colspan+clase+' ubigeo="'+v.ubigeo+'">'+_tituloNivel(v.ubigeo, v.titulo)+'</th>';

            thead += th;

            if (v.children !== undefined) {
                childrens = childrens.concat(v.children);
            }
        }
        thead += '</tr>';

        if (childrens.length > 0) {
            thead += '<tr>';
            for (var j=0; j<childrens.length;j++) {
                var k = childrens[j];
                thead += '<th>'+k.titulo+'</th>'
            }
            thead += '</tr>';
        }

        $("#tblindicadores thead").html(thead);
        $("#tblindicadores thead").hide();
        $("#tblindicadores tbody").html("");

    };

    /**
     * Genera la cabecera dinamicamente pivoteando por ubigeo
     * @param ubigeos - listado de ubigeos ordenados de acuerdo a lo elegido
     * @private
     */
    var _cabeceraUigeos = function (ubigeos) {
        var cabecera = [
            {
                "codigo": "01",
                "titulo": "Orden",
                "rowspan": "2",
                "ubigeo":""
            },
            {
                "codigo": "02",
                "titulo": "VARIABLE / INDICADOR",
                "rowspan": "2",
                "ubigeo":""
            }
        ];
        for (var i=0;i<ubigeos.length;i++) {
            cabecera.push(_cabeceraTemplate(ubigeos[i]));
        }
        _crearCabecera(cabecera);
    };

    /**
     * Crear la tabla con datatable
     * @param table - ID de la tabla
     * @param data - Data del servicio
     * @param columns - columnas dinamicas a pintar
     * @param targets - Selectore para el columndef
     * @private
     */
    var _crearTabla= function (table, data, columns, targets) {
        $(".theadindicadores").show();
        return $(table).DataTable({
            data: data,
            order: [[0, 'asc']],
            columnDefs: [
                {
                    targets: 0,

                    render: function (data, type, row) {
                        var orden = '';
                        if (appData.tituloIndicadores.hasOwnProperty(data)){
                            var v = appData.tituloIndicadores[data];
                            orden = v.orden;
                        }
                        return orden;
                    }
                },
                {
                    targets: 1,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if (appData.tituloIndicadores.hasOwnProperty(cellData)){
                            var v = appData.tituloIndicadores[cellData];
                            if (v.cod_nivel_tematico == 2) {
                                $(td).addClass('tituloIndicador');
                            }
                            $(td).addClass("popover");
                            $(td).attr('data-popover', appData.tituloIndicadores[cellData].titulo);
                        }
                    },

                    render: function (data, type, row) {
                        var titulo = '';
                        if (appData.tituloIndicadores.hasOwnProperty(data)){
                            var v = appData.tituloIndicadores[data];
                            titulo = (v.cod_nivel_tematico == 2) ? v.subcategoria : v.indicador;
                        }
                        return titulo;
                    }
                },
                {
                    targets: targets.absoluto,
                    render: function (data, type, row) {
                        data = parent.round(data,1);
                        if (data != 0) {
                            return parent.numberFormat(data);
                        }else {
                            return "";
                        }

                    },
                    createdCell: function (td, cellData, rowData, row, col) {
                        $(td).addClass('millones');
                    }
                },
                {
                    targets: targets.porcentual,
                    render: function (data, type, row) {
                        data = parent.round(data,1);
                        if (data != 0) {
                            return data.toFixed(1);
                        } else if (row.cod_nivel_tematico == 2) {
                            return "";
                        }
                        else {
                            return "--";
                        }
                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {},
            paging: false,
            info: false,
            columns: columns,
            ordering: false,
            searching: false,
            scrollX:   true,
            scrollCollapse: true,
            fixedColumns: {
                leftColumns: 2
            },
            scrollY: _getAltoTabla('px'),
            processing: true,
            serverSide: false
        });
    };

    var _getAltoTabla = function (px) {
        var tam_ventana1 = $(window).height();
        var totalVentana = 0;
        if(tam_ventana1 <= 800){
            totalVentana = (tam_ventana1 - 280);
        } else{
            totalVentana=(tam_ventana1 - 280);
        }
        if (px == 'px') {
            totalVentana = totalVentana.toString() + 'px';
        }

        return totalVentana;

    };

    var _destruirTabla = function (_this) {
        if (_this.tblIndicadores !== undefined) {
            _this.tblIndicadores.destroy();
            _this.tblIndicadores.clear().draw();
        }
    };

    var _cargandoTabla = function () {
        $("#loadindicadores").show();
    };

    var _getTalaColumn = function (ubigeos) {
        var columns = [
            {"data": "cod_tematico", visible: false},
            {"data": "cod_tematico"}
        ];
        for (var i=0; i<ubigeos.length; i++) {
            var v = ubigeos[i];
            columns.push({"data": "absoluto_"+v});
            columns.push({"data": "porcentaje_"+v})
        }

        return columns;
    };

    var _crear_target = function (total) {
        var i = 2;
        var target_absoluto = [];
        var target_porcentual = [];
        for (i;i<=(total*2)+1;i++) {
            if (i%2 == 0) {
                target_absoluto.push(i);
            }else {
                target_porcentual.push(i);

            }
        }
        return {"absoluto": target_absoluto, "porcentual": target_porcentual};
    };

    // Metodos publicos
    var crearTablaUigeos = function (ubigeos, historico) {

        var _this = this;


        _cargandoTabla();
        _destruirTabla(this);

        var callback = function () {
            // Crear cabecera de la tabla segun los ubigeos indicadors
            _cabeceraUigeos(ubigeos);
            // Crear Estructura Json para renderizado de la tabla

            _this.tablaColumns = _getTalaColumn(ubigeos);
            _this.target = _crear_target(ubigeos.length);

            // Instanciar el servicio
            service.cuadros.getIndicadores(ubigeos, _this.vista, function () {
                _this.tblIndicadores = _crearTabla(
                    '#tblindicadores',
                    service.cuadros.indicadores[App.categoria],
                    _this.tablaColumns,
                    _this.target
                );

                $("#loadindicadores").hide();
            });
        };

        // Crear cabecera

        if (ubigeos.length > 1 && !this.expardirVentana) {
            this.expardirVentana = true;
            minimizarVentana($(".ventanaGrafico .minimizar"), callback)
        }else {
            callback();
        }
    };

    var crearTablaCategoria = function (categoria) {
        App.categoria = categoria;
        $("#loadindicadores").show();
        if (this.tblIndicadores !== undefined) {
            this.tblIndicadores.destroy();
            //this.tblIndicadores.clear().draw();
        }

        this.tblIndicadores = _crearTabla(
            '#tblindicadores',
            service.cuadros.indicadores[App.categoria],
            this.tablaColumns,
            this.target
        );

        //this.fixedColumnsRelayout();

        $("#loadindicadores").hide();
    };

    var reiniciarTabla = function () {
        this.crearTablaUigeos(this.cuadrosData.ubigeos, []);
    };

    var mapasChangeEvent = function (options) {

        var _this = this;
        if (this.timeClikMap !== undefined) {
            clearTimeout(this.timeClikMap);
        }

        this.cuadrosData.ubigeos = options.ubigeosOdenados;
        this.timeClikMap = setTimeout(function(){
            _this.crearTablaUigeos(options.ubigeosOdenados, []);
            _this.timeClikMap = undefined;
        }, 1200);

        //this.cuadrosData.ubigeo = options.ubigeo.slice()[0];
        //parent.graficos.comboIndicaDores(options.ubigeo);
        //parent.graficos.indicadores(this.cuadrosData.categoria, this.cuadrosData.ubigeo);
        console.log("mapasChangeEvent >>", options);
    };

    var uiMaxCallback = function (options) {
        console.log(">> uiMaxCallback", options);
        $(".cuadroMinimizado").removeClass("col-10-10").addClass("col-7-10");
        $(".busquedaMaximizadaCuadro").addClass("CuadroActivoBusqueda");


        var _this= this;


        _this.fixedColumnsRelayout();

        console.log("finalizar uiMaxCallback")
    };

    var uiNormalCallback = function (options) {
        $(".cuadroMinimizado").removeClass("col-7-10").addClass("col-10-10");
        $(".busquedaMaximizadaCuadro").removeClass("CuadroActivoBusqueda");
        $(".busquedaCuadro").show();
        this.fixedColumnsRelayout();

    };

    var uiReabrirVentana = function () {
        this.fixedColumnsRelayout();
    };

    var fixedColumnsRelayout = function () {
        if (this.tblIndicadores !== null) {
            this.tblIndicadores.columns.adjust().draw();
            this.tblIndicadores.fixedColumns().relayout();
        }
    };

    var categoriaChangeEvent = function (options) {
        // Fixme: temporalmente se quitara el P para dejar solo 2 digitos de codigo
        var categoria = options.categoria.substring(1,3);
        this.cuadrosData.categoria = categoria;
        this.crearTablaCategoria(categoria);
        parent.graficos.indicadores(this);

    };

    var getContenidoPopupMapaEvent = function (options) {


        var data = {
            "titulo":  {"total": 876542, "text":"Población Censada"},
            "resufixedColumnsRelayouten": [ {"icon": "icon-user rojo","valor":  "467 135"} , { "icon":"icon-user-female", "valor":"447 895"}  ],
            "grafico": { }
        };

        parent.graficos.popupMapa(data, '002', '00', {
            title: {
                text: ''
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        x:0,
                        y: 50,
                        distance: -10,
                        style: {
                            textShadow: null,
                            textOutline: 0,
                            fontSize: "10px"
                        }
                    }
                }
            }
        }, options.callback);

        //options.callback(data);
    };

    var uiMinimizarVentana = function (options) {
        this.fixedColumnsRelayout();
    };

    return {
        init: init,
        tblIndicadores: undefined,
        tablaIndicadores: undefined,
        tablaColumns: [],
        expardirVentana: false,
        timeClikMap: undefined,
        vista: 'indicadores',
        target: {"absoluto": [2], "porcentual": [3]},
        crearTablaUigeos: crearTablaUigeos,
        crearTablaCategoria: crearTablaCategoria,
        uiMaxCallback: uiMaxCallback,
        mapasChangeEvent: mapasChangeEvent,
        uiNormalCallback: uiNormalCallback,
        categoriaChangeEvent: categoriaChangeEvent,
        fixedColumnsRelayout: fixedColumnsRelayout,
        uiReabrirVentana: uiReabrirVentana,
        getContenidoPopupMapaEvent: getContenidoPopupMapaEvent,
        uiMinimizarVentana: uiMinimizarVentana,
        reiniciarTabla: reiniciarTabla,
        graficoCategoria: {},
        cuadrosData: cuadrosData
    }
})(AppConfig(), Appdata, App.utils, App.service);