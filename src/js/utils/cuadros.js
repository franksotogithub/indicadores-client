App.utils.cuadros = (function (parent, service, config) {
    var crearCabecera = function (cabecera) {
        var thead = '<tr>';
        var childrens = [];
        for (var i=0; i<cabecera.length;i++) {
            var v = cabecera[i];
            var rowspan = (v.rowspan !== undefined) ? ' rowspan="'+v.rowspan+'"' : '';
            var colspan = (v.colspan !== undefined) ? ' colspan="'+v.colspan+'"' : '';
            var th = '<th'+rowspan+colspan+'>'+v.titulo+'</th>';
            thead += th;

            if (v.children !== undefined) {
                console.log("zquiii", v.children);
                childrens = childrens.concat(v.children);
            }
        }
        thead += '</tr>';

        if (childrens.length > 0) {
            thead += '<tr>';
            for (var j=0; j<childrens.length;j++) {
                var k = childrens[j];
                thead += '<th>'+k.titulo+'</th>'
            }
            thead += '</tr>';
        }

        $("#tblindicadores thead").html(thead);

        service.cuadros.getNacional(function (data) {

        });
    };

    var cabecera = [
        {
            "titulo": "VARIABLE / INDICADOR",
            "rowspan": "2"
        }
    ];

    var cabeceraTemplate = {
        "titulo": "{0}",
        "colspan": "2",
        "children": [
            {
                "titulo": "Absoluto"
            },

            {
                "titulo": "%"
            }
        ]
    };

    var cabeceraUigeos = function (ubigeos) {
        for (var i=0;i<ubigeos.length;i++) {
            cabeceraTemplate.titulo = "Nombre";
            cabecera.push(cabeceraTemplate);
        }

        crearCabecera(cabecera);
    };
    return {
        cabeceraUigeos: cabeceraUigeos,
        nacional: undefined
    }
})(App.utils, App.service, AppConfig());