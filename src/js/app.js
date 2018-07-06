var App;
App = (function (scope, config) {

    var uiMax = {
        "mapas": false,
        "cuadros": false,
        "graficos": false
    };

    var _hasUtils = function (_this, callback, options, utils) {
        if (utils === undefined) {
            utils = ['mapas', 'cuadros', 'graficos'];
        }

        for (var i=0;i<utils.length;i++) {
            console.log(_this.utils[utils[i]]);
            if (_this.utils[utils[i]].hasOwnProperty(callback)) {
                _this.utils[utils[i]][callback](options);
            }
        }
    };

    var init = function (vista, ventanas) {
        _hasUtils(this, 'init', {"vista": vista}, ventanas)
    };

    var uiMaxCallback = function (ventana) {
        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = true;
        }
        _hasUtils(this, 'uiMaxCallback', {"ventana": ventana})
    };

    var uiNormalCallback = function (ventana) {

        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = false;
        }
        _hasUtils(this, 'uiNormalCallback', {"ventana": ventana})

    };

    var mapasChangeEvent = function (ubigeo, historico) {
        _hasUtils(this, 'mapasChangeEvent', {"ubigeo": ubigeo, "historico": historico})
    };

    var categoriaChangeEvent = function (categoria) {
        this.categoria = categoria;
        _hasUtils(this, 'categoriaChangeEvent', {"categoria": categoria})
    };

    var indicadorChangeEvent = function (indicador) {
        _hasUtils(this, 'indicadorChangeEvent', {"indicador": indicador})
    };

    var uiReabrirVentana = function () {
        this.utils.cuadros.uiReabrirVentana();
    };

    var uiMinimizarVentana = function (inicial) {
        if (inicial == 3) {
            this.utils.cuadros.expardirVentana = true;
        }
    };

    var descargarMapaEvent = function () {
        if (this.utils.mapas.descargarMapaEvent !== undefined) {
            return this.utils.mapas.descargarMapaEvent();
        }else {
            console.log("no existe el metodo en descargarMapaEvent");
            return null;
        }
    };

    var uiMouseOverTabla = function (ubigeo) {
        _hasUtils(this, 'uiMouseOverTabla', {"ubigeo":ubigeo})
    }

    var uiMouseOutTabla = function () {
        _hasUtils(this, 'uiMouseOutTabla', {})
    }


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

    }
})(window, AppConfig());