/* Variables globales */

var vAbiertas;
var ultimaMinimizada;


/* asignando altos dinamioos */
var altoVentana = $(window).height();

function altosAutomaticos(){
    var contador;


    $('#id_graficoWidget_top > div').each(function(i,v) {
        contador=i;
    });
    if(contador !== undefined){
        $('.contenedorMetadatos').css({"height":(altoVentana-572)+"px", "overflow":"auto"});
        console.log(contador);
    }else{
        $('.contenedorMetadatos').css({"height":(altoVentana-482)+"px", "overflow":"auto"});
        console.log(contador);
    }

}



/* Exportar graficos */

function exportarGrafico() {

    $(".sliderDiv > div").each(function(){
        if($(this).is(":visible")){

            var chart = $(this).highcharts();
            chart.exportChart({
                type: 'application/pdf',
                filename: 'graficoExportado'
            });
        }
    });

}



/* Imprimir Ventana */

function imprimirVentana(e) {

    maximizarImpresion(e)
    setTimeout(function(){
        window.print();
    }, 1000);

    setTimeout(function(){
        restaurarImpresion(e);
    }, 1100);



}


/* maximizar para imprimir */

/* Maximizar Ventana */

function maximizarImpresion(e){
    ventanasAbiertas();
    console.log("Estoy maximizando");
    var contadorVentanas = vAbiertas;
    if(contadorVentanas[0]==1){

    }else if(contadorVentanas[0]==2){


        var ventanaReconocida =  contadorVentanas[1] - parseInt(e.closest(".contenedorVentana").attr("data-cod"));
        ventanaReconocida = $(".barHerramientasHeader [data-codi="+ventanaReconocida+"]");

        ventanaReconocida.css("display","inline-block");
        ventanaReconocida.find("button").addClass("animacionbtn");


    }else if(contadorVentanas[0]==3){

        //console.log(contadorVentanas[1]);
        var ventanaReconocida =  contadorVentanas[1] - parseInt(e.closest(".contenedorVentana").attr("data-cod"));

        if( ventanaReconocida == 6){
            $(".barHerramientasHeader [data-codi=1]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=5]").css("display","inline-block").find("button").addClass("animacionbtn");
            console.log(ventanaReconocida);
        }else if( ventanaReconocida == 8){
            $(".barHerramientasHeader [data-codi=1]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=7]").css("display","inline-block").find("button").addClass("animacionbtn");

        }else if(ventanaReconocida == 12){
            $(".barHerramientasHeader [data-codi=7]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=5]").css("display","inline-block").find("button").addClass("animacionbtn");
        }

    }
    e.closest(".contenedorVentana").siblings(".contenedorVentana").fadeOut(function () { /* Selecionar los hermanos de la ventana maximizada y ocultarlas */
        e.closest(".contenedorVentana").removeClass("col-4-10 col-35 col-1-4 col-1-2 ").addClass("col-1-1").css("display","block");
    });
    e.closest(".contenedorVentana").css("width","1100px");
    e.parent().children(".maximizar").attr("data-icon","4");
    e.parent().children(".maximizar").attr("data-title","Restaurar ventana");
    e.parent().children(".maximizar").addClass("restaurar").removeClass("maximizar");


    /* Reiniciar tooltip  */
    //Tipped.init();
    //Tipped.create('.tooltip', {size: 'large'});
}


