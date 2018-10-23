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
            $(".messageContentEmpty").hide();
            $(".cDatosTotal").show();
            utils.cuadros.changeMetadata(indicador);
        });

        $(".inputTextBusqueda").autocomplete({
            serviceUrl: service.getUrlServer('dimensiones/tematico/autocomplete/'),
            onSelect: function (response) {
                App.utils.cuadros.buscadorIndicadores(response);
            }

        });
    });

    $(window).resize(function(){
        //utils.cuadros.reiniciarTabla();
        utils.cuadros.fixedColumnsRelayout();
    });
})(App.service, App.utils);


