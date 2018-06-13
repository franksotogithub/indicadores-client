/* Variables globales */

var vAbiertas;
var ultimaMinimizada;



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
    e.parent().children(".maximizar").attr("title","Restaurar ventana");
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

        if (dataCodevent == "mapa") {
            ventana.addClass("col-4-10").removeClass("col-1-1");
        } else if (dataCodevent == "indicadores") {
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
    e.parent().children(".restaurar").attr("title", "Maximizar ventana");
    e.parent().children(".restaurar").addClass("maximizar").removeClass("restaurar");

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
        e.removeClass("animacionbtn").closest("[data-codi]").hide();
        $(".contenedorVentana[data-cod="+ventanaMini+"]").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").find(".restaurar").attr("data-icon", ">").attr("title", "Maximizar ventana");
        $(".contenedorVentana[data-cod="+contadorVentanas[1]+"]").find(".restaurar").addClass("maximizar").removeClass("restaurar");

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
    }
}



/* MInimizar Ventana */
function minimizarVentana(e) {
    ventanasAbiertas();
    var contadorVentanas = vAbiertas;
    var a = e.closest(".contenedorVentana").attr("data-codevent");
    /* Obteniendo valor para comparacion */
    var b = e.closest(".contenedorVentana");
    /* Seleccionar ventana Padre */


    if (contadorVentanas[0] == 1) {
        console.log("solo hay una ventana abierta");


    } else if(contadorVentanas[0]==2){

        var  reconocida = contadorVentanas[1] - parseInt(b.attr("data-cod"));

        var ventanaUltima = $(".contenedorVentana[data-cod='"+reconocida+"']").find(".maximizar");
        ventanaUltima.attr("data-icon","4");
        ventanaUltima.attr("title","Restaurar ventana");
        ventanaUltima.addClass("restaurar").removeClass("maximizar");


        e.closest(".contenedorVentana").fadeOut(function(){
            adaptarVentanas(a,b);
        });

        $(".barHerramientasHeader .col-1-4").each(function(){ /* Evalua que icono correponde msotrar como minimizado */
            var c = $(this).attr("data-codevent");

            if (a==c){ /* Comparamos si coinciden los data-codevent */
                $(this ).css("display","inline-block");
                $(this ).find("button").addClass("animacionbtn");
                $(this ).find("button").addClass("animacionbtn").css("background-color","#12284c");
            }
        });

        ventanasAbiertas();
        ultimaMinimizada = parseInt( b.attr("data-cod"));
        console.log(vAbiertas);

        /* Reiniciar tooltip  */
        //Tipped.init();
        //Tipped.create('.tooltip', {size: 'large'});


    }else if(contadorVentanas[0]==3) {

        e.closest(".contenedorVentana").fadeOut(function(){
            adaptarVentanas(a,b);
        });

        $(".barHerramientasHeader .col-1-4").each(function(){ /* Evalua que icono correponde msotrar como minimizado */
            var c = $(this).attr("data-codevent");

            if (a==c){ /* Comparamos si coinciden los data-codevent */
                $(this ).css("display","inline-block");
                $(this ).find("button").addClass("animacionbtn");
            }
        });
    }
}

/* Maximizar Ventana */

function maximizarVentana(e){
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
    e.attr("data-icon","4");
    e.attr("title","Restaurar ventana");
    e.addClass("restaurar").removeClass("maximizar");

    /* Reiniciar tooltip  */
    //Tipped.init();
    //Tipped.create('.tooltip', {size: 'large'});
}

/* Restaurar Ventana */
function restaurarVentana(e) {
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

        if (dataCodevent == "mapa") {
            ventana.addClass("col-4-10").removeClass("col-1-1");
        } else if (dataCodevent == "indicadores") {
            ventana.addClass("col-35").removeClass("col-1-1");
        } else if (dataCodevent == "graficos") {
            ventana.addClass("col-1-4").removeClass("col-1-1");
        }
        ventana.css("display", "inline-block");
        ventana.siblings(".contenedorVentana").css("display", "inline-block");

        $(".barHerramientasHeader [data-codi]").hide().find("button").removeClass("animacionbtn");
    }
    e.attr("data-icon", ">");
    e.attr("title", "Maximizar ventana");
    e.addClass("maximizar").removeClass("restaurar");

     //Tipped.init();
     //Tipped.create('.tooltip', {size: 'large'});
}



$(document).ready(function() {

    /* Crea el tooltip */
    //Tipped.create('.tooltip', {size: 'large'});


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


});