/**
 * Utils para manejar las tablas de indicadores Online
 * @memberOf App.utils
 */
App.utils.cuadros = (function (config, appData, parent, service) {
    // Atributos privados
    var cuadrosData = {
        categoria: "P01",
        ubigeo: "00",
        ubigeos: ["00"],
        poblacion: {}
    };

    var uiDocuments = {
        clases: {
            "meta_def": $(".contenedorMetadatos .meta_def"),
            "meta_alg": $(".contenedorMetadatos .meta_alg"),
            "meta_var": $(".contenedorMetadatos .meta_var"),
            "meta_um": $(".contenedorMetadatos .meta_um"),
            "meta_cg": $(".contenedorMetadatos .meta_cg"),
            "meta_pt": $(".contenedorMetadatos .meta_pt")
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
        _crearSelectPonderador(appData.ponderadores);
        _this.crearTablaUigeos(['00'], []);
        //_this.crearTablaUigeos(['01','02','03','04','05','06','07','08'], []);
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
            var style = '';
            $.each(dato.style, function (k,v) {
                style += ' style="'+k+':'+v+'"'
            });
            return '<button class="tablaTabButton'+clase+'" data-categoria="'+dato.codigo+'" '+style+'>'+dato.titulo+'</button>';
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

    var _crearSelectPonderador = function (datos) {
        var optionTemplate = function (dato) {
            var attrs = '';
            $.each(dato.attrs, function (k,v) {
                attrs += ' '+k+'="'+v+'"';
            });
            return '<option value="'+dato.codigo+'" '+attrs+'>'+dato.titulo+'</option>'
        };

        var html = '';
        $.each(datos, function (k,v) {
            html += optionTemplate(v);
        });

        console.log(">>> ponderador html", html);

        $("#comboPonderador").html(html);
    };

    /**
     * @module CabeceraTabla
     *
     * @memberOf module:CabeceraTabla
     * @param ubigeo
     * @returns {{titulo: string, colspan: string, children: [null,null], ubigeo: *}}
     * @private
     */
    var _cabeceraTemplate = function (ubigeo, titulos) {
        return {
            "titulo": (titulos.hasOwnProperty(ubigeo)) ? titulos[ubigeo] : '',
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
    var tituloNivel = function (ubigeo, titulo, sepatator) {
        sepatator = (sepatator === undefined) ? '<br />' : sepatator;
        if (ubigeo.length == 2 && ubigeo !="00") {
            return "DPTO"+sepatator+titulo;
        }else if (ubigeo.length == 4) {
            return "PROV"+sepatator+titulo;
        }else if (ubigeo.length == 6) {
            return "DIST"+sepatator+titulo;
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
                clase = ' class="thorden"'; //style="display: none;"
            }else if (v.codigo == '02') {
                clase = ' class="thindicador"';
            }

            var th = '<th'+rowspan+colspan+clase+' ubigeo="'+v.ubigeo+'">'+tituloNivel(v.ubigeo, v.titulo)+'</th>';

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
    var _cabeceraUigeos = function (ubigeos, titulos) {
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
            cabecera.push(_cabeceraTemplate(ubigeos[i], titulos));
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
                { orderable: false, targets: '_all' },
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
                            $(td).attr('data-popover', appData.tituloIndicadores[cellData].descripcion);
                            $(td).attr('data-indicador', cellData);
                        }
                    },

                    render: function (data, type, row) {
                        var titulo = '';
                        if (appData.tituloIndicadores.hasOwnProperty(data)){
                            var v = appData.tituloIndicadores[data];
                            //titulo = (v.cod_nivel_tematico == 2) ? v.subcategoria : v.indicador;
                            titulo = v.titulo;
                        }
                        return titulo;
                    }
                },
                {
                    targets: targets.absoluto,
                    render: function (data, type, row) {
                        var es_cabecera = appData.tituloIndicadores[row.cod_tematico]["es_cabecera"];
                        data = parent.round(data,1);
                        if (es_cabecera != '1') {
                            if (data != 0) {
                                return parent.numberFormat(data);
                            }else {
                                return '--';
                            }

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
                        var es_cabecera = appData.tituloIndicadores[row.cod_tematico]["es_cabecera"];
                        data = parent.round(data,1);
                        if (es_cabecera != '1') {
                            return data.toFixed(1);
                        } else {
                            return "";
                        }
                    },

                    createdCell: function (td, cellData, rowData, row, col) {
                        var es_cabecera = appData.tituloIndicadores[rowData.cod_tematico]["es_cabecera"];
                        if (es_cabecera != '1') {
                            $(td).addClass('tooltip');
                            $(td).attr(
                                'data-title',
                                appData.tituloIndicadores[rowData.cod_tematico]["descripcion_porcentaje"]
                            );
                        }

                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {},
            paging: false,
            info: false,
            columns: columns,
            //ordering: false,
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

        totalVentana = (tam_ventana1 - 310);



        if (px == 'px') {
            totalVentana = totalVentana.toString() + 'px';
        }

        return totalVentana;

    };

    var _destruirTabla = function (_this) {
        console.log(">>>>> _this.tblIndicadores", _this.tblIndicadores);
        if (_this.tblIndicadores !== undefined) {
            _this.tblIndicadores.destroy();
            $('#tblindicadores tbody').html("");
            //_this.tblIndicadores.clear().draw();
        }
    };

    var _cargandoTabla = function () {
        $("#loadindicadores").show();
    };

    var _getTalaColumn = function (ubigeos) {
        var columns = [
            {"data": "cod_tematico", visible: false },
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
            //_cabeceraUigeos(ubigeos);
            // Crear Estructura Json para renderizado de la tabla

            _this.tablaColumns = _getTalaColumn(ubigeos);
            _this.target = _crear_target(ubigeos.length);

            // Instanciar el servicio
            service.cuadros.getIndicadores(ubigeos, appData, _this.vista, function (data, titulos) {
                _cabeceraUigeos(ubigeos, titulos);
                _this.tblIndicadores = _crearTabla(
                    '#tblindicadores',
                    data[_this.cuadrosData.categoria],
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
        console.log("categoria >>> ", categoria);
        console.log("servicios >>>", service.cuadros.indicadores);
        this.cuadrosData.categoria = categoria;
        $("#loadindicadores").show();
        if (this.tblIndicadores !== undefined) {
            this.tblIndicadores.destroy();
        }

        this.tblIndicadores = _crearTabla(
            '#tblindicadores',
            service.cuadros.indicadores[this.cuadrosData.categoria],
            this.tablaColumns,
            this.target
        );

        //this.fixedColumnsRelayout();

        $("#loadindicadores").hide();
    };

    var buscadorIndicadores = function (response){
        var _this = this;
        $("#loadindicadores").show();
        if (this.tblIndicadores !== undefined) {
            this.tblIndicadores.destroy();
            $("#tblindicadores tbody").html();
        }
        $(".contenidoCuadro").find('.tablaTabButton').removeClass('btnTabTabla-activo');
        service.cuadros.getBusquedaIndicador(response.codigo_subcategoria, response.data, this.cuadrosData.ubigeos,
            response.index, function (data) {
            _this.tblIndicadores = _crearTabla(
                '#tblindicadores',
                data,
                _this.tablaColumns,
                _this.target
            );
            $("#loadindicadores").hide();
        });
    };

    var reiniciarTabla = function () {
        this.crearTablaUigeos(this.cuadrosData.ubigeos, []);
    };

    /**
     * Metodo que desencadena el evento de click en el mapa utilizdo para generar la tabla
     * @param options
     */
    var mapasChangeEvent = function (options) {
        this.cuadrosData.ubigeos = options.ubigeosOdenados;
        this.crearTablaUigeos(options.ubigeosOdenados, []);
        this.cuadrosData.ubigeo = (options.ubigeosSeleccionados.length > 0) ? options.ubigeosSeleccionados.slice(-1).pop() : '00';
        parent.graficos.indicadores(this.cuadrosData.categoria, this.cuadrosData.ubigeo);
    };

    var uiMetaData = function () {

    };

    var uiMaxCallback = function (options) {
        console.log(">> uiMaxCallback", options);
        /*$(".cuadroMinimizado").removeClass("col-10-10").addClass("col-8-10");
        $(".busquedaMaximizadaCuadro").addClass("CuadroActivoBusqueda");*/


        var _this= this;


        _this.fixedColumnsRelayout();

        console.log("finalizar uiMaxCallback")
    };

    var uiNormalCallback = function (options) {
        $(".cuadroMinimizado").removeClass("col-8-10").addClass("col-10-10");
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

    var reloadTablaResponsive = function () {
        if (this.tblIndicadores !== null) {
            this.tblIndicadores.columns.adjust().draw();
        }
    };

    var categoriaChangeEvent = function (options) {
        this.crearTablaCategoria(options.categoria);
        parent.graficos.indicadores(options.categoria, '00');

    };

    var getContenidoPopupMapaEvent = function (options) {
        parent.graficos.popupMapa(this.cuadrosData.categoria, options.ubigeo,{
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
    };

    var uiMinimizarVentana = function (options) {
        this.fixedColumnsRelayout();
    };

    var changeMetadata = function (indicador) {
        var metadata = appData.tituloIndicadores[indicador];
        this.uiDocuments.clases.meta_def.children('p').html(metadata.definicion);
        this.uiDocuments.clases.meta_alg.children('.eq-c').html(metadata.algoritmo);
        this.uiDocuments.clases.meta_var.children('p').html(metadata.variables);
        this.uiDocuments.clases.meta_um.children('p').html(metadata.unidad_medida);
        this.uiDocuments.clases.meta_cg.children('p').html(metadata.cobertura_geografica);
        this.uiDocuments.clases.meta_pt.children('p').html(metadata.presiciones_tecnicas);
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
        tituloNivel: tituloNivel,
        graficoCategoria: {},
        cuadrosData: cuadrosData,
        changeMetadata: changeMetadata,
        uiDocuments: uiDocuments,
        buscadorIndicadores: buscadorIndicadores,
        reloadTablaResponsive: reloadTablaResponsive
    }
})(AppConfig(), Appdata, App.utils, App.service);