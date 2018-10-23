/* ComboTitulo con Barra de herramientas */
var COMBOTOOLSBOX = COMBOTOOLSBOX || {};
COMBOTOOLSBOX.event = {};
COMBOTOOLSBOX.event = {
    crear: function(){
        $('.widget-vistaInteractiva-comboToolsBox .contentListaTitulos li').each(function(){
            var dataSelected = $(this).attr("data-selected");
            if(dataSelected=="selected"){

                var selected = $(this).text();
                $(this).closest(".widget-vistaInteractiva-comboToolsBox").find(".contentComboTitulos h5").text(selected);
                //$('.widget-vistaInteractiva-comboToolsBox .contentComboTitulos h5').text(selected);
            }
        });

        $('.widget-vistaInteractiva-comboToolsBox .BarraHerramientas button.activeButton').each(function(){
            var dataClass = $(this).attr("class");
            if(dataClass=="activeButton"){

                var buttonCod = $(this).attr("data-buttonCod");
                $(this).closest(".widget-vistaInteractiva-comboToolsBox").parent().find(".contentTabs div.contentData").each(function(){
                    //console.log(buttonCod);
                });
            }
        });
    },
    activarButton: function(e){
        /* Evento cambiar de tab (botones de barra de herramientas) */
        var codigoTab= e.attr("data-buttonCod");

        var contenedorVentanas = e.closest(".widget-vistaInteractiva-comboToolsBox").parent().find(".contentTabs");
        e.siblings("button").removeClass("activeButton");
        e.addClass("activeButton");

        contenedorVentanas.children(".contentData[data-buttonCod="+codigoTab+"]").siblings("div").hide();
        contenedorVentanas.children(".contentData[data-buttonCod="+codigoTab+"]").show();
        var bloque = e.parents('.ventana');
        var vista = $(bloque).find('.contentListaTitulos li[data-selected="selected"]');
        /*App.dashboardWidgetChangeEvent(
            {"jqObject": bloque, "id": bloque.attr("id")},
            {"jqObject": vista, "id": vista.attr('data-vista')},
            codigoTab);*/
    },
    desplegarLista: function(e) {
        /* Evento click sobre desplegar  boton de lista  */
        e.parent().children(".contentListaTitulos").toggle();
    },
    desplegarListaContent: function(e) {
        /* Evento click sobre desplegar  boton de lista  */

        e.find(".contentListaTitulos").toggle();
    },

    seleccionarItem: function(e){
        e.siblings("li").removeAttr("data-selected");
        e.attr("data-selected", "selected");
        var selected = e.text();
        var bloque = e.parents('.ventana');
        e.closest(".contentComboTitulos").children("h5").text(selected);
        e.closest(".contentComboTitulos").find('.contentListaTitulos').toggle(function () {
            console.log("cerrar lista .....");
        });
        /*App.dashboardVistaChangeEvent( {"jqObject": bloque, "id": bloque.attr("id")},
            {"jqObject": e,"jqObjectSelect": e, "id": e.attr('data-vista')})*/

    },
    replegarLista: function(e){
        var excluir = $(".contentListaTitulos");
        var excluir2 = $("button.botonDesplegarTitulos");
        var excluir3 = $(".contentComboTitulos");

        if ( !excluir3.is(e.target) && excluir3.has(e.target).length === 0 && !excluir2.is(e.target) && excluir2.has(e.target).length === 0 && !excluir.is(e.target) && excluir.has(e.target).length === 0) {
            $(".contentListaTitulos").each(function(){
                if($(this).is(":visible")){
                    console.log("pulsaste afuera y esta abierta una lista");
                    $(this).toggle();
                }
            });
        }
    },
    bloqueVista: function () {
        //var bloqueVista= {};
        var bloqueVista= [];
        $('article.ventana').each(function (i) {
            var bloque = $(this).attr('id');
            var vista = $(this).find('.widget-vistaInteractiva-comboToolsBox ' +
                '.contentListaTitulos li[data-selected]').attr('data-vista');
            /*bloqueVista.push({bloque:bloque,vista:vista});*/
        });
        return(bloqueVista);
    }

};


$(document).ready(function () {
    var altoVentana = $(window).height();
    $(document).on('click','.widget-NavegacionBar > div button.botonNavegar', function() {
        var _this= $(this);
        var ventana = _this.attr('data-codevent');
        _this.addClass('active').siblings('button').removeClass('active');

            var infoGrapf = _this.attr('data-disc');
            if(infoGrapf == "graph"){
                $("#id_graficoWidget_top").removeClass("off").addClass("on");
                $("#contenedor_grafico").removeClass("off").addClass("onInline");
                $(".widgetMetadatos").removeClass("on").addClass("off");
                $('div.contenedorVentana[data-codevent='+ventana+']').removeClass("off").addClass("on").siblings('div' +
                    '.contenedorVentana').removeClass("on").addClass("off");

            }else {
                $("#id_graficoWidget_top").removeClass("on").addClass("off");
                $("#contenedor_grafico").removeClass("onInline").addClass("off");
                $(".widgetMetadatos").removeClass("off").addClass("on");
                $('div.contenedorVentana[data-codevent='+ventana+']').removeClass("off").addClass("on").siblings('div' +
                    '.contenedorVentana').removeClass("on").addClass("off");

                App.utils.cuadros.reloadTablaResponsive();
            }
    });




    $('section.block').css('height',(altoVentana-60)+'px');


    $(document).on('click','div.contentComboTitulos', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.desplegarListaContent(_this);
    });



    $(document).on('click','.contentListaTitulos li', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.seleccionarItem(_this);
    });

    $(document).on('click', function(e) {
        COMBOTOOLSBOX.event.replegarLista(e);
    });
    $(document).on('click','.botonSim', function(e) {
        var _this = $(this);
        var buscador = _this.find('.contentBuscadorUbigeoResponsive');


        var excluir = buscador;


        if ( !excluir.is(e.target) && excluir.has(e.target).length === 0) {
            console.log("aqui no puede entrar");
            if(buscador.is(":visible")){
                console.log("estas abierto");
                buscador.toggle();
            }else{
                buscador.toggle();
            }

        }else{
            console.log("No abrira ");

        }


    });

});