function restaurarImpresion(e) {
    console.log("Estoy resturando");
    //var contadorVentanas = ventanasAbiertas();
    var restaurarVent = vAbiertas[0];
    var reconocerVent = vAbiertas[1];
    console.log(restaurarVent);
    var ventana = e.closest(".contenedorVentana");
    var dataCodevent = ventana.attr("data-codevent");

    if(restaurarVent==1){
        console.log("Restaurar cuaando minimizamos la ultima");
        ventana.css("display","inline-block").addClass("col-1-2").removeClass("col-1-1");
        $(".contenedorVentana[data-cod="+ultimaMinimizada+"]").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4 ").addClass("col-1-2");
        $(".barHerramientasHeader [data-codi="+ultimaMinimizada+"]").hide().find("button").removeClass("animacionbtn");
    }else if (restaurarVent == 2){
        var ventanaReconocida =  reconocerVent - parseInt(ventana.attr("data-cod"));

        ventana.css("display","inline-block").addClass("col-1-2").removeClass("col-1-1");
        $(".contenedorVentana[data-cod="+ventanaReconocida+"]").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4 ").addClass("col-1-2");
        $(".barHerramientasHeader [data-codi="+ventanaReconocida+"]").hide().find("button").removeClass("animacionbtn");
        //console.log("como llegue aqui?  " + restaurarVent);
    }else if(restaurarVent ==3) {

        if (dataCodevent == "mapas") {
            ventana.addClass("col-4-10").removeClass("col-1-1");
        } else if (dataCodevent == "cuadros") {
            ventana.addClass("col-35").removeClass("col-1-1");
        } else if (dataCodevent == "graficos") {
            ventana.addClass("col-1-4").removeClass("col-1-1");
        }
        ventana.css("display", "inline-block");
        ventana.siblings(".contenedorVentana").css("display", "inline-block");

        $(".barHerramientasHeader [data-codi]").hide().find("button").removeClass("animacionbtn");
    }
    e.closest(".contenedorVentana").attr("style","");
    e.closest(".contenedorVentana").css("display","inline-block");
    e.parent().children(".restaurar").attr("data-icon", ">");
    e.parent().children(".restaurar").attr("data-title", "Maximizar ventana");
    e.parent().children(".restaurar").addClass("maximizar").removeClass("restaurar");

    console.log("aplica", 'uiNormalCallback');
    if (App.uiNormalCallback !== undefined) {
        App.uiNormalCallback("cuadros");
    }

    //Tipped.init();
    //Tipped.create('.tooltip', {size: 'large'});
}






/* Alto de ventanas automaticos */

function altoVentanas() {
    var alto = $(window).height();

    alto = alto - 135;
    $(".contenidoMapa").css("height",alto+"px");
    $(".contenidoCuadro").css("height",alto+"px");
    $(".contenidoGrafico").css("height",alto+"px");



}

altoVentanas();

$(window).resize(function () {
    altoVentanas();
});


/* Comprobar Ventanas abiertas */
/* los valores seran los siguientes : v1 = 1; v2=5; v3 = 7  */
function ventanasAbiertas(){
    var contadorVentanas = 0;
    var reconocerVentanas = 0;
    $(".contenedorVentana").each(function(){
        if($(this).is(":visible")){
            contadorVentanas++; /* Contar cuantas ventanas estan abiertas */
            reconocerVentanas = reconocerVentanas + parseInt($(this).attr("data-cod"));  /* Reconocer que ventanas estan abiertas*/

        }
    });

    vAbiertas  =  [contadorVentanas ,reconocerVentanas] ;
    console.log("Contar ventanas : "+vAbiertas);
}


/* Adaptar Ventanas al espacio */

function adaptarVentanas(a,b){ /* Atributo de data codevent , ventana  */
    ventanasAbiertas();

    var contadorVentanas =  vAbiertas;

    if( contadorVentanas[0] == 2){
        b.siblings(".contenedorVentana").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
       //$(".ventanaTabla > section").css("margin-right","10px");
    }else if(contadorVentanas[0] == 1){

        $(".contenedorVentana").each(function(){
            if($(this).is(":visible")){
                $(this).addClass("col-1-1").removeClass("col-4-10 col-35 col-1-4 col-1-2").css("display","block");
            }
        });
    }
}

/* Reabriendo ventanas minimizadas */

function reabrirVentanas(e) {
    ventanasAbiertas();
    console.log("Estoy reabriendo");
    var contadorVentanas = vAbiertas;

    if(contadorVentanas[0]==1){

        var ventanaMini =  e.closest("[data-codi]").attr("data-codi");
        var ventanaReconocidaUl =  $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").attr("data-codevent");

        e.removeClass("animacionbtn").closest("[data-codi]").hide();
        $(".contenedorVentana[data-cod="+ventanaMini+"]").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").find(".restaurar").attr("data-icon", ">").attr("data-title", "Maximizar ventana");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").find(".restaurar").addClass("maximizar").removeClass("restaurar");

        if (App.uiNormalCallback !== undefined) {
            App.uiNormalCallback(ventanaReconocidaUl);
        }

        /* Reiniciar tooltip  */
        //Tipped.init();
        //Tipped.create('.tooltip', {size: 'large'});

    }else if(contadorVentanas[0]==2){
        var ventanaOculta = 13 - parseInt(contadorVentanas[1])
        var ventanaMini =  e.closest("[data-codi]").attr("data-codi");

        e.removeClass("animacionbtn").closest("[data-codi]").hide();
        $(".contenedorVentana").removeClass("col-4-10 col-35 col-1-4 col-1-2");
        $(".ventanaMapa").addClass("col-4-10");
        $(".ventanaTabla").addClass("col-35");
        $(".ventanaGrafico").addClass("col-1-4");
        $(".contenedorVentana").css("display","inline-block");
        App.uiReabrirVentana();
    }
}



