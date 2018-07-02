App.utils.graficos = (function (parent, service, config, appData) {

    var grafico_1;

    var grafico_2;
    var grafico_3;


    var grafico_c2;
    var grafico_c2_2;


    var grafico_c3;
    var grafico_c3_2;
    var grafico_c4;
    var grafico_c4_2;
    var grafico_c5;
    var grafico_c5_2;
    var grafico_c6;
    var grafico_c6_2;





     /* COlores y posiscion para Piramide */

    var perShapeGradient = {
        x1: 0,
        y1: 0,
        x2: 1,
        y2: 0
    };

    var colors = Highcharts.getOptions().colors;
    colors = [{
        linearGradient: perShapeGradient,
        stops: [
            [0, '#B34D00'],
            [0.49, '#D57008'],
            [0.50, '#FCAA50'],
            [1,'#FFA426']

        ]
    }, {
        linearGradient: perShapeGradient,
        stops: [
            [0, '#990000'],
            [0.49, '#CC3335'],
            [0.50, '#F84D50'],
            [1,'#FF5050']
        ]
    }]



    var directionPieGradient = {
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
    };
    var colorsPie = Highcharts.getOptions().colors;
    colorsPie = [{
        linearGradient: directionPieGradient,
        stops: [
            [0, '#B34D00'],

            [1,'#FFA426']

        ]
    }, {
        linearGradient: directionPieGradient,
        stops: [
            [0, '#990000'],

            [1,'#FF5050']
        ]
    }]



    var directionPie2Gradient = {
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
    };
    var colorsPie2 = Highcharts.getOptions().colors;
    colorsPie2 = [{
        linearGradient: directionPie2Gradient,
        stops: [
            [0, '#B34D00'],

            [1,'#FFA426']

        ]
    }, {
        linearGradient: directionPie2Gradient,
        stops: [
            [0, '#990000'],

            [1,'#FF5050']
        ]
    }]


    var directionPie3Gradient = {
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
    };
    var colorsPie3 = Highcharts.getOptions().colors;
    colorsPie3 = [{
        linearGradient: directionPie3Gradient,
        stops: [
            [0, '#BC842C'],

            [1,'#FBB03B']

        ]
    }, {
        linearGradient: directionPie3Gradient,
        stops: [
            [0, '#1197A0'],

            [1,'#16C9D5']
        ]
    }]



    var directionBarraGradient = {
        x1: 0,
        y1: 1,
        x2: 0,
        y2: 0
    };
    var colorsBarra = Highcharts.getOptions().colors;
    colorsBarra = [{
        linearGradient: directionBarraGradient,
        stops: [
            [0, '#B5373C'],

            [1,'#F14950']

        ]
    }, {
        linearGradient: directionBarraGradient,
        stops: [
            [0, '#BC842C'],

            [1,'#FBB03B']
        ]
    },{
        linearGradient: directionBarraGradient,
        stops: [
            [0, '#1197A0'],

            [1,'#16C9D5']
        ]
    },{
        linearGradient: directionBarraGradient,
        stops: [
            [0, '#142D55'],

            [1,'#1B3C71']
        ]
    }]








    var grafico_torta = function (data, div) {



        grafico_1 = Highcharts.chart(div, {
            chart: {
                type: 'bar',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: data.nom_ubigeo
            },

            xAxis: [{
                allowDecimals: false,

                title: {
                    text: null
                },
                categories: data.categoria,
                reversed: false,

            }],
            yAxis: {
                allowDecimals: false,
                title: {
                    text: null
                },
                labels: {

                    formatter: function () {
                        return Highcharts.numberFormat(Math.abs(this.value), 0)
                    },
                    overflow: 'justify'
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {
                    allowDecimals: false,

                    pointPadding: -0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            return Highcharts.numberFormat(Math.abs(this.point.y), 0);
                        },
                        distance: -20,
                        style: {
                            fontWeight: 'bold',
                            color: 'white'
                        }
                    },
                }
            },

            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        'Poblacion: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1);
                }
            },

            series:[ {
                name:data.data[0].name,
                data:data.data[0].data,
                color: colors[0]
            },{
                name:data.data[1].name,
                data:data.data[1].data,
                color: colors[1]
            }]

        });
    };

    var graf_mediaLuna = function (data, div) {

        grafico_2 = Highcharts.chart(div, {
            chart: {

                plotBackgroundColor: null,
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
                plotBorderWidth: 0,
                plotShadow: false

            },
            credits: {
                enabled: false
            },
            exporting:{
                enabled:false
            },
            title: {
                text: 'Total<br>Personas',
                align: 'center',
                verticalAlign: 'middle',
                y: 0
            },
            tooltip: {
                pointFormat:
                    'Cant Total: <b>{point.y:.1f}</b> '
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        x:0,
                        y: 70,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                        distance: -10,
                        style: {
                            fontWeight: 'bold',
                            color: '#333333',
                            textShadow: null,
                            textOutline: 0,
                            fontSize: "14px"

                        }
                    },
                    colors:[colorsPie[0],colorsPie[1]],
                    startAngle: -90,
                    endAngle: 90,
                    center: ['50%', '65%']
                }
            },
            series: [{
                type: 'pie',
                name: 'porcentaje',
                innerSize: '50%',
                data: [data.total[0],data.total[1]]
            }]
        });

    }

    var graf_barra_vertical = function (data,div) {
        grafico_c2 = Highcharts.chart(div, {
            chart: {
                type: 'column',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            title: {
                text: data.title
            },
            subtitle: {
                text: null,
            },
            xAxis: {
                categories: [data.titulo],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: null,
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: null
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
            exporting: {
                enabled: false
            },
            series: data.data
        });

    };


    var grafico_columna = function (div) {
        grafico_c6 = Highcharts.chart(div, {
            chart: {
                type: 'column',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: 'Servicios de informacion y comunicacion'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'nacional',

                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'televisor',
                data: [49.9],
                color:colorsBarra[0]

            }, {
                name: 'internet',
                data: [83.6],
                color:colorsBarra[1]

            }, {
                name: 'celulares',
                data: [48.9],
                color:colorsBarra[2]

            }, {
                name: 'telefono',
                data: [42.4],
                color:colorsBarra[3]

            }]
        });

    };

    var grafico_circular = function (data,div) {
        grafico_c6_2 = Highcharts.chart(div, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: data.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',

                    },
                    showInLegend: false
                }
            },
            series: [{
                name: 'total',
                colorByPoint: true,
                data: data.data

                    /*[{
                    name: 'Urbano',
                    y: 8748430,
                    color:colorsPie3[0]
                }, {
                    name: 'Rural',
                    y: 2850270,
                    color:colorsPie3[1]
                }]*/
            }]
        });
    }

    var graf_persona_edad = function (data, div1, div2) {

        var arreglodata = [];
        //console.log(appData.titulo['U01'])

        var json = []; var json2 = []; h = []; m = [];

        data.G00002.forEach(function (i) {
            arreglodata.push( [i.cod_indicador, i.descripcion , Math.round(i.valor) ] );
        });
        arreglodata.sort();
        arreglodata.forEach(function (x) {
            if(x[0]=='P900001' ||x[0]=='P900003'|| x[0]=='P900005' ){
                h.push(-x[2]);
            }else if(x[0]=='P900002' ||x[0]=='P900004'|| x[0]=='P900006' ){
               m.push(x[2]);
            }
        });

        var ind = ['0-14', '15-64', '65+']

        var  nom_ubigeo;
        if (self.ubigeo_select == '00'){
            nom_ubigeo = 'PERU'
        }else {
            nom_ubigeo = 'INFO. ' + appData.titulo['U'+self.ubigeo_select]
        }

        if (self.cant_select > 1){
            nom_ubigeo = null
        }

        json =   {categoria : ind,
            data: [{name: 'Hombres', data: h}, {name: 'Mujeres', data: m}],
            nom_ubigeo: nom_ubigeo
        };

        var h_t = 0, m_t = 0;

        data.G00001.forEach(function (i) {
            if(i.cod_indicador == 'P010101'){
                h_t =  Math.round(i.valor);
            }
            if (i.cod_indicador == 'P010102'){
                m_t =  Math.round(i.valor);
            }
        });

        json2 =   {
            total: [['Hombres', h_t], [ 'Mujeres', m_t]]
        };


        var Widget_top = [];

        data.G00000.forEach(function (i) {
            Widget_top.push([i.cod_indicador, i.descripcion , Math.round(i.valor)]);
        });

        Widget_top.sort()
        //$("#id_graficoWidget_top").html('');

        var graficoWidget_top = '';
        Widget_top.forEach(function (x) {

            graficoWidget_top += '<div class="graficoWidget-top">' +
                '<div>' +
                '<span class=""></span>' +
                '</div>' +
                '<div>' +
                '<div class="">' +
                x[1] +
                '</div>' +
                '<div id="id_w_m" class="mujer">' +
                x[2] +
                '</div>' +
                '</div>' +
                '</div>';

        });


        //$("#id_graficoWidget_top").html(graficoWidget_top);




       grafico_torta(json,div1);
       graf_mediaLuna(json2,div2 )


    };


    graf_barra_ubigeo = function (data, div) {

        grafico_3 = Highcharts.chart(div, {
            chart: {
                type: 'bar',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: null
            },
            xAxis: {
                categories: data.ubigeo, // ["AMAZONAS", "ÁNCASH", "APURÍMAC", "AREQUIPA", "AYACUCHO", "CAJAMARCA", "CALLAO", "CUSCO", "HUANCAVELICA", "HUÁNUCO", "ICA", "JUNIN", "LA LIBERTAD", "LAMBAYEQUE", "LIMA", "LORETO", "MADRE DE DIOS", "MOQUEGUA", "PASCO", "PIURA", "PUNO", "SAN MARTIN", "TACNA", "TUMBES", "UCAYALI"],

                title: {
                    text: null
                }
                ,
                crosshair: true
            },
            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Cant. (miles)'
                }
            },
            tooltip: {
                allowDecimals: false,
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {

                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            series: [{name:data.son[0].name,data:data.son[0].data,color:colorsBarra[1]},{name:data.son[1].name,data:data.son[1].data,color:colorsBarra[0]}]
        });
    };


    var graf_educacion = function (data, div1) {
        var json = []
        var json_edu = []
        var json_info = []

        var arr_edu = [];
        data.G00011.forEach(function (x) {
            arr_edu.push([x.cod_indicador,x.descripcion, Math.round(x.valor) ]);
        });
        arr_edu.sort();

        var n = 0;
        arr_edu.forEach(function (x) {
            json_info.push({name:x[1],  data: [x[2]] ,color: colorsBarra[n]});
            n++;
        });
        console.log( self.ubigeo_select);
        console.log( appData.titulo['U'+self.ubigeo_select]);

        json = {data : json_info, titulo: appData.titulo['U'+self.ubigeo_select], title: 'Asistencia al sistema educativo regular.'};
        console.log(json);
        //console.log(appData.titulo['U'+self.ubigeo_select]);
        graf_barra_vertical(json,div1);
       /* grafico_c3_2 = Highcharts.chart(div2, {
            chart: {
                type: 'column',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: 'Monthly Average Rainfall'
            },
            subtitle: {
                text: 'Source: WorldClimate.com'
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Tokyo',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                color: colorsBarra[0]

            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
                color: colorsBarra[1]

            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2],
                color: colorsBarra[2]

            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1],
                color: colorsBarra[3]

            }]
        });

*/

        $("#id_graficoWidget_top").html('');

        var Widget_top = []
        var graficoWidget_top = ''
        data.G00010.forEach(function (x) {
            Widget_top.push([x.cod_indicador,x.descripcion,x.valor ]);
        });

        Widget_top.forEach(function (x) {

            graficoWidget_top += '<div class="graficoWidget-top">' +
                '<div>' +
                '<span class=""></span>' +
                '</div>' +
                '<div>' +
                '<div class="">' +
                x[1] +
                '</div>' +
                '<div  class="mujer">' +
                x[2] +
                '</div>' +
                '</div>' +
                '</div>';

        });

        $("#id_graficoWidget_top").html(graficoWidget_top);

    };

    var graf_salud = function (data, div1) {
        var json = [];
        var arr_salud = [];
        var arr_info = [];
        data.G00021.forEach(function (x) {
            arr_info.push([x.cod_indicador,x.descripcion,Math.round(x.valor) ]);
        });

        arr_info.sort();

        var n = 0;
        arr_info.forEach(function (x) {
            arr_salud.push({name:x[1] ,y:x[2], color:colorsPie3[n] })
            n++;
        });

        json = {data:arr_salud, titulo: appData.titulo['U'+self.ubigeo_select], title: 'Población con seguro por área urbana y rural' }

        grafico_circular(json, div1)
        $("#id_graficoWidget_top").html('');

        //graf_barra_ubigeo(self.Json2, div2)

    };

    var graf_economia = function (data ,div1) {
        var json = [];
        var arr_eco = [];
        var arr_info = [];
        data.G00031.forEach(function (x) {
            arr_info.push([x.cod_indicador,x.descripcion, Math.round(x.valor) ]);
        });

        arr_info.sort();

        var n = 0;
        arr_info.forEach(function (x) {
            arr_eco.push({name:x[1] ,y:x[2], color:colorsPie3[n]});
            n++;
        });

        json = {data:arr_eco, titulo: appData.titulo['U'+self.ubigeo_select], title: 'Tasa de actividad de la PEA' };
        console.log(json);

        grafico_circular(json, div1)

        var Widget_top = []

        $("#id_graficoWidget_top").html('');


        data.G00030.forEach(function (x) {
            Widget_top.push([x.cod_indicador,x.descripcion,Math.round(x.valor) ]);
        });


        var graficoWidget_top = '<div class="graficoWidget-top">' +
                '<div>' +
                '<span class=""></span>' +
                '</div>' +
                '<div>' +
                '<div class="">' +
                Widget_top[0][1] +
                '</div>' +
                '<div  class="mujer">' +
                Widget_top[0][2] +
                '</div>' +
                '</div>' +
                '</div>';

        $("#id_graficoWidget_top").html(graficoWidget_top);




    };

    var graf_vivienda = function (data, div1, div2,div3) {

        var json1 = [];
        var json2 = [];
        var json3 = [];
        var arr_viv1 = [];
        var arr_viv2 = [];
        var arr_viv3 = [];

        var arr_info1 = [];
        var arr_info2 = [];
        var arr_info3 = [];

        data.G00041.forEach(function (x) {
            arr_info1.push([x.cod_indicador,x.descripcion,Math.round(x.valor)]);
        });
        arr_info2.sort();

        data.G00042.forEach(function (x) {
            arr_info2.push([x.cod_indicador,x.descripcion,Math.round(x.valor)]);
        });
        arr_info2.sort();

        data.G00043.forEach(function (x) {
            arr_info3.push([x.cod_indicador,x.descripcion,Math.round(x.valor)]);
        });
        arr_info3.sort();



        var n1 = 0,n2 = 0,n3 = 0;
        arr_info1.forEach(function (x) {
            arr_viv1.push({name:x[1],  data: [x[2]] ,color: colorsBarra[n1]});
            n1++;
        });

        arr_info2.forEach(function (x) {
            arr_viv2.push({name:x[1],  data: [x[2]] ,color: colorsBarra[n2]});
            n2++;
        });

        arr_info3.forEach(function (x) {
            arr_viv3.push({name:x[1],  data: [x[2]] ,color: colorsBarra[n3]});
            n3++;
        });

        json1 = {data: arr_viv1,  titulo:appData.titulo['U'+self.ubigeo_select] , title: 'Viviendas con abastecimiento de agua'};
        json2 = {data: arr_viv2,  titulo:appData.titulo['U'+self.ubigeo_select] , title: 'Viviendas con servicio higiénico'};
        json3 = {data: arr_viv3,  titulo:appData.titulo['U'+self.ubigeo_select] , title: 'Viviendas con alumbrado eléctrico'};

        graf_barra_vertical(json1,div1);
        graf_barra_vertical(json2,div2);
        graf_barra_vertical(json3,div3);


        $("#id_graficoWidget_top").html('');


        var Widget_top = []
        var graficoWidget_top = ''
        data.G00040.forEach(function (x) {
            Widget_top.push([x.cod_indicador,x.descripcion,Math.round(x.valor) ]);
        });
        Widget_top.sort();

        Widget_top.forEach(function (x) {
            graficoWidget_top += '<div class="graficoWidget-top">' +
                '<div>' +
                '<span class=""></span>' +
                '</div>' +
                '<div>' +
                '<div class="">' +
                x[1] +
                '</div>' +
                '<div  class="mujer">' +
                x[2] +
                '</div>' +
                '</div>' +
                '</div>';

        });

        $("#id_graficoWidget_top").html(graficoWidget_top);


        //graf_barra_ubigeo (self.Json2,div3)


    };

    var graf_hogar = function (data, div1) {

        var json = [];
        var arr_viv1 = [];
        var arr_info1 = [];

        data.G00051.forEach(function (x) {
            arr_info1.push([x.cod_indicador,x.descripcion,Math.round(x.valor)]);
        });
        arr_info1.sort();
        var n1 =0;
        arr_info1.forEach(function (x) {
            arr_viv1.push({name:x[1],  data: [x[2]] ,color: colorsBarra[n1]});
            n1++;
        });

        json = {data :arr_viv1 , title: 'Servicio de información y comunicación' ,  titulo: appData.titulo['U'+self.ubigeo_select] }




        graf_barra_vertical(json, div1);
        $("#id_graficoWidget_top").html('');
        //graf_barra_ubigeo(self.Json2, div2)

    };


    var crear_div_grafico = function () {

        var  div_grafico_base = '<div id="grafico_1_c1" class="graficoElementSlider" ></div>';
         if (self.categoria_select == 'P01'){
             div_grafico_base +=    '<div id="grafico_2_c1" class="graficoElementSlider" ></div>' ;

         }else  if (self.categoria_select == 'P05'){
             div_grafico_base +=   '<div id="grafico_2_c1" class="graficoElementSlider" ></div>' +
             '<div id="grafico_5_c1" class="graficoElementSlider" ></div>' ;
        }


            var cat = self.check_selected;
        var div_grafico_base_max = '';


        cat.forEach(function (x) {
            var titulo = '';
            switch (x){
                case 'P01': titulo = 'POBLACION';break;
                case 'P02': titulo = 'EDUCACION';break;
                case 'P03': titulo = 'SALUD';break;
                case 'P04': titulo = 'ECONOMIA';break;
                case 'P05': titulo = 'VIVIENDA';break;
                case 'P06': titulo = 'HOGAR';break;
            }

            div_grafico_base_max += '<h3>'+titulo+'</h3>' +
                '<div class="row">' +
                '<div id="colunma_1_c1'+x+'" class="col-4-10">' +
                '<div id="cmb_ubigeo_m'+x+'" style="display:none">' +
                '<select id="cmb_ubi_m'+x+'" name="cmb_ubi">' +
                '</select>' +
                '</div>' +
                '<div id="grafico_1_max_c1'+x+'" style="display:block; height: 400px; width: auto;"></div>' +
                '</div>' +
                '<div id="colunma_2_c1'+x+'" class="col-5-10">' +
                '<div id="grafico_3_max_c1'+x+'" style=" display:block; height: 470px; width: auto;">' +
                '</div>' +
                '</div>' +
                '</div>' ;
            if (x == 'P01'){
                div_grafico_base_max +=   '<div class="row">' +
                    '<div id="colunma_1_c1'+x+'" class="col-4-10">' +
                    '<div id="grafico_2_max_c1'+x+'" style=" display:block; height: 470px; width: auto;"></div>' +
                    '</div>' +
                    '<div id="colunma_2_c1'+x+'" class="col-5-10">' +
                    '<div id="grafico_4_max_c1'+x+'" style=" display:block; height: 470px; width: auto;">' +
                    '</div>' +
                    '</div>' +
                    '</div>' ;

            }else  if (x == 'P05'){
                div_grafico_base_max +=   '<div class="row">' +
                    '<div id="colunma_1_c1'+x+'" class="col-4-10">' +
                    '<div id="grafico_2_max_c1'+x+'" style=" display:block; height: 470px; width: auto;"></div>' +
                    '</div>' +
                    '<div id="colunma_2_c1'+x+'" class="col-5-10">' +
                    '<div id="grafico_4_max_c1'+x+'" style=" display:block; height: 470px; width: auto;">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="row">' +
                    '<div id="colunma_1_c1'+x+'" class="col-4-10">' +
                    '<div id="grafico_5_max_c1'+x+'" style=" display:block; height: 470px; width: auto;"></div>' +
                    '</div>' +
                    '<div id="colunma_2_c1'+x+'" class="col-5-10">' +
                    '<div id="grafico_6_max_c1'+x+'" style=" display:block; height: 470px; width: auto;">' +
                    '</div>' +
                    '</div>' +
                    '</div>' ;
            } div_grafico_base_max +=  '<hr>' ;

        });

        $('.sliderDiv').html(div_grafico_base);
        $('.grupomaximizado').html(div_grafico_base_max);


    };



    var crearMinimizado = function (ubigeos) {

        console.log('cantidad data' + ubigeos.length);

        var ubigeo = '';
        var lista_ubi = []

        var cant = ubigeos.length;

        if (cant > 1) {
            var combo = '';
            ubigeos.reverse().forEach(function (i) {
                combo += '<option value="' + i[0] + '">' + i[1] + '</option>';  // acumulara en el combo los ubigeos seleccionados
                lista_ubi.push({'u': i[0]});
            });
            $("#cmb_ubi").html(combo);
            $("#cmb_ubi_m").html(combo);
            $("#cmb_ubigeo").css("display", "block");
            $("#cmb_ubigeo_m").css("display", "block");

            ubigeo = $('#cmb_ubi').val();
            console.log('MAS DE 1 data');

        }
        else {
            $("#cmb_ubi").html('');
            $("#cmb_ubigeo").css("display", "none");
            $("#cmb_ubigeo_m").css("display", "none");

            ubigeo = ubigeos[0][0];
            lista_ubi = {'u': ubigeos[0][0]};
            console.log('SOLO 1 data');
        }

        self.cant_select = cant;

        service.graficos.getGraficoMin(ubigeo, graf_persona_edad); //mostrara los graficos del ubigeo
        service.graficos.gePoblacionInd(lista_ubi, graf_barra_ubigeo); //mostrara los graficos de barra del ubigeo

    };

    var uiMaxCallback = function (option) {
        $('#sliderDiv').html('');
        $('#grupomaximizado').html('');

        self.div_grag1 = 'grafico_1_max_c1' +self.categoria_select;
        self.div_grag2 = 'grafico_2_max_c1'+ self.categoria_select;
        self.div_grag3 = 'grafico_3_max_c1' + self.categoria_select;
        self.div_grag4 = 'grafico_4_max_c1' + self.categoria_select;
        self.div_grag5 = 'grafico_5_max_c1' + self.categoria_select;
        self.div_grag6 = 'grafico_6_max_c1' + self.categoria_select;


        crear_div_grafico();


        console.log(self.categoria_select)

        setTimeout(function () {

            if (self.categoria_select == 'P01') {

                service.graficos.getGraficoMin('00' , graf_persona_edad,self.div_grag1 ,self.div_grag2);
                //graf_persona_edad(self.data_grafico,self.div_grag1,self.div_grag2);
               graf_barra_ubigeo(self.Json2,self.div_grag4);
            }
            else if (self.categoria_select == 'P02') {
                service.graficos.getGraficoMin('00' , graf_educacion, self.div_grag1);
                //graf_educacion(self.div_grag1,self.div_grag3 );
            } else if (self.categoria_select == 'P03') {
                service.graficos.getGraficoMin('00' , graf_salud,self.div_grag1);
                //graf_salud(self.div_grag1,self.div_grag3);
            } else if (self.categoria_select == 'P04') {
                service.graficos.getGraficoMin('00' , graf_economia,self.div_grag1);
                //graf_economia(self.div_grag1, self.div_grag3);
            } else if (self.categoria_select == 'P05') {
                service.graficos.getGraficoMin('00' , graf_vivienda,self.div_grag1, self.div_grag2,self.div_grag5);
                //graf_vivienda(self.div_grag1, self.div_grag3,self.div_grag5 );
            } else if (self.categoria_select == 'P06') {
                service.graficos.getGraficoMin('00' , graf_hogar,self.div_grag1);
                //graf_hogar(self.div_grag1, self.div_grag3);
            }

        }, 500);


        console.log(App.uiMax.graficos);

        $(".contendorSliderGrafico").css("display", "none");
        $(".grupomaximizado").css("display", "block");


        $("#contenedor_grafico").addClass('graficoMaximizado col-4-5');


        $(".busquedaMaximizadaCuadro").addClass('CuadroActivoBusqueda');

        $(".widgetMetadatos").css("display", "none");
        $("#id_graficoWidget_top").css("display", "none");

        $("#check_cat"+self.categoria_select).attr('checked', true);
    };

    var uiNormalCallback = function (option) {
        console.log(App.uiMax.graficos);
        self.div_grag1 = 'grafico_1_c1';
        self.div_grag2 = 'grafico_2_c1';
        self.div_grag5 = 'grafico_5_c1';


        //self.div_grag3 = 'grafico_3_c1';

        setTimeout(function () {

            if (self.categoria_select == 'P01') {
                service.graficos.getGraficoMin('00' , graf_persona_edad,self.div_grag1 ,self.div_grag2);
               // graf_barra_ubigeo(self.Json2);
            }
            else if (self.categoria_select == 'P02') {
                service.graficos.getGraficoMin('00' , graf_educacion, self.div_grag1);
            } else if (self.categoria_select == 'P03') {
                service.graficos.getGraficoMin('00' , graf_salud,self.div_grag1);
            } else if (self.categoria_select == 'P04') {
                service.graficos.getGraficoMin('00' , graf_economia,self.div_grag1);
            } else if (self.categoria_select == 'P05') {
                service.graficos.getGraficoMin('00' , graf_vivienda,self.div_grag1, self.div_grag2,self.div_grag5);
            } else if (self.categoria_select == 'P06') {
                service.graficos.getGraficoMin('00' , graf_hogar,self.div_grag1);
            }

        }, 500)

        $(".contendorSliderGrafico").css("display", "block");
        $(".grupomaximizado").css("display", "none");
        $("#contenedor_grafico").removeClass('graficoMaximizado col-4-5');
        $(".busquedaMaximizadaCuadro").removeClass('CuadroActivoBusqueda');
        $(".widgetMetadatos").css("display", "block");
        $("#id_graficoWidget_top").css("display", "block");

        sliderGraph();
        $(".check_cat").attr('checked', false);

        //grafico_responsive(300, 400, 230);

    };


    var mapasChangeEvent = function (option) {
        console.log(option.ubigeo)

        var ubigeo = [];
        var arreglo = [];
        ubigeo = option.ubigeo

        ubigeo.forEach(function (x) {
            arreglo.push([x, appData.titulo['U' + x]])
        });

        crearMinimizado(arreglo, self.div_grag1, self.div_grag2);

    };


    var categoriaChangeEvent = function (options) {

        console.log('catego graficos', options.categoria);

        self.categoria_select = options.categoria;
        self.check_selected = [self.categoria_select];

        $('.sliderDiv').html('');
        $('.grupomaximizado').html('');

        self.div_grag1 = 'grafico_1_c1';
        self.div_grag2 = 'grafico_2_c1';
        self.div_grag5 = 'grafico_5_c1';
        self.div_grag3 = 'grafico_3_max_c1' ;
        self.div_grag4 = 'grafico_4_max_c1' ;

        //service.graficos.getGraficoMin('00' , utils.graficos.graf_persona_edad);
        crear_div_grafico();
        if (options.categoria == 'P01') {
            service.graficos.getGraficoMin('00' , graf_persona_edad,self.div_grag1 ,self.div_grag2);
            //graf_persona_edad(self.data_grafico,self.div_grag1,self.div_grag2);
            //graf_barra_ubigeo(self.Json2,self.div_grag4);
        }
        else if (options.categoria == 'P02') {
            service.graficos.getGraficoMin('00' , graf_educacion, self.div_grag1);
            //graf_educacion(self.data_grafico,self.div_grag1,self.div_grag3+options.categoria);

        } else if (options.categoria == 'P03') {
            service.graficos.getGraficoMin('00' , graf_salud,self.div_grag1);
            //graf_salud(self.data_grafico,self.div_grag1,self.div_grag3+options.categoria);

        } else if (options.categoria == 'P04') {
            service.graficos.getGraficoMin('00' , graf_economia,self.div_grag1);
            //graf_economia(self.data_grafico,self.div_grag1, self.div_grag3+options.categoria);

        } else if (options.categoria == 'P05') {
            service.graficos.getGraficoMin('00' , graf_vivienda,self.div_grag1, self.div_grag2,self.div_grag5);
            //graf_vivienda(self.data_grafico,self.div_grag1, self.div_grag2,self.div_grag5);

        } else if (options.categoria == 'P06') {
            service.graficos.getGraficoMin('00' , graf_hogar,self.div_grag1);
            //graf_hogar(self.data_grafico,self.div_grag1,self.div_grag3+options.categoria);
        }

        sliderGraph();


    };

    $('.check_cat').click(function()  {
        self.check_selected = [];
        $(".check_cat:checked").each(function() {
            self.check_selected.push($(this).val());
        });

        //console.log(self.check_selected);

        $('.grupomaximizado').html('');
        crear_div_grafico();

        self.check_selected.forEach(function (x) {

            console.log('se crea el grafico  ', x )

            self.div_grag1 = 'grafico_1_max_c1' ;
            self.div_grag2 = 'grafico_2_max_c1';
            self.div_grag3 = 'grafico_3_max_c1';
            self.div_grag4 = 'grafico_4_max_c1';
            self.div_grag5 = 'grafico_5_max_c1';
            self.div_grag6 = 'grafico_6_max_c1';

            setTimeout(function () {

                if (x == 'P01') {
                    self.categoria_select = 'p01'
                    service.graficos.getGraficoMin('00' , graf_persona_edad,self.div_grag1+x ,self.div_grag2+x);
                    //graf_persona_edad(self.data_grafico,self.div_grag1+x,self.div_grag2+x );
                    graf_barra_ubigeo(self.Json2,self.div_grag4+x);
                }
                else if (x == 'P02') {
                    self.categoria_select = 'p02'
                    service.graficos.getGraficoMin('00' , graf_educacion, self.div_grag1+x);
                    //graf_educacion(self.div_grag1+x, self.div_grag3+x);
                } else if (x == 'P03') {
                    self.categoria_select = 'p03'
                    service.graficos.getGraficoMin('00' , graf_salud,self.div_grag1+x);
                    //graf_salud(self.div_grag1+x,self.div_grag3+x);
                } else if (x == 'P04') {
                    self.categoria_select = 'p04'
                    service.graficos.getGraficoMin('00' , graf_economia,self.div_grag1+x);
                    //graf_economia(self.div_grag1+x,self.div_grag3+x);
                } else if (x == 'P05') {
                    self.categoria_select = 'p05'
                    service.graficos.getGraficoMin('00' , graf_vivienda,self.div_grag1+x, self.div_grag2+x,self.div_grag5+x);
                    /// graf_vivienda(self.div_grag1+x, self.div_grag2+x,  self.div_grag5+x);
                } else if (x == 'P06') {
                    self.categoria_select = 'p06'
                    service.graficos.getGraficoMin('00' , graf_hogar,self.div_grag1+x);
                    //graf_hogar(self.div_grag1+x, self.div_grag3+x);
                }

            }, 500)

        });
    });




    return {
        crearMinimizado: crearMinimizado,
        graf_barra_ubigeo: graf_barra_ubigeo,
        graf_persona_edad: graf_persona_edad,
        uiMaxCallback: uiMaxCallback,
        uiNormalCallback: uiNormalCallback,
        mapasChangeEvent: mapasChangeEvent,
        categoriaChangeEvent: categoriaChangeEvent,
        crear_div_grafico: crear_div_grafico

    }


})(App.utils, App.service, AppConfig(), Appdata());