
    (function (service,utils,config) {

        var cod_map='POB';
        var cod_tematico=config.map_config[cod_map].cod_tematico_default;
        //utils.mapas.listarMapas();
        utils.mapas.cambiarMapa(cod_map,cod_tematico);


    })(App.service,App.utils,AppConfig());