/* MInimizar Ventana */
function minimizarVentana(e, callback) {
    console.log("Estoy Minimizando");
    ventanasAbiertas();
    var contadorVentanas = vAbiertas;
    var a = e.closest(".contenedorVentana").attr("data-codevent");
    /* Obteniendo valor para comparacion */
    var b = e.closest(".contenedorVentana");
    /* Seleccionar ventana Padre */


    if (contadorVentanas[0] == 1) {
        console.log("solo hay una ventana abierta");

    }
    else if(contadorVentanas[0]==2){

        var  reconocida = contadorVentanas[1] - parseInt(b.attr("data-cod"));

        var ventanaUltima = $(".contenedorVentana[data-cod='"+reconocida+"']").find(".maximizar");
        var nombreVentanaUl = $(".contenedorVentana[data-cod='"+reconocida+"']").attr("data-codevent");
        ventanaUltima.attr("data-icon","4");
        ventanaUltima.attr("data-title","Restaurar ventana");
        ventanaUltima.addClass("restaurar").removeClass("maximizar");

        e.closest(".contenedorVentana").fadeOut(function(){
            adaptarVentanas(a,b);
            if (callback !== undefined) {
                callback();
            }

            if (App.uiMaxCallback !== undefined) {
                App.uiMaxCallback(nombreVentanaUl);
            }
        });

        $(".barHerramientasHeader .col-1-4").each(function(){ /* Evalua que icono correponde msotrar como minimizado */
            var c = $(this).attr("data-codevent");

            if (a==c){ /* Comparamos si coinciden los data-codevent */
                $(this ).css("display","inline-block");
                $(this ).find("button").addClass("animacionbtn");
                $(this ).find("button").addClass("animacionbtn").css("background-color","#12284c");
                console.log("Encontrado boton minimizado");
            }
        });

        ventanasAbiertas();
        ultimaMinimizada = parseInt( b.attr("data-cod"));
        console.log(vAbiertas);



    }
    else if(contadorVentanas[0]==3) {
        console.log("hay 3 ventnas abiertas y estoy minimizando");
        e.closest(".contenedorVentana").fadeOut(function(){
            adaptarVentanas(a,b);
            if (callback !== undefined) {
                callback();
            }
        });

        $(".barHerramientasHeader .col-1-4").each(function(){ /* Evalua que icono correponde msotrar como minimizado */
            var c = $(this).attr("data-codevent");

            console.log(a);

            if (a==c){ /* Comparamos si coinciden los data-codevent */
                $(this ).css("display","inline-block");
                $(this ).find("button").addClass("animacionbtn");
            }
        });


    }

    App.uiMinimizarVentana(contadorVentanas[0]);
}

/* Maximizar Ventana */

