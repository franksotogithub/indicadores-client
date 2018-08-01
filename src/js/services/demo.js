App.service.demo = (function (parent, config) {
    var init = function () {
        parent.get({
            url: parent.getUrlServer('indicadores/tabla/', {"u": ubigeos, "vista": [vista]}),
            success: function (data) {
                console.log();
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        });
    };



    return {
        init: init
    }
})(App.service, AppConfig());