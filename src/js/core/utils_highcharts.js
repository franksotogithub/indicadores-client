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
            text: ''
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
    var _chartsMediaLunaTitle = function (options) {
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
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    x:0,
                    y: 10,
                    distance: -10,
                    style: {
                        fontWeight: 'bold',
                        color: '#333333',
                        textShadow: null,
                        textOutline: 0,
                        fontSize: "13px"
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
                plote = _optionsJson(plote, options);
                /* Revisar el particionado */
                if (plote.pie !== undefined) {
                    plote.pie.startAngle = -90;
                    plote.pie.endAngle = 90;
                    plote.pie.center = ['50%', '65%'];

                }
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
                data: data,
                name: options.seriesName
            }]
        });
    };

    var mediaLuna = function (data, options, render) {
        var defaultcolors = Highcharts.getOptions().colors;
        var values = {
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
            title: _chartsMediaLunaTitle(options.title),
            tooltip: _chartsTooltip(options.tooltip),
            plotOptions: ploteMediaLuna(options.plotOptions),
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            series: [{
                innerSize: '50%',
                data: data,
                name: options.seriesName
            }]
        };
        return (render === undefined || render == true) ? Highcharts.chart(options.uiId, values) : values;
    };

    var columnChart = function (data, options, render) {
        var defaultcolors = Highcharts.getOptions().colors;

        var values = {
            chart: {
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                },
                type: 'column'
            },
            title: _chartsTitle(options.title),
            subtitle: _chartsTitle(options.subtitle),
            yAxis: {
                min: 0,
                    title: {
                    text: ''
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.percentage:.1f} %',

                    }
                }
            },
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            exporting:{
                enabled: (options.exporting !== undefined) ? options.exporting : false
            },
            series: [{
                data: data,
                name: options.seriesName
            }]
        };
        return (render === undefined || render == true) ? Highcharts.chart(options.uiId, values) : values;
    };

    var barChart = function (data, options, render) {
        var defaultcolors = Highcharts.getOptions().colors;

        var values = {
            chart: {
                type: 'bar',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                }
            },
            title: _chartsTitle(options.title),
            subtitle: _chartsTitle(options.subtitle),
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -20,
                y: 50,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: options.xAxis,
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            plotOptions: {
                bar: {
                    pointPadding: 0.2,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y} ({point.adicional.porcentaje:.1f}%)',

                    }
                }
            },
            exporting:{
                enabled: (options.exporting !== undefined) ? options.exporting : false
            },
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            series: [{
                data: data,
                name: options.seriesName
            }]
        };
        return (render === undefined || render == true) ? Highcharts.chart(options.uiId, values) : values;
    };

    var donutChart = function (data, options, render) {
        var defaultcolors = Highcharts.getOptions().colors;
        console.log(">>>> options", options);
        var values = {
            chart: {
                type: 'pie',
                backgroundColor: {
                    style: {
                        backgroundColor: 'transparent'
                    }
                }
            },
            title: _chartsTitle(options.title),
            subtitle: _chartsTitle(options.subtitle),
            plotOptions: {
                pie: {
                    innerSize: 50,
                    depth: 45,
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b><br>{point.y} ({point.adicional.porcentaje:.1f}%)',

                    }
                }
            },
            colors: (options.colors !== undefined) ? options.colors : defaultcolors,
            exporting:{
                enabled: (options.exporting !== undefined) ? options.exporting : false
            },
            series: [{
                data: data,
                name: options.seriesName
            }]
        };

        return (render === undefined || render == true) ? Highcharts.chart(options.uiId, values) : values;
    };

    var graficoLinea = function () {

    };

    var graficoPie = function () {

    };

    return {
        mediaLuna: mediaLuna,
        columnChart: columnChart,
        barChart: barChart,
        donutChart: donutChart,
        ploteMediaLuna: ploteMediaLuna
    }
})(App.service, AppConfig());