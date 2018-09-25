App.utils.graficos = (function (parent, service, appData) {

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

    var botonesTop = function (uiId, botones) {
        var b;
        var html = '';
        for (b in botones) {
            var boton = botones[b];
            html += _htmlBotonesTop([boton.adicional, boton.name, parent.numberFormat(boton.y)]);
        }

        //$("#id_graficoWidget_top").html(html);
        $("#"+uiId).html(html);
    };


    var uiMaxCallback = function (options) {
        $(".ventanaGrafico .widgetMetadatos").hide();
        $(".busquedaMaximizadaCuadro").css("display","inline-block");
        $(".contenidoGraficoMaximizado").css("display","inline-block");
        $(".contenidoGraficoMaximizado").addClass("col-4-5").removeClass("col-5-5");
    };

    var uiNormalCallback = function (options) {
        $(".ventanaGrafico .widgetMetadatos").show();
        $(".busquedaMaximizadaCuadro").css("display","none");
        $(".contenidoGraficoMaximizado").addClass("col-5-5").removeClass("col-4-5");
        $(".contenidoGraficoMaximizado").css("display","block");
    };

    var uiReabrirVentana = function () {
        $(".ventanaGrafico .widgetMetadatos").show();
    };

    var mediaLunaPoblacion = function (uiId, data) {
        var options = {
            uiId: uiId,
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
        console.log("media luna >>><", data);
        App.utils.highcharts.mediaLuna(data, options);
    };

    var graficosIndicadores = {
        "001": { "callback": botonesTop, "tipo": 1},
        "002": { "callback": mediaLunaPoblacion, "tipo": 2}
    };

    var init = function () {
        appData = appData();
    };

    var initIndicador = function (indicador) {
        this.indicadores(indicador.cuadrosData.categoria, indicador.cuadrosData.ubigeo);
    };

    var _htmlBotonesTop = function (options) {
        var template = '<div class="graficoWidget-top">'+
            '<div><span class="{0}"></span></div>'+
            '<div>'+
            '<div class="">{1}</div>'+
            '<div id="id_w_h" class="hombre textoBotonTop">{2}</div>'+
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

    var comboIndicaDores = function (ubigeos) {
        console.log(">>> combo", ubigeos);
        $("#cmb_ubigeo select").html("");
        if (ubigeos.length > 1) {
            var html = '';
            var u;
            for (u in ubigeos) {
                html += parent.format('<option value="{0}">{1}</option>', [ubigeos[u], appData.titulo["U"+ubigeos[u]]]);
            }

            console.log("html combo>>> ", html);
            $("#cmb_ubigeo select").html(html);
            $("#cmb_ubigeo").show();
        }else {
            $("#cmb_ubigeo").hide();
        }
    };

    var indicadores = function (categoria, ubigeo, ubigeos) {
        //var categoria = indicador.cuadrosData.categoria;
        $(".sliderDiv").html("");
        service.graficos.getIndicador(categoria, ubigeo, function (data) {
            //indicador.graficoCategoria[categoria] = data;
            var g;
            var c=0;
            for (g in data) {
                var grafico = graficosIndicadores[g];
                if (grafico.tipo== 1) {
                    var uiId = "id_graficoWidget_top";
                }else {
                    c++;
                    var uiId = parent.format("grafico_{0}_c{1}", [c, categoria]);
                    $(".sliderDiv").append('<div id="'+uiId+'" class="graficoElementSlider"></div>');
                }

                // Invocar al callback por cada grafico
                grafico['callback'](uiId, data[g]);


            }
        });
    };

    return {
        //mediaLuna: mediaLuna,
        popupMapa: popupMapa,
        indicadores: indicadores,
        comboIndicaDores: comboIndicaDores,
        init: init,
        uiMaxCallback: uiMaxCallback,
        uiNormalCallback: uiNormalCallback,
        uiReabrirVentana: uiReabrirVentana,
        initIndicador: initIndicador
    }
})(App.utils, App.service, Appdata);