App.utils.graficos = (function (parent, service, config, appdata) {



    var graf_persona_edad = function (data) {

        var edad_h = [];
        var edad_m = [];
        var t_edad_h = 0;
        var t_edad_m = 0;


        data.forEach(function (i) {
            edad_h.push(-i[0]);
            edad_m.push(i[1]);

            t_edad_h += i[0];
            t_edad_m += i[1];

        });

        var categories = [
            '0-14', '15-64', '65+'
        ];

        Highcharts.chart('grafico_1', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'POBLACION 2017'
            },

            xAxis: [{
                title: {
                    text: null
                },
                categories: categories,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: categories,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                title: {
                    text: null
                },
                labels: {
                    formatter: function () {
                        return Math.abs(this.value) ;
                    }
                }
            },

            plotOptions: {
                series: {
                    stacking: 'normal'
                },
                bar: {
                    pointPadding: -0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,


                            formatter: function () {
                                return  Highcharts.numberFormat(Math.abs(this.point.y),1);
                            }
                        ,
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

            series: //data
            [{
            name: 'Hombres',
            data:  edad_h
                //-452, -578, -228


        }, {
            name: 'Mujeres',
            data:  edad_m
             //   400, 458, 325

        }]
        });

        Highcharts.chart('grafico_2', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Total<br>Personas<br>2017',
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
            data: [
                ['Hombres', t_edad_h],
                ['Mujeres', t_edad_m]
                            ]
        }]
    });

    };

    var graf_barra_ubigeo = function(data){

        var arreglo_nombre = [];
        var arreglo_ind1 = [];
        var arreglo_ind2 = [];
        var arreglo_ind3 = [];

        console.log(data);

        data.forEach(function (i) {

            arreglo_nombre.push(i[0]);
            arreglo_ind1.push(i[1]);
            arreglo_ind2.push(i[2]);
            arreglo_ind3.push(i[3]);
        });


    Highcharts.chart('grafico_3', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'INFORMACION'
        },

        xAxis: {
            categories:
            arreglo_nombre
               // ['lima','callao']
            ,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cant. (miles)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} Ml</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {

            bar: {
                pointPadding: -0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,

                    distance: 20,
                    style: {
                        fontWeight: 'bold',
                    }
                },
                pointPadding: 0.1,
                borderWidth: 0
            },

            column: {

                dataLabels: {
                    enabled: true,
                    distance: -30,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },

                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: [{
            name: 'educacion',
            data: arreglo_ind1
               // [165,565]

        }, {
            name: 'economia',
            data: arreglo_ind2
               // [1465,545]
        }, {
            name: 'cultura',
            data: arreglo_ind3
                //[65,65]
        }]
    });
    };


    var crearMinimizado = function (ubigeos) {

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
            $("#cmb_ubi").css("display", "block");
            ubigeo = $('#cmb_ubi').val();
            console.log( 'MAS DE 1 data' );

        }
        else{
            $("#cmb_ubi").html('');
            $("#cmb_ubi").css("display", "none");
            ubigeo = ubigeos[0][0];
            lista_ubi = {'u': ubigeos[0][0]};
            console.log( 'SOLO 1 data' );
        }

        console.log('captura ubigeo ---' + ubigeo);
        service.graficos.gePoblacionEdad(ubigeo, 'P01', graf_persona_edad); //mostrara los graficos del ubigeo



        service.graficos.gePoblacionInd(lista_ubi,'P01',graf_barra_ubigeo); //mostrara los graficos de barra del ubigeo

    };
    // llena el combre de graficos en caso se selecions mas de 1


    return {
        crearMinimizado: crearMinimizado,
        graf_barra_ubigeo: graf_barra_ubigeo,
        graf_persona_edad:graf_persona_edad
    }


})(App.utils, App.service, AppConfig(), Appdata());