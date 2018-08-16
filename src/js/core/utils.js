var App = App || {};
App.utils = {
    /* String y Fornato */
    numberFormat: function (num) {
        if(!isNaN(num)){
            num = num.toString().split("").reverse().join("").replace(/(?=\d*\.?)(\d{3})/g,"$1 ");
            num = num.split("").reverse().join("").replace(/^[\.]/,"");
            return num;
        }

        return num;
    },

    nullToblank: function (valor) {
        return (valor === null) ? '' : valor;
    },

    // escribe un texto aqui {0} donde otro valor {1} format(texto, [p0, p1])
    format: function(formatted, arguments) {
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{'+i+'\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    },

    zfill: function (num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    },

    /* Json y Arreglos */

    jsonLen: function (dict) {
        return Object.keys(dict).length;
    },

    jsonMerge: function (obj1, obj2) {
        var result = {};
        for(var key in obj1) result[key] = obj1[key];
        for(var key in obj2) result[key] = obj2[key];
        return result;
    },

    arrayUnique: function (arrayOriginal) {
        var arraySinDuplicados = [];
        $.each(arrayOriginal, function(i, el){
            if($.inArray(el, arraySinDuplicados) === -1) arraySinDuplicados.push(el);
        });
        return arraySinDuplicados;
    },

    capitalizeFirstLetter: function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    renderLines : function() {
        var renderer = {
            type: "unique-value",  // autocasts as new UniqueValueRenderer()
            field: "OBJECTID",
            defaultSymbol: {
                type: "simple-fill",
                color : [255,255,255,0],
            },
        };
        return renderer
    },


    createSymbol: function (color,type,style,outlineOptions,size) {

        var symbol= {
            type: type,
            color: color,
            outline: outlineOptions,
            style: style,
        };
        if (size!==undefined)
            symbol.size=size;

        return symbol;
    },

    getClassBreakInfoSublayerTematico: function (datos,outlineOptions) {
        var respuesta = [];
        var ini={
            minValue: 0,
            maxValue: 0,
        };
        respuesta.push(ini);
        datos.forEach(function (el) {
            var res= new Object();
            res.minValue=el.min_valor;
            res.maxValue=el.max_valor;
            res.label=el.label;


            res.symbol= {
                type: "simple-fill",
                color: el.color,
                outline: outlineOptions,
                style: "solid",
            }



            respuesta.push(res);
        });

        return respuesta;
    },





};