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
var Init = /** @class */ (function () {
    function Init(_a) {
        var history = _a.history, onError = _a.onError, router = _a.router;
        this._app = dva(__assign({}, createLoading({
            effects: true,
        }), { history: history ? history : createHistory(), onError: function (error) {
                if (onError) {
                    onError(error);
                }
            } }));
        if (router) {
            this._router = router;
        }
    }
    Init.prototype.interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { default: obj }; };
    Init.prototype.model = function (model) {
        this._app.model(this.interopRequireDefault(model).default);
    };
    Init.prototype.start = function (root) {
        this._app.router(this._router);
        this._app.start(root ? root : '#root');
    };
    return Init;
}());
export { Init };
export default function (options) {
    return new Init(options);
}
export * from 'dva';
