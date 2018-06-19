App.utils.cuadros = (function (config, appData, parent, service) {
    /** Atributos privados **/

    /** Constructores **/
    var init = function (callback) {
        _crearTabsCategorias(appData.categorias);
        this.crearTablaUigeos(['00']);
    };

    /** Metodos privados **/

    // Metodos UI
    var _crearTabsCategorias = function (datos) {
        var tabsTemplate = function (dato) {
            var clase='';
            if (dato.esActivo) {
                clase = ' btnTabTabla-activo';
            }
            return '<button class="tablaTabButton'+clase+'" data-categoria="'+dato.codigo+'">'+dato.titulo+'</button>';
        };

        var html = '';
        for (var i=0;i<datos.length;i++) {
            html += tabsTemplate(datos[i]);
        }

        $("#tabsCategoria").html(html);
    };

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
            ]
        };
    };

    var _crearCabecera = function (cabecera) {
        var thead = '<tr>';
        var childrens = [];
        for (var i=0; i<cabecera.length;i++) {
            var v = cabecera[i];
            var rowspan = (v.rowspan !== undefined) ? ' rowspan="'+v.rowspan+'"' : '';
            var colspan = (v.colspan !== undefined) ? ' colspan="'+v.colspan+'"' : '';
            var clase = '';
            if (v.codigo == '01') {
                clase = ' thorden';
            }else if (v.codigo == '02') {
                clase = ' thindicador';
            }

            var th = '<th'+rowspan+colspan+clase+'>'+v.titulo+'</th>';

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

    var _cabeceraUigeos = function (ubigeos) {
        var cabecera = [
            {
                "codigo": "01",
                "titulo": "Orden",
                "rowspan": "2"
            },
            {
                "codigo": "02",
                "titulo": "VARIABLE / INDICADOR",
                "rowspan": "2"
            }
        ];
        for (var i=0;i<ubigeos.length;i++) {
            cabecera.push(_cabeceraTemplate(ubigeos[i]));
        }
        _crearCabecera(cabecera);
    };

    var _crearTabla= function (table, data, columns) {
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
                        if (appData.tituloIndicadores.hasOwnProperty(data)){
                            var v = appData.tituloIndicadores[data];
                            if (v.cod_nivel_tematico == 2) {
                                $(td).addClass('td_tit');
                            }
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
            //this.tblIndicadores.clear().draw();
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
            columns.push({"data": "valor_"+v});
            columns.push({"data": "porcentaje_"+v})
        }

        return columns;
    };

    /* publicos */
    var crearTablaUigeos = function (ubigeos) {
        /*
            UI
            ----
            1. Cargando
         */

        var _this = this;

        _cargandoTabla();
        _destruirTabla(this);

        var callback = function () {
            // Crear cabecera de la tabla segun los ubigeos indicadors
            _cabeceraUigeos(ubigeos);

            // Crear Estructura Json para renderizado de la tabla

            _this.tablaColumns = _getTalaColumn(ubigeos);

            // Instanciar el servicio
            service.cuadros.getIndicadores(ubigeos, function () {
                _this.tblIndicadores = _crearTabla('#tblindicadores', service.cuadros.indicadores[App.categoria], _this.tablaColumns);
                _this.tblIndicadores.fixedColumns().relayout();
                $("#loadindicadores").hide();
            });
        };

        // Crear cabecera
        if (ubigeos.length > 1) {
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
            parent.cuadros
        );

        this.tblIndicadores.fixedColumns().relayout();
        $("#loadindicadores").hide();
    };

    var uiMaxCallback = function (options) {
        console.log("maximizar", options);
    };

    var mapasChangeEvent = function (options) {
        console.log("mapasChangeEvent", options);
        this.crearTablaUigeos(options.ubigeo);
    };

    return {
        init: init,
        tblIndicadores: undefined,
        tablaIndicadores: undefined,
        tablaColumns: [],
        crearTablaUigeos: crearTablaUigeos,
        crearTablaCategoria: crearTablaCategoria,
        uiMaxCallback: uiMaxCallback,
        mapasChangeEvent: mapasChangeEvent
    }
})(AppConfig(), Appdata(), App.utils, App.service);