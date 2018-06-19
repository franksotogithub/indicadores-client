var App;
App = (function (scope, config) {
    var init = function () {

    };

    var uiMaxCallback = function (ventana) {
        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = true;
        }
        if (this.utils.mapas.uiMaxCallback!==undefined) {
            this.utils.mapas.uiMaxCallback();
        }

        if (this.utils.cuadros.uiMaxCallback!==undefined) {
            this.utils.cuadros.uiMaxCallback();
        }

        if (this.utils.graficos.uiMaxCallback!==undefined) {
            this.utils.graficos.uiMaxCallback();
        }

    };

    var uiNormalCallback = function (ventana) {
        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = false;
        }
        if (this.utils.mapas.uiNormalCallback!==undefined) {
            this.utils.mapas.uiNormalCallback();
        }

        if (this.utils.cuadros.uiNormalCallback!==undefined) {
            this.utils.cuadros.uiNormalCallback();
        }

        if (this.utils.graficos.uiNormalCallback!==undefined) {
            this.utils.graficos.uiNormalCallback();
        }

    };

    var uiMax = {
        "mapas": false,
        "cuadros": false,
        "graficos": false
    };

    return {
        ambito: 'nacional',
        categoria: 'P01',
        ubigeo: '00',
        uiMax: uiMax,
        uiMaxCallback: uiMaxCallback,
        uiNormalCallback: uiNormalCallback,
        /* Metodos */
        init: init
    }
})(window, AppConfig());