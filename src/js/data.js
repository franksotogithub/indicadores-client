var Appdata = function (callback, es_local) {
    console.log(">>>>> llamada aplicativo");
    var es_local = (es_local === undefined) ? true : false;
    return App.getAppData('config/appdata/', {
        "categorias": [
            {"codigo": "P01", "titulo": "Población", "esActivo": true, "sistema": "indicadores"},
            {"codigo": "P02", "titulo": "Educación", "sistema": "indicadores"},
            {"codigo": "P03", "titulo": "Salud", "sistema": "indicadores"},
            //{"codigo": "P04", "titulo": "Economía", "sistema": "indicadores"},
            {"codigo": "P05", "titulo": "Vivienda", "sistema": "indicadores"},
            {"codigo": "P06", "titulo": "Hogar", "sistema": "indicadores"},
            {"codigo": "P07", "titulo": "Población", "esActivo": true, "sistema": "pobreza"},
            {"codigo": "P08", "titulo": "Pobreza Monetaria", "sistema": "pobreza"},
            {"codigo": "P09", "titulo": "Pobreza no Monetaria", "sistema": "pobreza"},
            {"codigo": "P10", "titulo": "Hogar", "sistema": "pobreza"},
            {"codigo": "P11", "titulo": "Empleo", "sistema": "pobreza"},
            {"codigo": "P12", "titulo": "Educación", "sistema": "pobreza"},
            {"codigo": "P13", "titulo": "Salud", "sistema": "pobreza"},
            {"codigo": "P14", "titulo": "Identidad", "sistema": "pobreza"}
        ]
    }, callback, es_local);
};
