
    (function (service,utils,config) {
        var cod_mapa='P01';
        service.mapas.getMapa(cod_mapa,function (data) {
            var cod_tematico=data.cod_tematico_default;
            var url= data.url;
            var titulo= data.descripcion;
            utils.mapas.crearMapa(cod_mapa,cod_tematico,url,titulo);
        });


    })(App.service,App.utils,AppConfig());
