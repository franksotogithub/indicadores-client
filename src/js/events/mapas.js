
    (function (service,utils,config, sistema) {

        var cod_mapa='P01';
        service.mapas.getMapa(cod_mapa,function (data) {
            utils.mapas.datosMap.codMap=cod_mapa;
            utils.mapas.datosMap.urlMap=data.url;
            utils.mapas.datosMap.codTematico=data.cod_tematico_default;
            utils.mapas.datosMap.tituloLegend=data.descripcion;
            utils.mapas.crearMapa();
        });


    })(App.service,App.utils,AppConfig());
