var AppConfig = function () {
    return {
        urlServer: "http://192.168.34.14:8001/",
        urlArcGis: {
            'default': 'server',
            'server': "//datacrim.inei.gob.pe/mapa/arcgis/rest/services/",
            'server1': "//datacrim.inei.gob.pe/mapa1/arcgis/rest/services/",
            'server2': "//datacrim.inei.gob.pe/mapa2/arcgis/rest/services/"
        },
        utils:{
            print:"http://192.168.202.84:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        },

        highchart: function () {
            Highcharts.setOptions({
                colors: ['#ff7f00', '#fdbf6f', '#e31a1c', '#fb9a99', '#33a02c', '#b2df8a', '#1f78b4', '#a6cee3'],//['#f14950', '#00bcd4', '#c76928', '#0f4b94', '#64E572', '#FF9655', '#FFF263','#6AF9C4'],
                exporting: {
                    buttons: {
                        contextButton: {
                            symbol: 'download',
                            menuItems: [
                                'downloadPNG',
                                'downloadJPEG',
                                'downloadPDF',
                                'downloadSVG'
                            ]
                        }
                    }
                },
                title: {
                    text: ''
                },
                yAxis: { // Primary yAxis
                    title: {
                        text: ''
                    }
                },
                credits: {
                    enabled: false
                }
            });
        }
    };
};