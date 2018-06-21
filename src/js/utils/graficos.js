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


    var graf_persona_edad = function (data,div1, div2) {

        grafico_1 =   Highcharts.chart(div1, {
            chart: {
                type: 'bar'
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
                        return Highcharts.numberFormat(Math.abs(this.value),0)
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
                        enabled: true,
                            formatter: function () {
                                return  Highcharts.numberFormat(Math.abs(this.point.y),0);
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
                    return '<b>' + this.series.name  + '</b><br/>' +
                        'Poblacion: ' + Highcharts.numberFormat(Math.abs(this.point.y),1);
                }
            },

            series: data.data

        });

        grafico_2 =  Highcharts.chart(div2, {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false

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
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -30,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '65%']
            }
        },
        series: [{
            type: 'pie',
            name: 'porcentaje',
            innerSize: '50%',
            data: data.total
        }]
    });

    };


        graf_barra_ubigeo = function(data){

            grafico_3 =  Highcharts.chart('grafico_3_max_c1', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'INFORMACION'
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
            valueSuffix: ''
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
        series: data.son
    });
    };

    var graf_educacion = function(div1){
    grafico_c2 = Highcharts.chart(div1, {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'asistencia al sistema educativo '
        },
        subtitle: {
            text: null,
        },
        xAxis: {
            categories: [' nacional'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Population (millions)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' millions'
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
            name: '3 a 5 años',
            data: [107]
        }, {
            name: '6 a 11 años',
            data: [133]
        }, {
            name: '12 a 16 años',
            data: [814]
        }, {
            name: '17 a 24 años',
            data: [1216]
        }]
    });




        grafico_c2_2 =  Highcharts.chart('grafico_3_c2', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
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
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 40]
            }]
        });




};

    var graf_salud = function(div1){
        grafico_c3 = Highcharts.chart(div1, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Poblacion con seguro'
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
                data: [ {
                    name: 'Urbano',
                    y: 8748430
                }, {
                    name: 'Rural',
                    y: 2850270
                }]
            }]
        });

        grafico_c3_2 = Highcharts.chart('grafico_3_c3', {
            chart: {
                type: 'column'
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
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'New York',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                name: 'London',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }, {
                name: 'Berlin',
                data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

            }]
        });


    };

    var graf_economia = function(div1){

        grafico_c4 = Highcharts.chart(div1, {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
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
                data: [49.9]

            }, {
                name: 'internet',
                data: [83.6]

            }, {
                name: 'celulares',
                data: [48.9]

            }, {
                name: 'telefono',
                data: [42.4]

            }]
        });


        grafico_c4_2 = Highcharts.chart('grafico_3_c4', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
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
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 40]
            }]
        });

    };

    var graf_vivienda = function(div1){
        grafico_c5 = Highcharts.chart(div1, {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Servicios Basicos'
            },
            subtitle: {
                text: null
            },
            xAxis: {
                categories: ['nacional'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ''
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
                name: 'Viviendas con abastecimiento de agua',
                data: [1027]
            }, {
                name: 'Viviendas con servicio higiénico',
                data: [1334]
            }]
        });

        grafico_c5_2 = Highcharts.chart('grafico_3_c5', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Historic World Population by Region'
            },
            subtitle: {
                text: 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
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
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2]
            }, {
                name: 'Year 1900',
                data: [133, 156, 947, 408, 6]
            }, {
                name: 'Year 2000',
                data: [814, 841, 3714, 727, 31]
            }, {
                name: 'Year 2016',
                data: [1216, 1001, 4436, 738, 40]
            }]
        });

    };

    var graf_hogar = function(div1){
        grafico_c6 = Highcharts.chart(div1, {
            chart: {
                type: 'column'
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
                data: [49.9]

            }, {
                name: 'internet',
                data: [83.6]

            }, {
                name: 'celulares',
                data: [48.9]

            }, {
                name: 'telefono',
                data: [42.4]

            }]
        });



        grafico_c6_2 = Highcharts.chart('grafico_3_c6', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Poblacion con seguro'
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
                data: [ {
                    name: 'Urbano',
                    y: 8748430
                }, {
                    name: 'Rural',
                    y: 2850270
                }]
            }]
        });




    };








    var grafico_responsive = function (time,x,y) {

        setTimeout(function () {

            grafico_1.setSize(x, y);
            grafico_2.setSize(x, y);
            grafico_3.setSize(x, y);
            grafico_c2.setSize(x, y);
            grafico_c2_2.setSize(x, y);
            grafico_c3.setSize(x, y);
            grafico_c3_2.setSize(x, y);
            grafico_c4.setSize(x, y);
            grafico_c4_2.setSize(x, y);
            grafico_c5.setSize(x, y);
            grafico_c5_2.setSize(x, y);
            grafico_c6.setSize(x, y);
            grafico_c6_2.setSize(x, y);



        },time)

    } ;






    var crearMinimizado = function (ubigeos , div_grag1,div_grag2) {

        console.log( 'cantidad data' +ubigeos.length);

        var ubigeo ='';
        var lista_ubi = []

        var cant = ubigeos.length;

        if(cant > 1 ){
            var combo = '';
            ubigeos.reverse().forEach(function (i) {
                combo += '<option value="'+i[0]+'">'+ i[1] +'</option>';  // acumulara en el combo los ubigeos seleccionados
                lista_ubi.push({'u': i[0]});
            });
            $("#cmb_ubi").html(combo);
            $("#cmb_ubi_m").html(combo);
            $("#cmb_ubigeo").css("display", "block");
            $("#cmb_ubigeo_m").css("display", "block");

            ubigeo = $('#cmb_ubi').val();
            console.log( 'MAS DE 1 data' );

        }
        else{
            $("#cmb_ubi").html('');
            $("#cmb_ubigeo").css("display", "none");
            $("#cmb_ubigeo_m").css("display", "none");

            ubigeo = ubigeos[0][0];
            lista_ubi = {'u': ubigeos[0][0]};
            console.log( 'SOLO 1 data' );
        }

        self.cant_select = cant;

        service.graficos.gePoblacionEdad(ubigeo,cant, 'P01',div_grag1,div_grag2, graf_persona_edad); //mostrara los graficos del ubigeo

        service.graficos.gePoblacionInd(lista_ubi,'P01',graf_barra_ubigeo); //mostrara los graficos de barra del ubigeo

    };

    var uiMaxCallback = function (option) {

        self.div_grag1='grafico_1_max_c1';
        self.div_grag2='grafico_2_max_c1';

        self.div_grag1_c2 ='grafico_1_max_c2';
        self.div_grag1_c3 ='grafico_1_max_c3';
        self.div_grag1_c4 ='grafico_1_max_c4';
        self.div_grag1_c5 ='grafico_1_max_c5';
        self.div_grag1_c6 ='grafico_1_max_c6';


        graf_educacion(self.div_grag1_c2);
        graf_salud(self.div_grag1_c3);
        graf_economia(self.div_grag1_c4);
        graf_vivienda(self.div_grag1_c5);
        graf_hogar(self.div_grag1_c6);


        graf_persona_edad(self.json,self.div_grag1, self.div_grag2 )

        console.log(App.uiMax.graficos);

        $(".contendorSliderGrafico").css("display", "none");
        $(".grupomaximizado").css("display", "block");


        $(".widgetMetadatos").css("display", "none");
        $("#id_graficoWidget_top").css("display", "none");


        grafico_responsive(360,null,null);






    };


    var uiNormalCallback = function (option) {
        console.log(App.uiMax.graficos);
        self.div_grag1='grafico_1_c1';
        self.div_grag2='grafico_2_c1';


        self.div_grag1_c2 ='grafico_1_c2';
        self.div_grag1_c3 ='grafico_1_c3';
        self.div_grag1_c4 ='grafico_1_c4';
        self.div_grag1_c5 ='grafico_1_c5';
        self.div_grag1_c6 ='grafico_1_c6';


        graf_educacion(self.div_grag1_c2);
        graf_salud(self.div_grag1_c3);
        graf_economia(self.div_grag1_c4);
        graf_vivienda(self.div_grag1_c5);
        graf_hogar(self.div_grag1_c6);

        graf_persona_edad(self.json,self.div_grag1, self.div_grag2 )


        $(".contendorSliderGrafico").css("display", "block");
        $(".grupomaximizado").css("display", "none");




        $(".widgetMetadatos").css("display", "block");
        $("#id_graficoWidget_top").css("display", "block");

        grafico_responsive(300,400,230);

    };




    var mapasChangeEvent = function (option) {
        console.log(option.ubigeo)

        var ubigeo = [];

        var arreglo = [];

        ubigeo = option.ubigeo

        ubigeo.forEach(function (x) {
            arreglo.push([x,appData.titulo['U'+x]])
        });

        crearMinimizado(arreglo, self.div_grag1, self.div_grag2);

    };



    var categoriaChangeEvent = function (options) {
        console.log('catego graficos', options.categoria);


        $("#contenedor_P01").css("display", "none");
        $("#contenedor_P02").css("display", "none");
        $("#contenedor_P03").css("display", "none");
        $("#contenedor_P04").css("display", "none");
        $("#contenedor_P05").css("display", "none");
        $("#contenedor_P06").css("display", "none");


        grafico_responsive(100,370,230);

        $("#contenedor_"+ options.categoria).css("display", "block");


    };



    return {
        crearMinimizado: crearMinimizado,
        graf_barra_ubigeo: graf_barra_ubigeo,
        graf_persona_edad:graf_persona_edad,
        uiMaxCallback : uiMaxCallback,
        uiNormalCallback : uiNormalCallback,
        mapasChangeEvent:mapasChangeEvent,
        categoriaChangeEvent:categoriaChangeEvent,
        graf_educacion:graf_educacion,
        graf_salud:graf_salud,
        graf_economia:graf_economia,
        graf_vivienda:graf_vivienda,
        graf_hogar:graf_hogar

}


})(App.utils, App.service, AppConfig(), Appdata());