
/* Componentes  Scroll */





/* Tooltip */
var GLOBALCOMPONENTE = GLOBALCOMPONENTE || {};
GLOBALCOMPONENTE.global={};
GLOBALCOMPONENTE.global={
    tooltip:function () {

        $(document).on("mouseenter", ".tooltipDash", function() {
            var e = $(this);
            //var textTool = $(this).text();
            var titleTool = e.attr("data-title");
            e.append("<span class='tooltiptext'>" + titleTool + "</span>");
        });
        $(document).on("mouseleave", ".tooltipDash", function() {
            var e = $(this);
            e.find( "span" ).remove();
        });



        /*

        $(".tooltipDash").hover(function () {
            var e = $(this);
            //var textTool = $(this).text();
            var titleTool = e.attr("data-title");
            e.append("<span class='tooltiptext'>" + titleTool + "</span>");
        }, function () {
            var e = $(this);
            e.find( "span" ).remove();
        });
        */
    },
    menuDesplegable:function (e) {
        $('main > nav').toggle(function() {
            if($(this).is(':hidden')) {
                //$(this).text('This element is hidden.');
            }
            else {
                $(this).css('display','inline-block');
            }
        });
    }
}


/* Ventana */
var VENTANACOMPONENTE = VENTANACOMPONENTE || {};
VENTANACOMPONENTE.event={};
VENTANACOMPONENTE.event={
    maximizar:function(e){
        var altoPantalla = $(window).height();
        var resumentTop = $(".resumen-button-top").height();
        var altoHeader = $("body>header").height();
        var altoVentana = ((altoPantalla-resumentTop)-altoHeader-15) ;
        var altoWidgetComboTools = e.closest("article.ventana").find(".widget-vistaInteractiva-comboToolsBox").height();
        var altoContentTabs = (altoVentana - altoWidgetComboTools);
        var altoHeaderVentana = e.closest("article.ventana").children("header").height() +20;
        e.closest("article.ventana").addClass("col-10-10");
        e.closest("article.ventana").removeClass("col-5-10 margin-bottom-10");
        e.closest("article.ventana").css("height",altoVentana+"px");
        e.closest("article.ventana").children("section").css("height", (altoContentTabs + 10) + "px");
        e.closest("article.ventana").siblings("article").hide();
        e.closest("article.ventana").find(".contentTabs").css("height", (altoContentTabs-altoHeaderVentana) + "px");

        /* Cambio de boton */
        e.addClass('ventanaRestaurar').removeClass('ventanaMaximizar').find('i').text('fullscreen_exit');
    },
    restaurar:function(e){
        var altoPantalla = $(window).height();
        var resumentTop = $(".resumen-button-top").height();
        var altoHeader = $("body>header").height();
        var altoVentana = 480 ;
        var altoWidgetComboTools = e.closest("article.ventana").find(".widget-vistaInteractiva-comboToolsBox").height();
        var altoContentTabs = (altoVentana - altoWidgetComboTools);
        var altoHeaderVentana = e.closest("article.ventana").children("header").height() +20;
        e.closest("article.ventana").addClass("col-5-10 margin-bottom-10");
        e.closest("article.ventana").removeClass("col-10-10");
        e.closest("article.ventana").css("height",altoVentana+"px");
        e.closest("article.ventana").children("section").css("height", (altoVentana ) + "px");
        e.closest("article.ventana").siblings("article").css('display','');
        e.closest("article.ventana").find(".contentTabs").css("height", (altoContentTabs-altoHeaderVentana) + "px");

        /* Cambio de boton */
        e.addClass('ventanaMaximizar').removeClass('ventanaRestaurar').find('i').text('zoom_out_map');
    }


};




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
        App.dashboardVistaChangeEvent( {"jqObject": bloque, "id": bloque.attr("id")},
            {"jqObject": e,"jqObjectSelect": e, "id": e.attr('data-vista')})

    },
    replegarLista: function(e){
        var excluir = $(".contentListaTitulos");
        var excluir2 = $("button.botonDesplegarTitulos");
        var excluir3 = $(".contentComboTitulos");


        if ( !excluir3.is(e.target) && excluir3.has(e.target).length === 0 && !excluir2.is(e.target) && excluir2.has(e.target).length === 0 && !excluir.is(e.target) && excluir.has(e.target).length === 0) {
            $(".widget-vistaInteractiva-comboToolsBox .contentListaTitulos").each(function(){
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
            bloqueVista.push({bloque:bloque,vista:vista});
        });
        return(bloqueVista);
    }

};




