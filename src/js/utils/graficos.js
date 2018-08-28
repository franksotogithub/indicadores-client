App.utils.graficos = (function (parent, service) {

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
    }];

    var botonesTop = function (botones) {
        var b;
        var html = '';
        for (b in botones) {
            var boton = botones[b];
            html += _htmlBotonesTop(["", boton.name, parent.numberFormat(boton.y)]);
        }

        $("#id_graficoWidget_top").html(html);
    };

    var mediaLunaPoblacion = function (data) {
        var options = {
            uiId: 'grafico_1_c01',
            title: {
                text: 'Total<br />personas',
                align: 'center',
                verticalAlign: 'middle',
                y: 0,
                style: {
                    fontSize: "14px"
                }
            }
        };
        options.colors = [colorsPie[0], colorsPie[1]];
        App.utils.highcharts.mediaLuna(data, options);
    };

    var graficosIndicadores = {
        "G000001": botonesTop,
        "G000002": mediaLunaPoblacion
    };

    var init = function () {
        /*
            $(".sliderDiv").html();
            $(".sliderDiv").append('<div id="grafico_1_c1" class="graficoElementSlider" ></div>');

            this.mediaLuna('G00001', '00', {
                uiId: 'grafico_1_c1',
                title: {
                    text: 'Total<br />personas',
                    align: 'center',
                    verticalAlign: 'middle',
                    y: 0,
                    style: {
                        fontSize: "14px"
                    }
                }
            });

        */
    };

    var initIndicador = function (indicador) {
        var categoria = indicador.cuadrosData.categoria;
        this.indicadores(categoria, indicador.cuadrosData.ubigeo, function (data) {
            $(".sliderDiv").html("");
            indicador.graficoCategoria[categoria] = data;
            var g;
            var c=0;
            for (g in data) {
                c++;
                var uiId = parent.format("grafico_{0}_c{1}", [c, categoria]);
                $(".sliderDiv").append('<div id="'+uiId+'" class="graficoElementSlider"></div>');
                graficosIndicadores[g](data[g]);
            }
        })
    };

    var _htmlBotonesTop = function (options) {
        var template = '<div class="graficoWidget-top">'+
            '<div><span class="{0}"></span></div>'+
            '<div>'+
            '<div class="">{1}</div>'+
            '<div id="id_w_h" class="hombre">{2}</div>'+
            '</div>'+
            '</div>';
        return parent.format(template, options);
    };



    var popupMapa = function (popupvalues, codgrafico, ubigeo, options, callback) {
        service.graficos.getGrafico(codgrafico, ubigeo, function (data) {
            popupvalues.grafico = App.utils.highcharts.mediaLuna(data, options, false);
            callback(popupvalues);
        });
    };

    var indicadores = function (cod_categoria, ubigeo, callback) {
        service.graficos.getIndicador(cod_categoria, ubigeo, function (data) {
            callback(data);
        });
    };

    return {
        //mediaLuna: mediaLuna,
        popupMapa: popupMapa,
        indicadores: indicadores,
        //botonesTop: botonesTop,

        init: init,
        initIndicador: initIndicador
    }
})(App.utils, App.service);