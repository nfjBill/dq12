var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Switch, Route, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
var ConnectedRouter = routerRedux.ConnectedRouter;
export default function (options) {
    var redirect = options.redirect, routes = options.routes, error = options.error;
    return function (_a) {
        var history = _a.history, app = _a.app;
        return (React.createElement(LocaleProvider, { locale: zhCN },
            React.createElement(ConnectedRouter, { history: history },
                React.createElement(Switch, null,
                    redirect ? React.createElement(Route, { exact: true, path: "/", render: function () { return (React.createElement(Redirect, { to: redirect })); } }) : null,
                    routes.map(function (_a, key) {
                        var path = _a.path, dynamics = __rest(_a, ["path"]);
                        return (React.createElement(Route, { key: key, exact: true, path: path, component: dynamic(__assign({ app: app }, dynamics)) }));
                    }),
                    error ? React.createElement(Route, { component: error }) : null))));
    };
}
