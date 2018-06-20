
    (function (service,utils,config) {
        /*require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",
            "esri/widgets/Legend",
            "esri/widgets/Popup",
            "dojo/dom",
            "dojo/dom-construct",
            "esri/Graphic",
            "esri/widgets/Search",
            "esri/tasks/Locator",
            "esri/tasks/support/Query",
            "esri/tasks/IdentifyTask",
            "esri/tasks/support/IdentifyParameters",
            "dojo/_base/array",
            "esri/PopupTemplate",
            "esri/widgets/Print",
            "esri/tasks/QueryTask",
            "esri/widgets/LayerList",
            "dojo/domReady!"
        ], utils.mapas.requireEvents);
*/
      /*  require([
            "esri/Map",
            "esri/views/MapView",
            "esri/layers/MapImageLayer",
            "esri/layers/FeatureLayer",
            "esri/widgets/Legend",
            "esri/widgets/Popup",
            "dojo/dom",
            "dojo/dom-construct",
            "esri/Graphic",
            "esri/widgets/Search",
            "esri/tasks/Locator",
            "esri/tasks/support/Query",
            "esri/tasks/IdentifyTask",
            "esri/tasks/support/IdentifyParameters",
            "dojo/_base/array",
            "esri/PopupTemplate",
            "esri/widgets/Print",
            "esri/tasks/QueryTask",
            "esri/widgets/LayerList",
            "dojo/domReady!"
        ], utils.mapas.crearMapa);*/
          //console.log()  ;
        //var url_map=config.map_config[cod_map].urlMap;

        //var cod_tematico=config.map_config[cod_map].cod_tematico_default;

        //var =config.map_config[cod_map].urlMap;
        //config.map_config[cod_map].cod_tematico_default;
        var cod_map='POB';

        //var url_map=config.map_config[cod_map].urlMap;

        var cod_tematico=config.map_config[cod_map].cod_tematico_default;


        utils.mapas.cambiarMapa(cod_map,cod_tematico);

    })(App.service,App.utils,AppConfig());
