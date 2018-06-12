App.service.cuadros = (function (parent, config) {

    var getNacional = function (callback) {
        parent.get({
            url: parent.getUrlServer('indicadores/'),
            success: function (data) {
                this.nacional = data;
                callback(data);
            },

            error: function (obj, status, otherr) {
                parent.responseError(obj, "No existe datos a nivel Nacional");
            }
        })
    };

    return {
        nacional: undefined,
        getNacional: getNacional
    }
})(App.service, AppConfig());