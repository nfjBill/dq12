require('es6-promise').polyfill();
import 'isomorphic-fetch';
import _ from 'lodash';
export class Fetch {
    constructor(_conf) {
        this._conf = _conf;
        this.request = (url, options) => {
            options = Object.assign({ method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }, credentials: 'include' }, options);
            options = this.setBody({ url, options, });
            return fetch(url, options)
                .then(this.checkStatus)
                .then(this.parseJSON)
                .then(data => data)
                .catch(err => {
                console.error('fetch error: ', err);
            });
        };
    }
    parseJSON(response) {
        return response.json();
    }
    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
    setBody({ options, url }) {
        if (options.method === 'POST') {
            const key = '__dev';
            let body = options.body;
            body = body ? body : {};
            if (process.env.NODE_ENV === 'development') {
                body[key] = Object.assign({}, body[key], { __project_name: this._conf.name, __url: url });
            }
            else {
                body = _.omit(body, [key]);
            }
            options.body = JSON.stringify(body);
        }
        return options;
    }
}
export default function (options) {
    return new Fetch(options);
}
