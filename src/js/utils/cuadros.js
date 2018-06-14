App.utils.cuadros = (function (config, appData, parent, service) {

    var init = function (callback) {
        this.altoVentana = altoTabla();
        crearTablaUigeos(['00']);
    };

    var crearCabecera = function (cabecera) {
        var thead = '<tr>';
        var childrens = [];
        for (var i=0; i<cabecera.length;i++) {
            var v = cabecera[i];
            var rowspan = (v.rowspan !== undefined) ? ' rowspan="'+v.rowspan+'"' : '';
            var colspan = (v.colspan !== undefined) ? ' colspan="'+v.colspan+'"' : '';
            var th = '<th'+rowspan+colspan+'>'+v.titulo+'</th>';
            thead += th;

            if (v.children !== undefined) {
                console.log("zquiii", v.children);
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

    };

    var cabeceraTemplate = function (ubigeo) {
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

    var cabeceraUigeos = function (ubigeos) {
        var cabecera = [
            {
                "titulo": "Orden",
                "rowspan": "2"
            },
            {
                "titulo": "VARIABLE / INDICADOR",
                "rowspan": "2"
            }
        ];


        for (var i=0;i<ubigeos.length;i++) {
            cabecera.push(cabeceraTemplate(ubigeos[i]));
        }

        crearCabecera(cabecera);
    };

    var crearTabla= function (table, data, columns, _this) {


        var scrollY = _this.altoVentana.toString() + 'px';

        _this.tblIndicadores = $(table).DataTable({
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
            scrollY: scrollY
        });

        _this.tblIndicadores.fixedColumns().relayout();
    };

    var crearTablaUigeos = function (ubigeos) {

        if (this.tblIndicadores !== undefined) {
            this.tblIndicadores.destroy();
            this.tblIndicadores.clear().draw();
        }

        var callback = function () {
            cabeceraUigeos(ubigeos);

            var columns = [
                {"data": "cod_tematico", visible: false},
                {"data": "cod_tematico"}
            ];

            for (var i=0; i<ubigeos.length; i++) {
                var v = ubigeos[i];
                columns.push({"data": "valor_"+v});
                columns.push({"data": "porcentaje_"+v})
            }

            // Crear tabla
            service.cuadros.getIndicadores(ubigeos, function (data) {
                crearTabla('#tblindicadores', data["P01"], columns, parent.cuadros);
            });
        };
        // Crear cabecera
        if (ubigeos.length > 1) {
            minimizarVentana($(".ventanaGrafico .minimizar"), callback)
        }else {
            callback();
        }
    };

    var altoTabla = function () {
        var tam_ventana1 = $(window).height();
        var totalVentana = 0;
        if(tam_ventana1 <= 800){
            totalVentana = (tam_ventana1 - 280);
        } else{
            totalVentana=(tam_ventana1 - 280);
        }

        console.log(">>> tamano ventana", totalVentana);

        return totalVentana;
    };

    return {
        init: init,
        tblIndicadores: undefined,
        altoVentana: 600,
        crearTablaUigeos: crearTablaUigeos,
        tablaIndicadores: undefined
    }
})(AppConfig(), Appdata(), App.utils, App.service);