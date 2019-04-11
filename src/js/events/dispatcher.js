(function (app, utils) {
    /**
     * Evento general de UI que se ejecuta al maximizar una de las ventanas de la aplicación
     * @param ventana
     */
    app.uiMaxCallback = function (ventana) {
        this.utils.cuadros.expardirVentana = true;
        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax[ventana] = true;
            this.hasUtils('uiMaxCallback', {"ventana": ventana}, [ventana]);
        }

    };

    /**
     * Evento general de UI que se ejecuta al Restaurar una ventana de la aplicación
     * @param ventana
     */
    app.uiNormalCallback = function (ventana) {

        if (this.uiMax.hasOwnProperty(ventana)) {
            this.uiMax = uiMax;
        }
        this.hasUtils('uiNormalCallback', {"ventana": ventana});

    };

    app.uiReabrirVentana = function () {
        this.utils.cuadros.uiReabrirVentana();
    };

    app.uiMinimizarVentana = function (inicial) {
        if (inicial == 3) {
            this.utils.cuadros.expardirVentana = true;
        }

        this.hasUtils('uiMinimizarVentana', {"inicial": inicial});
    };

    app.uiMouseOverTabla = function (ubigeo) {
        this.hasUtils('uiMouseOverTabla', {"ubigeo":ubigeo});
    };

    app.uiMouseOutTabla = function () {
        this.hasUtils('uiMouseOutTabla', {});
    };

    /**
     * Evento se ejecuta al elegir o cambiar una ubicación del mapa en el que esta situado.
     * Ejemplo: al dar click en lima se ejecutara este evento
     * @param ubigeo
     * @param historico
     */
    app.mapasChangeEvent = function (options) {
        this.hasUtils('mapasChangeEvent', options);
    };

    /**
     *
     * @returns {null} or
     */
    app.descargarMapaEvent = function () {
        if (this.utils.mapas.descargarMapaEvent !== undefined) {
            return this.utils.mapas.descargarMapaEvent();
        }else {
            console.log("no existe el metodo en descargarMapaEvent");
            return null;
        }
    };

    /**
     * Evento de Cuadros se ejecuta al cambiar de categoria
     * @param categoria
     */
    app.categoriaChangeEvent = function (categoria) {
        this.categoria = categoria;
        this.hasUtils('categoriaChangeEvent', {"categoria": categoria});
    };

    /**
     * Evento se ejecuta al cambiar o elegir un indicador, delega a los modulos si existe dicha funcion
     * @param indicador
     */
    app.indicadorChangeEvent = function (indicador) {
        this.hasUtils('indicadorChangeEvent', {"indicador": indicador});
    };

    app.dashboardWidgetChangeEvent = function (bloque, vista, seleccion) {
        this.hasUtils('dashboardWidgetChangeEvent', {"bloque": bloque, "vista": vista, "seleccion": seleccion}, ['dashboard', 'mapasDashBoard']);
    };

    app.dashboardVistaChangeEvent = function (bloque, vista, seleccion) {
        this.hasUtils('dashboardVistaChangeEvent', {"bloque": bloque, "vista": vista}, ['dashboard', 'mapasDashBoard']);
    };

    /**
     * Maximizar ventana de dashboard
     */
    app.uiMaxCallbackDashBoardEvent= function (bloque,vista) {
        this.hasUtils('uiMaxCallbackDashBoardEvent', {"bloque": bloque , "vista": vista}, ['dashboard', 'mapasDashBoard']);
    };

    /**
     * Restaurar ventana de dashboard
     */
    app.uiNormalCallbackDashBoardEvent= function (bloque,vista) {
        this.hasUtils('uiNormalCallbackDashBoardEvent', {"bloque": bloque , "vista": vista}, ['dashboard', 'mapasDashBoard']);
    }
    app.uiResizeCallbackDashBoardEvent= function (list,anchoPatanlla) {
        this.hasUtils('uiResizeCallbackDashBoardEvent', {"list": list,"anchoPantalla":anchoPatanlla}, ['dashboard', 'mapasDashBoard']);
    }

    /**
     * Funcion para invocar los graficos para el popup del
     * */
    app.getContenidoPopupMapaEvent = function (ubigeo,codTematico,callback) {
        this.hasUtils('getContenidoPopupMapaEvent',{"ubigeo" : ubigeo,"codTematico" : codTematico,"callback" :callback});
    };

})(App, App.utils);