$(document).ready(function(){
    /* Iniciar Tooltip */
    GLOBALCOMPONENTE.global.tooltip();

    /* Altos Automaticos */
    var altoPantalla = $(window).height();
    var anchoPatanlla = $(window).width();
    var altoHeader = $("body>header").height();
    var resumentTop = $(".resumen-button-top").height();
    var altoWidgetComboTools = $(".widget-vistaInteractiva-comboToolsBox").height();

    var altoVentana = 480;  //((altoPantalla-resumentTop)- altoHeader -100 )*0.8 ;
    var altoContentTabs = (altoVentana - altoWidgetComboTools)-25 ;

    //alto de contenedor principal sin el header
    $("main").css("height",(altoPantalla - altoHeader)+"px");
    // alto de las ventanas sin resumenes del top
    $("article.ventana > section").css("height", (altoVentana) + "px");
    // alto del contenido de los tabs de las ventanas
    $(".contentTabs").css("height", altoContentTabs + "px");
    // asignando overflow hidden a html.
    $('html').css('overflow','hidden');

    if(anchoPatanlla <= 1280){
        $("#contenedorPrincipalDashIni").removeClass('col-9-10');
    }
    if (anchoPatanlla <= 1080){
        $("article.ventana").addClass('col-10-10');
        $('article.ventana').removeClass('col-5-10');
    }


    /* eventos de ventana */

    $('body').on('click','button.menuResponsive', function() {
        var _this= $(this);
        GLOBALCOMPONENTE.global.menuDesplegable(_this);
    });

    $('body').on('click','button.compartirRedes , button.compartirRedesNav ', function() {
        var _this= $(this);
        _this.find('.contentRedes').toggle();
    });

    $('.ventana').on('click','button.ventanaMaximizar', function() {
        var _this= $(this);

        var bloque =_this.closest('.ventana').attr('id');
        var vista= _this.closest('.ventana').find('.widget-vistaInteractiva-comboToolsBox '+
            '.contentListaTitulos li[data-selected]').attr('data-vista');
        console.log(bloque+' , '+vista);

        VENTANACOMPONENTE.event.maximizar(_this);
        //options={bloque:'bloque1',vista:'vista0'};
        //bloque='bloque1';
        //vista='vista0',

        App.uiMaxCallbackDashBoardEvent(bloque,vista);
        //console.log('maximizado-->',_this);
    });

    $('.ventana').on('click','button.locationInfo', function() {
        $(this).find('div.boxInfoMap').toggle();
    });


    $('.ventana').on('click','button.ventanaRestaurar', function() {
        var _this= $(this);
        var bloque =_this.closest('.ventana').attr('id');
        var vista= _this.closest('.ventana').find('.widget-vistaInteractiva-comboToolsBox '+
            '.contentListaTitulos li[data-selected]').attr('data-vista');
        console.log(bloque+' , '+vista);
        App.uiNormalCallbackDashBoardEvent(bloque,vista);
        VENTANACOMPONENTE.event.restaurar(_this);

    });



    /* eventos de widget */
    COMBOTOOLSBOX.event.crear();

    $(document).on('click', function(e) {
        COMBOTOOLSBOX.event.replegarLista(e);
    });

    $('.widget-vistaInteractiva-comboToolsBox').on('click','.BarraHerramientas > button', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.activarButton(_this);

    });
    /*
    $('.widget-vistaInteractiva-comboToolsBox').on('click','button.botonDesplegarTitulos', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.desplegarLista(_this);
    });
    */
    $(document).on('click','div.contentComboTitulos', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.desplegarListaContent(_this);
    });



    $('.widget-vistaInteractiva-comboToolsBox').on('click','.contentListaTitulos li', function() {
        var _this= $(this);
        COMBOTOOLSBOX.event.seleccionarItem(_this);
    });



    /* Scroll automatico */



    $(document).on("mouseenter", ".contentData", function() {
        var e = $(this);
        //var textTool = $(this).text();
        e.css("overflow-x","auto");
        e.css("overflow-y","auto");
    });
    $(document).on("mouseleave", ".contentData", function() {
        var e = $(this);
        e.css("overflow-x","hidden");
        e.css("overflow-y","hidden");
    });




    /* Responsive  */

    $(window).resize(function(){
        var anchoPatanlla = $("body").width();
        /* Altos Automaticos */
        var altoPantalla = $(window).height();
        //var anchoPatanlla = $(window).width();
        var altoHeader = $("body>header").height();
        var resumentTop = $(".resumen-button-top").height();
        var altoWidgetComboTools = $(".widget-vistaInteractiva-comboToolsBox").height();

        var altoVentana = 480;  //((altoPantalla-resumentTop)- altoHeader -100 )*0.8 ;
        var altoContentTabs = (altoVentana - altoWidgetComboTools)-25 ;

        //alto de contenedor principal sin el header
        $("main").css("height",(altoPantalla - altoHeader)+"px");
        // alto de las ventanas sin resumenes del top
        $("article.ventana > section").css("height", (altoVentana) + "px");
        // alto del contenido de los tabs de las ventanas
        $(".contentTabs").css("height", altoContentTabs + "px");



        if(anchoPatanlla <=1280){
            $("#contenedorPrincipalDashIni").removeClass('col-9-10');
            $("#contenedorPrincipalDashIni").addClass('col-10-10');

        }
        if(anchoPatanlla>1280){
            if($("#contenedorPrincipalDashIni").hasClass('col-9-10')){
            }else{
                $("#contenedorPrincipalDashIni").addClass('col-9-10');
            }
            if($("#contenedorPrincipalDashIni").hasClass('col-10-10')){
                $("#contenedorPrincipalDashIni").removeClass('col-10-10');
            }
        }
        if(anchoPatanlla <=1080){
            $("article.ventana").addClass('col-10-10');
            $("article.ventana").removeClass('col-5-10');
        }
        if(anchoPatanlla>1080){
            if($("article.ventana").hasClass('col-10-10')){
                $("article.ventana").addClass('col-5-10');
                $("article.ventana").removeClass('col-10-10');
            }else{

            }
        }
        //COMBOTOOLSBOX.event.bloqueVista();
        App.uiResizeCallbackDashBoardEvent(COMBOTOOLSBOX.event.bloqueVista(),anchoPatanlla);

    });


});