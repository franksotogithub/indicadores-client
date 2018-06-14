App.service.graficos = (function (parent, config) {


    var gePoblacionEdad = function (ubigeos, callback) {
        console.log(parent.getUrlServer('/grafico/poblacion/', {"u": ubigeos}));
        /*
        parent.get({
            url: parent.getUrlServer('/grafico/poblacion/', {"u": ubigeos}),
            success: function (data) {
                // Adaptar la data al servicio de highchart

                [
                    {"codigo": "00-15", "hombre": 752, "mujeres": 578}
                ]

                var datagrafico = [[752, 578],[228,316],[ 418, 325]];
                if (callback !== undefined) {
                    callback(datagrafico);
                }
            },
            error: function (obj, status, otherr) {

            }
        })
        */

        if (callback !== undefined) {
            callback( [[752, 578],[228,316],[ 418, 325]]);
        }


    };




    return{
        gePoblacionEdad: gePoblacionEdad
    }

})(App.service, AppConfig());