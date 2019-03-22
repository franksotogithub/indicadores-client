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

    var altoWin = $(window).height();

    if($(window).width() > 1281){
        if(contador !== undefined){
            $('.contenedorMetadatos').css({"height":(altoVentana-562)+"px", "overflow":"auto"});
            //console.log(contador);
        }else{
            //$('.contenedorMetadatos').css({"height":(altoVentana-482)+"px", "overflow":"auto"});
            $('.contenedorMetadatos').css({"height":(altoVentana-562)+"px", "overflow":"auto"});
            //console.log(contador);
        }
    }else{
        $('.contenedorMetadatos').css({"height":(altoWin-190)+"px", "overflow":"auto"});
    }


}

/* Intro de la ayuda PC */
function startIntro(){
    intro = introJs();
    intro.setOptions({
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        skipLabel: 'Saltar',
        doneLabel: 'Hecho'
    });
    intro.start();
}

/* Intro de la ayuda Movil */

function startIntroMovil(){
    var intro = introJs();
    intro.setOptions({
        nextLabel: 'Siguiente',
        prevLabel: 'Anterior',
        skipLabel: 'Saltar',
        doneLabel: 'Hecho',
        steps: [
            {
                intro: "Esta es una guia rápida, el mapa que ves debajo es un mapa interactivo puedes navegar en el con dos toques, al hacerlo la información mostrada sera del lugar del peru donde hayas ingresado en el mapa.  "
            },
            {
                element: document.querySelectorAll('.botonSim')[0],
                intro: "Al hacer un toque aqui, veras un cuadro de busqueda y podras buscar por departamento ó hasta un centro poblado, esto es como entrar por el mapa de manera mas sencilla."
            },
            {
                element: document.querySelectorAll('.contentComboTitulos')[0],
                intro: "La informacion  a mostrar esta dividida en categorias, al cambiar la categoria veras la información con respecto a la categoria seleccionada",
                position: 'right'
            },
            {
                element: document.querySelectorAll('.blockNavegacion')[0],
                intro: "Estos botones te permiten ver las secciones: Mapa, Gráficos e Indicadores respectivamente",
                position: 'right'
            }
        ]
    });
    intro.start();
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
        App.utils.cuadros.fixedColumnsRelayout();
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
    var ancho = $(window).width();

    var contador;

    /* Verificar si existen botonResumen */
    $('#id_graficoWidget_top > div').each(function(i,v) {
        contador=i;
    });

    /* Si es menor a 1281 se tiene que ocupar pantalla completa */
    if(ancho < 1281){
        alto = alto -48;
    } else {
        alto = alto - 135;
    }


    $(".contenidoMapa").css("height",alto+"px");
    $(".contenidoCuadro").css("height",alto+"px");
    $(".contenidoGrafico").css("height",alto+"px");



    if($(window).width() > 1281 ){

        $('*').removeClass("off");
        $('*').removeClass("on");
        $('*').removeClass("onInline");


        if(contador !== undefined){
            $('.contenedorMetadatos').css({"height":(alto-432)+"px", "overflow":"auto"});
            //console.log(contador);
        }else{
            //$('.contenedorMetadatos').css({"height":(altoVentana-482)+"px", "overflow":"auto"});
            $('.contenedorMetadatos').css({"height":(alto-432)+"px", "overflow":"auto"});
            //console.log(contador);

        }


    }else {
        $(".contenedorVentana").css("display", " ");
        //$(".contenedorMetadatos").css("height",(alto - 540) +"px" );
        $('.contenedorMetadatos').css({"height":(alto-150)+"px", "overflow":"auto"});
    }





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
    var a = e.closest(".contenedorVentana").attr("data-codevent"); // trae nombre de la ventana
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
            }else {
                if (App.uiMinimizarVentana !== undefined) {
                    App.uiMinimizarVentana(contadorVentanas[0]);
                }
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
                console.log(">>>> contadorVentanas 3")
            }else {
                if (App.uiMinimizarVentana !== undefined) {
                    App.uiMinimizarVentana(contadorVentanas[0]);
                }
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
}

/* Maximizar Ventana */

