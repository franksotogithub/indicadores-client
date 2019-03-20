(function (service, utils) {
    $(document).ready(function (e) {

        $("html #comboPonderador").on("change",function(){
                var valor = this.value;
                var tipo = $(this).find('option:selected').attr('data-tipo');
                if (tipo == 'total') {
                    $("#tabsCategoria > button").hide();
                    $("#tabsCategoria > button[data-categoria='"+valor+"']").show();
                }else {
                    $("#tabsCategoria > button").show();
                    $("#tabsCategoria > button[data-categoria='"+tipo+"']").hide();
                }

                $("#tabsCategoria > button").removeClass("btnTabTabla-activo");
                $("#tabsCategoria > button[data-categoria='"+valor+"']").addClass("btnTabTabla-activo");
                utils.cuadros.categoriaChangeEvent({"categoria": valor});
                utils.mapas.categoriaChangeEvent({"categoria": valor});
            });

        $("#tabsCategoria").on('click', '.tablaTabButton', function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            App.categoriaChangeEvent(categoria);
            /*if( categoria === "P01" || categoria === "P02" || categoria === "P03" ){
                $(".selectCuadros").show();
            }else {
                $(".selectCuadros").hide();
            }*/
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


