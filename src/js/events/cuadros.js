(function (service, utils) {
    $(document).ready(function (e) {
        utils.cuadros.init(function () {});

        $("#tabsCategoria").on('click', '.tablaTabButton', function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            utils.cuadros.crearTablaCategoria(categoria);
        });
    });

    $(window).resize(function(){

    });
})(App.service, App.utils);