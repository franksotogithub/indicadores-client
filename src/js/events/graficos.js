(function (service, utils) {
    $(document).ready(function (e) {

        //utils.graficos.crearMinimizado([['15', 'LIMA'],['12', 'ayacucho'],['11', 'ICA'],['01', 'AMAZONAS']]);

        //utils.graficos.creargraficoComboUbi([['15', 'LIMA']]);


        //utils.graficos.graf_persona_edad([[752, 578],[228,316],[ 418, 325]]);
        //utils.graficos.graf_barra_ubigeo([ ['Lima', 515, 311, 216],['Callao', 154, 41, 66]]);

        service.graficos.gePoblacionEdad('00', 'P01', utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo

        service.graficos.gePoblacionInd('00', 'P01', utils.graficos.graf_barra_ubigeo);//mostrara los graficos de barra





    });

    $('#cmb_ubi').change(function () {
        var ubigeo = $('#cmb_ubi').val();
        service.graficos.gePoblacionEdad(ubigeo, 'P01', utils.graficos.graf_persona_edad); //mostrara los graficos del ubigeo
    })



})(App.service, App.utils);