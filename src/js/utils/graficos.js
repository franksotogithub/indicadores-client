App.utils.graficos = (function (parent, service, config, appData) {

    var grafico_1
    var grafico_2
    var grafico_3


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

            grafico_3 =  Highcharts.chart('grafico_3', {
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

        self.div_grag1='grafico_1_m';
        self.div_grag2='grafico_2_m';

        graf_persona_edad(self.json,self.div_grag1, self.div_grag2 )

        console.log(App.uiMax.graficos);

        $("#primer_g_1").css("display", "none");
        $("#primer_g_2_1").css("display", "block");


        $("#grafico_2").css("display", "block");
        $("#grafico_3").css("display", "block");

        $("#primer_g").addClass('col-4-10');
        $("#primer_g_2").addClass('col-5-10');


        $(".widgetMetadatos").css("display", "none");
        $(".graficoWidget-top").css("display", "none");



            $("#grafico_1_m").css("width", "600px");
            $("#grafico_2_m").css("width", "600px");
            $("#grafico_3").css("width", "860px");
            $("#grafico_1_m").css("height", "300px");
            $("#grafico_2_m").css("height", "400px");
            $("#grafico_3").css("height", "700px");

            grafico_1.setSize(null, null);
            grafico_2.setSize(null, null);
            grafico_3.setSize(null, null);




    };


    var uiNormalCallback = function (option) {
        console.log(App.uiMax.graficos);
        self.div_grag1='grafico_1';
        self.div_grag2='grafico_2';

        graf_persona_edad(self.json,self.div_grag1, self.div_grag2 )

        $("#grafico_1").css("width", "auto");
        $("#grafico_1").css("height", "auto");


        $("#grafico_2").css("display", "none");
        $("#grafico_3").css("display", "none");

        $("#primer_g").removeClass('col-4-10');
        $("#primer_g_2").removeClass('col-5-10');
        $("#primer_g_2_1").css("display", "none");
        $("#primer_g_1").css("display", "block");





        $(".widgetMetadatos").css("display", "block");
        $(".graficoWidget-top").css("display", "block");
        grafico_1.setSize(null, null);

    }




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
    };







    return {
        crearMinimizado: crearMinimizado,
        graf_barra_ubigeo: graf_barra_ubigeo,
        graf_persona_edad:graf_persona_edad,
        uiMaxCallback : uiMaxCallback,
        uiNormalCallback : uiNormalCallback,
        mapasChangeEvent:mapasChangeEvent,
        categoriaChangeEvent:categoriaChangeEvent
    }


})(App.utils, App.service, AppConfig(), Appdata());