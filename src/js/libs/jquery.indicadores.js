var INDICADORES = INDICADORES || {};
INDICADORES = (function ($) {
    var API_URL = 'http://192.168.34.14:8001/';
    var API_ENDPOINTS = {
        setup: 'config/appdata/'
    };
    var appData = {};
    var init = function (options, callback) {
        var _this = this;
        _getSetup(_this, API_ENDPOINTS.setup, function (data) {
            _this.appData =  data;
            callback(_this);
        });
    };
    var service = {
        get: function (slug, callback) {
            $.ajax({
                url: API_URL + slug,
                type: 'GET',
                dataType: 'JSON',
                success: function (data) {
                    callback(data);
                },
                error: function (obj, err, otherr) {}
            });
        }
    };

    var _getSetup = function (_this, slug, callback) {
        $.ajax({
            url: API_URL + slug,
            type: 'GET',
            dataType: 'JSON',
            success: function (data) {
                callback(data);
            },
            error: function (obj, err, otherr) {}
        });
    };

    var _KeyDato = function (key) {
        var partes = key.split("_");
        if (partes.length > 1) {
            return {"key": partes[0], "tipo": "por"};
        }else {
            return {"key": partes[0], "tipo": "abs"};
        }
    };

    var _unpivotData = function (data) {
        var values = {};
        var lista = [];
        $.each(data, function (k,v) {
            var item = _KeyDato(k);
            if(!values.hasOwnProperty(item.key)) {
                values[item.key] = {};
                lista.push(item.key);
            }
            values[item.key][item.tipo] = v;
        });

        return {"lista": lista, "values": values};
    };

    var getDataUnpivot = function () {

    };

    var getIndicadoresUnpivot = function (query, callback) {
        var _this = this;
        service.get('indicadores/manzana/unpivot/'+query, function (data) {
            var listaValues = _unpivotData(data);
            var datos = data;
            callback({
                "getData": function () {
                    var indicadores = _this.appData.tituloIndicadores;
                    var listaData = [];
                    $.each(listaValues.values, function (k,v) {
                        if(indicadores.hasOwnProperty(k)) {
                            indicadores[k]["absoluto"] = v.abs;
                            indicadores[k]["porcentaje"] = v.por;
                            listaData[indicadores[k]['orden']] = indicadores[k];
                        }

                    });

                    var filtered = listaData.filter(function (el) { return el != null; });
                    return {
                        "total": datos['cantidad_Mz'],
                        "listaData": filtered
                    };
                },
                "createTable": function (options) {
                    var data = this.getData();
                    var listaData = data.listaData;
                    var optionstable = "";
                    if(options.table !== undefined) {
                        $.each(options.table, function (k,v) {
                            optionstable += k + '="'+v+'" ';
                        });
                    }

                    var table = '<table '+optionstable+'>';
                    table += "<tr>";
                    table += "<th>VARIABLE / INDICADOR</th><th>Absoluto</th><th>%</th>";
                    table += "</tr>";
                    table += "<tbody>";
                    $.each(listaData, function (k,v) {
                        table += '<tr data-codigo="'+v.cod_tematico+'">';
                        table += '<td>'+v.titulo+'</td>';
                        table += '<td>'+v.absoluto+'</td>';
                        table += '<td>'+v.porcentaje+'</td>';
                        table += "</tr>";
                    });
                    table += "</tbody>";
                    table += "</table>";

                    return table;
                },
                "crateDataTable": function () {}
            });
        });
    };

    return {
        init: init,
        appData: appData,
        getIndicadoresUnpivot: getIndicadoresUnpivot
    }
})(jQuery);

INDICADORES.init({}, function (obj) {
    // Aqui todos mis eventos etc
    obj.getIndicadoresUnpivot('?u=010101000100100001D', function (obj2) {
        var data = obj2.createTable({
            "table": {
                "id": "tblreport",
                "class": "table table-bordered table-hover"
            }
        });

        $("#indicador").html(data);
    });
});


$(document).ready(function (e) {
   $("#cambiar").click(function (e) {
       INDICADORES.getIndicadoresUnpivot('?u=010101000100100001F', function (obj) {
           var data = obj.createTable({
               "table": {
                   "id": "tblreport2",
                   "class": "table table-bordered table-hover"
               }
           });

           $("#indicador").html(data);
       });
   });
});

