App.service.graficos = (function (parent, config, appData) {

self.data_grafico = [];
self.ubigeo_select = '';
self.cant_select = 0;

    var gePoblacionEdad = function (ubigeo,  callback) {

        parent.get({
            url: parent.getUrlServer('indicadores/graficos/poblacion/'+ubigeo+'/'),//, {"u": ubigeos}
            success: function (data) {
                self.data_grafico = data;
                self.ubigeo_select = ubigeo;

                if (callback !== undefined) {
                    callback(self.data_grafico );
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



    var gePoblacionInd = function (ubigeos, callback) {

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
                self.Json2 = []
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
                self.Json2 = {ubigeo: ubigeos, son: son }

                console.log('muestraaaaaa', self.Json2)
                if (callback !== undefined) {
                    callback(self.Json2 );
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