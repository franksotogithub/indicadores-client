/**
 * App es el namespace principal de la aplicación, a partir de este se extendera los modulos
 * @namespace App
 * @requires js/config:AppConfig
 * @requires js/data.js:Appdata
 * @version 0.1.0
 */
var App = (function (scope, config, appData) {
    /**
     * fixme: Variable para controlar el maximizado de ventana (deberia ser manejado por una una modulo UI)
     * @type {{mapas: boolean, cuadros: boolean, graficos: boolean}}
     */
    var uiMax = {
        "mapas": false,
        "cuadros": false,
        "graficos": false
    };

    /**
     * Constructor inicializa la aplicación, busca si existe el metodo init en los utils de cada modulo
     * @function init
     * @memberof App
     * @param {string} vista
     * @param {Array} ventanas
     * @example
     * App.init('indicadores', ['mapas', 'cuadros', 'graficos'])
     */
    var init = function (vista, ventanas) {
        // Config
        var _this = this;
        appData(vista, function (app, datos) {
            _this.appData = datos;
            config.highchart();
            app.hasUtils('init', {"vista": vista}, ventanas);
        }, false);

    };

    /**
     * Es un switch busca si un metodo existe en 1 o mas utils e invoca a dicho metodo.
     * Esta funcion solo se invoca dentro de APP
     * @param _this - referencia a APP u otro objeto
     * @param callback - referecia al metodo buscado en los modulos
     * @param options - parametro que se enviara a los metodos
     * @param utils
     * @example
     * _hasUtils(this, 'init', {"vista": vista}, ventanas)
     */
    var hasUtils = function (callback, options, utils) {
        if (utils === undefined) {
            utils = ['mapas', 'cuadros', 'graficos'];
        }

        for (var i=0;i<utils.length;i++) {
            if (this.utils[utils[i]].hasOwnProperty(callback)) {
                this.utils[utils[i]][callback](options);
            }
        }
    };

    var getAppData = function (url, datos, callback, es_local) {;
        if (es_local) {
            //return this.service.get({url: url}, true);
            return this.appData;
        }
        else {
            var app = this;
            this.service.get({
                url: this.service.getUrlServer(url),
                success: function (data) {
                    for (var k in datos) {
                        data[k] = datos[k];
                    }
                    app.service.save(url, data);
                    callback(app, data);
                },
                error: function () {
                    console.log("no hay servicio remoto solo local");
                    app.service.save(url, datos);
                    callback(app, datos);
                }
            });
        }
    };


    return {
        ambito: 'nacional',
        categoria: '01',
        ubigeo: '00',
        uiMax: uiMax,
        appData: {},
        events: {},
        init: init,
        hasUtils: hasUtils,
        getAppData: getAppData
    };
})(window, AppConfig(), Appdata);