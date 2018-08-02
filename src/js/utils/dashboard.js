App.utils.dashboard = (function (utils, service) {
    var data = {
        "bloque1": {
            info: "La población total estimada del Perú al día del censo, 22 de octubre del 2017 es de 31 millones 237 mil 385 habitantes. Esto es resultado de 29 millones 381 mil 884 habitantes registrados en el XII Censo Nacional d Pobelación, VII de Vivienda y III de Comunidades Indígenas, más 1 millón 855 mil 501 habitantes omitidos, 5,94%, de la población total estimada con la Encuesta de Evaluación Censal post-empadronamiento.<br \>\n" +
            "\n" +
            "La realización de Censos de Población y Vivienda en el Perú data desde la época del Imperio Incaico. Los censos ejecutados desde la Época Republicana, hasta la actualidad son doce de Población y siete de Vivienda. En 1940, después de 64 años se realizó el quinto Censo de Población.<br \>\n" +
            "\n" +
            "Históricamente, la metodología empleada en el Perú, para el empadronamiento poblacional, ha sido el que corresponde a los censos de Hecho o Facto, es decir, se empadronó a la población en el lugar en que se encontraba el “Día del Censo”, independientemente de que éste fuera el lugar de su residencia habitual.<br \>",
            assignment: [
                {"anio": 1940, "censada": 6207967, "omitida": 815144, total: 7023111},
                {"anio": 1961, "censada": 9906746, "omitida":  513611 , total: 10420357},
                {"anio": 1972, "censada": 13538208, "omitida":  583356, total: 14121564},
                {"anio": 1981, "censada": 17005210, "omitida": 757021, total: 17762231},
                {"anio": 1993, "censada": 22048356, "omitida":  591087, total: 22639443},
                {"anio": 2007, "censada": 27412157, "omitida":  808607, total: 28220764},
                {"anio": 2017, "censada": 29381884, "omitida": 1855501, total: 31237385}
            ]
        }
    };
    var init = function () {
        _barraHerramientas(this, "bloque1", ['assignment', 'info']);
    };

    var _barraHerramientas = function (_this,uiId, options) {
        var listado = ['bar_chart', 'assignment', 'location_on', 'info'];
        var template = '<button data-buttonCod="{0}" class="{1}"><i class="material-icons">{0}</i></button>';
        if (options === '__all__' || options === undefined) {
            options = listado;
        }
        var html = '';
        var i;
        for (i=0;i<options.length;i++) {
            var uiClase = '';
            var content = $("#"+uiId).find(".contentData[data-buttonCod="+options[i]+"]");
            if (i==0) {
                uiClase = 'activeButton';
                content.show();
            }
            html += utils.format(template, [options[i], uiClase]);

            // Instanciar a funciones que generan la data
            var uiCallback = options[i]+utils.capitalizeFirstLetter(uiId);
            if (_this.uiBarraHerramientas.hasOwnProperty(uiCallback)) {
                _this.uiBarraHerramientas[uiCallback](uiId, options[i], content);
            }

        }
        console.log("uiId >>>>", "#"+uiId+" .BarraHerramientas", html);
        $("#"+uiId+" .BarraHerramientas").html(html);
    };

    var uiBarraHerramientas= {
        assignmentBloque1: function (bloque, seleccion, content) {
            var tabla = "#"+seleccion+"_"+bloque;
            var thead = '<tr>\n' +
                '                                    <th rowspan="2">AÑO</th>\n' +
                '                                    <th colspan="3">POBLACIÓN</th>\n' +
                '                                </tr>\n' +
                '                                <tr>\n' +
                '                                    <th>CENSADA</th>\n' +
                '                                    <th>OMITIDA</th>\n' +
                '                                    <th>TOTAL</th>\n' +
                '                                </tr>';
            $(tabla).children('thead').html(thead);
            $(tabla).DataTable({
                data: data[bloque].assignment,
                columns: [
                    {"data": "anio"},
                    {"data": "censada"},
                    {"data": "omitida"},
                    {"data": "total"}
                ],
                paging: false,
                info: false,
                ordering: false,
                searching: false
            });
        },

        infoBloque1: function (bloque, seleccion, content) {
            content.html(data[bloque].info);
        }
    };

    return {
        init: init,
        uiBarraHerramientas: uiBarraHerramientas
    }
})(App.utils, App.service);