function maximizarVentana(e, callback){
    ventanasAbiertas();
    var contadorVentanas = vAbiertas;
    var ventana = e.closest(".contenedorVentana");
    var dataCodevent = $(ventana).attr('data-codevent');
    if(contadorVentanas[0]==1){

    }else if(contadorVentanas[0]==2){
        var ventanaReconocida =  contadorVentanas[1] - parseInt(ventana.attr("data-cod"));
        ventanaReconocida = $(".barHerramientasHeader [data-codi="+ventanaReconocida+"]");

        ventanaReconocida.css("display","inline-block");
        ventanaReconocida.find("button").addClass("animacionbtn");


    }else if(contadorVentanas[0]==3){

        //console.log(contadorVentanas[1]);
        var ventanaReconocida =  contadorVentanas[1] - parseInt(ventana.attr("data-cod"));

        if( ventanaReconocida == 6){
            $(".barHerramientasHeader [data-codi=1]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=5]").css("display","inline-block").find("button").addClass("animacionbtn");
            console.log(ventanaReconocida);
        }else if( ventanaReconocida == 8){
            $(".barHerramientasHeader [data-codi=1]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=7]").css("display","inline-block").find("button").addClass("animacionbtn");

        }else if(ventanaReconocida == 12){
            $(".barHerramientasHeader [data-codi=7]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=5]").css("display","inline-block").find("button").addClass("animacionbtn");
        }

    }
    e.closest(".contenedorVentana").siblings(".contenedorVentana").fadeOut(function () {
        /* Selecionar los hermanos de la ventana maximizada y ocultarlas */
          e.closest(".contenedorVentana").removeClass("col-4-10 col-35 col-1-4 col-1-2 ").addClass("col-1-1").css("display","block");
    });
    e.attr("data-icon","4");
    e.attr("data-title","Restaurar ventana");
    e.addClass("restaurar").removeClass("maximizar");

    /* Reiniciar tooltip  */
    //Tipped.init();
    //Tipped.create('.tooltip', {size: 'large'});

    if (App.uiMaxCallback!==undefined){
        App.uiMaxCallback(dataCodevent);
    }

    if (callback !== undefined) {
        callback();
    }
}

/* Restaurar Ventana */
function restaurarVentana(e, callback) {
    console.log("Estoy resturando");
    //var contadorVentanas = ventanasAbiertas();
    var restaurarVent = vAbiertas[0];
    var reconocerVent = vAbiertas[1];
    console.log(restaurarVent);
    var ventana = e.closest(".contenedorVentana");
    var dataCodevent = ventana.attr("data-codevent");

    if(restaurarVent==1){
        console.log("Restaurar cuaando minimizamos la ultima");
        ventana.css("display","inline-block").addClass("col-1-2").removeClass("col-1-1");
        $(".contenedorVentana[data-cod="+ultimaMinimizada+"]").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4 ").addClass("col-1-2");
        $(".barHerramientasHeader [data-codi="+ultimaMinimizada+"]").hide().find("button").removeClass("animacionbtn");
    }else if (restaurarVent == 2){
        var ventanaReconocida =  reconocerVent - parseInt(ventana.attr("data-cod"));

        ventana.css("display","inline-block").addClass("col-1-2").removeClass("col-1-1");
        $(".contenedorVentana[data-cod="+ventanaReconocida+"]").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4 ").addClass("col-1-2");
        $(".barHerramientasHeader [data-codi="+ventanaReconocida+"]").hide().find("button").removeClass("animacionbtn");
        //console.log("como llegue aqui?  " + restaurarVent);
    }else if(restaurarVent ==3) {

        console.log("restaurar 3 ventanas");

        if (dataCodevent == "mapas") {
            ventana.addClass("col-4-10").removeClass("col-1-1");
        } else if (dataCodevent == "cuadros") {
            ventana.addClass("col-35").removeClass("col-1-1");
        } else if (dataCodevent == "graficos") {
            ventana.addClass("col-1-4").removeClass("col-1-1");
        }
        ventana.css("display", "inline-block");
        ventana.siblings(".contenedorVentana").css("display", "inline-block");

        $(".barHerramientasHeader [data-codi]").hide().find("button").removeClass("animacionbtn");
    }
    e.attr("data-icon", ">");
    e.attr("data-title", "Maximizar ventana");
    e.addClass("maximizar").removeClass("restaurar");

    if (App.uiNormalCallback!==undefined){
        console.log("restaurar ventanas modulo interno");
        App.uiNormalCallback(dataCodevent);
    }

    if (callback !== undefined) {
        callback();
    }

}

 function sliderGraph (){

    $(".botonesControlGrafico").html("");
    $(".sliderDiv div.graficoElementSlider").each(function (index) {

        if(index==0){
            $(".botonesControlGrafico").append('<button class="btnActiveSlider" data-slider="'+(index+1)+'"> </button>');
            $(this).attr("data-slider",(index+1));

        }else {
            $(".botonesControlGrafico").append('<button data-slider="'+(index+1)+'"> </button>');
            $(this).attr("data-slider",(index+1));
        }
    })    
 }