function maximizarVentana(e, callback){
    ventanasAbiertas();
    var contadorVentanas = vAbiertas;
    var ventana = e.closest(".contenedorVentana");
    var dataCodevent = $(ventana).attr('data-codevent');

    if(contadorVentanas[0]==1){

    }
    else if(contadorVentanas[0]==2){
        var ventanaReconocida =  contadorVentanas[1] - parseInt(ventana.attr("data-cod"));
        ventanaReconocida = $(".barHerramientasHeader [data-codi="+ventanaReconocida+"]");

        ventanaReconocida.css("display","inline-block");
        ventanaReconocida.find("button").addClass("animacionbtn");


    }
    else if(contadorVentanas[0]==3){

        //console.log(contadorVentanas[1]);
        var ventanaReconocida =  contadorVentanas[1] - parseInt(ventana.attr("data-cod"));

        if( ventanaReconocida == 6){
            $(".barHerramientasHeader [data-codi=1]").css("display","inline-block").find("button").addClass("animacionbtn");
            $(".barHerramientasHeader [data-codi=5]").css("display","inline-block").find("button").addClass("animacionbtn");
            console.log(">>>ventanaReconocida", ventanaReconocida);
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
          console.log("finalizar fadeOut");
            if (App.uiMaxCallback!==undefined){
                App.uiMaxCallback(dataCodevent);
            }

            if (callback !== undefined) {
                callback();
            }
    });
    e.attr("data-icon","4");
    e.attr("data-title","Restaurar ventana");
    e.addClass("restaurar").removeClass("maximizar");

    /* Reiniciar tooltip  */
    //Tipped.init();
    //Tipped.create('.tooltip', {size: 'large'});



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
    console.log("prueba control");
    var cantidad = $(".sliderDiv div.graficoElementSlider").length;

    if(cantidad > 1){
        $(".sliderDiv div.graficoElementSlider").each(function (index) {

            if(index==0){
                $(".botonesControlGrafico").append('<button class="btnActiveSlider" data-slider="'+(index+1)+'"> </button>');
                $(this).attr("data-slider",(index+1)).show();
                console.log("donde estas?");

            }else {
                $(".botonesControlGrafico").append('<button data-slider="'+(index+1)+'"> </button>');
                $(this).attr("data-slider",(index+1));
            }
        })
    }else {

        $(".sliderDiv div.graficoElementSlider").show();
    }



 }


$(document).ready(function() {
    
    altosAutomaticos();
    //sliderGraph ();






    $(document).on('click','#contentPanel .headerToolMap > button', function() {
        var dataSelect= $(this).attr('data-select');
        $('#contentPanel .headerToolMap > button').removeClass('active');
        $(this).addClass('active');
        var divMostrar = $(this).closest('#contentPanel').find('div.contentTabsBotonesMapa > div[data-select='+dataSelect+']');

        divMostrar.siblings().hide();
        divMostrar.show();
    });


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

        if($(this).find(".dripicons-chevron-up").length>0){
            $(this).find(".dripicons-chevron-up").addClass("dripicons-chevron-down").removeClass("dripicons-chevron-up");
            console.log("Abriendo");
        }else if($(this).find(".dripicons-chevron-down").length>0){
            $(this).find(".dripicons-chevron-down").addClass("dripicons-chevron-up").removeClass("dripicons-chevron-down");
            console.log("Cerrando");
        }

    });

    // Abrir cerrar busqueda en CUadros
    $(".buttonFlotanteBusqueda").click(function(){
        $(".buttonFlotanteBusqueda").toggleClass("ocultaBus");
        $(".contenedorInputTablaB").toggleClass("ocultaBus");
        $(".buttonFlotanteBusqueda span").toggleClass("dripicons-search dripicons-chevron-up");

        $(this).parent().find("input.inputTextBusqueda").focus();

    });

    // Limpiar busqueda en cuadros
    $("html").on('click','.contenedorInputTablaB > div > button', function() {
        $( "input.inputTextBusqueda" ).val("");
    });





    $('.tablaTabs').on('click','button.tablaTabButton', function() {
        $(this).siblings("button").removeClass("btnTabTabla-activo");
        $(this).addClass("btnTabTabla-activo");

    });

    $('.blockNavegacion').on('click','button.botonNavegar', function() {
        $(this).siblings("button").removeClass("btnTabTabla-activo");
        $(this).addClass("btnTabTabla-activo");

        var mapa = $(this).attr("data-codevent");
        if(mapa === "mapas"){
            $("button.botonNavegar > span").css("background-image","url(../img/icoperuBn.png)");
        }else{
            $("button.botonNavegar > span").css("background-image","url(../img/icoperuBn2.png)");
        }

    });

    $("html ").on( "mouseover", ".tooltip , .tooltipLeft", function () {
            var textTool = $(this).text();
            var titleTool = $(this).attr("data-title");

            $(this).html(  textTool + "<span class='tooltiptext'>" + titleTool + "</span>");
        });

    $("html ").on( "mouseout", ".tooltip , .tooltipLeft", function () {
        $(this).find( "span" ).remove();
    });

   /* $(".tooltip").hover(function () {
        var textTool = $(this).text();
        var titleTool = $(this).attr("data-title");



        $(this).html(  textTool + "<span class='tooltiptext'>" + titleTool + "</span>");
    }, function () {
        $(this).find( "span" ).remove();

    });/*


    /*$(document).on('mouseover','.popover', function (e) {
        var titleTool = $(this).attr("data-popover");

        $('#contenedorPopover').css({'top':($(this).offset().top - 30)+'px','left':($(this).offset().left - 202)+'px'});
        $('#contenedorPopover').append( "<span class='popovertext'>" + titleTool + "</span>");



        if(App.uiMouseOverTabla!==undefined)
        {App.uiMouseOverTabla();}



        /*App.utils.mapas.descargarMapaEvent(function (resp,error) {});*/
