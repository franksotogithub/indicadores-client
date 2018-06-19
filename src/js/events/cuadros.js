(function (service, utils) {
    $(document).ready(function (e) {
        utils.cuadros.init(function () {});

        $("#tabsCategoria").on('click', '.tablaTabButton', function (e) {
            App.categoria = $.trim($(this).attr('data-categoria'));
        });
    });

    $(window).resize(function(){

    });
})(App.service, App.utils);