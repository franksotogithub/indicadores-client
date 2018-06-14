App.utils.cuadros = (function (config, data, parent, service) {
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

    var cabecera = [
        {
            "titulo": "VARIABLE / INDICADOR",
            "rowspan": "2"
        }
    ];

    var cabeceraTemplate = function (ubigeo) {
        return {
            "titulo": (data.titulo.hasOwnProperty('U'+ubigeo)) ? data.titulo['U'+ubigeo] : '',
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
        for (var i=0;i<ubigeos.length;i++) {
            cabecera.push(cabeceraTemplate(ubigeos[i]));
        }

        crearCabecera(cabecera);
    };

    var crearTabla= function (table, data, columns) {

        return $(table).removeAttr('width').DataTable({
            data: data,
            order: [[0, 'asc']],
            columnDefs: [
                {
                    targets: 0,
                    "createdCell": function (td, cellData, rowData, row, col) {
                        if (rowData.nivel == 1) {
                            $(td).addClass('td_tit');
                        }
                    }
                }
            ],
            createdRow: function (row, data, dataIndex) {},
            paging: false,
            info: false,
            columns: columns,
            ordering: true,
            searching: false,
            fixedColumns: true,
            scrollY: '700px'
        });
    };

    var tablaUigeos = function (ubigeos) {
        // Crear cabecera
        if (ubigeos.length > 1) {
            minimizarVentana($(".ventanaGrafico .minimizar"))
        }

        cabeceraUigeos(ubigeos);

        var columns = [
            {"data": "cod_tematico"}
        ];

        for (var i=0; i<ubigeos.length; i++) {
            var v = ubigeos[i];
            columns.push({"data": "valor_"+v});
            columns.push({"data": "porcentaje_"+v})
        }
        // Crear tabla
        service.cuadros.getIndicadores(ubigeos, function (data) {
            console.log(data);
            crearTabla('#tblindicadores', data["P01"], columns);

        });
    };

    return {
        tablaUigeos: tablaUigeos,
        nacional: undefined
    }
})(AppConfig(), Appdata(), App.utils, App.service);