/*
    });*/

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

        $(".sliderDiv [data-slider="+slider+"]").siblings("div").hide();
        $(".sliderDiv [data-slider="+slider+"]").show();

    });

    $('.tabSubTitulo').on('click','h2', function() {

        $(this).siblings("h2").removeClass("activeSubTabVentana");
        $(this).addClass("activeSubTabVentana");
    });



    $('.contenedorVentana').on('click','.descargarMapa', function() {
        //window.open("http://192.168.202.86:6080/arcgis/rest/directories/arcgisoutput/Utilities/PrintingTools_GPServer/_ags_63a809d5fba147829e42893932c4442f.pdf","_ags_63a809d5fba147829e42893932c4442f.pdf");
        App.utils.mapas.descargarMapaEvent(function (resp,error) {
            /**aqui pones la descarga*/
            //document.getElementById('iframeDescarga').scr=resp.url;
            //window.open(resp.url,'_ags_63a809d5fba147829e42893932c4442f.pdf');

            //var nom_pdf= resp.url.reverse().split("/")[0];
            //console.log('nom_pdf>>',nom_pdf);
            //window.open(resp.url);
            window.open(resp.url,resp.nom_pdf);

        });


    });

    $('.contenedorBusquedaBotonesUbigeo').on('click','button', function() {
        $(this).remove("button");

    });
    $(document).on('click','button.botonVistaMapa', function() {
        $(".mostrarListaMapa").toggle("slow");
    });

    $(document).on('click','.mostrarListaMapa', function() {
        $(this).toggle("slow");
    });

   
    $(document).on('click','.menuResponsive', function () {
        $('nav.nav-vertical').toggle("slow");
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


    /* Cuadros estadisticos */

    $(".contenidoMetadatoCE").css("height",(altoVentana-138)+"px")
    $(".contenedorIndice").css("height", (altoVentana - 118 )+"px");
    $(".listaIndicadoresCE").css("max-height", (altoVentana - 70 )+"px");


    $('#navegacionButtonCE').on('click','button.botonNavegar', function() {

        var _this = $(this);
        var ventana = _this.attr("data-codevent");

    });

    //$(".listaIndicadoresCE").niceScroll();


    $(window).resize(function(){
        var  altoVentana = $(window).height();
        $(".contenedorIndice").css("height", (altoVentana - 118 )+"px");
        $(".listaIndicadoresCE").css("max-height", (altoVentana - 70 )+"px");
    });

    $(document).on('click','td.popover', function () {
        var _this = $(this);
        var count = _this.closest(".contenedorVentana").find(".contenedorBotonesVentana button.restaurar").length;
        var anchoVen = $(window).width();
        if( anchoVen < 1280 ){
            count = 1;
        }

        if(count ==1){
            $(".modalGeneral").show();
        }
    });

    $(".modalGeneral").click(function(e){
        $(this).hide();
    });
    $(".modalGeneral .modalCentro").click(function(e){
        e.stopPropagation();
    });

    /* olcultando  Metadatos para movil */
    var anchoWIndowT = $(window).width();
    var altoWIndowT = $(window).height();
    if(anchoWIndowT > 1279){
        setTimeout(function(){ startIntro(); }, 2500);
    }else{
        setTimeout(function(){ startIntroMovil(); }, 3000);


        /* Ocupar 100% de alto en Graficos  */

        $(".contGraficoMetadatoRespon").css("height",(altoWIndowT - 114) + "px").css("max-height",(altoWIndowT - 114) + "px");

    }









    $("html").on('mouseenter', '#tblindicadores > tbody > tr > td', function() {
        var indice = $(this).parent().index();
        $(this).parent().addClass("hoverFila");
        $(".DTFC_Cloned > tbody tr:eq("+indice+")").addClass("hoverFila");
    });
    $("html").on('mouseleave', '#tblindicadores > tbody > tr > td', function() {
        var indice = $(this).parent().index();
        $(this).parent().removeClass("hoverFila");
        $(".DTFC_Cloned > tbody tr:eq("+indice+")").removeClass("hoverFila");
    });



    $("html").on('mouseenter', '.DTFC_Cloned > tbody > tr > td', function() {
        var indice = $(this).parent().index();
        $(this).parent().addClass("hoverFila");
        $("#tblindicadores > tbody tr:eq("+indice+")").addClass("hoverFila");
    });
    $("html").on('mouseleave', '.DTFC_Cloned > tbody > tr > td', function() {
        var indice = $(this).parent().index();
        $(this).parent().removeClass("hoverFila");
        $("#tblindicadores > tbody tr:eq("+indice+")").removeClass("hoverFila");
    });


    $("body").on("click", ".ocultarBuscadorUbigeo2", function () {
        $(this).closest(".contentBuscadorUbigeoResponsive").hide();
    });

});
