App.service.graficos = (function (parent, config) {


    var get_info_ubi = function () {

        var ubigeo = $('#cmb_ubi').val();
        console.log(ubigeo);

        $.ajax({
            url: 'https://reqres.in/api/users'+ubigeo,
            success: function(respuesta) {

                utils.graficos.graf_persona_edad(respuesta);
            },
            error: function() {
                console.log("No se ha podido obtener la información");
            }
        });

    };

    return{
        get_info_ubi:get_info_ubi
    }

})(App.service, AppConfig());