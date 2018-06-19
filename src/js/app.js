var App;
App = (function (scope, config) {
    var init = function () {

    };

    var _hasUtils = function (_this, callback, options) {
        var utils = ['mapas', 'cuadros', 'graficos'];
        for (var i=0;i<utils.length;i++) {
            console.log(_this.utils[utils[i]]);
            if (_this.utils[utils[i]].hasOwnProperty(callback)) {
                console.log("ingresa", utils[i])
                _this.utils[utils[i]][callback](options);
            }
        }
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

    var uiMax = {
        "mapas": false,
        "cuadros": false,
        "graficos": false
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
        indicadorChangeEvent: indicadorChangeEvent
    }
})(window, AppConfig());