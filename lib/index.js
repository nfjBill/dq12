var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
export default function (_a) {
    var history = _a.history, onError = _a.onError, router = _a.router, root = _a.root, registerServiceWorker = _a.registerServiceWorker;
    // 1. Initialize
    var app = dva(__assign({}, createLoading({
        effects: true,
    }), { history: history ? history : createHistory(), onError: function (error) {
            if (onError) {
                onError(error);
            }
        } }));
    // 2. Model
    // app.model(require('./models/app'))
    // 3. Router
    app.router(router);
    // 4. Start
    app.start(root ? root : '#root');
    if (registerServiceWorker) {
        registerServiceWorker();
    }
}
