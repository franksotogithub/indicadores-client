App.utils.dashboard = (function (config, appData, utils, service) {
    var data = {
        "bloque1": {
            "default": "vista0",
            tabla: undefined,
            "vista0": {
                titulo: "1.1 Población a través de los censos",
                widgets: {
                    assignment: {
                        codigo: "01",
                        titulo: "PERÚ: POBLACIÓN CENSADA, OMITIDA Y TOTAL, SEGÚN CENSOS REALIZADOS, 1940 - 2017",
                        fuente: "<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2" class="textAlignCenter">AÑO</th>\n' +
                        '<th colspan="3" class="textAlignCenter">POBLACIÓN</th>\n' +
                        '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
                        '</tr>\n' +
                        '<tr>\n' +
                        '<th>CENSADA</th>\n' +
                        '<th>OMITIDA</th>\n' +
                        '<th>TOTAL</th>\n'+

                        '</tr>',
                        columns: [
                            {"data": "fuente"},
                            {"data": "absoluto_p010100"},
                            {"data": "absoluto_p012901"},
                            {"data": "absoluto_p012900"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignCenter');
                                },
                                render: function (data, type, row) {
                                    return _titulos.fuente(data);
                                }
                            },
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
                    "<p>Históricamente, la metodología empleada en el Perú, para el empadronamiento poblacional, ha sido el que corresponde a los censos de Hecho o Facto, es decir, se empadronó a la población en el lugar en que se encontraba el “Día del Censo”, independientemente de que éste fuera el lugar de su residencia habitual.</p>"
                }
            },
            "vista1": {
                titulo: "1.2 Crecimiento de la población",
                widgets: {
                    bar_chart: {
                        codigo: "01",
                        titulo: "POBLACIÓN TOTAL Y TASA DE CRECIMIENTO PROMEDIO ANUAL, 1940 - 2017",
                        unidad: "",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática- Censos Nacionales de Población y Vivienda.</p>",
                        colors: ['#00ccff', '#ff0000']
                    },
                    assignment: {
                        codigo: "02",
                        titulo: "PERÚ: POBLACIÓN TOTAL Y TASA DE CRECIMIENTO PROMEDIO ANUAL, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th>AÑO</th>\n' +
                        '<th>TOTAL</th>\n' +
                        '<th>INCREMENTO<br /> INTERCENSAL</th>\n' +
                        '<th>INCREMENTO<br /> ANUAL</th>\n' +
                        '<th>TASA DE <br />CRECIMIENTO <br />PROMEDIO ANUAL </th>\n' +
                        '<th style="display: none;">ORDEN</th>\n'+
                        '</tr>',
                        columns: [
                            {"data": "anio", orderable: false},
                            {"data": "total", orderable: false},
                            {"data": "intercensal", orderable: false},
                            {"data": "anual", orderable: false},
                            {"data": "crecimiento_promedio", orderable: false},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: [1, 2, 3],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: 4,
                                render: function (data, type, row) {
                                    var porcentaje = utils.round(data, 1);
                                    if (porcentaje > 0) {
                                        return porcentaje.toFixed(1);
                                    }else {
                                        return '';
                                    }

                                }
                            }
                        ],
                        fuente: "<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>"
                    },
                    info: "<p>En el periodo intercensal 2007–2017, la población total del país se incrementó en 3 millones 16 mil 621 habitantes, es decir, un crecimiento de 10,7% respecto de la población total de 2007, que fue 28 millones 220 mil 764 habitantes. En promedio, la población peruana ha crecido 301 mil 662 habitantes por año en el mencionado período.</p>\n" +
                    "<p>La población ha tenido un crecimiento promedio anual de 1,0% durante el periodo 2007–2017, lo cual confirma la tendencia decreciente del ritmo de crecimiento poblacional en los últimos 56 años. De una Tasa de Crecimiento de 2,8% en el periodo íntercensal 1961–1972, pasó a 2,6% entre 1972–1981, desciende a 2,0% en el periodo 1981–1993, y en el penúltimo periodo intercensal fue de 1,6% por año. En el período de mayor crecimiento de la población, según estudios de fecundidad, la Tasa Global de Fecundidad era 6,0 hijas/os en promedio por mujer, este nivel ha descendido hasta 2,5 para el lapso 2010–2015.</p>",

                }
            },
            "vista2": {
                widgets: {
                    bar_chart: {
                        codigo: "02",
                        titulo: "PERÚ: EVOLUCIÓN DE LA DENSIDAD POBLACIONAL, SEGÚN CENSOS, 1940 - 2017 <br />(Hab./Km2)",
                        unidad: "(Hab./Km2)",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática- Censos Nacionales de Población y Vivienda.</p>"
                    },
                    info: "<p>La densidad poblacional, es un indicador que permite evaluar la concentración de la población de una determinada área geográfica. Comprende el número de habitantes por kilómetro cuadrado, que se encuentran en una determinada extensión territorial.</p>\n" +
                    "<p>La densidad poblacional del Perú para el año 2017, es 24,3 Hab./Km2. Al evaluar el comportamiento de este indicador, tomando como referencia la información censal de 1940, se observa que en los últimos 77 años se ha incrementado en 4,4 veces, pasando de 5,5 Hab./Km2 a 24,3 Hab./Km2 en el año 2017, en 1961 el número de personas por kilómetro cuadrado fue de 8,1, en 1972 alcanzó 11,0, en 1981 subió a 13,8, en 1993 a 17,6 y en 2007 se eleva a 22,0 habitantes por Km2.</p>"
                }
            },
            "vista3": {
                widgets: {
                    bar_chart: {
                        codigo: "03",
                        titulo: "RANKING DE POBLACIÓN EN AMÉRICA DEL SUR Y AMÉRICA LATINA, POR PAÍSES, 2017",
                        unidad: "(Miles de Habitantes)",
                        fuente: "<p>1/ INEI - Censos Nacionales 2017: XII de Población, VII de Vivienda y III de Comunidades Indígenas.</p>",
                        subtitulo: "América del Sur",
                        secundario: [{
                            subtitulo: "América Latina"
                        }]
                    },
                    info: "<p>Con relación a los países de América del Sur<sup>1</sup>, el Perú es el quinto país más poblado, después de Brasil, Colombia, Argentina y Venezuela. Entre los países de América Latina (20), el Perú ocupa el sexto lugar, siendo antecedido por Brasil, México, Colombia, Argentina y Venezuela.<p>\n" +
                    "<p>En lo que se refiere al continente americano (39 países), el Perú ocupa el octavo lugar. El primero corresponde a Estados Unidos de Norte América, seguido de Brasil, México, Colombia, Argentina, Canadá y Venezuela.</p>\n"
                }
            },
            "vista4": {
                widgets: {
                    bar_chart: {
                        codigo: "04",
                        titulo: "PAÍSES DE AMÉRICA DEL SUR: DENSIDAD POBLACIONAL, 2017",
                        unidad: "(Hab. / Km2 )",
                        fuente: "<p>1/ INEI - Censos Nacionales 2017: XII de Población, VII de Vivienda y III de Comunidades Indígenas.</p>" +
                        "<p>Fuente: CELADE - División de Población de la CEPAL. Revisión 2017.</p>   "
                    },
                    info: "<p>En América del Sur, el Perú, es el tercer país de mayor extensión geográfica (1’285, 215.6 Km<sup>2</sup>) después de Brasil y Argentina. En cuanto a densidad, se ubica en el quinto lugar entre los países con mayor densidad poblacional<sup>2</sup>, Ecuador y Colombia son los países más densos, con 58,6 Hab./Km<sup>2</sup> y 43,0 Hab./ Km<sup>2</sup>, respectivamente. Por el contrario, los países con menor densidad son: Bolivia con 10,1 Hab./ Km<sup>2</sup> y Argentina con 15,8 Hab./ Km<sup>2</sup>.</p>\n" +
                    "<p>Es necesario precisar, que el territorio peruano tiene características geomorfológicas que limitan las posibilidades de ocupación de gran porcentaje del territorio nacional, concretamente las grandes zonas desérticas en la Costa, o aquellas que se ubican por encima de los cuatro mil metros sobre el nivel del mar y las zonas húmedas cubiertas de vegetación de la Selva Alta y Baja.</p>"
                }
            }
        },
        "bloque2": {
            "default": "vista0",
            tabla: undefined,
            "vista0": {
                widgets: {
                    bar_chart: {
                        codigo: "05",
                        titulo: "PERÚ: COMPOSICIÓN DE LA POBLACIÓN CENSADA, SEGÚN SEXO, 1993 - 2017",
                        unidad: "(Miles)",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>"
                    },
                    assignment: {
                        codigo: "03",
                        clase: "hijoNegro",
                        titulo: "PERÚ: DISTRIBUCIÓN PORCENTUAL DE LA POBLACIÓN CENSADA, POR SEXO, SEGÚN DEPARTAMENTO, 2007 Y 2017 <br />(Porcentaje)",
                        columns: [
                            {"data": "cod_territorio"},
                            {"data": "absoluto_p010100_01"}, //1
                            {"data": "porcentaje_p010101_01"},
                            {"data": "porcentaje_p010102_01"},
                            {"data": "absoluto_p010100_03"}, //1
                            {"data": "porcentaje_p010101_03"},
                            {"data": "porcentaje_p010102_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row) {
                                    return _titulos.territorio(data, '00');
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                }
                            },
                            {
                                targets: [1, 4],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: [2, 3, 5,6],
                                render: function (data, type, row) {
                                    return utils.round(data, 1).toFixed(1);
                                }
                            }
                        ],
                        cabecera: '<tr>\n' +
                        '<th rowspan="2" class="textAlignLeft">Departamento</th>\n' +
                        '<th rowspan="2" class="textAlignCenter">Total</th>\n' +
                        '<th colspan="2" class="textAlignCenter">2007</th>\n' +
                        '<th rowspan="2" class="textAlignCenter">Total</th>\n' +
                        '<th colspan="2" class="textAlignCenter">2017</th>\n' +
                        '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
                        '</tr>\n' +
                        '<tr>\n' +
                        '<th>Hombre</th>\n' +
                        '<th>Mujer</th>\n' +
                        '<th>Hombre</th>\n' +
                        '<th>Mujer</th>\n' +
                        '</tr>',
                        fuente: "1/ Comprende los 43 distritos de la provincia de Lima.<br />" +
                        "2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br />\n" +
                        "<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>"
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
                    bar_chart: {
                        codigo: "06",
                        titulo: "PERÚ: PIRÁMIDE DE POBLACIÓN CENSADA, 2007 Y 2017<br />(Distribución porcentual)",
                        unidad: "(Distribución porcentual)",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>"
                    },
                    assignment: {
                        codigo: "04",
                        clase: "hijoNegro",
                        titulo: "PERÚ: INDICADORES DE DEPENDENCIA Y ENVEJECIMIENTO DEMOGRÁFICO, 2007 Y 2017",
                        fuente: "<b>(1) Es la relación de la población de 0 a 14 años más la población de 65 y más, entre la población de 15 a 64 años de edad.</b>\n" +
                        "<p>(2) Es el porcentaje de la población de 60 y más años de edad, en relación a la población total.</p>\n" +
                        "<p>(3) Es el porcentaje de la población de 60 y más años sobre el total de menores de 15 años.</p>\n" +
                        "<p>(4) Porcentaje de la población de 60 y más años respecto de la población de 15 a 59 años.</p>\n" +
                        "<p>1/ Comprende los 43 distritos de la provincia de Lima.</p>\n" +
                        "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>\n" +
                        "<p>Fuente: INEI - Censos Nacionales de Población y Vivienda.</p>",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2" class="textAlignLeft">Departamento</th>\n' +
                        '<th colspan="2" class="textAlignCenter">Población censada</th>\n' +
                        '<th colspan="2" class="textAlignCenter">Razón de dependencia demográfica<br />(1)</th>\n' +
                        '<th colspan="2" class="textAlignCenter">Proporción de personas adultas mayores<br />(2)</th>\n' +
                        '<th colspan="2" class="textAlignCenter">Índice de envejecimiento (%)<br />(3)</th>\n' +
                        '<th colspan="2" class="textAlignCenter">Relación de dependencia demográfica de vejez <br />(4)</th>\n' +
                        '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
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
                        '</tr>',

                        columns: [
                            {data: "cod_territorio"},
                            {data: "absoluto_p010100_01"},
                            {data: "absoluto_p010100_03"},
                            {data: "porcentaje_p013201_01"},
                            {data: "porcentaje_p013201_03"},
                            {data: "porcentaje_p013202_01"},
                            {data: "porcentaje_p013202_03"},
                            {data: "porcentaje_p013203_01"},
                            {data: "porcentaje_p013203_03"},
                            {data: "porcentaje_p013204_01"},
                            {data: "porcentaje_p013204_03"},
                            {"data": "orden", visible: false}
                        ],

                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row) {
                                    return _titulos.territorio(data, '00');
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                }
                            },
                            {
                                targets: [1, 2],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: [3, 4, 5, 6, 7, 8, 9, 10],
                                render: function (data, type, row) {
                                    return utils.round(data, 1).toFixed(1);
                                }
                            }
                        ]
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
                    bar_chart: {
                        codigo: "07",
                        titulo: "PERÚ: ÍNDICE DE MASCULINIDAD, SEGÚN CENSOS, 1940-2017",
                        unidad: "",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática- Censos Nacionales de Población y Vivienda.</p>",
                        secundario: [{
                            codigo: "08",
                            titulo: "PERÚ: ÍNDICE DE MASCULINIDAD, SEGÚN DEPARTAMENTO, 1993 y 2017",
                            unidad: "",
                            fuente: "<p>1/ Comprende los 43 distritos de la provincia.</p>" +
                            "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>" +
                            "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p> "
                        }]
                    },
                    location_on: [],
                    info: '<p>El índice masculinidad o razón de sexo, es un indicador sintético que muestra el número de hombres por cada 100 mujeres.</p>\n' +
                    '<p>Según los datos del Censo 2017, el índice de masculinidad es 96,8, este valor significa que el número de hombres es menor comparado con sus pares mujeres.</p>\n' +
                    '<p>La evolución de este índice presentó ligeras variaciones desde lo registrado en el Censo de Población de 1940, la razón por sexo en favor de los hombres resalta en 1972, por cada 100 mujeres hubo 101 hombres, a diferencia del resto de años censales, en los que este valor estuvo por debajo de 100.</p>\n' +
                    '<p>El comportamiento del índice por departamento, muestra que son más hombres por cada 100 mujeres en los departamentos de Madre de Dios (109,8), San Martín (104,1), Tumbes (102,9), Ucayali (101,9), Pasco y Amazonas (101,7, cada uno), Moquegua (101,6), Loreto y Región Lima (100,9), mientras que los departamentos con menor índice son: Lambayeque (94,2) y Huancavelica (94,4). Comparando con lo registrado en el 2007, en todos los departamentos ha disminuido el número de hombres por cada 100 mujeres.</p>'
                }
            }
        },
        "bloque3": {
            tabla: undefined,
            "default": "vista0",
            "vista0": {
                widgets: {
                    bar_chart: {
                        codigo: "09",
                        titulo: "PERÚ: EVOLUCIÓN DE LA POBLACIÓN CENSADA, POR REGIÓN NATURAL, 1940 – 2017",
                        unidad: "(Porcentaje)",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>",
                        secunadario: [
                            {
                                codigo: "10",
                                titulo: "PERÚ: EVOLUCIÓN DE LA DISTRIBUCIÓN DE LA POBLACIÓN CENSADA, POR REGIÓN NATURAL, 1940 - 2017",
                                unidad: "(Porcentaje)",
                                fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática- Censos Nacionales de Población y Vivienda.</p>"
                            },

                            {
                                codigo: "11",
                                titulo: "PERÚ: TASA DE CRECIMIENTO PROMEDIO ANUAL, SEGÚN REGIÓN NATURAL, 1940 - 2017",
                                unidad: "(Porcentaje)",
                                fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>"
                            }
                        ]
                    },
                    assignment: {
                        codigo: '05',
                        clase: "hijoNegro",
                        alias: "Cuadro 05",
                        titulo: "PERÚ: EVOLUCIÓN DE LA POBLACIÓN CENSADA, POR AÑO CENSAL, SEGÚN REGIÓN NATURAL, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th>REGIÓN<br /> NATURAL</th>\n' +
                        '<th>1940</th>\n' +
                        '<th>1961</th>\n' +
                        '<th>1972</th>\n' +
                        '<th>1993</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th style="display: none;">ORDEN</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_tematico"},
                            {"data": "absoluto_05"},
                            {"data": "absoluto_06"},
                            {"data": "absoluto_07"},
                            {"data": "absoluto_09"},
                            {"data": "absoluto_01"},
                            {"data": "absoluto_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                },
                                render: function (data, type, row) {
                                    return _titulos.tematico(data, 'P013300');

                                }
                            },
                            {
                                targets: [1,2,3,4,5,6],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            }
                        ],
                        fuente: "<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>"
                    },
                    info: "<p>Por región natural según el último censo la Región de la Costa es la más poblada con de 17 millones 37 mil 297 habitantes, le sigue la Sierra 8 millones 268 mil 183 habitantes y la Selva 4 millones 76 mil 404 habitantes. En términos porcentuales, la Costa es la región que alberga más de la mitad de la población del país (58,0%).</p>\n" +
                    "\n" +
                    "<p>Los últimos resultados comparados con el Censo de 2007, muestran cambios en su distribución, mientras que la población de la Costa y de la Selva han incrementado su participación relativa en el total de la población, la Sierra ha disminuido.</p>\n" +
                    "\n" +
                    "<p>La población de la Costa, según el Censo del 2007, representó el 54,6% del total nacional, sube a 58,0% en el Censo 2017. Asimismo, la población de la Selva de 13,4% en 2007 aumenta a 13,9% en 2017. Por el contrario, la población de la Sierra disminuye de 32,0% a 28,1% en el periodo intercensal 2007-2017.</p>\n" +
                    "\n" +
                    "<p>En resumen, al analizar la evolución de la población por región natural a través de los censos, se concluye que de ser predominantemente andina ha pasado a ser mayoritariamente costeña. En el Censo de 1940, la población de la Costa representaba el 28,3% de la población censada, la Sierra el 65,0% y la Selva el 6,7%, después de 77 años la Costa representa el 58,0%, la Sierra el 28,1% y la Selva 13,9%.</p>\n" +
                    "\n" +
                    "<p>En el periodo intercensal 2007 y 2017, la población se ha incrementado más en las regiones de la Costa (13,8%) y de la Selva (10,9%), quienes siguen mostrando un mayor dinamismo demográfico, por el contrario, en la Sierra disminuyó la población (5,7%).</p>\n" +
                    "\n" +
                    "<p>En términos absolutos, el mayor incremento fue en la Costa (2,064,033 Hab.), es decir, 206 mil 403 habitantes por año, seguido de la Selva (401,112 Hab.). La Sierra como se mencionó antes disminuyó población en el periodo intercensal (495,418 Hab.).</p>\n" +
                    "\n" +
                    "<p>Estas magnitudes para el periodo 2007-2017, representaron un crecimiento anual promedio de 1,3% en la Costa y 1,0% para la Selva. La región de la Sierra presentó tasa de crecimiento promedio anual negativa de 0,6%.</p>"
                }
            },
            "vista1": {
                widgets: {
                    bar_chart: {
                        codigo: "12",
                        titulo: "PERÚ: POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 2017",
                        unidad: "(Miles)",
                        fuente: "<p>1/ Comprende los 43 distritos de la provincia</p>" +
                        "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>" +
                        "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>",
                        secundario: [
                            {
                                codigo: "13",
                                titulo: "PERÚ: DISTRIBUCIÓN RELATIVA DE LA POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 2017",
                                unidad: "(Porcentaje)",
                                fuente: "<p>1/ Comprende los 43 distritos de la provincia.</p>" +
                                "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>" +
                                "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales: XII de Población, VII de Vivienda</p>"
                            },

                            {
                                codigo: "14",
                                titulo: "PERÚ: TASA DE CRECIMIENTO PROMEDIO ANUAL DE POBLACIÓN CENSADA, POR DEPARTAMENTO, 1993-2007 Y2007-2017",
                                unidad: "(Porcentaje)",
                                fuente: "<p>1/ Comprende los 43 distritos de la provincia</p>" +
                                "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>" +
                                "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>"
                            }
                        ]
                    },
                    assignment: {
                        codigo: '06',
                        alias: "Cuadro 06",
                        clase: "hijoNegro",
                        titulo: "PERÚ: POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th class="textAlignLeft">DEPARTAMENTO</th>\n' +
                        '<th>1940</th>\n' +
                        '<th>1961</th>\n' +
                        '<th>1972</th>\n' +
                        '<th>1981</th>\n' +
                        '<th>1993</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th style="display: none;">ORDEN</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_territorio"},
                            {"data": "absoluto_p010100_05"},
                            {"data": "absoluto_p010100_06"},
                            {"data": "absoluto_p010100_07"},
                            {"data": "absoluto_p010100_08"},
                            {"data": "absoluto_p010100_09"},
                            {"data": "absoluto_p010100_01"},
                            {"data": "absoluto_p010100_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row) {
                                    return _titulos.territorio(data, '00');
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                }
                            },
                            {
                                targets: [1,2,3,4,5,6,7],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            }
                        ],
                        fuente: '1/ Comprende los 43 distritos de la provincia de Lima.<br />\n' +
                        '2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br />\n' +
                        '<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>'
                    },
                    info: "<p>El Censo de Población 2017, también da cuenta del tamaño poblacional en cada departamento y de su participación relativa con respecto a la población censada del país. Los departamentos con mayor población censada son: Piura 1 millón 856 mil 809 habitantes (6,3%), La Libertad 1 millón 778 mil 80 habitantes (6,1%), Arequipa 1 millón 382 mil 730 habitantes (4,7%) y Cajamarca con 1 millón 341 mil 12 habitantes (4,6%), completa este grupo la provincia de Lima con 8 millones 574 mil 974 habitantes (29,2%), en conjunto concentran más de la mitad de la población nacional (50,8%).</p>\n" +
                    "\n" +
                    "<p>En el Censo de 2007, tres de estos cuatro departamentos tuvieron la mayor población censada, en 2017 ingresa Arequipa en lugar de Puno, en términos de estructura, sus posiciones han cambiado ligeramente en el último censo.</p>\n" +
                    "\n" +
                    "<p>En el otro extremo, los cuatro departamentos menos poblados son: Madre de Dios 141 mil 70 habitantes (0,5%), Moquegua 174 mil 863 habitantes (0,6%), Tumbes 224 mil 863 habitantes (0,8%), y Pasco 254 mil 65 habitantes (0,9%).</p>\n" +
                    "\n" +
                    "<p>El comportamiento de crecimiento poblacional de estos departamentos es similar al registrado en el año 2007, mantienen el mismo orden de ubicación. Así, Madre de Dios, Moquegua, Tumbes y Pasco ocupan el mismo lugar en los dos momentos censales.</p>\n" +
                    "\n" +
                    "<p>Según el Censo del 2017, tres departamentos de la Selva cambiaron su ubicación en cuanto al volumen de población, respecto al resto de departamentos del país. Ucayali que en el Censo de 2007 ocupaba el puesto dieciocho, con una población de 432 mil 159 habitantes, pasó al puesto diecisiete con una población de 496 mil 459 habitantes, incrementándose en 14,9%. Asimismo, el departamento de Amazonas, que ocupaba el puesto veinte, pasó al puesto diecinueve con una población de 379 mil 384 habitantes.</p>\n" +
                    "\n" +
                    "<p>En cambio, el departamento de Loreto descendió una ubicación, del puesto once en 2007 pasó al puesto doce en el Censo del 2017 con 883 mil 510 habitantes. Los departamentos de San Martín y Madre de Dios siguen ocupando en el año 2017 su misma ubicación, respecto al Censo de 2007, con una población de 813 mil 381 y 141 mil 70 habitantes, respectivamente.</p>\n" +
                    "\n" +
                    "<p>Los departamentos pueden clasificarse, de acuerdo a su participación relativa respecto al total nacional, en tres grupos: de Mayor participación (4,5% a más), de Participación intermedia (2,0% a 4,4%) y de Menor participación (menos de 2,0%).</p>\n" +
                    "\n" +
                    "<p>Los departamentos que se ubican en el primer grupo son: Piura (6,3%), La Libertad (6,1%), Arequipa (4,7%) y Cajamarca (4,6%), estos cinco departamentos representaron poco más de la quinta parte de la población nacional (21,6%).</p>\n" +
                    "\n" +
                    "<p>Los departamentos con una Participación intermedia, es decir, los que pertenecen al segundo grupo, son 12: Junín (4,2%), Cusco y Lambayeque (4,1%, cada uno), Puno (4,0%), Áncash (3,7%), Provincia Constitucional del Callao (3,4%), Loreto y Región Lima (3,0%, cada uno), Ica (2,9%), San Martín (2,8%), Huánuco (2,5%) y Ayacucho (2,1%).</p>\n" +
                    "\n" +
                    "<p>El tercer grupo, lo conforman los nueve departamentos restantes: Ucayali (1,7%), Apurímac (1,4%), Amazonas (1,3%), Huancavelica (1,2%), Tacna (1,1%), Pasco (0,9%), Tumbes (0,8%), Moquegua (0,6%) y Madre de Dios (0,5%).</p>"
                }
            },
            "vista2": {
                widgets: {
                    bar_chart: {
                        codigo: "15",
                        titulo: "PERÚ: INCREMENTO DE LA DENSIDAD POBLACIONAL POR DEPARTAMENTO, 1940 - 2017",
                        unidad: "(Número de veces)",
                        fuente: "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>",
                    },
                    assignment: {
                        codigo: '07',
                        alias: "Cuadro 07",
                        clase: "hijoNegro",
                        titulo: "PERÚ: TASA DE CRECIMIENTO PROMEDIO ANUAL DE LA POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 1940 - 2017 <br />(Porcentaje)",
                        cabecera: '<tr>\n' +
                        '<th class="textAlignLeft">DEPARTAMENTO</th>\n' +
                        '<th>1940-1961</th>\n' +
                        '<th>1961-1972</th>\n' +
                        '<th>1972-1981</th>\n' +
                        '<th>1981-1993</th>\n' +
                        '<th>1993-2007</th>\n' +
                        '<th>2007-2017</th>\n' +
                        '<th style="display: none;">ORDEN</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_territorio"},
                            {"data": "porcentaje_p013700_06"},
                            {"data": "porcentaje_p013700_07"},
                            {"data": "porcentaje_p013700_08"},
                            {"data": "porcentaje_p013700_09"},
                            {"data": "porcentaje_p013700_01"},
                            {"data": "porcentaje_p013700_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row) {
                                    return _titulos.territorio(data, '00');
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                }
                            },
                            {
                                targets: [1,2,3,4,5,6],
                                render: function (data, type, row) {
                                    return utils.round(data, 1).toFixed(1);
                                }
                            }
                        ],
                        fuente: '1/ Comprende los 43 distritos de la provincia de Lima.<br />\n' +
                        '2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br />\n' +
                        '<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>'
                    },
                    info: "\n" +
                    "<p>Al observar el comportamiento de la población censada a nivel departamental de los Censos 2007 y 2017, el mayor incremento se presenta en Madre de Dios, con un aumento en el volumen de la población de 28,8%, creciendo a un ritmo promedio anual de 2,6%, que equivale a 3 mil 152 habitantes por año. Arequipa fue el segundo departamento en cuanto a mayor crecimiento poblacional (20,0%), es decir, 23 mil 43 habitantes por año, aumentando a un ritmo anual de 1,8%.</p>\n" +
                    "<p>De acuerdo a la tasa de crecimiento poblacional, los 24 departamentos, la Provincia Constitucional del Callao, la provincia de Lima y la Región Lima, se pueden clasificar en tres grupos: de Mayor Crecimiento (2,0% y más), de Crecimiento Intermedio (1,0% a 1,9%), y los de Menor Crecimiento (menos de 1,0%).</p>\n" +
                    "<p>En el último Censo, solo el departamento de Madre de Dios con una tasa de crecimiento intercensal de 2,6% conformó el grupo de Mayor Crecimiento. En el segundo grupo se ubicaron diez departamentos: Arequipa e Ica (1,8%, cada uno), Ucayali (1,4%), Tacna (1,3%), Provincia Constitucional del Callao, provincia de Lima y Tumbes (1,2%, cada uno), San Martín (1,1%) y, Piura y La Libertad (1,0% cada uno).</p>\n" +
                    "<p>El tercer grupo con un crecimiento menor a 1,0%, lo conforman el resto de departamentos (incluye la Región Lima), nueve tienen tasas de crecimiento entre 0% y 0,8%, en orden de importancia son: Región Lima, Moquegua, Lambayeque, Cusco, Áncash, Junín, Amazonas, Ayacucho y Apurímac. Un grupo de seis departamentos registran tasas de crecimiento negativas entre 2,7% y 0,1%: Huancavelica, Pasco, Puno, Huánuco, Cajamarca y Loreto.</p>\n" +
                    "<p>La Tasa de crecimiento promedio anual, es el indicador que evalúa la velocidad del incremento anual de la población en términos relativos</p>"
                }
            },
            "vista3": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        codigo: '08',
                        alias: "Cuadro 08",
                        titulo: "PERÚ: DENSIDAD POBLACIONAL POR AÑOS CENSALES, SEGÚN DEPARTAMENTO, 1940 - 2017 <br />(Hab./ Km2)",
                        cabecera: '<tr>\n' +
                        '<th>DEPARTAMENTO</th>\n' +
                        '<th>1940</th>\n' +
                        '<th>1961</th>\n' +
                        '<th>1972</th>\n' +
                        '<th>1981</th>\n' +
                        '<th>1993</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '<th style="display: none;">ORDEN</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_territorio"},
                            {"data": "porcentaje_p012905_05"},
                            {"data": "porcentaje_p012905_06"},
                            {"data": "porcentaje_p012905_07"},
                            {"data": "porcentaje_p012905_08"},
                            {"data": "porcentaje_p012905_09"},
                            {"data": "porcentaje_p012905_01"},
                            {"data": "porcentaje_p012905_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                render: function (data, type, row) {
                                    return _titulos.territorio(data, '00');
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft');
                                }
                            },
                            {
                                targets: [1,2,3,4,5,6,7],
                                render: function (data, type, row) {
                                    return utils.round(data, 1).toFixed(1);
                                }
                            }
                        ],
                        fuente: '1/ Comprende los 43 distritos de la provincia de Lima.<br />\n' +
                        '2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.<br />\n' +
                        '<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>'
                    },
                    location_on: [],
                    info: "<p>De acuerdo a los resultados del último Censo de 2017, la Provincia Constitucional del Callao (6 815,8 Hab./Km2) y la provincia de Lima (3 278,9 Hab./Km2), destacaron por presentar la densidad más alta del país. Lo que significa que albergan una mayor cantidad de habitantes por kilómetro cuadrado. Por el contrario, los departamentos de Madre de Dios (1,7 Hab./Km2), Loreto (2,4 Hab./Km2) y Ucayali (4,9 Hab./Km2), presentaron la menor densidad poblacional.</p>\n" +
                    "<p>Otros departamentos con mayor densidad de población son Lambayeque (82,8 Hab./Km2), La Libertad (69,7 Hab./ Km2) y Piura (52,1 Hab./Km2). Al analizar este importante indicador, partiendo de la información departamental (incluye la Provincia Constitucional del Callao, provincia de Lima y Región Lima) desde el Censo de 1940, se observan cambios referidos al incremento del número de habitantes por kilómetro cuadrado. Estos cambios estarían asociados a la evolución demográfica del componente de fecundidad, al proceso de urbanización (rural/urbano) y a la migración interna.</p>\n" +
                    "<p>Por otro lado, al analizar el comportamiento de la densidad poblacional entre los Censos de 1940 y 2017 expresado en número de veces, se observa que dos departamentos de la Selva: Ucayali y Madre de Dios, son los de mayor velocidad de incremento de densidad poblacional, con 24,3 y 16,5 veces respectivamente, le siguen en orden de importancia la provincia de Lima (14,3 veces), Provincia Constitucional del Callao (12,2 veces), Tacna (8,9 veces) y Tumbes (8,8 veces); mientras que los departamentos con menor velocidad de incremento de densidad son: Huancavelica (1,4 veces), Apurímac (1,6 veces) y Ayacucho (1,7 veces).</p>"
                }
            }
        },
        "bloque4": {
            tabla: undefined,
            tabla2: undefined,
            "default": "vista0",
            "vista0": {
                widgets: {
                    assignment: {
                        codigo: '09',
                        alias: "Cuadro 09",
                        clase: "hijoNegro",
                        titulo: "PERÚ: NÚMERO DE PROVINCIAS Y POBLACIÓN CENSADA, SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                        cabecera: '<tr >\n' +
                        '<th rowspan="2" class="textAlignLeft">Rango de población</th>\n' +
                        '<th colspan="4" class="textAlignCenter">2007</th>\n' +
                        '<th colspan="4" class="textAlignCenter">2017</th>\n'+
                        '<th rowspan="2">ORDEN</th>\n'+
                        '</tr>\n'+
                        '<tr>\n' +
                        '<th>Nº de Provincias</th>\n' +
                        '<th>(%) </th>\n' +
                        '<th>Población</th>\n'+
                        '<th>(%)</th>\n'+
                        '<th>Nº de Provincias</th>\n' +
                        '<th>(%) </th>\n' +
                        '<th>Población</th>\n'+
                        '<th>(%)</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_tematico"},
                            {"data": "absoluto_territorio_01"},
                            {"data": "porcentaje_territorio_01"},
                            {"data": "absoluto_01"},
                            {"data": "porcentaje_01"},
                            {"data": "absoluto_territorio_03"},
                            {"data": "porcentaje_territorio_03"},
                            {"data": "absoluto_03"},
                            {"data": "porcentaje_03"},
                            {"data": "orden"}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft anchoRangoTabla');
                                },
                                render: function (data, type, row) {
                                    return _titulos.tematico(data, 'P015000');
                                }
                            },
                            {
                                targets: [1],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                }
                            },
                            {
                                targets: [3,5,7],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                },
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: [3,7],
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: [2, 4, 6,8],
                                render: function (data, type, row) {
                                    return utils.round(data, 1).toFixed(1);
                                }
                            }
                        ],
                        fuente: '<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</b>',

                        secundario: {
                            codigo: '10',
                            alias: "Cuadro 10",
                            titulo: "PERÚ: POBLACIÓN CENSADA Y TASA DE CRECIMIENTO PROMEDIO ANUAL, DE LAS 20 PROVINCIAS MÁS POBLADAS, 1981, 1993, 2007 Y 2017",
                            cabecera: '<tr>\n' +
                            '<th rowspan="2">Provincia</th>\n' +
                            '<th colspan="4">Población</th>\n' +
                            '<th colspan="3">Tasa de crecimiento promedio anual (%)</th>\n'+
                            '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
                            '</tr>\n'+
                            '<tr>\n' +
                            '<th>1981</th>\n' +
                            '<th>1993</th>\n' +
                            '<th>2007</th>\n'+
                            '<th>2017</th>\n'+
                            '<th>1981-1993</th>\n' +
                            '<th>1993-2007</th>\n' +
                            '<th>2007-2017</th>\n'+
                            '</tr>\n',
                            columns: [
                                {"data": "cod_territorio"},
                                {"data": "absoluto_p010100_08"},
                                {"data": "absoluto_p010100_09"},
                                {"data": "absoluto_p010100_01"},
                                {"data": "absoluto_p010100_03"},
                                {"data": "porcentaje_p013700_09"},
                                {"data": "porcentaje_p013700_01"},
                                {"data": "porcentaje_p013700_03"},
                                {"data": "orden", visible: false}
                            ],
                            columnDefs: [
                                {
                                    targets: 0,
                                    render: function (data, type, row) {
                                        return _titulos.territorio(data, '00');
                                    },
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).addClass('textAlignLeft');
                                    }
                                },
                                {
                                    targets: [1,2,3,4],
                                    render: function (data, type, row) {
                                        return utils.numberFormat(data);
                                    },
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).addClass('millones');
                                    }
                                },
                                {
                                    targets: [5,6,7],
                                    render: function (data, type, row) {
                                        return utils.round(data,1).toFixed(1);
                                    }
                                }
                            ],
                            fuente: 'Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.',
                        }
                    },
                    location_on: [],
                    info: "<p>En el año 2017, la provincia de Arequipa ingresó al rango de población de 1 millón y más, en el que se encontraba únicamente la provincia de Lima en 2007, y cinco provincias al igual que en el penúltimo censo tienen entre 500 mil a 999,999 habitantes; el número de provincias con 200 mil a 499,999 mil habitantes, disminuyó de 15 a 14.</p>\n" +
                    "\n" +
                    "<p>En el año 2017, las provincias con población entre 20 mil a 49 mil 999 habitantes, fueron las más numerosas (64 provincias), equivalente a 32,7% del total de provincias (196), y albergan al 6,0% de la población censada.</p>\n" +
                    "\n" +
                    "<p>Con población menor a 20 mil habitantes se encuentran 39 provincias (19,9%), en conjunto concentran el 1,4% de la población censada.\n" +
                    "De las 196 provincias, incluida la Provincia Constitucional del Callao, sólo la provincia de Lima, al igual que en 2007, supera los 7 millones de habitantes. Según el Censo de 2017 su población asciende a 8 millones 574 mil 974 habitantes y representa el 29,2% de la población censada total del país. En 2007 fue 7 millones 605 mil 742 habitantes y representó el 27,7%.</p>\n" +
                    "\n" +
                    "<p>En el año 2017 al igual que en 2007, sólo cinco provincias tienen una población entre 500,000 y 999,999 habitantes, en el 2007 fueron: la Provincia Constitucional del Callao, Arequipa, Trujillo, Chiclayo y Piura y representaron el 14,5% del total. En 2017, cuatro de estas provincias continúan en el mismo rango de población, pasa a integrar este grupo Huancayo, en conjunto estas provincias concentran el 14,0% de la población censada.</p>\n" +
                    "\n" +
                    "<p>Es de destacar que las 20 provincias más pobladas en el 2017 concentran el 62,2% de la población censada. De este grupo las primeras diez de mayor a menor tamaño poblacional son: Lima, Arequipa, Provincia Constitucional del Callao, Trujillo, Chiclayo, Piura, Huancayo, Maynas, Cusco y Santa. Estas provincias, aunque en distinto orden fueron las más pobladas en 2007.</p>"
                }
            },
            "vista1": {
                widgets: {
                    assignment: {
                        codigo: '11',
                        alias: "Cuadro 11",
                        clase: "hijoNegro",
                        titulo: "PERÚ: NÚMERO DE DISTRITOS Y POBLACIÓN CENSADA, SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2" class="textAlignCenter">Rango de población</th>\n' +
                        '<th colspan="4" class="textAlignCenter">2007</th>\n' +
                        '<th colspan="4" class="textAlignCenter">2017</th>\n'+
                        '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
                        '</tr>\n'+
                        '<tr>\n' +
                        '<th>Nº de Distritos</th>\n' +
                        '<th>(%) </th>\n' +
                        '<th>Población</th>\n'+
                        '<th>(%)</th>\n'+
                        '<th>Nº de Distritos</th>\n' +
                        '<th>(%) </th>\n' +
                        '<th>Población</th>\n'+
                        '<th>(%)</th>\n'+
                        '</tr>\n',
                        columns: [
                            {"data": "cod_tematico"},
                            {"data": "absoluto_territorio_01"},
                            {"data": "porcentaje_territorio_01"},
                            {"data": "absoluto_01"},
                            {"data": "porcentaje_01"},
                            {"data": "absoluto_territorio_03"},
                            {"data": "porcentaje_territorio_03"},
                            {"data": "absoluto_03"},
                            {"data": "porcentaje_03"},
                            {"data": "orden", visible: false}
                        ],
                        columnDefs: [
                            {
                                targets: 0,
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('textAlignLeft anchoRangoTabla');
                                },
                                render: function (data, type, row) {
                                    return _titulos.tematico(data, 'P014000');
                                }
                            },
                            {
                                targets: [3,7],
                                createdCell: function (td, cellData, rowData, row, col) {
                                    $(td).addClass('millones');
                                }
                            },
                            {
                                targets: [1,3,5,7],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                }
                            },
                            {
                                targets: [2,4,6,8],
                                render: function (data, type, row) {
                                    return utils.round(data,1).toFixed(1);
                                }
                            }
                        ],
                        fuente: 'Nota: En 2007 autoridades no permitieron censo en el distrito de Carmen Alto, provincia de Huamanga, departamento de Ayacucho.<br />\n' +
                        '<b>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda</b>',

                        secundario: {
                            codigo: '12',
                            alias: "Cuadro 12",
                            titulo: "PERÚ: POBLACIÓN CENSADA Y TASA DE CRECIMIENTO PROMEDIO ANUAL, DE LOS 30 DISTRITOS MÁS POBLADOS,  1993, 2007 Y 2017",
                            cabecera: '<tr>\n' +
                            '<th rowspan="2">UBIGEO</th>\n' +
                            '<th rowspan="2">DISTRITO</th>\n' +
                            '<th colspan="3">POBLACIÓN</th>\n' +
                            '<th colspan="2">TASA DE CRECIMIENTO PROMEDIO ANUAL (%)</th>\n'+
                            '<th rowspan="2" style="display: none;">ORDEN</th>\n'+
                            '</tr>\n'+
                            '<tr>\n' +
                            '<th>1993</th>\n' +
                            '<th>2007</th>\n'+
                            '<th>2017</th>\n'+
                            '<th>1993-2007</th>\n' +
                            '<th>1993-2017</th>\n' +
                            '</tr>\n',

                            columns: [
                                {"data": "cod_territorio"},
                                {"data": "cod_territorio"},
                                {"data": "absoluto_p010100_09"},
                                {"data": "absoluto_p010100_01"},
                                {"data": "absoluto_p010100_03"},
                                {"data": "porcentaje_p013700_01"},
                                {"data": "porcentaje_p013700_03"},
                                {"data": "orden", visible: false}
                            ],
                            columnDefs: [
                                {
                                    targets: 1,
                                    render: function (data, type, row) {
                                        return _titulos.territorio(data, '00')
                                    },
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).addClass('textAlignLeft');
                                    }
                                },
                                {
                                    targets: [2,3,4],
                                    render: function (data, type, row) {
                                        return utils.numberFormat(data);
                                    },
                                    createdCell: function (td, cellData, rowData, row, col) {
                                        $(td).addClass('millones');
                                    }
                                },
                                {
                                    targets: [5,6],
                                    render: function (data, type, row) {
                                        return utils.round(data,1).toFixed(1);
                                    }
                                }
                            ],
                            fuente: 'Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.',
                        }
                    },
                    location_on: [],
                    info: "<p>A la fecha del Censo de 2017 existían en el país 1 mil 874 distritos, 42 más que en 2007, los cuales fueron creados en el periodo intercensal.\n" +
                    "Entre los dos censos, según rango de población, se ha incrementado el número de distritos en los de mayor y menor población; de dos distritos a cuatro en el rango de 500 mil y más habitantes y, de 45 a 49 en el rango de 100 mil a 499,999 habitantes, en conjunto representan 2,8% del total de distritos y 43,9% de la población censada 2017, frente a 2,6% y 40,2%, respectivamente en 2007.</p>\n" +
                    "\n" +
                    "<p>En el otro extremo se encuentran 308 distritos en el rango de 1,000 a 1,999 habitantes, 210 entre 500 a 999 habitantes y 88 en el rango de menos 500 habitantes, agrupados congregan 32,3% del total de distritos, sin embargo, apenas concentran el 2,2% de la población censada. En el año 2007, representaron el 37,8% del total de distritos y 2,5% de la población censada</p>\n" +
                    "\n" +
                    "<p>De los 1 mil 874 distritos existentes a la fecha del Censo 2017, se ha seleccionado 30 en función del tamaño poblacional, estos superan los 160 mil habitantes, como es de esperar un buen número corresponden a la provincia de Lima, específicamente 19 distritos y el más poblado sigue siendo el distrito de San Juan de Lurigancho con 1 millón 38 mil 495 habitantes, en el 2007 también ocupaba el primer lugar, le sigue, San Martín de Porres y Ate.</p>\n" +
                    "\n" +
                    "<p>Entre los más poblados también destacan dos distritos de la Provincia Constitucional del Callao (Callao y Ventanilla) y, en los departamentos: tres en La Libertad (Trujillo, El Porvenir y La Esperanza), uno en Lambayeque (Chiclayo), Áncash (Chimbote), Arequipa (Cerro Colorado), Puno (Juliaca), y Piura (Sullana).</p>\n" +
                    "\n" +
                    "<p>Destacan con alta tasa de crecimiento intercensal 2007-2017 los distritos de: Cerro Colorado de la provincia y departamento de Arequipa, Carabayllo, Lurigancho y Puente Piedra de la provincia de Lima; y, El Porvenir de la provincia de Trujillo, departamento de La Libertad.</p>"
                }
            }
        }
    };

    var listado_widgets = ['bar_chart', 'assignment', 'location_on', 'info'];

    var init = function () {
        console.log(">>> init dashboard");
        appData = appData();
        for (var bloque in data) {
            var vista_default = data[bloque]["default"];
            var vista = data[bloque][vista_default];
            //$("#"+bloque+" .contentTabs").html(utils.format(contentTabs, [bloque]));
            _barraHerramientas(this, bloque, Object.keys(vista.widgets), vista_default);
        }
    };

    var _barraHerramientas = function (_this, uiId, options, vista_default) {
        console.log(">>> llama herramientas dashboard");
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
            var uiCallback = options[i]+utils.capitalizeFirstLetter(uiId);
            if (_this.uiBarraHerramientas.hasOwnProperty(uiCallback)) {
                console.log("2>>>>>>>",uiCallback);
                _this.uiBarraHerramientas[uiCallback](uiId, vista_default, options[i], content);
            }
        }
        $("#"+uiId+" .BarraHerramientas").html(html);
    };

    var _titulos = {
        tematico: function (data, total) {
            if (data == total) {
                return "Total";
            }
            else {
                if (appData.tituloIndicadores.hasOwnProperty(data)) {
                    return appData["tituloIndicadores"][data].titulo;
                }else {
                    return '';
                }
            }
        },

        territorio: function (data, total) {
            if (data == total) {
                return "TOTAL"
            }else {
                if (appData.titulo.hasOwnProperty('U'+data)) {
                    return appData.titulo['U'+data];
                }else {
                    return '';
                }
            }
        },

        fuente: function(data) {
            var fuentes = {
                "05": "1940", "06": "1961", "07": "1972", "08": "1981","09": "1993", "01": "2007", "03": "2017"
            };
            return fuentes[data];
        }
    };
    var crearTabla = function (objtabla, bloque, cuadro, tabla, titulo, fuente) {
        $(tabla+" tbody").removeClass("hijoNegro");
        service.dashboard.getCuadro( cuadro.codigo, function (datos) {
            if (data[bloque][objtabla] !== undefined) {
                data[bloque][objtabla].clear().draw();
                data[bloque][objtabla].destroy();
            }

            $(fuente).html(cuadro.fuente);
            $(titulo).html(cuadro.titulo);
            $(tabla).children('thead').html(cuadro.cabecera);

            if (cuadro.clase !== undefined) {
                $(tabla+" tbody").addClass(cuadro.clase);
            }

            data[bloque][objtabla] = $(tabla).DataTable({
                data: datos,
                columns: cuadro.columns,
                columnDefs: (cuadro.columnDefs !== undefined) ? cuadro.columnDefs : [],
                paging: false,
                info: false,
                ordering: true,
                searching: false

            }).columns(-1).order('asc').draw();
        });
    };

    var assignmentBloque = function (bloque, vista, seleccion, content) {
        var cuadro = data[bloque][vista].widgets.assignment;
        if (cuadro.codigo !== undefined) {
            var tabla = "#table_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            var fuente = "#fuente_"+seleccion+"_"+bloque;

            crearTabla('tabla', bloque, cuadro, tabla, titulo, fuente);

            if (cuadro.secundario !== undefined) {
                var cuadro2 = cuadro.secundario;
                var tabla2 = "#table_"+seleccion+"_"+bloque+"_2";
                var titulo2 = "#titulo_"+seleccion+"_"+bloque+"_2";
                var fuente2 = "#fuente_"+seleccion+"_"+bloque+"_2";

                $(tabla2).show();
                $(titulo2).show();
                $(fuente2).show();
                crearTabla("tabla_secundaria", bloque, cuadro2, tabla2, titulo2, fuente2);
            }
        }
    };

    var uiBarraHerramientas= {
        assignmentBloque1: function (bloque, vista, seleccion, content) {
            assignmentBloque(bloque, vista, seleccion, content);
        },
        assignmentBloque2: function (bloque, vista, seleccion, content) {
            assignmentBloque(bloque, vista, seleccion, content);
        },

        assignmentBloque3: function (bloque, vista, seleccion, content) {
            assignmentBloque(bloque, vista, seleccion, content);
        },
        assignmentBloque4: function (bloque, vista, seleccion, content) {
            assignmentBloque(bloque, vista, seleccion, content);

        },
        infoBloque1: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },
        infoBloque2: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },

        infoBloque3: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },
        infoBloque4: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },

        "bar_chartBloque1": function (bloque, vista, seleccion, content) {
            var charId = seleccion+"_"+bloque;
            var charId2 = seleccion+"_2_"+bloque;
            var fuente = "#fuente_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            $(titulo).html(data[bloque][vista].widgets.bar_chart.titulo);
            $(fuente).html(data[bloque][vista].widgets.bar_chart.fuente);

            $("#"+charId2).hide();
            // Vista 1
            if (vista == 'vista1') {
                Highcharts.chart(charId, {
                    chart: {
                        zoomType: 'xy'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: [{
                        categories: ['1940', '', '1961', '', '1972', '', '1981', '', '1993', '', '2007', '', '2017'],
                        crosshair: true
                    }],
                    yAxis: [
                        { // Primary yAxis
                            title: {
                                text: 'Miles',
                                textAlign: 'left',
                                align:'high',
                                rotation: 0,
                                y: -20,
                                offset: 50
                            },
                            labels: {
                                format: '{value}'
                            },
                            max: 40000

                        },
                        { // Secondary yAxis
                            title: {
                                text: '(%)',
                                textAlign: 'right',
                                align:'high',
                                rotation: 0,
                                offset: -2,
                                //x: 34,
                                y: -20
                            },

                            labels: {
                                format: '{value}'
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
                            //color: data[bloque][vista].widgets.bar_chart.colors[0]

                        },
                        {
                            name: 'Tasa de Crecimiento',
                            color: data[bloque][vista].widgets.bar_chart.colors[1],

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
                    subtitle: {
                        text: ''
                    },

                    yAxis: { // Primary yAxis
                        title: {
                            text: ''
                        },
                        max: 25
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
                        name: "DENSIDAD POBLACIONAL"

                    }]

                });
            }
            else if (vista == 'vista3') {
                $("#"+charId2).height(600);
                $("#"+charId2).show();
                Highcharts.chart(charId, {
                    chart: {
                        type: 'bar'
                    },
                    subtitle: {
                        text: "América del Sur"
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
                        data: [211175, 49059, 44121, 32121, {
                            y: 31237, color: "#0070c0"
                        }, 18209, 16624,  11071, 6805, 3456]
                    }]
                });
                Highcharts.chart(charId2, {
                    chart: {
                        type: 'bar'
                    },
                    subtitle: {
                        text: "América Latina"
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
                        data: [211175, 127878, 49059, 44121, 32121, {
                            y: 31237, color: "#0070c0"
                        }, 18209, 16624, 16536, 11423, 11071, 11029, 10779, 9071, 6805, 6350, 6218, 4918, 4054, 3456]
                    }]
                });
            }
            else if (vista == 'vista4') {
                Highcharts.chart(charId, {
                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: ["Ecuador", "Colombia", "Venezuela", "Brasil", "Perú", "Chile", "Uruguay", "Paraguay", "Argentina", "Bolivia"]
                    },
                    series: [{
                        type: 'column',
                        data: [58.6, 43.0, 35.1, 24.8, {y: 24.3, color: "#0070c0"}, 24.1, 19.6, 16.7, 15.8, 10.1],
                        dataLabels:{
                            enabled: true
                        },
                        name: "(Hab. / Km2)"
                    }]

                });
            }



        },

        "bar_chartBloque2": function (bloque, vista, seleccion, content) {
            console.log(">>>> loque 2")
            var charId = seleccion+"_"+bloque;
            var charId2 = seleccion+"_2_"+bloque;
            var charId3 = seleccion+"_3_"+bloque;
            var charId4 = seleccion+"_4_"+bloque;
            var fuente = "#fuente_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            var titulo2 = "#titulo2_"+seleccion+"_"+bloque;
            $(titulo).html(data[bloque][vista].widgets.bar_chart.titulo+"arroz");
            $(fuente).html(data[bloque][vista].widgets.bar_chart.fuente);

            $("#"+charId2).hide();
            $("#"+charId3).hide();
            $("#"+charId4).hide();
            $(titulo2).hide();

            if (vista == 'vista0') {

                Highcharts.chart(charId, {
                    chart: {
                        type: 'column'
                    },
                    //colors: ['#dcf7f8', '#00ccff'],
                    subtitle: {
                        text: ''
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
                    "0-4",
                    "5-9",
                    "10-14",
                    "15-19",
                    "20-24",
                    "25-29",
                    "30-34",
                    "35-39",
                    "40-44",
                    "45-49",
                    "50-54",
                    "55-59",
                    "60-64",
                    "65-69",
                    "70-74",
                    "75-79",
                    "80 y más"];
                $("#"+charId2).show();
                Highcharts.chart(charId, {
                    chart: {
                        type: 'bar'
                    },
                    subtitle: {
                        text: '2017'
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
                                'Población (%): ' + Math.abs(Math.round(this.point.y*10)/10);
                        }
                    },

                    series: [{
                        name: 'Hombres',
                        data: [
                            -4.319811487,
                            -4.573617539,
                            -4.505847889,
                            -4.144009281,
                            -4.194152424,
                            -3.94887884,
                            -3.731105194,
                            -3.515274922,
                            -3.227019071,
                            -2.809619016,
                            -2.471533139,
                            -2.095355764,
                            -1.700102008,
                            -1.326021163,
                            -1.0262378,
                            -0.730875529,
                            -0.86307944


                        ] // 17
                    }, {
                        name: 'Mujeres',
                        data: [
                            4.165066474,
                            4.429079497,
                            4.38786022,
                            4.103137158,
                            4.349860615,
                            4.175726104,
                            3.952680502,
                            3.710163719,
                            3.419389308,
                            3.002632506,
                            2.64410206,
                            2.224537405,
                            1.833827266,
                            1.423101391,
                            1.09756066,
                            0.811843788,
                            1.08689082
                        ] //17
                    }]
                });

                Highcharts.chart(charId2, {
                    chart: {
                        type: 'bar'
                    },
                    subtitle: {
                        text: '2007'
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
                                'Población (%): ' + Math.abs(Math.round(this.point.y*10)/10);
                        }
                    },

                    series: [{
                        name: 'Hombres',
                        data: [
                            -5.067999574
                            ,-4.986878632
                            , -5.484190828,
                            -5.010090961
                            , -4.58098208
                            ,  -4.113620099
                            ,
                            -3.705129808
                            , -3.305321796
                            , -2.947057395
                            ,
                            -2.450821364
                            , -2.046653972
                            , -1.600614647
                            ,
                            -1.313887849
                            , -1.038170765
                            , -0.804285485
                            ,
                            -0.610820228
                            , -0.629089495

                        ] // 17
                    }, {
                        name: 'Mujeres',
                        data: [
                            4.871459039
                            ,  4.804134895
                            , 5.273754999
                            ,
                            4.951857674
                            , 4.654168587
                            , 4.24714115
                            ,
                            3.863377114
                            ,  3.523225115
                            ,3.043200869
                            ,
                            2.552013692
                            ,  2.158221259
                            , 1.653937704
                            ,
                            1.352651672
                            , 1.075132468
                            , 0.848258676
                            ,
                            0.644093787
                            , 0.787756323

                        ] //17
                    }]
                });
            }
            else if (vista == 'vista2') {
                $("#"+charId2).show();
                $("#"+charId3).show();
                $("#"+charId4).show();
                $(titulo2).html('PERÚ: ÍNDICE DE MASCULINIDAD, SEGÚN DEPARTAMENTO, 1993 y 2017');
                $(titulo2).show();
                Highcharts.chart(charId, {

                    subtitle: {
                        text: ''
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
                    //colors: ['#dcf7f8', '#00ccff'],
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
                    //colors: ['#dcf7f8', '#00ccff'],
                    subtitle: {
                        text: 'SIERRA'
                    },
                    xAxis: {
                        categories: [
                            'Pasco',
                            'Huánuco',
                            'Apurímac',
                            'Ayacucho',
                            'Puno',
                            'Áncash',
                            'Cajamarca',
                            'Arequipa',
                            'Junín',
                            'Huancavelica'
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
                        data: [105.8, 101.8, 98.7, 99.7, 98.6, 99.7, 99.2, 99.8, 97.0, 99.4, 97.8]

                    }, {
                        name: '2017',
                        data: [101.7, 98.2, 98.0, 98.0, 97.6, 97.3, 97.2, 96.2, 96.1, 95.6, 94.4]

                    }]
                });

                Highcharts.chart(charId4, {
                    chart: {
                        type: 'column'
                    },
                    //colors: ['#dcf7f8', '#00ccff'],
                    subtitle: {
                        text: 'SELVA'
                    },
                    xAxis: {
                        categories: [
                            'Madre De Dios',
                            'San Martín',
                            'Ucayali',
                            'Amazonas',
                            'Loreto'
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
                        data: [118.9, 110.5, 105.8, 105.4, 105.1]

                    }, {
                        name: '2017',
                        data: [109.8, 104.1, 101.9, 101.7, 100.9]

                    }]
                });
            }
        },

        "bar_chartBloque3": function (bloque, vista, seleccion, content) {
            var charId = seleccion+"_"+bloque;
            var charId2 = seleccion+"_2_"+bloque;
            var charId3 = seleccion+"_3_"+bloque;
            var charId4 = seleccion+"_4_"+bloque;
            var charId5 = seleccion+"_5_"+bloque;
            var charId51 = seleccion+"_5_"+bloque+"_1";
            var charId52 = seleccion+"_5_"+bloque+"_2";
            var charId53 = seleccion+"_5_"+bloque+"_3";
            var charId7 = seleccion+"_7_"+bloque;
            var charId71 = seleccion+"_7_"+bloque+"_1";
            var charId72 = seleccion+"_7_"+bloque+"_2";
            var charId73 = seleccion+"_7_"+bloque+"_3";
            var fuente = "#fuente_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            var titulo2 = "#titulo2_"+seleccion+"_"+bloque;
            $(titulo).html(data[bloque][vista].widgets.bar_chart.titulo);
            $(fuente).html(data[bloque][vista].widgets.bar_chart.fuente);


            $("#"+charId2).hide();
            $("#"+charId3).hide();
            $("#"+charId4).hide();
            $("#"+charId5).hide();
            //$("#"+charId6).hide();
            $("#"+charId7).hide();

            $(titulo2).hide();

            if (vista == 'vista0') {
                $("#"+charId3).show();
                $("#"+charId4).show();
                $("#"+charId5).show();
                $("#"+charId7).show();
                $(titulo2).html("PERÚ: EVOLUCIÓN DE LA DISTRIBUCIÓN DE LA POBLACIÓN CENSADA, POR REGIÓN NATURAL, 1940 - 2017");
                $(titulo2).show();
                $("#"+charId).height("auto");

                Highcharts.chart(charId, {
                    chart: {
                        type: 'column'
                    },
                    //colors: ['#dcf7f8', '#00ccff'],
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: [
                            'Costa',
                            'Sierra',
                            'Selva'
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
                        data: [54.6, 32.0, 13.4]

                    }, {
                        name: '2017',
                        data: [58.0, 28.1, 13.9]

                    }]
                });

                Highcharts.chart(charId51, {
                    chart: {
                        type: 'column'
                    },
                    colors: ["#0070C0"],
                    exporting: [],
                    subtitle: {
                        text: 'COSTA'
                    },
                    xAxis: {
                        categories: [
                            '1940',
                            '1961',
                            '1972',
                            '1981',
                            '1993',
                            '2007',
                            '2017'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false,
                        max: 70
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
                        name: 'Costa',
                        data: [28.3, 39.0, 46.1, 49.8, 52.4, 54.6, 58.0]

                    }]
                });

                Highcharts.chart(charId52, {
                    chart: {
                        type: 'column'
                    },
                    exporting: [],
                    colors: ["#ffd85d"],
                    subtitle: {
                        text: 'SIERRA'
                    },
                    xAxis: {
                        categories: [
                            '1940',
                            '1961',
                            '1972',
                            '1981',
                            '1993',
                            '2007',
                            '2017'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false,
                        max: 70
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
                        name: 'SIERRA',
                        data: [65.0, 52.3, 44.0, 39.7, 34.8, 32.0, 28.1]

                    }]
                });

                Highcharts.chart(charId53, {
                    chart: {
                        type: 'column'
                    },
                    exporting: [],
                    colors: ["#b4de86"],
                    subtitle: {
                        text: 'SELVA'
                    },
                    xAxis: {
                        categories: [
                            '1940',
                            '1961',
                            '1972',
                            '1981',
                            '1993',
                            '2007',
                            '2017'
                        ],
                        crosshair: true
                    },
                    yAxis: {
                        visible: false,
                        max: 70
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
                        name: 'SELVA',
                        data: [6.7, 8.7, 9.9, 10.6, 12.8, 13.4, 13.9]

                    }]
                });

                var categoria7 = ["190-1961", "1961-1972", "1972-1981", "1981-1993", "1993-2007", "2007-2017"];
                Highcharts.chart(charId71, {
                    chart: {
                        type: 'column'
                    },
                    colors: ["#0070C0"],
                    exporting: [],
                    subtitle: {
                        text: 'COSTA'
                    },
                    xAxis: {
                        categories: categoria7,
                        crosshair: true
                    },
                    yAxis: {
                        visible: true,
                        max: 5,
                        min: -1,
                        lineWidth: 1,
                        gridLineWidth: 0
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
                        name: 'Costa',
                        data: [3.8, 4.5, 3.4, 2.6, 2.2, 1.3]

                    }]
                });

                Highcharts.chart(charId72, {
                    chart: {
                        type: 'column'
                    },
                    exporting: [],
                    colors: ["#ffd85d"],
                    subtitle: {
                        text: 'SIERRA'
                    },
                    xAxis: {
                        categories: categoria7,
                        crosshair: true
                    },
                    yAxis: {
                        visible: false,
                        max: 5,
                        min: -1
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
                        name: 'SIERRA',
                        data: [1.2, 1.3, 1.4, 1.1, 1.1, -0.6]

                    }]
                });

                Highcharts.chart(charId73, {
                    chart: {
                        type: 'column'
                    },
                    exporting: [],
                    colors: ["#b4de86"],
                    subtitle: {
                        text: 'SELVA'
                    },
                    xAxis: {
                        categories: categoria7,
                        crosshair: true
                    },
                    yAxis: {
                        visible: false,
                        max: 5,
                        min: -1
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
                        name: 'SELVA',
                        data: [3.6, 4.1, 3.3, 3.9, 2.2, 1.0]

                    }]
                });
            }
            else if (vista == 'vista1') {
                $("#"+charId).height(600);
                $("#"+charId2).show();
                $(titulo2).html("PERÚ: DISTRIBUCIÓN RELATIVA DE LA POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 2017");
                $(titulo2).show();
                Highcharts.chart(charId, {
                    chart: {
                        type: 'bar'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: ["Lima", "Provincia de Lima 1/", "Piura", "La Libertad", "Arequipa", "Cajamarca", "Junín", "Cusco", "Lambayeque", "Puno", "Áncash", "Prov. Const. del Callao", "Región Lima 2", "Loreto", "Ica", "San Martín", "Huánuco", "Ayacucho", "Ucayali", "Apurímac", "Amazonas", "Huancavelica", "Tacna", "Pasco", "Tumbes", "Moquegua", "Madre de Dios"],
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
                        data: [9485.4, 8575.0, 1856.8, 1778.1, 1382.7, 1341.0, 1246.0, 1205.5, 1197.3, 1172.7, 1083.5, 994.5, 910.4, 883.5, 850.8, 813.4, 721.0,  616.2, 496.5, 405.8, 379.4, 347.6, 329.3, 254.1, 224.9, 174.9, 141.1]
                    }]
                });
                Highcharts.chart(charId2, {

                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: ["Lima", "Provincia de Lima 1/", "Piura", "La Libertad", "Arequipa", "Cajamarca", "Junín", "Cusco", "Lambayeque", "Puno", "Áncash", "Prov. Const. del Callao", "Región Lima 2", "Loreto", "Ica", "San Martín", "Huánuco", "Ayacucho", "Ucayali", "Apurímac", "Amazonas", "Huancavelica", "Tacna", "Pasco", "Tumbes", "Moquegua", "Madre de Dios"]
                    },


                    series: [{
                        type: 'column',
                        data: [32.3, 27.9, 6.3, 6.1, 4.7, 4.6, 4.2, 4.1, 4.1, 4.0, 3.7, 3.4, 3.0, 3.0, 2.9, 2.8, 2.5, 2.1, 1.7, 1.4, 1.3, 1.2, 1.1, 0.9, 0.8, 0.6, 0.5],
                        dataLabels:{
                            enabled: true
                        },
                        name: "DENSIDAD POBLACIONAL",
                    }]

                });

            }
            else if (vista == 'vista2') {
                Highcharts.chart(charId, {

                    subtitle: {
                        text: ''
                    },

                    series: [{
                        name: 'Tasa de crecimiento promedio anual 1993-2007',
                        data: [3.5, 1.6, 1.6, 2.2, 2.0, 2.3, 2.0, 2.0, 1.8, 2.0, 1.3, 1.7, 1.5, 1.6, 1.3, 0.9, 0.8,
                            1.2, 0.8, 1.5, 0.4, 1.8, 0.7, 1.1, 1.1, 1.5, 1.2],
                        dataLabels:{
                            enabled: true
                        },
                    }, {
                        name: 'Tasa de crecimiento promedio anual 2007-2017',
                        data: [2.6, 1.8, 1.8, 1.4, 1.3, 1.2, 1.2, 1.2, 1.2, 1.1, 1.0, 1.0, 0.8, 0.8, 0.7, 0.3, 0.2,
                            0.2, 0.1, 0.1, 0.0, -0.1, -0.3, -0.6, -0.8, -1.0, -2.7],
                        color: 'red',
                        dataLabels:{
                            enabled: true
                        }
                    }]
                });

            }
            else if (vista == 'vista3') {
                Highcharts.chart(charId, {
                    subtitle: {
                        text: ''
                    },

                    xAxis: {
                        categories: ["Ucayali", "Madre de Dios", "Provincia de Lima 1/", "Prov. Const. del Callao", "Lima", "Tacna", "Tumbes", "San Martín", "Lambayeque", "Ica", "Loreto", "Amazonas", "Moquegua", "La Libertad", "Píura", "Junín", "Región Lima 2/", "Huánuco", "Pasco", "Cajamarca", "Ancash", "Cusco", "Puno", "Ayacucho", "Apurímac", "Huancavelica"]
                    },

                    series: [{
                        type: 'column',
                        data: [24.3, 16.5, 14.3, 12.2, 11.4, 8.9, 8.8, 8.3, 6.1, 6.1, 6.0, 5.7, 5.2, 5.1, 4.6, 4.6, 4.3, 3.4, 3.1, 2.8, 2.7, 2.5, 2.5, 2.3, 1.7, 1.6, 1.4],
                        dataLabels:{
                            enabled: true
                        },
                        name: "DENSIDAD POBLACIONAL",
                    }]

                });
            }
        }
    };

    // Eventos del UI
    var dashboardWidgetChangeEvent = function (options) {
        console.log("dashboardWidgetChangeEvent >>>>", options);
    };

    var dashboardVistaChangeEvent = function (options) {
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
        dashboardVistaChangeEvent: dashboardVistaChangeEvent,
        tablaDatos: data
    }
})(AppConfig(), Appdata, App.utils, App.service);
