
    (function (service,utils,config, sistema) {

        $(document).ready(function (e) {

            var selectMapa= document.getElementById('selectMapa');

            selectMapa.addEventListener('click',function () {
                var options={}
                options.categoria=selectMapa.options[selectMapa.selectedIndex].value;
                utils.mapas.categoriaChangeEvent(options);

            });

        });

    })(App.service,App.utils,AppConfig());
