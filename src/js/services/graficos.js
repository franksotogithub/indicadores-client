App.service.graficos = (function (parent, config) {


    var gePoblacionEdad = function (ubigeo, categoria, callback) {


        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/'+ubigeo),//, {"u": ubigeos}
            success: function (data) {
                var arreglodata = [];


                console.log('esta es la ' )
                data.forEach(function (i) {

                    arreglodata.push( [(i).hombre, (i).mujer]  );
                })

                console.log(arreglodata)

                if (callback !== undefined) {
                    callback(arreglodata);
                }
            },
            error: function (obj, status, otherr) {

            }
        })


        /*if (callback !== undefined) {
            callback( [[752, 578],[228,316],[ 418, 325]]);
        }else {
            console.log('no muestraaaaaaaaaaaaaa')
        }*/


    };


    var gePoblacionInd = function (ubigeos, categoria, callback) {
        console.log(parent.getUrlServer('/grafico/poblacion_barra/', {"u": ubigeos}));

        console.log('servicio para grafico barras', {"u": ubigeos});


        if (callback !== undefined) {
            callback([ ['Lima', 515, 311, 216],['Callao', 154, 41, 66]]);
        }


    };






    return{
        gePoblacionEdad: gePoblacionEdad,
        gePoblacionInd: gePoblacionInd,
        gePoblacionEdad2: gePoblacionEdad2,
    }

})(App.service, AppConfig());