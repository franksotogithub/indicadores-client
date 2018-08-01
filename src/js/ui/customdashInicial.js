
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
    },
    desplegarLista: function(e) {
        /* Evento click sobre desplegar  boton de lista  */
        e.parent().children(".contentListaTitulos").toggle();
    },
    seleccionarItem: function(e){
        e.siblings("li").removeAttr("data-selected");
        e.attr("data-selected", "selected");
        var selected = e.text();
        console.log(selected0);
        e.closest(".contentComboTitulos").children("h5").text(selected);
        e.closest(".contentComboTitulos").children('.contentListaTitulos').toggle();

    }

};




$(document).ready(function(){
    COMBOTOOLSBOX.event.crear();

    $('.widget-vistaInteractiva-comboToolsBox').on('click','.BarraHerramientas > button', function() {
        var objeto= $(this);
        COMBOTOOLSBOX.event.activarButton(objeto);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','button.botonDesplegarTitulos', function() {
        var objeto= $(this);
        COMBOTOOLSBOX.event.desplegarLista(objeto);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','.contentListaTitulos li', function() {
        var objeto= $(this);
        COMBOTOOLSBOX.event.seleccionarItem(objeto);
    });
});