(function (service, utils) {
    $(document).ready(function (e) {

        $("#tabsCategoria").on('click', '.tablaTabButton', function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            App.categoriaChangeEvent(categoria);
        });

        $("#comboCategoria").on('click','li',function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            App.categoriaChangeEvent(categoria);
        });

        $("#tblindicadores").on('click', '.popover', function (e) {
            var indicador = $(this).attr('data-indicador');

        });
    });

    $(window).resize(function(){
        utils.cuadros.reiniciarTabla();
    });
})(App.service, App.utils);


