var Appdata = function (callback, es_local) {
    console.log(">>>>> llamada aplicativo");
    var es_local = (es_local === undefined) ? true : false;
    return App.getAppData('config/appdata/', {
        "categorias": [
            {"codigo": "P01", "titulo": "Población", "esActivo": true, "sistema": "indicadores", "style": {}},
            {"codigo": "P02", "titulo": "Educación", "sistema": "indicadores", "style": {}},
            {"codigo": "P03", "titulo": "Salud", "sistema": "indicadores", "style": {}},
            //{"codigo": "P04", "titulo": "Economía", "sistema": "indicadores"},
            {"codigo": "P05", "titulo": "Vivienda", "sistema": "indicadores", "style": {}},
            {"codigo": "P06", "titulo": "Hogar", "sistema": "indicadores", "style": {}},
            {"codigo": "P08", "titulo": "Población", "sistema": "indicadores", "style": {'display': 'none'}}, //poblacion total
        ],
        "ponderadores": [
            {"codigo": "P01", "titulo": "Población Censada", "attrs":{"selected": "selected", "data-tipo": "P08"}},
            {"codigo": "P08", "titulo": "Población Total", "attrs": {"data-tipo": "total"}}
        ]
    }, callback, es_local);
};