$(document).ready(function() {
    
    altosAutomaticos();
    sliderGraph ();

    $('.contenedorVentana').on('click','.minimizar', function() {
        minimizarVentana($(this));
    });

    $('.contenedorVentana').on('click','.maximizar', function() {
        maximizarVentana($(this));
    });

    $('.contenedorVentana').on('click','.restaurar', function() {
        restaurarVentana($(this));
    });

    $('.barHerramientasHeader').on('click','button.btnReabrir', function() {
        reabrirVentanas($(this));
    });

    /* Imprimir ventana */

    $('.contenedorVentana').on('click','.imprimir', function() {
        imprimirVentana($(this));
    });

    /* BOton abrir o ocualtar miniMapas */
    $('.contenedorVentana').on('click','.botonDesplegarMapas', function() {
        $( ".esri-ui-bottom-right" ).toggleClass("subirMiniMap");
    });

    $(".buttonFlotanteBusqueda").click(function(){
        $(".buttonFlotanteBusqueda").toggleClass("ocultaBus");
        $(".contenedorInputTablaB").toggleClass("ocultaBus");

    });

    $('.contenedorVentana').on('click','button.tablaTabButton', function() {
        $(this).siblings("button").removeClass("btnTabTabla-activo");
        $(this).addClass("btnTabTabla-activo");

    });

    $(".tooltip").hover(function () {
        var textTool = $(this).text();
        var titleTool = $(this).attr("data-title");



        $(this).html(  textTool + "<span class='tooltiptext'>" + titleTool + "</span>");
    }, function () {
        $(this).find( "span" ).remove();

    });


    $(document).on('mouseover','.popover', function (e) {
        var titleTool = $(this).attr("data-popover");

        $('#contenedorPopover').css({'top':($(this).offset().top - 30)+'px','left':($(this).offset().left - 203)+'px'});
        $('#contenedorPopover').append( "<span class='popovertext'>" + titleTool + "</span>");



        if(App.uiMouseOverTabla!==undefined)
        {App.uiMouseOverTabla();}



        /*App.utils.mapas.descargarMapaEvent(function (resp,error) {


        });*/

    });

    $("#tblindicadores").on('mouseover','th', function (e) {

        var ubigeo = $(this).attr('ubigeo');

        //console.log('html-->',$(this));
        //console.log('titulo ubigeo-->',titleTool);


        //$('#contenedorPopover').css({'top':($(this).offset().top - 30)+'px','left':($(this).offset().left - 203)+'px'});
        //$('#contenedorPopover').append( "<span class='popovertext'>" + titleTool + "</span>");

        console.log('ubigeo-->',ubigeo);

        if(App.uiMouseOverTabla!==undefined)
        {App.uiMouseOverTabla(ubigeo);}



    });


    $(document).on('mouseout','.popover', function (e) {
        $('#contenedorPopover').find( "span" ).remove();


        /*if(App.uiMouseOutTabla!==undefined){
            App.uiMouseOutTabla();
        }*/

    });

    

    $('.botonesControlGrafico').on('click','button', function() {
        var slider = $(this).attr("data-slider");
        $(this).siblings("button").removeClass("btnActiveSlider");
        $(this).addClass("btnActiveSlider");

        $(".sliderDiv [data-slider="+slider+"]").siblings("div").fadeOut();
        $(".sliderDiv [data-slider="+slider+"]").fadeIn();

    });

    $('.tabSubTitulo').on('click','h2', function() {

        $(this).siblings("h2").removeClass("activeSubTabVentana");
        $(this).addClass("activeSubTabVentana");
    });



    $('.contenedorVentana').on('click','.descargarMapa', function() {

        App.utils.mapas.descargarMapaEvent(function (resp,error) {

            /**aqui pones la descarga*/
            window.open(resp.url);


        });


    });

    $('.contenedorBusquedaBotonesUbigeo').on('click','button', function() {
        $(this).remove("button");

    });

   


    $('.contenedorVentana').on('click','.descargarGrafico', function() {

        exportarGrafico()

    });


    $(".dropDownMenu").parent().click(function () {
        $('.dropDownMenu').toggle("slow");
    });



    $('button.button_menuTop').click(function () {
        $('.dropDownMenuTop').toggle("slow");
    });


    $(".dropDownMenuTop div").click(function (e) {
        var href = $(this).attr('data-href');
        window.location = href;
    });

});