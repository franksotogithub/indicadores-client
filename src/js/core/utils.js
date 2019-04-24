/**
 * Si existe el namespace App lo hereda sino lo crea
 * @type {{}}
 */
var App = App || {};

/**
 *
 *@memberOf
 */
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

    round: function (num, decimal) {
        decimal = (decimal === undefined)  ? 1 : decimal;
        var dies = Math.pow(10, decimal);
        return Math.round(num*dies)/dies;
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


    renderBack  :function ( ) {
        var renderer = {
            type: "unique-value",
            field: "OBJECTID",
            defaultSymbol: {
                type: "simple-fill",
                color: "#A8A8A8",
                outline: {
                    width: 1,
                    color: "white"
                }
            },

        };

        return renderer
    },
    crearRangos: function(arrayData,cantNiveles){
        arrayData=arrayData.sort(function (a,b) {return a-b;  });
        var rangos=[];
        var i=0;
        var el= {};
        var index_acu=0;
        var index_min=0;
        var index_max=0;
        var cant=arrayData.length;
        var coeficiente=parseInt(Math.trunc(parseInt(cant)/parseInt(cantNiveles)));
        var modulo=parseInt(cant)%parseInt(cantNiveles);
        var max= arrayData[cant-1];

        for (i=0;i<cantNiveles;i++){
            el= {};
            index_min=index_acu;
            if(modulo>0) {
                index_acu=index_acu+(coeficiente+1);
                modulo--;
            }
            else{
                index_acu=index_acu+coeficiente;
            }
            index_max=index_acu;
            el.min_valor=arrayData[index_min];

            if(!(i==(cantNiveles-1)))
                el.max_valor=arrayData[index_max];
            else
                el.max_valor=max;
            el.label='De '+ String(el.min_valor) +' a '+ String(el.max_valor);
            rangos.push(el);
        }
        return rangos;
    },

    getRandomInt : function (min,max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    esPadre : function(ubigeoPadre,ubigeoHijo){
        var tamPadre=ubigeoPadre.length;
        var tamHijo=ubigeoHijo.length;
        var esPadre=false;
        if(ubigeoPadre=='00' && (ubigeoHijo!='00' && tamHijo==2) ) esPadre =true;
        if(tamPadre==2 && tamHijo==4 && ubigeoHijo.substring(0,2)== ubigeoPadre) esPadre=true;
        if(tamPadre==4 && tamHijo==6 && ubigeoHijo.substring(0,4)== ubigeoPadre) esPadre=true;
        if(tamPadre==6 && tamHijo>6 && ubigeoHijo.substring(0,6)== ubigeoPadre) esPadre=true;
        return esPadre;
    },


    getDefExpByCod:function(arrayCodigos){
        var definitionExpression="";
        var num_features=arrayCodigos.length;
        definitionExpression=" CODIGO IN (";
        arrayCodigos.forEach(function(select_feature) {
            num_features--;
            if (num_features>0) definitionExpression= definitionExpression + select_feature+","
            else definitionExpression= definitionExpression + select_feature+")"
        });
        return definitionExpression;
    },


    getDefExpr: function(arrayUbigeos){
        var definitionExpression="";
        var num_features=arrayUbigeos.length;

        if (num_features>0){
            var tamUbigeo=arrayUbigeos[0].length;
            if (tamUbigeo==2){definitionExpression="CCDD IN (";}
            else if (tamUbigeo==4){ definitionExpression=" CCDD+CCPP IN (";}
            else if (tamUbigeo==6) {definitionExpression=" CCDD+CCPP+CCDI IN (";}


            arrayUbigeos.forEach(function(ubigeo) {
                num_features--;
                if (num_features>0) definitionExpression= definitionExpression + ubigeo+","
                else definitionExpression= definitionExpression + ubigeo+")"
            });
        }

        return definitionExpression;
    }


};