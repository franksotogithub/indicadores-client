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
                        titulo: "PERÚ: DISTRIBUCIÓN PORCENTUAL DE LA POBLACIÓN CENSADA, POR SEXO, SEGÚN DEPARTAMENTO, 2007 Y 2017 <br /> (Porcentaje)",
                        data: [
                            {
                                "departamento": "Total",
                                "total_2007": 27412157,
                                "hombre_2007": 49.7,
                                "mujer_2007": 50.3,
                                "total_2017": 29381884,
                                "hombre_2017": 49.2,
                                "mujer_2017": 50.8
                            },
                            {
                                "departamento": "Amazonas",
                                "total_2007": 375993,
                                "hombre_2007": 51.03,
                                "mujer_2007": 48.7,
                                "total_2017": 379384,
                                "hombre_2017": 50.4,
                                "mujer_2017": 49.6
                            },
                            {
                                "departamento": "Áncash",
                                "total_2007": 1063459,
                                "hombre_2007": 49.8,
                                "mujer_2007": 50.2,
                                "total_2017": 1083519,
                                "hombre_2017": 49.3,
                                "mujer_2017": 50.7
                            },
                            {
                                "departamento": "Apurímac",
                                "total_2007": 404190,
                                "hombre_2007": 49.7,
                                "mujer_2007": 50.3,
                                "total_2017": 405759,
                                "hombre_2017": 49.5,
                                "mujer_2017": 50.5
                            },
                            {
                                "departamento": "Arequipa",
                                "total_2007": 1152303,
                                "hombre_2007": 49.2,
                                "mujer_2007": 50.8,
                                "total_2017": 1382730,
                                "hombre_2017": 49,
                                "mujer_2017": 51
                            },
                            {
                                "departamento": "Ayacucho",
                                "total_2007": 612489,
                                "hombre_2007": 49.7,
                                "mujer_2007": 50.3,
                                "total_2017": 616176,
                                "hombre_2017": 49.4,
                                "mujer_2017": 50.6
                            },
                            {
                                "departamento": "Cajamarca",
                                "total_2007": 1387809,
                                "hombre_2007": 49.9,
                                "mujer_2007": 50.1,
                                "total_2017": 1341012,
                                "hombre_2017": 49,
                                "mujer_2017": 51
                            },
                            {
                                "departamento": "Prov. Const. del Callao",
                                "total_2007": 879679,
                                "hombre_2007": 49.1,
                                "mujer_2007": 50.9,
                                "total_2017": 994494,
                                "hombre_2017": 48.8,
                                "mujer_2017": 51.2
                            },
                            {
                                "departamento": "Cusco",
                                "total_2007": 1171403,
                                "hombre_2007": 49.9,
                                "mujer_2007": 50.1,
                                "total_2017": 1205527,
                                "hombre_2017": 49.5,
                                "mujer_2017": 50.5
                            },
                            {
                                "departamento": "Huancavelica",
                                "total_2007": 454797,
                                "hombre_2007": 49.5,
                                "mujer_2007": 50.5,
                                "total_2017": 347639,
                                "hombre_2017": 48.6,
                                "mujer_2017": 51.4
                            },
                            {
                                "departamento": "Huánuco",
                                "total_2007": 762223,
                                "hombre_2007": 50.4,
                                "mujer_2007": 49.6,
                                "total_2017": 721047,
                                "hombre_2017": 49.5,
                                "mujer_2017": 50.5
                            },
                            {
                                "departamento": "Ica",
                                "total_2007": 711932,
                                "hombre_2007": 49.6,
                                "mujer_2007": 50.4,
                                "total_2017": 850765,
                                "hombre_2017": 49.3,
                                "mujer_2017": 50.7
                            },
                            {
                                "departamento": "Junín",
                                "total_2007": 1225474,
                                "hombre_2007": 49.8,
                                "mujer_2007": 50.2,
                                "total_2017": 1246038,
                                "hombre_2017": 48.9,
                                "mujer_2017": 51.1
                            },
                            {
                                "departamento": "La Libertad",
                                "total_2007": 1617050,
                                "hombre_2007": 49.4,
                                "mujer_2007": 50.6,
                                "total_2017": 1778080,
                                "hombre_2017": 48.8,
                                "mujer_2017": 51.2
                            },
                            {
                                "departamento": "Lambayeque",
                                "total_2007": 1112868,
                                "hombre_2007": 48.7,
                                "mujer_2007": 51.3,
                                "total_2017": 1197260,
                                "hombre_2017": 48.5,
                                "mujer_2017": 51.5
                            },
                            {
                                "departamento": "Lima",
                                "total_2007": 8442409,
                                "hombre_2007": 49,
                                "mujer_2007": 51,
                                "total_2017": 9485405,
                                "hombre_2017": 48.8,
                                "mujer_2017": 51.2
                            },
                            {
                                "departamento": "Loreto",
                                "total_2007": 891732,
                                "hombre_2007": 51.2,
                                "mujer_2007": 48.8,
                                "total_2017": 883510,
                                "hombre_2017": 50.2,
                                "mujer_2017": 49.8
                            },
                            {
                                "departamento": "Madre de Dios",
                                "total_2007": 109555,
                                "hombre_2007": 54.3,
                                "mujer_2007": 45.7,
                                "total_2017": 141070,
                                "hombre_2017": 52.3,
                                "mujer_2017": 47.7
                            },
                            {
                                "departamento": "Moquegua",
                                "total_2007": 161533,
                                "hombre_2007": 51.3,
                                "mujer_2007": 48.7,
                                "total_2017": 174863,
                                "hombre_2017": 50.4,
                                "mujer_2017": 49.6
                            },
                            {
                                "departamento": "Pasco",
                                "total_2007": 280449,
                                "hombre_2007": 51.4,
                                "mujer_2007": 48.6,
                                "total_2017": 254065,
                                "hombre_2017": 50.4,
                                "mujer_2017": 49.6
                            },
                            {
                                "departamento": "Piura",
                                "total_2007": 1676315,
                                "hombre_2007": 49.8,
                                "mujer_2007": 50.2,
                                "total_2017": 1856809,
                                "hombre_2017": 49.5,
                                "mujer_2017": 50.5
                            },
                            {
                                "departamento": "Puno",
                                "total_2007": 1268441,
                                "hombre_2007": 49.9,
                                "mujer_2007": 50.1,
                                "total_2017": 1172697,
                                "hombre_2017": 49.3,
                                "mujer_2017": 50.7
                            },
                            {
                                "departamento": "San Martín",
                                "total_2007": 728808,
                                "hombre_2007": 52.5,
                                "mujer_2007": 47.5,
                                "total_2017": 813381,
                                "hombre_2017": 51,
                                "mujer_2017": 49
                            },
                            {
                                "departamento": "Tacna",
                                "total_2007": 288781,
                                "hombre_2007": 50,
                                "mujer_2007": 50,
                                "total_2017": 329332,
                                "hombre_2017": 49.7,
                                "mujer_2017": 50.3
                            },
                            {
                                "departamento": "Tumbes",
                                "total_2007": 200306,
                                "hombre_2007": 51.8,
                                "mujer_2007": 48.2,
                                "total_2017": 224863,
                                "hombre_2017": 50.5,
                                "mujer_2017": 49.5
                            },
                            {
                                "departamento": "Ucayali",
                                "total_2007": 432159,
                                "hombre_2007": 51.4,
                                "mujer_2007": 48.6,
                                "total_2017": 496459,
                                "hombre_2017": 50.5,
                                "mujer_2017": 49.5
                            },
                            {
                                "departamento": "Provincia de Lima 1/",
                                "total_2007": 7602940,
                                "hombre_2007": 48.8,
                                "mujer_2007": 51.2,
                                "total_2017": 8574974,
                                "hombre_2017": 48.6,
                                "mujer_2017": 51.4
                            },
                            {
                                "departamento": "Región Lima 2/",
                                "total_2007": 839469,
                                "hombre_2007": 50.8,
                                "mujer_2007": 49.2,
                                "total_2017": 910431,
                                "hombre_2017": 50.2,
                                "mujer_2017": 49.8
                            }
                        ],
                        columns: [
                            {"data": "departamento"},
                            {"data": "total_2007"}, //1
                            {"data": "hombre_2007"},
                            {"data": "mujer_2007"},
                            {"data": "total_2017"}, //4
                            {"data": "hombre_2017"},
                            {"data": "mujer_2017"}
                        ],
                        columnDefs: [
                            {
                                targets: [1, 4],
                                render: function (data, type, row) {
                                    return utils.numberFormat(data);
                                }
                            }],
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
                        '</tr>',
                        fuente: "<p>1/ Comprende los 43 distritos de la provincia de Lima.</p>\n" +
                        "<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>\n" +
                        "<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>"
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
                        '</tr>',

                        data: [
                            {
                                "departamento": "Total",
                                "censada_2007": 27412157,
                                "censada_2017": 29381884,
                                "razon_2007": 58.5,
                                "razon_2017": 53.2,
                                "proporcion_2007": 9.1,
                                "proporcion_2017": 11.9,
                                "envejecimiento_2007": 29.9,
                                "envejecimiento_2017": 45.1,
                                "relacion_2007": 15.1,
                                "relacion_2017": 19.3
                            },
                            {
                                "departamento": "Amazonas",
                                "censada_2007": 375993,
                                "censada_2017": 379384,
                                "razon_2007": 75.7,
                                "razon_2017": 65.3,
                                "proporcion_2007": 7.5,
                                "proporcion_2017": 10.4,
                                "envejecimiento_2007": 19.8,
                                "envejecimiento_2017": 32.2,
                                "relacion_2007": 13.7,
                                "relacion_2017": 18
                            },
                            {
                                "departamento": "Áncash",
                                "censada_2007": 1063459,
                                "censada_2017": 1083519,
                                "razon_2007": 64.4,
                                "razon_2017": 58.6,
                                "proporcion_2007": 10.6,
                                "proporcion_2017": 13.6,
                                "envejecimiento_2007": 33.8,
                                "envejecimiento_2017": 50.4,
                                "relacion_2007": 18.4,
                                "relacion_2017": 22.9
                            },
                            {
                                "departamento": "Apurímac",
                                "censada_2007": 404190,
                                "censada_2017": 405759,
                                "razon_2007": 81.9,
                                "razon_2017": 62.1,
                                "proporcion_2007": 10.2,
                                "proporcion_2017": 12.6,
                                "envejecimiento_2007": 27.2,
                                "envejecimiento_2017": 43.6,
                                "relacion_2007": 19.5,
                                "relacion_2017": 21.6
                            },
                            {
                                "departamento": "Arequipa",
                                "censada_2007": 1152303,
                                "censada_2017": 1382730,
                                "razon_2007": 51.1,
                                "razon_2017": 48.1,
                                "proporcion_2007": 10.3,
                                "proporcion_2017": 12.4,
                                "envejecimiento_2007": 38.8,
                                "envejecimiento_2017": 52.5,
                                "relacion_2007": 16.2,
                                "relacion_2017": 19.5
                            },
                            {
                                "departamento": "Ayacucho",
                                "censada_2007": 612489,
                                "censada_2017": 61676,
                                "razon_2007": 76.7,
                                "razon_2017": 59.5,
                                "proporcion_2007": 9.8,
                                "proporcion_2017": 11.9,
                                "envejecimiento_2007": 26.9,
                                "envejecimiento_2017": 41.6,
                                "relacion_2007": 18.1,
                                "relacion_2017": 20
                            },
                            {
                                "departamento": "Cajamarca",
                                "censada_2007": 1387809,
                                "censada_2017": 1341012,
                                "razon_2007": 70.6,
                                "razon_2017": 61.9,
                                "proporcion_2007": 9,
                                "proporcion_2017": 12,
                                "envejecimiento_2007": 25.7,
                                "envejecimiento_2017": 40.6,
                                "relacion_2007": 16,
                                "relacion_2017": 20.5
                            },
                            {
                                "departamento": "Prov.Const.del Callao",
                                "censada_2007": 879679,
                                "censada_2017": 994494,
                                "razon_2007": 49.7,
                                "razon_2017": 49.2,
                                "proporcion_2007": 9.2,
                                "proporcion_2017": 12.4,
                                "envejecimiento_2007": 34.4,
                                "envejecimiento_2017": 50.6,
                                "relacion_2007": 14.4,
                                "relacion_2017": 19.6
                            },
                            {
                                "departamento": "Cusco",
                                "censada_2007": 1171403,
                                "censada_2017": 1205527,
                                "razon_2007": 68.3,
                                "razon_2017": 53.7,
                                "proporcion_2007": 8.7,
                                "proporcion_2017": 11.1,
                                "envejecimiento_2007": 25.2,
                                "envejecimiento_2017": 40.9,
                                "relacion_2007": 15.2,
                                "relacion_2017": 18
                            },
                            {
                                "departamento": "Huancavelica",
                                "censada_2007": 454797,
                                "censada_2017": 347639,
                                "razon_2007": 85.2,
                                "razon_2017": 66.4,
                                "proporcion_2007": 8.7,
                                "proporcion_2017": 13.1,
                                "envejecimiento_2007": 21.9,
                                "envejecimiento_2017": 43,
                                "relacion_2007": 16.9,
                                "relacion_2017": 23.1
                            },
                            {
                                "departamento": "Huánuco",
                                "censada_2007": 762223,
                                "censada_2017": 721047,
                                "razon_2007": 74.9,
                                "razon_2017": 60.3,
                                "proporcion_2007": 7.6,
                                "proporcion_2017": 10.7,
                                "envejecimiento_2007": 20.4,
                                "envejecimiento_2017": 35.6,
                                "relacion_2007": 13.9,
                                "relacion_2017": 18.1
                            },
                            {
                                "departamento": "Ica",
                                "censada_2007": 711932,
                                "censada_2017": 850765,
                                "razon_2007": 55.3,
                                "razon_2017": 54.8,
                                "proporcion_2007": 9.7,
                                "proporcion_2017": 11.6,
                                "envejecimiento_2007": 33.5,
                                "envejecimiento_2017": 42.8,
                                "relacion_2007": 15.7,
                                "relacion_2017": 19
                            },
                            {
                                "departamento": "Junín",
                                "censada_2007": 1225474,
                                "censada_2017": 1246038,
                                "razon_2007": 64.2,
                                "razon_2017": 56.2,
                                "proporcion_2007": 8.6,
                                "proporcion_2017": 11.3,
                                "envejecimiento_2007": 26,
                                "envejecimiento_2017": 40.4,
                                "relacion_2007": 14.7,
                                "relacion_2017": 18.6
                            },
                            {
                                "departamento": "La Libertad",
                                "censada_2007": 1617050,
                                "censada_2017": 1778080,
                                "razon_2007": 60.7,
                                "razon_2017": 57.2,
                                "proporcion_2007": 9.5,
                                "proporcion_2017": 12,
                                "envejecimiento_2007": 30.6,
                                "envejecimiento_2017": 43,
                                "relacion_2007": 16,
                                "relacion_2017": 19.9
                            },
                            {
                                "departamento": "Lambayeque",
                                "censada_2007": 1112868,
                                "censada_2017": 1197260,
                                "razon_2007": 59.2,
                                "razon_2017": 56.2,
                                "proporcion_2007": 9.4,
                                "proporcion_2017": 12.5,
                                "envejecimiento_2007": 30.6,
                                "envejecimiento_2017": 46.1,
                                "relacion_2007": 15.6,
                                "relacion_2017": 20.8
                            },
                            {
                                "departamento": "Lima",
                                "censada_2007": 8442409,
                                "censada_2017": 9485405,
                                "razon_2007": 47.7,
                                "razon_2017": 45.7,
                                "proporcion_2007": 9.8,
                                "proporcion_2017": 12.7,
                                "envejecimiento_2007": 38.4,
                                "envejecimiento_2017": 56.7,
                                "relacion_2007": 15.1,
                                "relacion_2017": 19.7
                            },
                            {
                                "departamento": "Loreto",
                                "censada_2007": 891732,
                                "censada_2017": 883510,
                                "razon_2007": 73.8,
                                "razon_2017": 73.9,
                                "proporcion_2007": 5.7,
                                "proporcion_2017": 8.7,
                                "envejecimiento_2007": 14.9,
                                "envejecimiento_2017": 23.8,
                                "relacion_2007": 10.3,
                                "relacion_2017": 16
                            },
                            {
                                "departamento": "Madre de Dios",
                                "censada_2007": 109555,
                                "censada_2017": 141070,
                                "razon_2007": 51.7,
                                "razon_2017": 52.3,
                                "proporcion_2007": 4.1,
                                "proporcion_2017": 5.9,
                                "envejecimiento_2007": 13,
                                "envejecimiento_2017": 19.1,
                                "relacion_2007": 6.4,
                                "relacion_2017": 9.3
                            },
                            {
                                "departamento": "Moquegua",
                                "censada_2007": 161533,
                                "censada_2017": 174863,
                                "razon_2007": 48,
                                "razon_2017": 48.4,
                                "proporcion_2007": 10.1,
                                "proporcion_2017": 13.2,
                                "envejecimiento_2007": 40,
                                "envejecimiento_2017": 56.7,
                                "relacion_2007": 15.7,
                                "relacion_2017": 20.9
                            },
                            {
                                "departamento": "Pasco",
                                "censada_2007": 280449,
                                "censada_2017": 254065,
                                "razon_2007": 60.7,
                                "razon_2017": 53.7,
                                "proporcion_2007": 6.9,
                                "proporcion_2017": 9.7,
                                "envejecimiento_2007": 20.8,
                                "envejecimiento_2017": 34.4,
                                "relacion_2007": 11.4,
                                "relacion_2017": 15.6
                            },
                            {
                                "departamento": "Piura",
                                "censada_2007": 1676315,
                                "censada_2017": 1856809,
                                "razon_2007": 64.5,
                                "razon_2017": 60,
                                "proporcion_2007": 8.8,
                                "proporcion_2017": 11.1,
                                "envejecimiento_2007": 26.6,
                                "envejecimiento_2017": 37.3,
                                "relacion_2007": 15,
                                "relacion_2017": 18.9
                            },
                            {
                                "departamento": "Puno",
                                "censada_2007": 1268441,
                                "censada_2017": 1172697,
                                "razon_2007": 64.2,
                                "razon_2017": 52.1,
                                "proporcion_2007": 10.1,
                                "proporcion_2017": 13,
                                "envejecimiento_2007": 31.6,
                                "envejecimiento_2017": 52.1,
                                "relacion_2007": 17.3,
                                "relacion_2017": 20.9
                            },
                            {
                                "departamento": "San Martin",
                                "censada_2007": 728808,
                                "censada_2017": 813381,
                                "razon_2007": 63.8,
                                "razon_2017": 59.8,
                                "proporcion_2007": 6.5,
                                "proporcion_2017": 9,
                                "envejecimiento_2007": 18.7,
                                "envejecimiento_2017": 28.9,
                                "relacion_2007": 11,
                                "relacion_2017": 15.2
                            },
                            {
                                "departamento": "Tacna",
                                "censada_2007": 288781,
                                "censada_2017": 329332,
                                "razon_2007": 46.4,
                                "razon_2017": 43.2,
                                "proporcion_2007": 7.5,
                                "proporcion_2017": 10.7,
                                "envejecimiento_2007": 28.3,
                                "envejecimiento_2017": 46.3,
                                "relacion_2007": 11.4,
                                "relacion_2017": 16.1
                            },
                            {
                                "departamento": "Tumbes",
                                "censada_2007": 200306,
                                "censada_2017": 224863,
                                "razon_2007": 54.5,
                                "razon_2017": 55.7,
                                "proporcion_2007": 7.1,
                                "proporcion_2017": 9.8,
                                "envejecimiento_2007": 23.3,
                                "envejecimiento_2017": 33.6,
                                "relacion_2007": 11.3,
                                "relacion_2017": 16.2
                            },
                            {
                                "departamento": "Ucayali",
                                "censada_2007": 432159,
                                "censada_2017": 496459,
                                "razon_2007": 66.4,
                                "razon_2017": 65.4,
                                "proporcion_2007": 5.5,
                                "proporcion_2017": 7.8,
                                "envejecimiento_2007": 15.2,
                                "envejecimiento_2017": 22.7,
                                "relacion_2007": 9.5,
                                "relacion_2017": 13.6
                            },
                            {
                                "departamento": "Provincia de Lima, 1/",
                                "censada_2007": 7602940,
                                "censada_2017": 8574974,
                                "razon_2007": 46.6,
                                "razon_2017": 44.9,
                                "proporcion_2007": 9.7,
                                "proporcion_2017": 12.7,
                                "envejecimiento_2007": 38.6,
                                "envejecimiento_2017": 57.4,
                                "relacion_2007": 14.8,
                                "relacion_2017": 19.5
                            },
                            {
                                "departamento": "Región Lima 2/",
                                "censada_2007": 839469,
                                "censada_2017": 910431,
                                "razon_2007": 58,
                                "razon_2017": 54.5,
                                "proporcion_2007": 10.7,
                                "proporcion_2017": 13.1,
                                "envejecimiento_2007": 37.2,
                                "envejecimiento_2017": 50.8,
                                "relacion_2007": 17.8,
                                "relacion_2017": 21.5
                            }
                        ],

                        columns: [
                            {data: "departamento"},
                            {data: "censada_2007"},
                            {data: "censada_2017"},
                            {data: "razon_2007"},
                            {data: "razon_2017"},
                            {data: "proporcion_2007"},
                            {data: "proporcion_2017"},
                            {data: "envejecimiento_2007"},
                            {data: "envejecimiento_2017"},
                            {data: "relacion_2007"},
                            {data: "relacion_2007"}
                        ],


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
            tabla: undefined,
            "default": "vista0",
            "vista0": {
                widgets: {
                    bar_chart: [],
                    assignment: {
                        codigo: '05',
                        alias: "Cuadro 05",
                        titulo: "PERÚ: EVOLUCIÓN DE LA POBLACIÓN CENSADA, POR AÑO CENSAL, SEGÚN REGIÓN NATURAL, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th>REGIÓN NATURAL</th>\n' +
                        '<th>1940</th>\n' +
                        '<th>1961</th>\n' +
                        '<th>1972</th>\n' +
                        '<th>1993</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '</tr>\n',
                        data: [
                            {
                                "region_natural": "Total",
                                "valor_1940": 6207967,
                                "valor_1961": 9906746,
                                "valor_1972": 13538208,
                                "valor_1993": 22048356,
                                "valor_2007": 27412157,
                                "valor_2017": 29381884
                            },
                            {
                                "region_natural": "Costa",
                                "valor_1940": 1759573,
                                "valor_1961": 3859443,
                                "valor_1972": 6242993,
                                "valor_1993": 11547743,
                                "valor_2007": 14973264,
                                "valor_2017": 17037297
                            },
                            {
                                "region_natural": "Sierra",
                                "valor_1940": 4033952,
                                "valor_1961": 5182093,
                                "valor_1972": 5953293,
                                "valor_1993": 7668359,
                                "valor_2007": 8763601,
                                "valor_2017": 8268183
                            },
                            {
                                "region_natural": "Selva",
                                "valor_1940": 414452,
                                "valor_1961": 865210,
                                "valor_1972": 1341922,
                                "valor_1993": 2832254,
                                "valor_2007": 3675292,
                                "valor_2017": 4076404
                            }
                        ],
                        columns: [
                            {"data": "region_natural"},
                            {"data": "valor_1940"},
                            {"data": "valor_1961"},
                            {"data": "valor_1972"},
                            {"data": "valor_1993"},
                            {"data": "valor_2007"},
                            {"data": "valor_2017"}
                        ],
                        fuente: "Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda."
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
                    bar_chart: [],
                    assignment: {
                        codigo: '06',
                        alias: "Cuadro 06",
                        titulo: "PERÚ: POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 1940 - 2017",
                        cabecera: '<tr>\n' +
                        '<th>DEPARTAMENTO</th>\n' +
                        '<th>1940</th>\n' +
                        '<th>1961</th>\n' +
                        '<th>1972</th>\n' +
                        '<th>1981</th>\n' +
                        '<th>1993</th>\n' +
                        '<th>2007</th>\n' +
                        '<th>2017</th>\n' +
                        '</tr>\n',
                        data: [
                            {
                                "departamento": "Total",
                                "valor_1940": 6207967,
                                "valor_1961": 9906746,
                                "valor_1972": 13538208,
                                "valor_1981": 17005210,
                                "valor_1993": 22048356,
                                "valor_2007": 2741257,
                                "valor_2017": 29381884
                            },
                            {
                                "departamento": "Amazonas",
                                "valor_1940": 65137,
                                "valor_1961": 118439,
                                "valor_1972": 194472,
                                "valor_1981": 254560,
                                "valor_1993": 336665,
                                "valor_2007": 375993,
                                "valor_2017": 379384
                            },
                            {
                                "departamento": "Áncash",
                                "valor_1940": 424975,
                                "valor_1961": 582598,
                                "valor_1972": 726215,
                                "valor_1981": 826399,
                                "valor_1993": 955023,
                                "valor_2007": 1063459,
                                "valor_2017": 1083519
                            },
                            {
                                "departamento": "Apurímac",
                                "valor_1940": 258094,
                                "valor_1961": 288223,
                                "valor_1972": 308613,
                                "valor_1981": 323346,
                                "valor_1993": 381997,
                                "valor_2007": 404190,
                                "valor_2017": 405759
                            },
                            {
                                "departamento": "Arequipa",
                                "valor_1940": 263077,
                                "valor_1961": 388881,
                                "valor_1972": 529566,
                                "valor_1981": 706580,
                                "valor_1993": 916806,
                                "valor_2007": 1152303,
                                "valor_2017": 1382730
                            },
                            {
                                "departamento": "Ayacucho",
                                "valor_1940": 358991,
                                "valor_1961": 410772,
                                "valor_1972": 457441,
                                "valor_1981": 503392,
                                "valor_1993": 492507,
                                "valor_2007": 612489,
                                "valor_2017": 616176
                            },
                            {
                                "departamento": "Cajamarca",
                                "valor_1940": 494412,
                                "valor_1961": 746938,
                                "valor_1972": 919161,
                                "valor_1981": 1026444,
                                "valor_1993": 1259808,
                                "valor_2007": 1387809,
                                "valor_2017": 1341012
                            },
                            {
                                "departamento": "Prov. Const. del Callao",
                                "valor_1940": 82287,
                                "valor_1961": 213540,
                                "valor_1972": 321231,
                                "valor_1981": 443413,
                                "valor_1993": 639729,
                                "valor_2007": 879679,
                                "valor_2017": 994494
                            },
                            {
                                "departamento": "Cusco",
                                "valor_1940": 486592,
                                "valor_1961": 611972,
                                "valor_1972": 715237,
                                "valor_1981": 832504,
                                "valor_1993": 1028763,
                                "valor_2007": 1171403,
                                "valor_2017": 1205527
                            },
                            {
                                "departamento": "Huancavelica",
                                "valor_1940": 244595,
                                "valor_1961": 302817,
                                "valor_1972": 331629,
                                "valor_1981": 346797,
                                "valor_1993": 385162,
                                "valor_2007": 454797,
                                "valor_2017": 347639
                            },
                            {
                                "departamento": "Huánuco",
                                "valor_1940": 234024,
                                "valor_1961": 328919,
                                "valor_1972": 414468,
                                "valor_1981": 477650,
                                "valor_1993": 654489,
                                "valor_2007": 762223,
                                "valor_2017": 721047
                            },
                            {
                                "departamento": "Ica",
                                "valor_1940": 140898,
                                "valor_1961": 255930,
                                "valor_1972": 357247,
                                "valor_1981": 433897,
                                "valor_1993": 565686,
                                "valor_2007": 711932,
                                "valor_2017": 850765
                            }
                        ],
                        columns: [
                            {"data": "departamento"},
                            {"data": "valor_1940"},
                            {"data": "valor_1961"},
                            {"data": "valor_1972"},
                            {"data": "valor_1981"},
                            {"data": "valor_1993"},
                            {"data": "valor_2007"},
                            {"data": "valor_2017"}
                        ],
                        fuente: '<p>1/ Comprende los 43 distritos de la provincia de Lima.</p>\n' +
                        '<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>\n' +
                        '<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>'
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
                    bar_chart: [],
                    assignment: {
                        codigo: '07',
                        alias: "Cuadro 07",
                        titulo: "PERÚ: TASA DE CRECIMIENTO PROMEDIO ANUAL DE LA POBLACIÓN CENSADA, SEGÚN DEPARTAMENTO, 1940 - 20177",
                        cabecera: '<tr>\n' +
                        '<th>DEPARTAMENTO</th>\n' +
                        '<th>1940-1961</th>\n' +
                        '<th>1961-1972</th>\n' +
                        '<th>1972-1981</th>\n' +
                        '<th>1981-1993</th>\n' +
                        '<th>1993-2007</th>\n' +
                        '<th>2007-2017</th>\n' +
                        '</tr>\n',
                        data: [
                            {
                                "departamento": "Total",
                                "valor_1940_1961": 2.2,
                                "valor_1961_1972": 2.9,
                                "valor_1972_1981": 2.5,
                                "valor_1981_1993": 2.2,
                                "valor_1993_2007": 1.5,
                                "valor_2007_2017": 0.7
                            },
                            {
                                "departamento": "Amazonas",
                                "valor_1940_1961": 2.9,
                                "valor_1961_1972": 4.6,
                                "valor_1972_1981": 3,
                                "valor_1981_1993": 2.4,
                                "valor_1993_2007": 0.8,
                                "valor_2007_2017": 0.1
                            },
                            {
                                "departamento": "Áncash",
                                "valor_1940_1961": 1.5,
                                "valor_1961_1972": 2,
                                "valor_1972_1981": 1.4,
                                "valor_1981_1993": 1.2,
                                "valor_1993_2007": 0.8,
                                "valor_2007_2017": 0.2
                            },
                            {
                                "departamento": "Apurímac",
                                "valor_1940_1961": 0.5,
                                "valor_1961_1972": 0.6,
                                "valor_1972_1981": 0.5,
                                "valor_1981_1993": 1.4,
                                "valor_1993_2007": 0.4,
                                "valor_2007_2017": 0
                            },
                            {
                                "departamento": "Arequipa",
                                "valor_1940_1961": 1.9,
                                "valor_1961_1972": 2.9,
                                "valor_1972_1981": 3.2,
                                "valor_1981_1993": 2.2,
                                "valor_1993_2007": 1.6,
                                "valor_2007_2017": 1.8
                            },
                            {
                                "departamento": "Ayacucho",
                                "valor_1940_1961": 0.6,
                                "valor_1961_1972": 1,
                                "valor_1972_1981": 1.1,
                                "valor_1981_1993": -0.2,
                                "valor_1993_2007": 1.5,
                                "valor_2007_2017": 0.1
                            },
                            {
                                "departamento": "Cajamarca",
                                "valor_1940_1961": 2,
                                "valor_1961_1972": 1.9,
                                "valor_1972_1981": 1.2,
                                "valor_1981_1993": 1.7,
                                "valor_1993_2007": 0.7,
                                "valor_2007_2017": -0.3
                            },
                            {
                                "departamento": "Prov. Const. del Callao",
                                "valor_1940_1961": 4.6,
                                "valor_1961_1972": 3.8,
                                "valor_1972_1981": 3.6,
                                "valor_1981_1993": 3.1,
                                "valor_1993_2007": 2.2,
                                "valor_2007_2017": 1.2
                            },
                            {
                                "departamento": "Cusco",
                                "valor_1940_1961": 1.1,
                                "valor_1961_1972": 1.4,
                                "valor_1972_1981": 1.7,
                                "valor_1981_1993": 1.8,
                                "valor_1993_2007": 0.9,
                                "valor_2007_2017": 0.3
                            },
                            {
                                "departamento": "Huancavelica",
                                "valor_1940_1961": 1,
                                "valor_1961_1972": 0.8,
                                "valor_1972_1981": 0.5,
                                "valor_1981_1993": 0.9,
                                "valor_1993_2007": 1.2,
                                "valor_2007_2017": -2.7
                            },
                            {
                                "departamento": "Huánuco",
                                "valor_1940_1961": 1.6,
                                "valor_1961_1972": 2.1,
                                "valor_1972_1981": 1.6,
                                "valor_1981_1993": 2.7,
                                "valor_1993_2007": 1.1,
                                "valor_2007_2017": -0.6
                            },
                            {
                                "departamento": "Ica",
                                "valor_1940_1961": 2.9,
                                "valor_1961_1972": 3.1,
                                "valor_1972_1981": 2.2,
                                "valor_1981_1993": 2.2,
                                "valor_1993_2007": 1.6,
                                "valor_2007_2017": 1.8
                            }
                        ],
                        columns: [
                            {"data": "departamento"},
                            {"data": "valor_1940_1961"},
                            {"data": "valor_1961_1972"},
                            {"data": "valor_1972_1981"},
                            {"data": "valor_1981_1993"},
                            {"data": "valor_1993_2007"},
                            {"data": "valor_2007_2017"}
                        ],
                        fuente: '<p>1/ Comprende los 43 distritos de la provincia de Lima.</p>\n' +
                        '<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>\n' +
                        '<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>'
                    },
                    location_on: [],
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
                        '</tr>\n',
                        data: [
                            {
                                "departamento": "Amazonas",
                                "valor_1940": 1.7,
                                "valor_1961": 3,
                                "valor_1972": 5,
                                "valor_1981": 6.5,
                                "valor_1993": 9,
                                "valor_2007": 10.6,
                                "valor_2017": 9.7
                            },
                            {
                                "departamento": "Áncash",
                                "valor_1940": 12.1,
                                "valor_1961": 16.6,
                                "valor_1972": 20.7,
                                "valor_1981": 23.6,
                                "valor_1993": 27.5,
                                "valor_2007": 30.3,
                                "valor_2017": 30.2
                            },
                            {
                                "departamento": "Apurímac",
                                "valor_1940": 12.4,
                                "valor_1961": 13.8,
                                "valor_1972": 14.8,
                                "valor_1981": 15.5,
                                "valor_1993": 19,
                                "valor_2007": 21,
                                "valor_2017": 19.4
                            },
                            {
                                "departamento": "Arequipa",
                                "valor_1940": 4.2,
                                "valor_1961": 6.1,
                                "valor_1972": 8.4,
                                "valor_1981": 11.2,
                                "valor_1993": 14.8,
                                "valor_2007": 18.9,
                                "valor_2017": 21.8
                            },
                            {
                                "departamento": "Ayacucho",
                                "valor_1940": 8.2,
                                "valor_1961": 9.4,
                                "valor_1972": 10.4,
                                "valor_1981": 11.5,
                                "valor_1993": 11.7,
                                "valor_2007": 15.3,
                                "valor_2017": 14.1
                            },
                            {
                                "departamento": "Cajamarca",
                                "valor_1940": 14.9,
                                "valor_1961": 22.5,
                                "valor_1972": 27.6,
                                "valor_1981": 30.9,
                                "valor_1993": 39,
                                "valor_2007": 42.6,
                                "valor_2017": 40.3
                            },
                            {
                                "departamento": "Prov. Const. del Callao",
                                "valor_1940": 559.9,
                                "valor_1961": 1452.9,
                                "valor_1972": 2185.5,
                                "valor_1981": 3016.8,
                                "valor_1993": 4405.8,
                                "valor_2007": 5774.1,
                                "valor_2017": 6815.8
                            },
                            {
                                "departamento": "Cusco",
                                "valor_1940": 6.8,
                                "valor_1961": 8.5,
                                "valor_1972": 9.9,
                                "valor_1981": 11.6,
                                "valor_1993": 14.8,
                                "valor_2007": 17,
                                "valor_2017": 16.7
                            },
                            {
                                "departamento": "Huancavelica",
                                "valor_1940": 11.1,
                                "valor_1961": 13.7,
                                "valor_1972": 15,
                                "valor_1981": 15.7,
                                "valor_1993": 18.1,
                                "valor_2007": 21.3,
                                "valor_2017": 15.7
                            },
                            {
                                "departamento": "Huánuco",
                                "valor_1940": 6.2,
                                "valor_1961": 8.7,
                                "valor_1972": 11,
                                "valor_1981": 12.7,
                                "valor_1993": 18.4,
                                "valor_2007": 20.9,
                                "valor_2017": 19.3
                            },
                            {
                                "departamento": "Ica",
                                "valor_1940": 6.6,
                                "valor_1961": 12,
                                "valor_1972": 16.8,
                                "valor_1981": 20.3,
                                "valor_1993": 27.1,
                                "valor_2007": 33.2,
                                "valor_2017": 39.9
                            }
                        ],
                        columns: [
                            {"data": "departamento"},
                            {"data": "valor_1940"},
                            {"data": "valor_1961"},
                            {"data": "valor_1972"},
                            {"data": "valor_1981"},
                            {"data": "valor_1993"},
                            {"data": "valor_2007"},
                            {"data": "valor_2017"}
                        ],
                        fuente: '<p>1/ Comprende los 43 distritos de la provincia de Lima.</p>\n' +
                        '<p>2/ Comprende las provincias de Barranca, Cajatambo, Canta, Cañete, Huaral, Huarochirí, Huaura, Oyón y Yauyos.</p>\n' +
                        '<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>'
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
                        titulo: "PERÚ: NÚMERO DE PROVINCIAS Y POBLACIÓN CENSADA, SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2">Rango de población</th>\n' +
                        '<th colspan="4">2007</th>\n' +
                        '<th colspan="4">2017</th>\n'+
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

                        data: [
                            {
                                "rangos": "Total",
                                "provincias_2007_abs": 195,
                                "provincias_2007_por": 100,
                                "poblacion_2007_abs": 27412157,
                                "poblacion_2007_por": 100,
                                "provincias_2017_abs": 196,
                                "provincias_2017_por": 100,
                                "poblacion_2017_abs": 29381884,
                                "poblacion_2017_por": 100
                            },
                            {
                                "rangos": "De 1 millón y más",
                                "provincias_2007_abs": 1,
                                "provincias_2007_por": 0.5,
                                "poblacion_2007_abs": 7605742,
                                "poblacion_2007_por": 27.7,
                                "provincias_2017_abs": 2,
                                "provincias_2017_por": 1,
                                "poblacion_2017_abs": 9655609,
                                "poblacion_2017_por": 32.9
                            },
                            {
                                "rangos": "De 500 000 a 999 999",
                                "provincias_2007_abs": 5,
                                "provincias_2007_por": 2.6,
                                "poblacion_2007_abs": 3976549,
                                "poblacion_2007_por": 14.5,
                                "provincias_2017_abs": 5,
                                "provincias_2017_por": 2.6,
                                "poblacion_2017_abs": 410921,
                                "poblacion_2017_por": 14
                            },
                            {
                                "rangos": "De 200 000 a 499 999",
                                "provincias_2007_abs": 15,
                                "provincias_2007_por": 7.7,
                                "poblacion_2007_abs": 4666998,
                                "poblacion_2007_por": 17,
                                "provincias_2017_abs": 14,
                                "provincias_2017_por": 7.1,
                                "poblacion_2017_abs": 5405666,
                                "poblacion_2017_por": 18.4
                            },
                            {
                                "rangos": "De 100 000 a 199 999",
                                "provincias_2007_abs": 34,
                                "provincias_2007_por": 17.4,
                                "poblacion_2007_abs": 4786863,
                                "poblacion_2007_por": 17.5,
                                "provincias_2017_abs": 29,
                                "provincias_2017_por": 14.8,
                                "poblacion_2017_abs": 4214953,
                                "poblacion_2017_por": 14.3
                            },
                            {
                                "rangos": "De 50 000 a 99 999",
                                "provincias_2007_abs": 60,
                                "provincias_2007_por": 30.8,
                                "poblacion_2007_abs": 4144939,
                                "poblacion_2007_por": 15.1,
                                "provincias_2017_abs": 43,
                                "provincias_2017_por": 21.9,
                                "poblacion_2017_abs": 3822485,
                                "poblacion_2017_por": 13
                            },
                            {
                                "rangos": "De 20 000 a 49 999",
                                "provincias_2007_abs": 57,
                                "provincias_2007_por": 29.2,
                                "poblacion_2007_abs": 1950836,
                                "poblacion_2007_por": 7.1,
                                "provincias_2017_abs": 64,
                                "provincias_2017_por": 32.7,
                                "poblacion_2017_abs": 1764706,
                                "poblacion_2017_por": 6
                            },
                            {
                                "rangos": "Menos de 20 000",
                                "provincias_2007_abs": 23,
                                "provincias_2007_por": 11.8,
                                "poblacion_2007_abs": 280230,
                                "poblacion_2007_por": 1,
                                "provincias_2017_abs": 39,
                                "provincias_2017_por": 19.9,
                                "poblacion_2017_abs": 409344,
                                "poblacion_2017_por": 1.4
                            }
                        ],
                        columns: [
                            {"data": "rangos"},
                            {"data": "provincias_2007_abs"},
                            {"data": "provincias_2007_por"},
                            {"data": "poblacion_2007_abs"},
                            {"data": "poblacion_2007_por"},
                            {"data": "provincias_2017_abs"},
                            {"data": "provincias_2017_por"},
                            {"data": "poblacion_2017_abs"},
                            {"data": "poblacion_2017_por"}
                        ],
                        fuente: 'Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.',

                        secundario: {
                            codigo: '10',
                            alias: "Cuadro 10",
                            titulo: "PERÚ: POBLACIÓN CENSADA Y TASA DE CRECIMIENTO PROMEDIO ANUAL, DE LAS 20 PROVINCIAS MÁS POBLADAS, 1981, 1993, 2007 Y 2017",
                            cabecera: '<tr>\n' +
                            '<th rowspan="2">Provincia</th>\n' +
                            '<th colspan="4">Población</th>\n' +
                            '<th colspan="4">Tasa de crecimiento promedio anual (%)</th>\n'+
                            '</tr>\n'+
                            '<tr>\n' +
                            '<th>1981</th>\n' +
                            '<th>1993</th>\n' +
                            '<th>2007</th>\n'+
                            '<th>2017</th>\n'+
                            '<th>1981</th>\n' +
                            '<th>1993</th>\n' +
                            '<th>2007</th>\n'+
                            '<th>2017</th>\n'+
                            '</tr>\n',

                            data: [],
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
                        titulo: "PERÚ: NÚMERO DE DISTRITOS Y POBLACIÓN CENSADA, SEGÚN RANGO DE POBLACIÓN, 2007 Y 2017",
                        cabecera: '<tr>\n' +
                        '<th rowspan="2">Rango de población</th>\n' +
                        '<th colspan="4">2007</th>\n' +
                        '<th colspan="4">2017</th>\n'+
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

                        data: [
                            {
                                "rangos": "Total",
                                "provincias_2007_abs": 195,
                                "provincias_2007_por": 100,
                                "poblacion_2007_abs": 27412157,
                                "poblacion_2007_por": 100,
                                "provincias_2017_abs": 196,
                                "provincias_2017_por": 100,
                                "poblacion_2017_abs": 29381884,
                                "poblacion_2017_por": 100
                            },
                            {
                                "rangos": "De 1 millón y más",
                                "provincias_2007_abs": 1,
                                "provincias_2007_por": 0.5,
                                "poblacion_2007_abs": 7605742,
                                "poblacion_2007_por": 27.7,
                                "provincias_2017_abs": 2,
                                "provincias_2017_por": 1,
                                "poblacion_2017_abs": 9655609,
                                "poblacion_2017_por": 32.9
                            },
                            {
                                "rangos": "De 500 000 a 999 999",
                                "provincias_2007_abs": 5,
                                "provincias_2007_por": 2.6,
                                "poblacion_2007_abs": 3976549,
                                "poblacion_2007_por": 14.5,
                                "provincias_2017_abs": 5,
                                "provincias_2017_por": 2.6,
                                "poblacion_2017_abs": 410921,
                                "poblacion_2017_por": 14
                            },
                            {
                                "rangos": "De 200 000 a 499 999",
                                "provincias_2007_abs": 15,
                                "provincias_2007_por": 7.7,
                                "poblacion_2007_abs": 4666998,
                                "poblacion_2007_por": 17,
                                "provincias_2017_abs": 14,
                                "provincias_2017_por": 7.1,
                                "poblacion_2017_abs": 5405666,
                                "poblacion_2017_por": 18.4
                            },
                            {
                                "rangos": "De 100 000 a 199 999",
                                "provincias_2007_abs": 34,
                                "provincias_2007_por": 17.4,
                                "poblacion_2007_abs": 4786863,
                                "poblacion_2007_por": 17.5,
                                "provincias_2017_abs": 29,
                                "provincias_2017_por": 14.8,
                                "poblacion_2017_abs": 4214953,
                                "poblacion_2017_por": 14.3
                            },
                            {
                                "rangos": "De 50 000 a 99 999",
                                "provincias_2007_abs": 60,
                                "provincias_2007_por": 30.8,
                                "poblacion_2007_abs": 4144939,
                                "poblacion_2007_por": 15.1,
                                "provincias_2017_abs": 43,
                                "provincias_2017_por": 21.9,
                                "poblacion_2017_abs": 3822485,
                                "poblacion_2017_por": 13
                            },
                            {
                                "rangos": "De 20 000 a 49 999",
                                "provincias_2007_abs": 57,
                                "provincias_2007_por": 29.2,
                                "poblacion_2007_abs": 1950836,
                                "poblacion_2007_por": 7.1,
                                "provincias_2017_abs": 64,
                                "provincias_2017_por": 32.7,
                                "poblacion_2017_abs": 1764706,
                                "poblacion_2017_por": 6
                            },
                            {
                                "rangos": "Menos de 20 000",
                                "provincias_2007_abs": 23,
                                "provincias_2007_por": 11.8,
                                "poblacion_2007_abs": 280230,
                                "poblacion_2007_por": 1,
                                "provincias_2017_abs": 39,
                                "provincias_2017_por": 19.9,
                                "poblacion_2017_abs": 409344,
                                "poblacion_2017_por": 1.4
                            }
                        ],
                        columns: [
                            {"data": "rangos"},
                            {"data": "provincias_2007_abs"},
                            {"data": "provincias_2007_por"},
                            {"data": "poblacion_2007_abs"},
                            {"data": "poblacion_2007_por"},
                            {"data": "provincias_2017_abs"},
                            {"data": "provincias_2017_por"},
                            {"data": "poblacion_2017_abs"},
                            {"data": "poblacion_2017_por"}
                        ],
                        fuente: '<p>Nota: En 2007 autoridades no permitieron censo en el distrito de Carmen Alto, provincia de Huamanga, departamento de Ayacucho.</p>' +
                        '<p>Fuente: Instituto Nacional de Estadística e Informática - Censos Nacionales de Población y Vivienda.</p>',

                        secundario: {
                            codigo: '12',
                            alias: "Cuadro 12",
                            titulo: "PERÚ: POBLACIÓN CENSADA Y TASA DE CRECIMIENTO PROMEDIO ANUAL, DE LOS 30 DISTRITOS MÁS POBLADOS,  1993, 2007 Y 2017",
                            cabecera: '<tr>\n' +
                            '<th rowspan="2">UBIGEO</th>\n' +
                            '<th rowspan="2">DISTRITO</th>\n' +
                            '<th colspan="3">POBLACIÓN</th>\n' +
                            '<th colspan="2">TASA DE CRECIMIENTO PROMEDIO ANUAL (%)</th>\n'+
                            '</tr>\n'+
                            '<tr>\n' +
                            '<th>1993</th>\n' +
                            '<th>2007</th>\n'+
                            '<th>2017</th>\n'+
                            '<th>1993-2007</th>\n' +
                            '<th>1993-2017</th>\n' +
                            '</tr>\n',

                            data: [],
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
                data: data[bloque][vista].widgets.assignment.data,
                columns: data[bloque][vista].widgets.assignment.columns,
                columnDefs: (data[bloque][vista].widgets.assignment.columnDefs !== undefined) ? data[bloque][vista].widgets.assignment.columnDefs: [],
                paging: false,
                info: false,
                ordering: false,
                searching: false

            });
        },
        assignmentBloque3: function (bloque, vista, seleccion, content) {
            var tabla = "#table_"+seleccion+"_"+bloque;
            var titulo = "#titulo_"+seleccion+"_"+bloque;
            if (data[bloque].tabla !== undefined) {
                data[bloque].tabla.clear().draw();
                data[bloque].tabla.destroy();
            }
            console.log(">>>>>>>>>", vista,tabla);
            $(titulo).html(data[bloque][vista].widgets.assignment.titulo);
            $(tabla).children('thead').html(data[bloque][vista].widgets.assignment.cabecera);

            data[bloque].tabla = $(tabla).DataTable({
                data: data[bloque][vista].widgets.assignment.data,
                columns: data[bloque][vista].widgets.assignment.columns,
                columnDefs: (data[bloque][vista].widgets.assignment.columnDefs !== undefined) ? data[bloque][vista].widgets.assignment.columnDefs: [],
                paging: false,
                info: false,
                ordering: false,
                searching: false

            });
        },
        assignmentBloque4: function (bloque, vista, seleccion, content) {
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
                columnDefs: (data[bloque][vista].widgets.assignment.columnDefs !== undefined) ? data[bloque][vista].widgets.assignment.columnDefs: [],
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

        infoBloque3: function (bloque, vista, seleccion, content) {
            content.html(data[bloque][vista].widgets.info);
        },
        infoBloque4: function (bloque, vista, seleccion, content) {
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
