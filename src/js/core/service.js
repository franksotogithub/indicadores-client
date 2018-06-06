var App = App || {};

App.service = (function (parent) {

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

    var list = function (object) {
        //generico loading
        ajax('GET', object);
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

        console.log(parent.ambito);

        $.each(args, function (i,v) {
            if (c == 1) {
                query_url += '?' + i + '='+v;
            }else {
                query_url += '&' + i + '='+v;
            }

            c++;
        });
        var url = parent.config.urlServer + slug + query_url;
        return url;
    };

    return {
        get: list,
        post: create,
        put: update,
        delete: remove,
        responseError: callback.responseError,
        getUrlServer: getUrlServer
    }

})(App);