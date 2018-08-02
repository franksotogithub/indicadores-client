App.utils.dashboard = (function (utils, service) {
    var data = {
        "bloque1": {
            "default": "vista0",
            "vista0": {
                titulo: "1.1 Población a través de los censos",
                widgets: {
                    assignment: [
                        {"anio": 1940, "censada": 6207967, "omitida": 815144, total: 7023111},
                        {"anio": 1961, "censada": 9906746, "omitida":  513611 , total: 10420357},
                        {"anio": 1972, "censada": 13538208, "omitida":  583356, total: 14121564},
                        {"anio": 1981, "censada": 17005210, "omitida": 757021, total: 17762231},
                        {"anio": 1993, "censada": 22048356, "omitida":  591087, total: 22639443},
                        {"anio": 2007, "censada": 27412157, "omitida":  808607, total: 28220764},
                        {"anio": 2017, "censada": 29381884, "omitida": 1855501, total: 31237385}
                    ],
                    info: "La población total estimada del Perú al día del censo, 22 de octubre del 2017 es de 31 millones 237 mil 385 habitantes. Esto es resultado de 29 millones 381 mil 884 habitantes registrados en el XII Censo Nacional d Pobelación, VII de Vivienda y III de Comunidades Indígenas, más 1 millón 855 mil 501 habitantes omitidos, 5,94%, de la población total estimada con la Encuesta de Evaluación Censal post-empadronamiento.<br \>\n" +
                    "\n" +
                    "La realización de Censos de Población y Vivienda en el Perú data desde la época del Imperio Incaico. Los censos ejecutados desde la Época Republicana, hasta la actualidad son doce de Población y siete de Vivienda. En 1940, después de 64 años se realizó el quinto Censo de Población.<br \>\n" +
                    "\n" +
                    "Históricamente, la metodología empleada en el Perú, para el empadronamiento poblacional, ha sido el que corresponde a los censos de Hecho o Facto, es decir, se empadronó a la población en el lugar en que se encontraba el “Día del Censo”, independientemente de que éste fuera el lugar de su residencia habitual.<br \>",

                }
            },
            "vista1": {
                titulo: "1.2 Crecimiento de la población",
                widgets: {
                    bar_chart: [],
                    //assignment: [],
                    info: "En el periodo intercensal 2007–2017, la población total del país se incrementó en 3 millones 16 mil 621 habitantes, es decir, un crecimiento de 10,7% respecto de la población total de 2007, que fue 28 millones 220 mil 764 habitantes. En promedio, la población peruana ha crecido 301 mil 662 habitantes por año en el mencionado período.<br />\n" +
                    "La población ha tenido un crecimiento promedio anual de 1,0% durante el periodo 2007–2017, lo cual confirma la tendencia decreciente del ritmo de crecimiento poblacional en los últimos 56 años. De una Tasa de Crecimiento de 2,8% en el periodo íntercensal 1961–1972, pasó a 2,6% entre 1972–1981, desciende a 2,0% en el periodo 1981–1993, y en el penúltimo periodo intercensal fue de 1,6% por año. En el período de mayor crecimiento de la población, según estudios de fecundidad, la Tasa Global de Fecundidad era 6,0 hijas/os en promedio por mujer, este nivel ha descendido hasta 2,5 para el lapso 2010–2015."
                }
            }
        }
    };

    var listado_widgets = ['bar_chart', 'assignment', 'location_on', 'info'];

    var contentTabs = '<div class="contentData" data-buttonCod="bar_chart" style="display: none;">\n' +
        '                        <div id="bar_chart_{0}"></div>\n' +
        '                    </div>\n' +
        '                    <div class="contentData" data-buttonCod="assignment" style="display: none;">\n' +
        '\n' +
        '                        <table id="assignment_{0}">\n' +
        '                            <thead></thead>\n' +
        '                            <tbody></tbody>\n' +
        '                        </table>\n' +
        '                    </div>\n' +
        '                    <div class="contentData" data-buttonCod="location_on" style="display: none;">\n' +
        '\n' +
        '                    </div>\n' +
        '                    <div class="contentData" data-buttonCod="info" style="display: none;">\n' +
        '\n' +
        '                    </div>';
    var init = function () {
        for (var bloque in data) {
            var vista_default = data[bloque]["default"];
            var vista = data[bloque][vista_default];
            $("#"+bloque+" .contentTabs").html(utils.format(contentTabs, [bloque]));
            _barraHerramientas(this, bloque, Object.keys(vista.widgets), vista_default);
        }
    };

    var _barraHerramientas = function (_this, uiId, options, vista_default) {

        var template = '<button data-buttonCod="{0}" class="{1}"><i class="material-icons">{0}</i></button>';
        if (options === '__all__' || options === undefined) {
            options = listado_widgets;
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
            console.log(">>>>>>>>>options[i], uiId-->", options, uiId);
            var uiCallback = options[i]+utils.capitalizeFirstLetter(uiId);
            if (_this.uiBarraHerramientas.hasOwnProperty(uiCallback)) {
                _this.uiBarraHerramientas[uiCallback](uiId, vista_default, options[i], content);
            }
        }
        $("#"+uiId+" .BarraHerramientas").html(html);
    };

    var uiBarraHerramientas= {
        assignmentBloque1: function (bloque, vista, seleccion, content) {
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
                data: data[bloque][vista].widgets.assignment,
                columns: [
                    {"data": "anio"},
                    {"data": "censada"},
                    {"data": "omitida"},
                    {"data": "total"}
                ],
                columnDefs: [
                    {
                        targets: [1, 2, 3],

                        render: function (data, type, row) {
                            return utils.numberFormat(data);
                        }
                    }],
                paging: false,
                info: false,
                ordering: false,
                searching: false

            });
        },

        infoBloque1: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },

        "bar_chartBloque1": function (bloque, vista, seleccion, content) {
            Highcharts.chart(seleccion+"_"+bloque, {
                chart: {
                    zoomType: 'xy'
                },
                title: {
                    text: 'Average Monthly Temperature and Rainfall in Tokyo'
                },
                subtitle: {
                    text: ''
                },
                xAxis: [{
                    categories: ['1940', '', '1961', '', '1972', '', '1981', '', '1993', '', '2007', '', '2017'],
                    //crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Miles',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },

                    max: 35000,

                }, { // Secondary yAxis
                    title: {
                        text: '%',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },

                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true,
                    max: 3
                }],
                tooltip: {
                    enabled: false
                },

                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        dataLabels:{
                            enabled: true
                        }
                    }
                },
                series: [{
                    name: 'Población Total',
                    type: 'column',
                    data: [7023.1, null, 10420.4, null, 14121.6, null, 17762.2, null, 22639.4, null, 28220.8, null, 31237.4],


                }, {
                    name: 'Tasa de Crecimiento',
                    color: 'red',

                    marker: {
                        symbol: 'diamond',
                    },
                    type: 'line',
                    yAxis: 1,

                    data: [
                        null,
                        1.9,
                        {y: 2.35,
                            marker:{
                                enabled: false
                            },
                            dataLabels:{
                                enabled: false
                            }
                        },
                        2.8,
                        {y: 2.7,
                            marker:{
                                enabled: false
                            }},
                        2.6,
                        {y:2.3,
                            marker:{
                                enabled: false
                            },
                            dataLabels:{
                                enabled: false
                            }},
                        2.0,
                        {y:1.8,
                            marker:{
                                enabled: false
                            },
                            dataLabels:{
                                enabled: false
                            }},
                        1.6,
                        {y: 1.3,
                            marker:{
                                enabled: false
                            },
                            dataLabels:{
                                enabled: false
                            }},
                        1.0,
                        null
                    ],

                }]
            });
        }
    };

    var dashboardWidgetChangeEvent = function (options) {
        console.log("options >>", options);
    };

    var dashboardVistaChangeEvent = function (options) {
        /* limpiar las vistas */
        var bloque = options.bloque.jqObject;
        bloque.find(".BarraHerramientas").html("");
        bloque.find(".contentTabs").html(utils.format(contentTabs, [options.bloque.id]));

        /*  Crear los widgets */
        var vista = data[options.bloque.id][options.vista.id];
        //$(bloque).find(".contentData[data-buttonCod="+options[i]+"]");
        _barraHerramientas(this, options.bloque.id, Object.keys(vista.widgets), options.vista.id); //

        /* Renderizar la vista por defecto */
    };
    return {
        init: init,
        uiBarraHerramientas: uiBarraHerramientas,
        dashboardWidgetChangeEvent: dashboardWidgetChangeEvent,
        dashboardVistaChangeEvent: dashboardVistaChangeEvent
    }
})(App.utils, App.service);