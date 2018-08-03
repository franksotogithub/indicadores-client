
/* Componentes */

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
        App.dashboardWidgetChangeEvent(
            {"jqObject": bloque, "id": bloque.attr("id")},
            {"jqObject": vista, "id": vista.attr('data-vista')},
            codigoTab);
    },
    desplegarLista: function(e) {
        /* Evento click sobre desplegar  boton de lista  */
        e.parent().children(".contentListaTitulos").toggle();
    },
    seleccionarItem: function(e){
        e.siblings("li").removeAttr("data-selected");
        e.attr("data-selected", "selected");
        var selected = e.text();
        var bloque = e.parents('.ventana');
        e.closest(".contentComboTitulos").children("h5").text(selected);
        e.closest(".contentComboTitulos").children('.contentListaTitulos').toggle();
        App.dashboardVistaChangeEvent( {"jqObject": bloque, "id": bloque.attr("id")},
            {"jqObject": e,"jqObjectSelect": e, "id": e.attr('data-vista')})
    },
    replegarLista: function(e){
        var excluir = $(".contentListaTitulos");
        var excluir2 = $("button.botonDesplegarTitulos");


        if ( !excluir2.is(e.target) && excluir2.has(e.target).length === 0 && !excluir.is(e.target) && excluir.has(e.target).length === 0) {
            $(".widget-vistaInteractiva-comboToolsBox .contentListaTitulos").each(function(){
                if($(this).is(":visible")){
                    console.log("pulsaste afuera y esta abierta una lista");
                    $(this).toggle();
                }
            });
        }
    }

};




$(document).ready(function(){
    /* Altos Automaticos */
    var altoPantalla = $(window).height();
    var anchoPatanlla = $(window).width();
    var resumentTop = $(".resumen-button-top").height();
    var altoVentana = ((altoPantalla-resumentTop)-150)/2 ;
    var altoWidgetComboTools = $(".widget-vistaInteractiva-comboToolsBox").height();
    var altoContentTabs = (altoVentana - altoWidgetComboTools) -20;

    // Alto Nav
    $(".nav-vertical").css("height", (altoPantalla - 50)+"px");
    //alto de contenedor principal sin el header
    $("main").css("height",(altoPantalla - 50)+"px");
    // alto de las ventanas sin resumenes del top
    $("article.ventana > section").css("height", (altoVentana) + "px");
    // alto del contenido de los tabs de las ventanas
    $(".contentTabs").css("height", altoContentTabs + "px");


    COMBOTOOLSBOX.event.crear();

    $(document).on('click', function(e) {
        COMBOTOOLSBOX.event.replegarLista(e);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','.BarraHerramientas > button', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.activarButton(_this);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','button.botonDesplegarTitulos', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.desplegarLista(_this);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','.contentListaTitulos li', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.seleccionarItem(_this);
    });


});