App.events.cuadros = function (service, utils) {
    var selector = {
        ponderador: "html #comboPonderador",
    };

    var ponderadorChange = function (callack) {
        $(selector.ponderador).on("change",function(e){
            var valor = $(this).val();
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

            callack(valor);
        });
    };

    var categoriaChange = function (callback) {
        // web
        $("#tabsCategoria").on('click', '.tablaTabButton', function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            callback(categoria);

        });

        // movil
        $("#comboCategoria").on('click','li',function (e) {
            var categoria = $.trim($(this).attr('data-categoria'));
            callback(categoria);
        });
    };

    var popoverShow = function (callback) {
        $("#tblindicadores").on('click', '.popover', function (e) {
            var indicador = $(this).attr('data-indicador');
            $(".messageContentEmpty").hide();
            $(".cDatosTotal").show();
            callback(indicador);
        });
    };

    var indicadoresSearchAutocomplete = function (callack) {
        $(".inputTextBusqueda").autocomplete({
            serviceUrl: service.getUrlServer(
                service.url('dimensiones/tematico/autocomplete/?category={0}', [utils.cuadros.cuadrosData.categoria])
            ),
            onSelect: function (response) {
                callack(response);
            },
            width: 'flex'
        });
    };

    var centropobladosagrupadosShow = function () {
        $('body').on('click', '.thtitulo', function (e) {
            var tiene_hijos = $(this).attr('data-tienehijos');
            var ubigeo = $(this).attr('data-ubigeo');
            if (tiene_hijos == '1') {
                var hijos = service.cuadros.indicadores_hijos[ubigeo]['hijos'];
                var li = '';
                $.each(hijos, function (i,v) {
                    li += '<div class="contenidoGeneralCentros">'+v+'</div>';
                });
                $("#plantilla_modal_grupo div").html(li);
                var html = $("#plantilla_modal_grupo").html();
                $(".modalGeneral .contenedorModalInfo").html(html);

                if($(".modalGeneral .contenedorMetadatoModal ").length > 0){
                    $(".modalCentro").css("height","auto");
                }else{
                    $(".modalCentro").css("height","60%");
                }
                $(".modalGeneral").show();

            }

        });
    };

    // Event Call
    $(document).ready(function (e) {

        ponderadorChange(function (valor) {
            utils.cuadros.categoriaChangeEvent({"categoria": valor});
            utils.mapas.categoriaChangeEvent({"categoria": valor});
        });

        categoriaChange(function (categoria) {
            App.categoriaChangeEvent(categoria);
        });


        popoverShow(function (indicador) {
            utils.cuadros.changeMetadata(indicador);
        });

        indicadoresSearchAutocomplete(function (response) {
            App.utils.cuadros.buscadorIndicadores(response);
        });

        centropobladosagrupadosShow();
    });

    $(window).resize(function(){
        //utils.cuadros.reiniciarTabla();
        utils.cuadros.fixedColumnsRelayout();
    });
};


