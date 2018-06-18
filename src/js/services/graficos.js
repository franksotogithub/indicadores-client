App.service.graficos = (function (parent, config) {


    var gePoblacionEdad = function (ubigeo, categoria, callback) {


        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/'+ubigeo+'/'),//, {"u": ubigeos}
            success: function (data) {
                var arreglodata = [];

                data.forEach(function (i) {
                    if (i.cod_tematico == 'P010201') {
                        arreglodata.push( [(i).hombre, (i).mujer]  );
                    }

                });
                data.forEach(function (i) {
                    if (i.cod_tematico == 'P010202') {
                        arreglodata.push( [(i).hombre, (i).mujer]  );
                    }

                });
                data.forEach(function (i) {
                    if (i.cod_tematico == 'P010203') {
                        arreglodata.push( [(i).hombre, (i).mujer]  );

                    }
                });

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


    Array.prototype.groupBy = function(prop) {
        return this.reduce(function(groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    }


    Array.prototype.unique = function(){
        for(var i = 0; i < this.length; i++){
            for(var j = i + 1; j < this.length; j++){
                if(this[i] == this[j]){
                    this.splice(j, 1);
                    j--;
                }
            }
        }
    }



    var gePoblacionInd = function (ubigeos, categoria, callback) {


        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/barras/'),//, {"u": ubigeos}
            success: function (data) {
                var arreglodata_barra = []

                var ind1 = []
                var ind2 = []

                var no_repetidos = [];
                var ubigeo = [];



                data.forEach(function (i) {
                      //ind2.push([(i).ubigeo, (i).indicador, (i).valor]);

                    //no_repetidos.push((i).indicador);
                    //ubigeo.push((i).ubigeo);
                    if ((i).indicador=='Hombres'){
                        ind1.push([(i).ubigeo,(i).cod_tematico,  (i).indicador, (i).valor]);
                    }
                    else if ((i).indicador=='Mujeres'){
                        ind2.push([(i).ubigeo,(i).cod_tematico,  (i).indicador, (i).valor]);
                    }
                });

                ind1.sort();
                ind2.sort();
                console.log(no_repetidos);
                console.log(ubigeo);


                ubigeo.forEach(function (u) {

                    no_repetidos.forEach(function (i) {

                        ind2.forEach()
                        ind2.push([(u).ubigeo, (i).indicador, (i).valor]);

                    })

                });


                ind1.forEach(function (x){
                    ind2.forEach(function (y){
                        if (x[0] == y[0]){
                            arreglodata_barra.push([(x)[0],  (x)[3], (y)[3]]);
                        }
                    })
                });
//
                //console.log(arreglodata_barra);

                 var resu = data.groupBy("indicador","ubigeo");

                //console.log(resu);

                if (callback !== undefined) {
                    callback(arreglodata_barra);
                }
            },
            error: function (obj, status, otherr) {

            }
        })




    };






    return{
        gePoblacionEdad: gePoblacionEdad,
        gePoblacionInd: gePoblacionInd
    }

})(App.service, AppConfig());