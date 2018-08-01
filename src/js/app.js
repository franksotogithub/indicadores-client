/**
 * @namespace App
 * @requires {@link AppConfig}
 * @version 0.1.0
 */
var App = (function (scope, config) {

    var uiMax = {
        "mapas": false,
        "cuadros": false,
        "graficos": false
    };

    /**
     * Constructor inicializa la aplicación, busca si existe el metodo init en los utils de cada modulo
     * @function init
     * @memberof! App
     * @param {string} vista
     * @param {Array} ventanas
     * @example
     * App.init('indicadores', ['mapas', 'cuadros', 'graficos'])
     */
    var init = function (vista, ventanas) {
        _hasUtils(this, 'init', {"vista": vista}, ventanas);
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
    var mapasChangeEvent = function (ubigeo, historico) {
        _hasUtils(this, 'mapasChangeEvent', {"ubigeo": ubigeo, "historico": historico});
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


    return {
        ambito: 'nacional',
        categoria: 'P01',
        ubigeo: '00',
        uiMax: uiMax,
        init: init,
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

    };
})(window, AppConfig());