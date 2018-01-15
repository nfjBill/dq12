var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
require('es6-promise').polyfill();
import 'isomorphic-fetch';
import _ from 'lodash';
var Fetch = /** @class */ (function () {
    function Fetch(_conf) {
        var _this = this;
        this._conf = _conf;
        this.request = function (url, options) {
            options = __assign({ method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, credentials: 'include' }, options);
            options = _this.setBody({ url: url, options: options, });
            return fetch(url, options)
                .then(_this.checkStatus)
                .then(_this.parseJSON)
                .then(function (data) { return data; })
                .catch(function (err) {
                console.error('fetch error: ', err);
            });
        };
    }
    Fetch.prototype.parseJSON = function (response) {
        return response.json();
    };
    Fetch.prototype.checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    };
    Fetch.prototype.setBody = function (_a) {
        var options = _a.options, url = _a.url;
        if (options.method === 'POST') {
            var key = '__dev';
            var body = options.body;
            body = body ? body : {};
            if (process.env.NODE_ENV === 'development') {
                body[key] = __assign({}, body[key], { __project_name: this._conf.name, __url: url });
            }
            else {
                body = _.omit(body, [key]);
            }
            options.body = JSON.stringify(body);
        }
        return options;
    };
    return Fetch;
}());
export { Fetch };
export default function (options) {
    return new Fetch(options);
}
