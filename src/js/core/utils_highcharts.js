App.utils = App.utils || {};
// Extender funciones de highchart

/* SVG descargar */
Highcharts.SVGRenderer.prototype.symbols.download = function (x, y, w, h) {
    var path = [
        // Arrow stem
        'M', x + w * 0.5, y,
        'L', x + w * 0.5, y + h * 0.7,
        // Arrow head
        'M', x + w * 0.3, y + h * 0.5,
        'L', x + w * 0.5, y + h * 0.7,
        'L', x + w * 0.7, y + h * 0.5,
        // Box
        'M', x, y + h * 0.9,
        'L', x, y + h,
        'L', x + w, y + h,
        'L', x + w, y + h * 0.9
    ];
    return path;
};

App.utils.highcharts = (function (service, config) {
    var _optionsJson = function (origen, options) {
        var key;
        for (key in options) {
            origen[key] = options[key];
        }
        return origen;
    };
    var _chartsTitle = function (options) {
        var title = {
            text: '',
            align: 'center',
            y: 10,
            style: {
                fontSize: "14px"
            }
        };

        if (options !== undefined) {
            if (typeof options === 'string' ) {
                title.text = options;
            }else {
                title = _optionsJson(title, options);
            }
        }

        return title;
    };
    var _chartsTooltip = function (options) {
        var tooltip = {
            pointFormat:'Total: <b>{point.y:.1f}</b> '
        };
        if (options !== undefined) {
            if (typeof options === 'string' ) {
                tooltip.pointFormat = options;
            }else {
                tooltip = _optionsJson(tooltip, options);
            }
        }
        return tooltip
    };
    var ploteMediaLuna = function (options) {
        var plote = {
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
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '65%']
            }
        };

        if (options !== undefined) {
            if (typeof options === 'string' ) {
                plote.pie.dataLabels.format = options;
            }else {
                plote = _optionsJson(tooltip, options);
            }
        }
        return plote;
    };
    var _crearGrafico = function (options) {
        var defaultChart = {
            plotBackgroundColor: null,
            backgroundColor: {
                style: {
                    backgroundColor: 'transparent'
                }
            },
            plotBorderWidth: 0,
            plotShadow: false
        };


        if (options !== undefined) {
            // Setear tipo de grafico
            if (options.type !== undefined) {
                defaultChart["type"]= options.type;
            }
        }

        var grafico = Highcharts.chart(options.uiId, {
            chart: {
                plotBackgroundColor: null,
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
                plotBorderWidth: 0,
                plotShadow: false,
                type: type
            },
            credits: {
                enabled: false
            },
            exporting:{
                enabled: (options.exporting !== undefined) ? options.exporting : false
            },
            title: _chartsTitle(options.title),
            tooltip: _chartsTooltip(options.tooltip),
            plotOptions: ploteMediaLuna(options.plot),
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            series: [{
                innerSize: '50%',
                data: data
            }]
        });
    };

    var mediaLuna = function (data, options) {
        var defaultcolors = Highcharts.getOptions().colors;
        return Highcharts.chart(options.uiId, {
            chart: {
                plotBackgroundColor: null,
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
                plotBorderWidth: 0,
                plotShadow: false,
                type: 'pie'
            },
            credits: {
                enabled: false
            },
            exporting:{
                enabled: (options.exporting !== undefined) ? options.exporting : false
            },
            title: _chartsTitle(options.title),
            tooltip: _chartsTooltip(options.tooltip),
            plotOptions: ploteMediaLuna(options.plot),
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            series: [{
                innerSize: '50%',
                data: data
            }]
        });
    };

    var graficoBarra = function () {

    };

    var graficoLinea = function () {

    };

    var graficoPie = function () {

    };

    return {
        mediaLuna: mediaLuna,
        ploteMediaLuna: ploteMediaLuna
    }
})(App.service, AppConfig());