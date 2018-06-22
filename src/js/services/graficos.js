App.service.graficos = (function (parent, config, appData) {


    var gePoblacionEdad = function (ubigeo, n, categoria, div1, div2, callback) {

        console.log(div1, div2)
        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/'+ubigeo+'/'),//, {"u": ubigeos}
            success: function (data) {
                var arreglodata = [];
                //console.log(appData.titulo['U01'])

                data.forEach(function (i) {
                        arreglodata.push( [(i).cod_tematico, (i).indicador , Math.round((i).hombre) , Math.round ((i).mujer) ] );
                });
                arreglodata.sort();

                self.json = [];

                var h = [];
                var m = [];

                var h_t = 0;
                var m_t = 0;

                var ind = [];
                arreglodata.forEach(function (x) {
                    ind.push(x[1])
                    h.push(-x[2])
                    m.push(x[3])
                    h_t += x[2]
                    m_t += x[3]
                });
               var  nom_ubigeo;

                if (ubigeo == '00'){
                    nom_ubigeo = 'PERU'
                }else {
                    nom_ubigeo = 'INFO. ' + appData.titulo['U'+ubigeo]
                }

                if (n > 1){
                    nom_ubigeo = null
                }


                json =   {categoria : ind,
                    data: [{name: 'Hombres', data: h}, {name: 'Mujeres', data: m}],
                    total: [['Hombres', h_t], [ 'Mujeres', m_t]],
                    nom_ubigeo: nom_ubigeo
                };

                document.getElementById("id_w_t").innerHTML = h_t + m_t;
                document.getElementById("id_w_h").innerHTML = h_t;
                document.getElementById("id_w_m").innerHTML = m_t;

                console.log(self.json)
                if (callback !== undefined) {
                    callback(self.json,div1, div2 );
                }
            },
            error: function (obj, status, otherr) {

            }
        })


    };

    Array.prototype.groupBy = function(prop) {
        return this.reduce(function(groups, item) {
            const val = item[prop]
            groups[val] = groups[val] || []
            groups[val].push(item)
            return groups
        }, {})
    };


    Array.prototype.unique = function(){
        for(var i = 0; i < this.length; i++){
            for(var j = i + 1; j < this.length; j++){
                if(this[i] == this[j]){
                    this.splice(j, 1);
                    j--;
                }
            }
        }
    };



    var gePoblacionInd = function (ubigeos, categoria, callback) {

        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/barras/'),//, {"u": ubigeos}
            success: function (data) {

                var ind = []
                var valores = []
                data.forEach(function (i) {
                    ind.push(i.indicador)
                    valores.push([(i).ubigeo,(i).cod_tematico,  (i).indicador, Math.round ((i).valor)])
                });

                ind.unique();
                ind.sort();
                valores.sort()


                var son = []
                var Json = []
                var ubigeos = []

                ind.forEach(function (x) {
                    var datavalor = [];
                    valores.forEach(function (y) {
                        if (y[2] == x){
                            datavalor.push(y[3])
                            ubigeos.push(appData.titulo['U'+y[0]])
                        }

                    });
                    son.push({data:datavalor , name: x   })

                });
                ubigeos.unique()
                Json= {ubigeo: ubigeos, son: son }


                if (callback !== undefined) {
                    callback(Json);
                }
            },
            error: function (obj, status, otherr) {

            }
        })

    };


    return{
        gePoblacionEdad: gePoblacionEdad,
        gePoblacionInd: gePoblacionInd,
    }

})(App.service, AppConfig(), Appdata());