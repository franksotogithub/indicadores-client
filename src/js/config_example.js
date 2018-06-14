var AppConfig = function () {
    return {
        urlServer: "http://127.0.0.1:8045/",

        map_config:
            { 'POB': { urlMap:"http://192.168.202.86:6080/arcgis/rest/services/RESULTADO_CPV/RESULTADO_POBLACION_1/MapServer" , cod_tematico_default:"P010100"  }},

        utils:{
            print:"http://192.168.202.84:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
        }
    }
};