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
const { ConnectedRouter } = routerRedux;
export default function (options) {
    const { redirect, routes, error } = options;
    return function ({ history, app }) {
        return (React.createElement(ConnectedRouter, { history: history },
            React.createElement(Switch, null,
                redirect ? React.createElement(Route, { exact: true, path: "/", render: () => (React.createElement(Redirect, { to: redirect })) }) : null,
                routes.map((_a, key) => {
                    var { path } = _a, dynamics = __rest(_a, ["path"]);
                    return (React.createElement(Route, { key: key, exact: true, path: path, component: dynamic(Object.assign({ app }, dynamics)) }));
                }),
                error ? React.createElement(Route, { component: error }) : null)));
    };
}
