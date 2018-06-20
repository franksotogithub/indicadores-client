
    (function (service,utils,config) {
        var cod_mapa='P01';
        service.mapas.getMapa(cod_mapa,function (data) {
            var cod_tematico=data.cod_tematico_default;
            var url= data.url;
            utils.mapas.cambiarMapa(cod_mapa,cod_tematico,url);
        });


    })(App.service,App.utils,AppConfig());
