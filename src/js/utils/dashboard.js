App.utils.dashboard = (function (utils, service) {
    var data = {
        "bloque1": {
            "default": "vista0",
            tabla: undefined,
            "vista0": {
                titulo: "1.1 Población a través de los censos",
                widgets: {
                    assignment: {
                        titulo: "PERÚ: POBLACIÓN CENSADA, OMITIDA Y TOTAL, SEGÚN CENSOS REALIZADOS, 1940 - 2017",
                        
                        data: [
                            {"anio": 1940, "censada": 6207967, "omitida": 815144, total: 7023111},
                            {"anio": 1961, "censada": 9906746, "omitida":  513611 , total: 10420357},
                            {"anio": 1972, "censada": 13538208, "omitida":  583356, total: 14121564},
                            {"anio": 1981, "censada": 17005210, "omitida": 757021, total: 17762231},
                            {"anio": 1993, "censada": 22048356, "omitida":  591087, total: 22639443},
                            {"anio": 2007, "censada": 27412157, "omitida":  808607, total: 28220764},
                            {"anio": 2017, "censada": 29381884, "omitida": 1855501, total: 31237385}
                        ],
                        fuente: "Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2">AÑO</th>\n' +
                        '<th colspan="3">POBLACIÓN</th>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<th>CENSADA</th>\n' +
                        '<th>OMITIDA</th>\n' +
                        '<th>TOTAL</th>\n' +
                        '</tr>',
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
                            }]
                    },
                    info: "<p>La población total estimada del Perú al día del censo, 22 de octubre del 2017 es de 31 millones 237 mil 385 habitantes. Esto es resultado de 29 millones 381 mil 884 habitantes registrados en el XII Censo Nacional d Pobelación, VII de Vivienda y III de Comunidades Indígenas, más 1 millón 855 mil 501 habitantes omitidos, 5,94%, de la población total estimada con la Encuesta de Evaluación Censal post-empadronamiento.</p>\n" +
                    "\n" +
                    "<p>La realización de Censos de Población y Vivienda en el Perú data desde la época del Imperio Incaico. Los censos ejecutados desde la Época Republicana, hasta la actualidad son doce de Población y siete de Vivienda. En 1940, después de 64 años se realizó el quinto Censo de Población.</p>\n" +
                    "\n" +
                    "<p>Históricamente, la metodología empleada en el Perú, para el empadronamiento poblacional, ha sido el que corresponde a los censos de Hecho o Facto, es decir, se empadronó a la población en el lugar en que se encontraba el “Día del Censo”, independientemente de que éste fuera el lugar de su residencia habitual.</p>",

                }
            },
            "vista1": {
                titulo: "1.2 Crecimiento de la población",
                widgets: {
                    bar_chart: [],
                    assignment: {
                        titulo: "PERÚ: POBLACIÓN TOTAL Y TASA DE CRECIMIENTO PROMEDIO ANUAL, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th>AÑO</th>\n' +
                        '<th>TOTAL</th>\n' +
                        '<th>INCREMENTO INTERCENSAL</th>\n' +
                        '<th>INCREMENTO ANUAL</th>\n' +
                        '<th>TASA DE <br />CRECIMIENTO <br />PROMEDIO ANUAL </th>\n' +
                        '</tr>',
                        data: [
                            {"anio": 1940, total: 7023111, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 3397246, anual:  161774, "crecimiento_promedio": 1.9},
                            {"anio": 1961, total: 10420357, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 3701207, anual:  336473, "crecimiento_promedio": 2.8},
                            {"anio": 1972, total: 14121564, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 3640667, anual: 404519, "crecimiento_promedio": 2.6},
                            {"anio": 1981, total: 17762231, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 4877212, anual:  406434, "crecimiento_promedio": 2.0},
                            {"anio": 1993, total: 22639443, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 5581321, anual:  398666, "crecimiento_promedio": 1.6},
                            {"anio": 2007, total: 28220764, intercensal: "", anual: "", "crecimiento_promedio": ""},
                            {"anio": "", total: "", intercensal: 3016621, anual:  301662, "crecimiento_promedio": 1.0},
                            {"anio": 2017, total: 31237385, intercensal: "", anual: "", "crecimiento_promedio": ""}
                        ],
                        columns: [
                            {"data": "anio"},
                            {"data": "total"},
                            {"data": "intercensal"},
                            {"data": "anual"},
                            {"data": "crecimiento_promedio"}
                        ],
                        columnDefs: []
                    },
                    info: "<p>En el periodo intercensal 2007–2017, la población total del país se incrementó en 3 millones 16 mil 621 habitantes, es decir, un crecimiento de 10,7% respecto de la población total de 2007, que fue 28 millones 220 mil 764 habitantes. En promedio, la población peruana ha crecido 301 mil 662 habitantes por año en el mencionado período.</p>\n" +
                    "<p>La población ha tenido un crecimiento promedio anual de 1,0% durante el periodo 2007–2017, lo cual confirma la tendencia decreciente del ritmo de crecimiento poblacional en los últimos 56 años. De una Tasa de Crecimiento de 2,8% en el periodo íntercensal 1961–1972, pasó a 2,6% entre 1972–1981, desciende a 2,0% en el periodo 1981–1993, y en el penúltimo periodo intercensal fue de 1,6% por año. En el período de mayor crecimiento de la población, según estudios de fecundidad, la Tasa Global de Fecundidad era 6,0 hijas/os en promedio por mujer, este nivel ha descendido hasta 2,5 para el lapso 2010–2015.</p>",

                }
            },
            "vista2": {
                widgets: {
                    bar_chart: [],
                    info: "<p>La densidad poblacional, es un indicador que permite evaluar la concentración de la población de una determinada área geográfica. Comprende el número de habitantes por kilómetro cuadrado, que se encuentran en una determinada extensión territorial.</p>\n" +
                    "<p>La densidad poblacional del Perú para el año 2017, es 24,3 Hab./Km2. Al evaluar el comportamiento de este indicador, tomando como referencia la información censal de 1940, se observa que en los últimos 77 años se ha incrementado en 4,4 veces, pasando de 5,5 Hab./Km2 a 24,3 Hab./Km2 en el año 2017, en 1961 el número de personas por kilómetro cuadrado fue de 8,1, en 1972 alcanzó 11,0, en 1981 subió a 13,8, en 1993 a 17,6 y en 2007 se eleva a 22,0 habitantes por Km2.</p>"
                }
            },
            "vista3": {
                widgets: {
                    bar_chart: [],
                    info: "<p>Con relación a los países de América del Sur1, el Perú es el quinto país más poblado, después de Brasil, Colombia, Argentina y Venezuela. Entre los países de América Latina (20), el Perú ocupa el sexto lugar, siendo antecedido por Brasil, México, Colombia, Argentina y Venezuela.<p>\n" +
                    "<p>En lo que se refiere al continente americano (39 países), el Perú ocupa el octavo lugar. El primero corresponde a Estados Unidos de Norte América, seguido de Brasil, México, Colombia, Argentina, Canadá y Venezuela.</p>\n"
                }
            },
            "vista4": {
                widgets: {
                    bar_chart: [],
                    info: "<p>En América del Sur, el Perú, es el tercer país de mayor extensión geográfica (1’285, 215.6 Km2) después de Brasil y Argentina. En cuanto a densidad, se ubica en el quinto lugar entre los países con mayor densidad poblacional2, Ecuador y Colombia son los países más densos, con 58,6 Hab./Km2 y 43,0 Hab./ Km2, respectivamente. Por el contrario, los países con menor densidad son: Bolivia con 10,1 Hab./ Km2 y Argentina con 15,8 Hab./ Km2.</p>\n" +
                    "<p>Es necesario precisar, que el territorio peruano tiene características geomorfológicas que limitan las posibilidades de ocupación de gran porcentaje del territorio nacional, concretamente las grandes zonas desérticas en la Costa, o aquellas que se ubican por encima de los cuatro mil metros sobre el nivel del mar y las zonas húmedas cubiertas de vegetación de la Selva Alta y Baja.</p>"
                }
            }
        },

        "bloque2": {
            "default": "vista0",
            tabla: undefined,
            "vista0": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        titulo: "",
                        data: [],
                        cabecera: '<tr>\n' +
                        '<th rowspan="2">Departamento</th>\n' +
                        '<th rowspan="2">Total</th>\n' +
                        '<th colspan="2">2007</th>\n' +
                        '<th rowspan="2">Total</th>\n' +
                        '<th colspan="2">2017</th>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<th>Hombre</th>\n' +
                        '<th>Mujer</th>\n' +
                        '<th>Hombre</th>\n' +
                        '<th>Mujer</th>\n' +
                        '</tr>'
                    },
                    location_on: [],
                    info: "<p>Según el Censo del 2017, la población masculina asciende a 14 millones 450 mil 757 hombres, que representan el 49,2% de la población censada y la población femenina a 14 millones 931 mil 127 mujeres, es decir el 50,8%.</p>\n" +
                    "<p>En el Censo 2007 la estructura de la población fue 49,7% y 50,3% respectivamente. En el período intercensal de 2007-2017, la población masculina se incrementó en 828 mil 117 hombres, es decir, en 6,1% en 10 años. Asimismo, la población femenina se incrementó en 1 millón 141 mil 610 mujeres, que en términos porcentuales representa 8,3%.</p>\n" +
                    "\n" +
                    "<p>La composición de la población por sexo a nivel departamental presenta diferencias, así la población masculina es mayor que la femenina en ocho departamentos y la Región Lima. Ellos son: Madre de Dios (52,3%), San Martín (51,0%), Tumbes y Ucayali (50,5%, cada uno), Pasco, Amazonas y Moquegua (cada uno con 50,4%); y, Loreto y Región Lima (50,2%, en cada caso).</p>\n" +
                    "<p>En el resto de departamentos la proporción de mujeres oscila entre 50,3% y 51,5%, estos son: Lambayeque (51,5%), Huancavelica y la provincia de Lima (51,4%, cada uno), La Libertad y Provincia Constitucional del Callao (51,2%), Junín (51,1%), Arequipa y Cajamarca (51,0%, cada uno), Áncash, Ica y Puno (50,7%, cada uno), Ayacucho (50,6%), Cusco, Piura, Apurímac y Huánuco (50,5%, cada uno); y, Tacna (50,3%).</p>"
                }
            },
            "vista1": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        cabecera: '<tr>\n' +
                        '<th rowspan="2">Departamento</th>\n' +
                        '<th colspan="2">Población censada</th>\n' +
                        '<th colspan="2">Razón de dependencia demográfica<br />(1)</th>\n' +
                        '<th colspan="2">Proporción de personas adultas mayores<br />(2)</th>\n' +
                        '<th colspan="2">Índice de envejecimiento (%)<br />(3)</th>\n' +
                        '<th colspan="2">Relación de dependencia demográfica de vejez <br />(4)</th>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '</tr>'
                    },
                    location_on: [],
                    info: '<p>La evolución de la población en las últimas décadas se refleja en la forma que ha adoptado la pirámide poblacional, así de haber presentado una base ancha y vértice angosto en los censos de 1940, en la actualidad se observa una base más reducida y un ensanchamiento progresivo en los centros, que refleja un menor número de nacimientos y el proceso de envejecimiento.</p>\n' +
                    '<p>La diferencia relativa del grupo de edad de 0 a 4 años de los Censos 2007 y 2017, responde a la reducción de la natalidad, asimismo, el gráfico revela la disminución de la importancia relativa de los grupos quinquenales comprendidos entre los 5 a 29 años de edad, tanto en hombres como mujeres, consecuencia de la reducción progresiva de la base piramidal. Por otro lado, a partir de los 25 años de edad en todos los grupos, se observa una mayor proporción relativa en hombres y mujeres.</p>\n' +
                    '<p>Según los resultados del Censo 2017, en el país se censaron 3 mil 136 personas centenarias, es decir, declararon tener 100 o más años de edad, 997 hombres y 2 mil 134 mujeres.</p>\n' +
                    '<p>Otro indicador, derivado de la composición por edad de la población es la Razón de Dependencia Demográfica, que se define como la relación de la población menor de 14 años más la población mayor de 65 años entre la población en edad activa (15 a 64 años de edad). Según el Censo de 2017 es 53,2 dependientes por cada 100 personas en edad de trabajar. Esta relación en el año 2007 fue 58,5 personas dependientes, en 1981 era 83, lo que indica la tendencia de la población de reducir la carga potencial de dependientes.</p>\n' +
                    '<p>Por departamento, la razón de dependencia demográfica entre los años 2007 y 2017 muestra importantes disminuciones en la mayoría de ellos. Sin embargo, la carga de dependientes, en los departamentos de: Loreto, Huancavelica, Ucayali, Amazonas, Apurímac, Cajamarca, Huánuco y Piura, en el Censo 2017 registran los más altos valores (entre 60,0 a 73,9 dependientes por cada 100 en edad activa). Los más bajos valores se ubican en los departamentos de: Tacna, provincia de Lima, Arequipa, Moquegua y la Provincia Constitucional del Callao (con valores entre 43,2 a 49,2).</p>\n' +
                    '<p>Por otro lado, la composición de la población por edad, permite estimar la Proporción de la Población Adulta Mayor (60 y más años de edad), indicador que evidencia el proceso de envejecimiento de la población peruana. En el último periodo intercensal, la proporción de la población adulta mayor pasa de 9,1% en el 2007 a 11,9% en 2017. Este valor es superior en trece departamentos (incluye la Provincia Constitucional del Callao y la provincia de Lima); y, entre ellos destacan: Áncash (13,6%), Moquegua (13,2%), Región Lima y Huancavelica (13,1% cada uno) y Puno (13,0%). Por el contrario, con menor proporción figuran los departamentos de Madre de Dios (5,9%) y Ucayali (7,8%).</p>\n' +
                    '<p>Otros indicadores que dan cuenta del aumento cuantitativo de la población adulta mayor y de su peso relativo respecto a otros grupos de edad, son el Índice de Envejecimiento, que se estima dividiendo la población de 60 y más años de edad entre la población menor de 15 años de edad. Este índice ha registrado 45,1 personas de 60 y más años de edad por cada 100 menores de 15 años, es decir, 15,2 se ha incrementado persona con respecto a 2007 (29,9).</p>\n' +
                    '<p>Asimismo, la Relación de Dependencia Demográfica de Vejez, se estima dividiendo la población de 60 y más años de edad entre la población de 15 a 59 años de edad. En el periodo intercensal 2007-2017 se ha incrementado de 15,1 a 19,3 dependientes por cada 100 personas en edad activa, esta relación sigue similar patrón en todos los departamentos</p>'
                }
            },
            "vista2": {
                widgets: {
                    bar_chart: [],
                    location_on: [],
                    info: '<p>El índice masculinidad o razón de sexo, es un indicador sintético que muestra el número de hombres por cada 100 mujeres.</p>\n' +
                    '<p>Según los datos del Censo 2017, el índice de masculinidad es 96,8, este valor significa que el número de hombres es menor comparado con sus pares mujeres.</p>\n' +
                    '<p>La evolución de este índice presentó ligeras variaciones desde lo registrado en el Censo de Población de 1940, la razón por sexo en favor de los hombres resalta en 1972, por cada 100 mujeres hubo 101 hombres, a diferencia del resto de años censales, en los que este valor estuvo por debajo de 100.</p>\n' +
                    '<p>El comportamiento del índice por departamento, muestra que son más hombres por cada 100 mujeres en los departamentos de Madre de Dios (109,8), San Martín (104,1), Tumbes (102,9), Ucayali (101,9), Pasco y Amazonas (101,7, cada uno), Moquegua (101,6), Loreto y Región Lima (100,9), mientras que los departamentos con menor índice son: Lambayeque (94,2) y Huancavelica (94,4). Comparando con lo registrado en el 2007, en todos los departamentos ha disminuido el número de hombres por cada 100 mujeres.</p>'
                }
            }
        },
        "bloque3": {
            "default": "vista0",
            "vista0": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        titulo: "",
                        
                        data: []
                    },
                    info: []
                }
            },
            "vista1": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        titulo: "",
                        
                        data: []
                    },
                    info: []
                }
            },
            "vista2": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        titulo: "",
                        
                        data: []
                    },
                    location_on: [],
                    info: []
                }
            }
        },
        "bloque4": {
            "default": "vista0",
            "vista0": {
                widgets: {
                    assignment: {
                        titulo: "",
                        
                        data: []
                    },
                    location_on: [],
                    info: []
                }
            },
            "vista1": {
                widgets: {
                    assignment: {
                        titulo: "",
                        
                        data: []
                    },
                    location_on: [],
                    info: []
                }
            }
        }
    };

    var listado_widgets = ['bar_chart', 'assignment', 'location_on', 'info'];

    var init = function () {
        for (var bloque in data) {
            var vista_default = data[bloque]["default"];
            var vista = data[bloque][vista_default];
            //$("#"+bloque+" .contentTabs").html(utils.format(contentTabs, [bloque]));
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
            var tabla = "#table_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            if (data[bloque].tabla !== undefined) {
                data[bloque].tabla.clear().draw();
                data[bloque].tabla.destroy();
            }
            $(titulo).html(data[bloque][vista].widgets.assignment.titulo);
            $(tabla).children('thead').html(data[bloque][vista].widgets.assignment.cabecera);
            data[bloque].tabla = $(tabla).DataTable({
                data: data[bloque][vista].widgets.assignment.data,
                columns: data[bloque][vista].widgets.assignment.columns,
                columnDefs: data[bloque][vista].widgets.assignment.columnDefs,
                paging: false,
                info: false,
                ordering: false,
                searching: false

            });
        },
        assignmentBloque2: function (bloque, vista, seleccion, content) {
            var tabla = "#table_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            if (data[bloque].tabla !== undefined) {
                data[bloque].tabla.clear().draw();
                data[bloque].tabla.destroy();
            }
            $(titulo).html(data[bloque][vista].widgets.assignment.titulo);
            $(tabla).children('thead').html(data[bloque][vista].widgets.assignment.cabecera);
            data[bloque].tabla = $(tabla).DataTable({
                //data: data[bloque][vista].widgets.assignment.data,
                //columns: data[bloque][vista].widgets.assignment.columns,
                //columnDefs: data[bloque][vista].widgets.assignment.columnDefs,
                paging: false,
                info: false,
                ordering: false,
                searching: false

            });
        },

        infoBloque1: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },
        infoBloque2: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },

        "bar_chartBloque1": function (bloque, vista, seleccion, content) {
            var charId = seleccion+"_"+bloque;
            var charId2 = seleccion+"_2_"+bloque;
            // Vista 0
            console.log(">>>> vista grafico", vista);
            if (vista == 'vista1') {
                Highcharts.chart(charId, {
                    chart: {
                        zoomType: 'xy'
                    },

                    title: {
                        text: null
                    },
                    subtitle: {
                        text: 'POBLACIÓN TOTAL Y TASA DE CRECIMIENTO PROMEDIO ANUAL, 1940 - 2017'
                    },
                    xAxis: [{
                        categories: ['1940', '', '1961', '', '1972', '', '1981', '', '1993', '', '2007', '', '2017'],
                        crosshair: true
                    }],
                    yAxis: [
                        { // Primary yAxis
                            labels: {
                                format: '{value}',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },
                            title: {
                                text: '',
                                style: {
                                    color: Highcharts.getOptions().colors[1]
                                }
                            },

                            max: 40000,

                        },
                        { // Secondary yAxis
                            title: {
                                text: '',
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
                        }
                    ],
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
                    series: [
                        {
                            name: 'Población Total',
                            type: 'column',
                            data: [7023.1, null, 10420.4, null, 14121.6, null, 17762.2, null, 22639.4, null, 28220.8, null, 31237.4],


                        },
                        {
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
                                    },
                                    dataLabels:{
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
            else if (vista == 'vista2') {

                Highcharts.chart(charId, {

                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: 'PERÚ: EVOLUCIÓN DE LA DENSIDAD POBLACIONAL, SEGÚN CENSOS, 1940 - 2017 (Hab./Km2)'
                    },

                    xAxis: {
                        categories: [1940, 1961, 1972, 1981, 1993, 2007, 2017]
                    },


                    series: [{
                        type: 'column',
                        data: [5.5, 8.1, 11.0, 13.8, 17.6, 22.0, 24.3],
                        dataLabels:{
                            enabled: true
                        },
                        name: "DENSIDAD POBLACIONAL",
                    }]

                });
            }
            else if (vista == 'vista3') {

                Highcharts.chart(charId, {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'RANKING DE POBLACIÓN EN AMÉRICA DEL SUR Y AMÉRICA LATINA, POR PAÍSES, 2017'
                    },
                    xAxis: {
                        categories: ["Brasil", "Colombia", "Argentina", "Venezuela", "Perú", "Chile", "Ecuador", "Bolivia", "Paraguay" , "Uruguay"],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '(Miles de Habitantes)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },

                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '(Miles de Habitantes)',
                        data: [211175, 49059, 44121, 32121, 31237, 18209, 16624,  11071, 6805, 3456]
                    }]
                });
                Highcharts.chart(charId2, {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'RANKING DE POBLACIÓN EN AMÉRICA DEL SUR Y AMÉRICA LATINA, POR PAÍSES, 2017'
                    },
                    xAxis: {
                        categories: ["Brasil", "México", "Colombia", "Argentina", "Venezuela", "Perú", "Chile", "Ecuador", "Guatemala", "Cuba", "Bolivia", "Haití", "República Dominicana", "Honduras", "Paraguay", "El Salvador", "Nicaragua", "Costa Rica", "Panamá", "Uruguay"],
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '(Miles de Habitantes)',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },

                    credits: {
                        enabled: false
                    },
                    series: [{
                        name: '(Miles de Habitantes)',
                        data: [211175, 127878, 49059, 44121, 32121, 31237, 18209, 16624, 16536, 11423, 11071, 11029, 10779, 9071, 6805, 6350, 6218, 4918, 4054, 3456]
                    }]
                });
            }
            else if (vista == 'vista4') {
                Highcharts.chart(charId, {

                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: 'PAÍSES DE AMÉRICA DEL SUR: DENSIDAD POBLACIONAL, 2017'
                    },

                    xAxis: {
                        categories: ["Ecuador", "Colombia", "Venezuela", "Brasil", "Perú", "Chile", "Uruguay", "Paraguay", "Argentina", "Bolivia"]
                    },
                    series: [{
                        type: 'column',
                        data: [58.6, 43.0, 35.1, 24.8, 24.3, 24.1, 19.6, 16.7, 15.8, 10.1],
                        dataLabels:{
                            enabled: true
                        },
                        name: "(Hab. / Km2)"
                    }]

                });
            }

        },

        "bar_chartBloque2": function (bloque, vista, seleccion, content) {
            var charId = seleccion+"_"+bloque;
            var charId2 = seleccion+"_2_"+bloque;
            var charId3 = seleccion+"_3_"+bloque;
            var charId4 = seleccion+"_4_"+bloque;

            if (vista == 'vista0') {

                Highcharts.chart(charId, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'PERÚ: COMPOSICIÓN DE LA POBLACIÓN CENSADA, SEGÚN SEXO, 1993 - 2017 <br />(Miles)'
                    },
                    xAxis: {
                        categories: [
                            'Total',
                            'Hombre',
                            'Mujer'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: '2007',
                        data: [27412.2, 13622.6, 13789.5]

                    }, {
                        name: '2017',
                        data: [29381.9, 14450.8, 14931.1]

                    }]
                });
            }
            else if (vista == 'vista1') {
                var categories = [
                    '0-4', '5-9', '10-14', '15-19',
                    '20-24', '25-29', '30-34', '35-39', '40-44',
                    '45-49', '50-54', '55-59', '60-64', '65-69',
                    '70-74', '75-79', '80-84', '85-89', '90-94',
                    '95-99', '100 + '
                ];

                Highcharts.chart(charId, {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Population pyramid for Germany, 2018'
                    },
                    subtitle: {
                        text: 'Source: <a href="http://populationpyramid.net/germany/2018/">Population Pyramids of the World from 1950 to 2100</a>'
                    },
                    xAxis: [
                        {
                            categories: categories,
                            reversed: false,
                            labels: {
                                step: 1
                            }
                        },
                        { // mirror axis on right side
                            opposite: true,
                            reversed: false,
                            categories: categories,
                            linkedTo: 0,
                            labels: {
                                step: 1
                            }
                        }
                    ],
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return Math.abs(this.value) + '%';
                            }
                        }
                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                                'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                        }
                    },

                    series: [{
                        name: 'Male',
                        data: [
                            -2.2, -2.1, -2.2, -2.4,
                            -2.7, -3.0, -3.3, -3.2,
                            -2.9, -3.5, -4.4, -4.1,
                            -3.4, -2.7, -2.3, -2.2,
                            -1.6, -0.6, -0.3, -0.0,
                            -0.0
                        ]
                    }, {
                        name: 'Female',
                        data: [
                            2.1, 2.0, 2.1, 2.3, 2.6,
                            2.9, 3.2, 3.1, 2.9, 3.4,
                            4.3, 4.0, 3.5, 2.9, 2.5,
                            2.7, 2.2, 1.1, 0.6, 0.2,
                            0.0
                        ]
                    }]
                });

                Highcharts.chart(charId2, {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Population pyramid for Germany, 2018'
                    },
                    subtitle: {
                        text: 'Source: <a href="http://populationpyramid.net/germany/2018/">Population Pyramids of the World from 1950 to 2100</a>'
                    },
                    xAxis: [
                        {
                            categories: categories,
                            reversed: false,
                            labels: {
                                step: 1
                            }
                        },
                        { // mirror axis on right side
                            opposite: true,
                            reversed: false,
                            categories: categories,
                            linkedTo: 0,
                            labels: {
                                step: 1
                            }
                        }
                    ],
                    yAxis: {
                        title: {
                            text: null
                        },
                        labels: {
                            formatter: function () {
                                return Math.abs(this.value) + '%';
                            }
                        }
                    },

                    plotOptions: {
                        series: {
                            stacking: 'normal'
                        }
                    },

                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>' +
                                'Population: ' + Highcharts.numberFormat(Math.abs(this.point.y), 0);
                        }
                    },

                    series: [{
                        name: 'Male',
                        data: [
                            -2.2, -2.1, -2.2, -2.4,
                            -2.7, -3.0, -3.3, -3.2,
                            -2.9, -3.5, -4.4, -4.1,
                            -3.4, -2.7, -2.3, -2.2,
                            -1.6, -0.6, -0.3, -0.0,
                            -0.0
                        ]
                    }, {
                        name: 'Female',
                        data: [
                            2.1, 2.0, 2.1, 2.3, 2.6,
                            2.9, 3.2, 3.1, 2.9, 3.4,
                            4.3, 4.0, 3.5, 2.9, 2.5,
                            2.7, 2.2, 1.1, 0.6, 0.2,
                            0.0
                        ]
                    }]
                });
            }

            else if (vista == 'vista2') {
                Highcharts.chart(charId, {

                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: 'PAÍSES DE AMÉRICA DEL SUR: DENSIDAD POBLACIONAL, 2017'
                    },

                    xAxis: {
                        categories: ["1940", "1961", "1972", "1981", "1993", "2007", "2017"]
                    },
                    series: [{
                        type: 'column',
                        data: [97.7, 98.9, 100.5, 99.7, 98.8, 98.8, 96.8],
                        dataLabels:{
                            enabled: true
                        },
                        name: "(Hab. / Km2)"
                    }]

                });

                Highcharts.chart(charId2, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'COSTA'
                    },
                    xAxis: {
                            categories: [
                            'Tumbes',
                            'Moquegua',
                            'Región Lima 2/',
                            'Tacna',
                            'Piura',
                            'Ica',
                            'Prov. Const. del Callao',
                            'La Libertad',
                            'Lima',
                            'Provincia de Lima 1/',
                            'Lambayeque'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: '2007',
                        data: [107.3, 105.4, 103.1, 100.2, 99.3, 98.6, 96.5, 97.7, 96.2, 95.4, 94.9]

                    }, {
                        name: '2017',
                        data: [102.0, 101.6, 100.9, 98.8, 98.0, 97.4, 95.5, 95.4, 95.2, 94.6, 94.2]

                    }]
                });

                Highcharts.chart(charId3, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'COSTA'
                    },
                    xAxis: {
                        categories: [
                            'Tumbes',
                            'Moquegua',
                            'Región Lima 2/',
                            'Tacna',
                            'Piura',
                            'Ica',
                            'Prov. Const. del Callao',
                            'La Libertad',
                            'Lima',
                            'Provincia de Lima 1/',
                            'Lambayeque'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: '2007',
                        data: [107.3, 105.4, 103.1, 100.2, 99.3, 98.6, 96.5, 97.7, 96.2, 95.4, 94.9]

                    }, {
                        name: '2017',
                        data: [102.0, 101.6, 100.9, 98.8, 98.0, 97.4, 95.5, 95.4, 95.2, 94.6, 94.2]

                    }]
                });

                Highcharts.chart(charId4, {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: 'COSTA'
                    },
                    xAxis: {
                        categories: [
                            'Tumbes',
                            'Moquegua',
                            'Región Lima 2/',
                            'Tacna',
                            'Piura',
                            'Ica',
                            'Prov. Const. del Callao',
                            'La Libertad',
                            'Lima',
                            'Provincia de Lima 1/',
                            'Lambayeque'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0,
                            dataLabels: {
                                enabled: true
                            }
                        }
                    },
                    series: [{
                        name: '2007',
                        data: [107.3, 105.4, 103.1, 100.2, 99.3, 98.6, 96.5, 97.7, 96.2, 95.4, 94.9]

                    }, {
                        name: '2017',
                        data: [102.0, 101.6, 100.9, 98.8, 98.0, 97.4, 95.5, 95.4, 95.2, 94.6, 94.2]

                    }]
                });
            }
        }
    };

    var dashboardWidgetChangeEvent = function (options) {
        console.log("dashboardWidgetChangeEvent >>>>", options);
    };

    var dashboardVistaChangeEvent = function (options) {
        console.log("dashboardVistaChangeEvent  >>>>", options);
        /* limpiar las vistas */
        var bloque = options.bloque.jqObject;
        bloque.find(".BarraHerramientas").html("");
        bloque.find(".contentData").hide();

        /*  Crear los widgets */
        var vista = data[options.bloque.id][options.vista.id];
         _barraHerramientas(this, options.bloque.id, Object.keys(vista.widgets), options.vista.id);

        /* Renderizar la vista por defecto */
    };
    return {
        init: init,
        uiBarraHerramientas: uiBarraHerramientas,
        dashboardWidgetChangeEvent: dashboardWidgetChangeEvent,
        dashboardVistaChangeEvent: dashboardVistaChangeEvent
    }
})(App.utils, App.service);