var App = App || {};

App.service = (function (parent, config) {

    var callback = {
        defaultSuccess: function (data) {
            console.log(data);
        },

        defaultError: function (obj, status, othobj) {
            console.log(this.responseError(obj, 'Error intente nuevamente'));
        },

        responseError: function(obj, msgerr) {
            if (obj.responseJSON !== undefined) {
                if (obj.responseJSON.detail !== undefined) {
                    return obj.responseJSON.detail;
                }else {
                    return msgerr;
                }
            }else {
                return msgerr;
            }
        }
    };

    var ajax = function (type, object, datos) {

        if (object === undefined) {
            object = {
                success: callback.defaultSuccess,
                error: callback.defaultError
            };
        } else {
            if (!object.hasOwnProperty("success")) {
                object.success = callback.defaultSuccess;
            }

            if (!object.hasOwnProperty("error")) {
                object.error = callback.defaultError
            }
        }

        var default_options = {
            url: object.url,
            type: type,
            dataType: 'JSON',
            beforesend: function () {
            },
            success: function (data) {
                object.success(data);
            },
            error: function (obj, status, othobj) {
                object.error(obj, status, othobj);
            }
        };

        if (type == 'POST' || type == 'PUT') {
            default_options.data = JSON.stringify(datos);
            default_options.contentType = 'application/json; charset=utf-8';
        }

        $.ajax(default_options);
    };

    var list = function (object, local) {
        //generico loading
        if (local === undefined || local == false) {
            ajax('GET', object);
        }else {
            return this.getLocal(object.url);
        }

    };

    var create = function (object, datos) {
        //generico loading
        ajax('POST', object, datos);
    };

    var update = function (object, datos) {
        //generico loading
        ajax('PUT', object, datos);
    };

    var remove = function (object) {
        ajax('DELETE', object);
    };

    var getUrlServer = function (slug, args) {
        var query_url = '',
        c = 1;

        var crearQuery = function (key, value) {
            if (Array.isArray(value)) {
                var query_url = [];
                for (var i=0; i<value.length; i++) {
                    query_url.push(key + '='+value[i]);
                }
                return query_url.join('&');
            }else {
                return key + '='+value;
            }
        };

        $.each(args, function (i,v) {
            if (c == 1) {
                query_url += '?' + crearQuery(i,v);
            }else {
                query_url += '&' + crearQuery(i,v);
            }

            c++;
        });
        var url = config.urlServer + slug + query_url;
        return url;
    };

    var getUrlGis = function (slug, server) {
        if (server===undefined) {
            server = config.urlArcGis.default
        }
        if (config.urlArcGis.hasOwnProperty(server)) {
            return parent.utils.format('{0}{1}', [config.urlArcGis[server], slug])
        }else {
            alert("No existe el servidor arcgis solicitado");
        }

    };

    var url = function (slug, urlargs) {
        return App.utils.format(slug, urlargs)
    };

    var save = function (key , value) {
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    };

    var getLocal = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };


    return {
        url: url,
        get: list,
        post: create,
        put: update,
        delete: remove,
        save: save,
        getLocal: getLocal,
        responseError: callback.responseError,
        getUrlServer: getUrlServer,
        getUrlGis: getUrlGis
    }

})(App, AppConfig());