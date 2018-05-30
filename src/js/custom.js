/* Local Storage para ventanas */






/* Comprobar Ventanas abiertas */

function ventanasAbiertas(){
    var contadorVentanas = 0;
    $(".contenedorVentana").each(function(){
        if($(this).is(":visible")){
            contadorVentanas++; /* Contar cuantas ventanas estan abiertas */
        }
    });

    console.log(contadorVentanas);
    return contadorVentanas;

}


/* Adaptar Ventanas al espacio */

function adaptarVentanas(a,b){ /* Atributo de data codevent , ventana  */
    var contadorVentanas = ventanasAbiertas();

    if( contadorVentanas == 2){
        b.siblings(".contenedorVentana").addClass("col-1-2").css("display","inline-block").removeClass("col-4-10 col-35 col-1-4");
       //$(".ventanaTabla > section").css("margin-right","10px");
    }else if(contadorVentanas == 1){
        $(".contenedorVentana").css("width","100%");
        $(".contenedorVentana > section").css("margin","10px");
    }


}



/* MInimizar Ventana */
function minimizarVentana(e){
    var contadorVentanas = ventanasAbiertas();
    var a = e.closest(".contenedorVentana").attr("data-codevent"); /* Obteniendo valor para comparacion */
    var b = e.closest(".contenedorVentana"); /* Seleccionar ventana Padre */

    if(contadorVentanas==1){

    }else {
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
    var contadorVentanas = ventanasAbiertas();
    if(contadorVentanas==1){

    }else {
        e.closest(".contenedorVentana").siblings(".contenedorVentana").fadeOut(function () { /* Selecionar los hermanos de la ventana maximizada y ocultarlas */
            e.closest(".contenedorVentana").removeClass("col-4-10 col-35 col-1-4 ").addClass("col-1-1").css("display","block");
        });
        e.attr("data-icon","4");
        e.attr("title","Restaurar ventana");
        e.addClass("restaurar").removeClass("maximizar");

        Tipped.init();
        Tipped.create('.tooltip', {size: 'large'});
    }

}

/* Restaurar Ventana */
function restaurarVentana(e){
    var dataCodevent = e.closest(".contenedorVentana").attr("data-codevent");
    var ventana = e.closest(".contenedorVentana");
    if(dataCodevent=="mapa"){
        ventana.addClass("col-4-10").removeClass("col-1-1");
    }else if( dataCodevent=="indicadores"){
        ventana.addClass("col-35").removeClass("col-1-1");
    }else if(dataCodevent=="graficos"){
        ventana.addClass("col-1-4").removeClass("col-1-1");
    }
    ventana.css("display","inline-block");
    ventana.siblings(".contenedorVentana").css("display","inline-block");


    e.attr("data-icon",">");
    e.attr("title","Maximizar ventana");
    e.addClass("maximizar").removeClass("restaurar");



     Tipped.init();
     Tipped.create('.tooltip', {size: 'large'});
}



$(document).ready(function() {
    /* Crea el tooltip */
    Tipped.create('.tooltip', {size: 'large'});

    $('.contenedorVentana').on('click','.minimizar', function() {
        minimizarVentana($(this));
    });

    $('.contenedorVentana').on('click','.maximizar', function() {
        maximizarVentana($(this));
    });

    $('.contenedorVentana').on('click','.restaurar', function() {
        restaurarVentana($(this));
    });

});