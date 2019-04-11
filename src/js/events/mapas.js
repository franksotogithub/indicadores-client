App.events.mapas = function (service, utils) {

    $(document).ready(function (e) {

        var selectMapa= document.getElementById('selectMapa');

        selectMapa.addEventListener('click',function () {
            var options={}
            options.categoria=selectMapa.options[selectMapa.selectedIndex].value;
            utils.mapas.categoriaChangeEvent(options);

        });

    });

};
