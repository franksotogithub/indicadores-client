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
            _hasUtils(app, 'init', {"vista": vista}, ventanas);
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
    var _hasUtils = function (_this, callback, options, utils) {
        if (utils === undefined) {
            utils = ['mapas', 'cuadros', 'graficos'];
        }

        for (var i=0;i<utils.length;i++) {
            if (_this.utils[utils[i]].hasOwnProperty(callback)) {
                _this.utils[utils[i]][callback](options);
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
                    console.log("error al extraer el config");
                }
            });
        }
    };

    /**
     * Evento general de UI que se ejecuta al maximizar una de las ventanas de la aplicación
     * @param ventana
     */
    var uiMaxCallback = function (ventana) {
        this.utils.cuadros.expardirVentana = true;
        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = true;
            _hasUtils(this, 'uiMaxCallback', {"ventana": ventana}, [ventana]);
        }

    };

    /**
     * Evento general de UI que se ejecuta al Restaurar una ventana de la aplicación
     * @param ventana
     */
    var uiNormalCallback = function (ventana) {

        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax = uiMax;
        }
        _hasUtils(this, 'uiNormalCallback', {"ventana": ventana});

    };

    var uiReabrirVentana = function () {
        this.utils.cuadros.uiReabrirVentana();
    };

    var uiMinimizarVentana = function (inicial) {
        if (inicial == 3) {
            this.utils.cuadros.expardirVentana = true;
        }

        _hasUtils(this, 'uiMinimizarVentana', {"inicial": inicial});
    };

    var uiMouseOverTabla = function (ubigeo) {
        _hasUtils(this, 'uiMouseOverTabla', {"ubigeo":ubigeo});
    };

    var uiMouseOutTabla = function () {
        _hasUtils(this, 'uiMouseOutTabla', {});
    };

    /**
     * Evento se ejecuta al elegir o cambiar una ubicación del mapa en el que esta situado.
     * Ejemplo: al dar click en lima se ejecutara este evento
     * @param ubigeo
     * @param historico
     */
    var mapasChangeEvent = function (options) {
        _hasUtils(this, 'mapasChangeEvent', options);
    };

    /**
     *
     * @returns {null} or
     */
    var descargarMapaEvent = function () {
        if (this.utils.mapas.descargarMapaEvent !== undefined) {
            return this.utils.mapas.descargarMapaEvent();
        }else {
            console.log("no existe el metodo en descargarMapaEvent");
            return null;
        }
    };

    /**
     * Evento de Cuadros se ejecuta al cambiar de categoria
     * @param categoria
     */
    var categoriaChangeEvent = function (categoria) {
        this.categoria = categoria;
        _hasUtils(this, 'categoriaChangeEvent', {"categoria": categoria});
    };

    /**
     * Evento se ejecuta al cambiar o elegir un indicador, delega a los modulos si existe dicha funcion
     * @param indicador
     */
    var indicadorChangeEvent = function (indicador) {
        _hasUtils(this, 'indicadorChangeEvent', {"indicador": indicador});
    };

    var dashboardWidgetChangeEvent = function (bloque, vista, seleccion) {
        _hasUtils(this, 'dashboardWidgetChangeEvent', {"bloque": bloque, "vista": vista, "seleccion": seleccion}, ['dashboard', 'mapasDashBoard']);
    };

    var dashboardVistaChangeEvent = function (bloque, vista, seleccion) {
        _hasUtils(this, 'dashboardVistaChangeEvent', {"bloque": bloque, "vista": vista}, ['dashboard', 'mapasDashBoard']);
    };

    /**
     * Maximizar ventana de dashboard
     */
    var uiMaxCallbackDashBoardEvent= function (bloque,vista) {
        _hasUtils(this, 'uiMaxCallbackDashBoardEvent', {"bloque": bloque , "vista": vista}, ['dashboard', 'mapasDashBoard']);
    };

    /**
     * Restaurar ventana de dashboard
     */
    var uiNormalCallbackDashBoardEvent= function (bloque,vista) {
        _hasUtils(this, 'uiNormalCallbackDashBoardEvent', {"bloque": bloque , "vista": vista}, ['dashboard', 'mapasDashBoard']);
    }
    var uiResizeCallbackDashBoardEvent= function (list,anchoPatanlla) {
        _hasUtils(this, 'uiResizeCallbackDashBoardEvent', {"list": list,"anchoPantalla":anchoPatanlla}, ['dashboard', 'mapasDashBoard']);
    }

    /**
     * Funcion para invocar los graficos para el popup del
     * */
    var getContenidoPopupMapaEvent = function (ubigeo,codTematico,callback) {
        _hasUtils(this,'getContenidoPopupMapaEvent',{"ubigeo" : ubigeo,"codTematico" : codTematico,"callback" :callback});
    };

    return {
        ambito: 'nacional',
        categoria: '01',
        ubigeo: '00',
        uiMax: uiMax,
        appData: {},
        init: init,
        getAppData: getAppData,
        uiMaxCallback: uiMaxCallback,
        uiNormalCallback: uiNormalCallback,
        mapasChangeEvent: mapasChangeEvent,
        categoriaChangeEvent: categoriaChangeEvent,
        indicadorChangeEvent: indicadorChangeEvent,
        descargarMapaEvent: descargarMapaEvent,
        uiReabrirVentana: uiReabrirVentana,
        uiMinimizarVentana: uiMinimizarVentana,
        uiMouseOverTabla : uiMouseOverTabla,
        uiMouseOutTabla : uiMouseOutTabla,
        dashboardWidgetChangeEvent: dashboardWidgetChangeEvent,
        dashboardVistaChangeEvent: dashboardVistaChangeEvent,
        uiMaxCallbackDashBoardEvent: uiMaxCallbackDashBoardEvent,
        uiNormalCallbackDashBoardEvent:uiNormalCallbackDashBoardEvent,
        uiResizeCallbackDashBoardEvent:uiResizeCallbackDashBoardEvent,
        getContenidoPopupMapaEvent: getContenidoPopupMapaEvent,

    };
})(window, AppConfig(), Appdata);