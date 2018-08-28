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

    var init = function () {
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

    var mediaLuna = function (codgrafico, ubigeo, options) {
        var html = '';
        html += _htmlBotonesTop(["", "Población Censada", "98 765 489"]);
        html += _htmlBotonesTop(["icon-user hombre", "Hombres", "98 765 489"]);
        html += _htmlBotonesTop(["icon-user-female mujer", "Mujeres", "98 765 489"]);

        $("#id_graficoWidget_top").html(html);

        options.colors = [colorsPie[0], colorsPie[1]];
        service.graficos.getGrafico(codgrafico, ubigeo, function (data) {
            App.utils.highcharts.mediaLuna(data, options);
        });
    };

    var popupMapa = function (popupvalues, codgrafico, ubigeo, options, callback) {
        options.colors = [colorsPie[0], colorsPie[1]];
        service.graficos.getGrafico(codgrafico, ubigeo, function (data) {
            popupvalues.grafico = App.utils.highcharts.mediaLuna(data, options, false);
            callback(options);
        });
    };

    return {
        mediaLuna: mediaLuna,
        popupMapa: popupMapa,
        init: init
    }
})(App.utils, App.service);