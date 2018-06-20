App.utils.graficos = (function (parent, service, config, appData) {



    var graf_persona_edad = function (data) {

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
                categories: data.categoria,
                reversed: false,
                labels: {
                    step: 1
                }
            }, { // mirror axis on right side
                opposite: true,
                reversed: false,
                categories: data.categoria,
                linkedTo: 0,
                labels: {
                    step: 1
                }
            }],
            yAxis: {
                allowDecimals: false,
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
                    allowDecimals: false,

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

            series: data.data

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
            data: data.total
        }]
    });

    };


        graf_barra_ubigeo = function(data){

    Highcharts.chart('grafico_3', {
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
            min: 1,
            title: {
                text: 'Cant. (miles)'
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
        series: data.son
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
            $("#cmb_ubigeo").css("display", "block");
            ubigeo = $('#cmb_ubi').val();
            console.log( 'MAS DE 1 data' );

        }
        else{
            $("#cmb_ubi").html('');
            $("#cmb_ubigeo").css("display", "none");
            ubigeo = ubigeos[0][0];
            lista_ubi = {'u': ubigeos[0][0]};
            console.log( 'SOLO 1 data' );
        }

        service.graficos.gePoblacionEdad(ubigeo, 'P01', graf_persona_edad); //mostrara los graficos del ubigeo



        service.graficos.gePoblacionInd(lista_ubi,'P01',graf_barra_ubigeo); //mostrara los graficos de barra del ubigeo

    };

    var uiMaxCallback = function (option) {

        console.log(App.uiMax.graficos);
        $("#grafico_2").css("display", "block");
        $("#grafico_3").css("display", "block");


    }


    var uiNormalCallback = function (option) {
        console.log(App.uiMax.graficos);

        $("#grafico_2").css("display", "none");
        $("#grafico_3").css("display", "none");
    }



    var mapasChangeEvent = function (option) {
        console.log(option.ubigeo)

        var ubigeo = [];

        var arreglo = [];

        ubigeo = option.ubigeo

        ubigeo.forEach(function (x) {
            arreglo.push([x,appData.titulo['U'+x]])
        });

        crearMinimizado(arreglo);


    };







    return {
        crearMinimizado: crearMinimizado,
        graf_barra_ubigeo: graf_barra_ubigeo,
        graf_persona_edad:graf_persona_edad,
        uiMaxCallback : uiMaxCallback,
        uiNormalCallback : uiNormalCallback,
        mapasChangeEvent:mapasChangeEvent
    }


})(App.utils, App.service, AppConfig(), Appdata());