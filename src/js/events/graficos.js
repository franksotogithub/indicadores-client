(function (service, utils) {
    $(document).ready(function (e) {



        utils.graficos.graf_persona_edad([[752, 578],[228,316],[ 418, 325]]);
        utils.graficos.graf_barra_ubigeo([ ['Lima', 515, 311, 216],['Callao', 154, 41, 66]]);

    });

    $('#cmb_ubi').change(function () {
        service.graficos.get_info_ubi();
    })



})(App.service, App.utils);