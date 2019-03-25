var Appdata = function (vista, callback, es_local) {
    var es_local = (es_local === undefined) ? true : false;
    return App.getAppData(App.utils.format('config/appdata/{0}/', [vista]), {
        "categorias": [
            {"codigo": "P01", "titulo": "Población", "esActivo": true, "sistema": "principales", "style": {}},
            {"codigo": "P02", "titulo": "Educación", "sistema": "principales", "style": {}},
            {"codigo": "P03", "titulo": "Salud", "sistema": "principales", "style": {}},
            //{"codigo": "P04", "titulo": "Economía", "sistema": "principales"},
            {"codigo": "P05", "titulo": "Vivienda", "sistema": "principales", "style": {}},
            {"codigo": "P06", "titulo": "Hogar", "sistema": "principales", "style": {}},
            {"codigo": "P08", "titulo": "Población Total", "sistema": "principales", "style": {'display': 'none'}}, //poblacion total
            {"codigo": "P07", "titulo": "Pobreza", "esActivo": true, "sistema": "pobreza", "style": {}},
        ],
        "ponderadores": [
            {"codigo": "P01", "titulo": "Población Censada", "attrs":{"selected": "selected", "data-tipo": "P08"}},
            {"codigo": "P08", "titulo": "Población Total", "attrs": {"data-tipo": "total"}}
        ]
    }, callback, es_local);
};
