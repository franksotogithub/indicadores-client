var App;
App = (function (scope, config) {
    var init = function () {

    };

    var uiMaxCallback = function (ventana) {
        if (App.utils.mapas.uiMaxCallback!==undefined) {
            App.utils.mapas.uiMaxCallback();
        }

        if (App.utils.cuadros.uiMaxCallback!==undefined) {
            App.utils.cuadros.uiMaxCallback();
        }

        if (App.utils.graficos.uiMaxCallback!==undefined) {
            App.utils.graficos.uiMaxCallback();
        }

    };



    return {
        ambito: 'nacional',
        categoria: 'P01',
        ubigeo: '00',
        uiMaxCallback: uiMaxCallback,
        /* Metodos */
        init: init
    }
})(window, AppConfig());