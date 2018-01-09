import dva from 'dva';
import createLoading from 'dva-loading';
import createHistory from 'history/createHashHistory';
export class Init {
    constructor({ history, onError, router }) {
        this._app = dva(Object.assign({}, createLoading({
            effects: true,
        }), { history: history ? history : createHistory(), onError(error) {
                if (onError) {
                    onError(error);
                }
            } }));
        if (router) {
            this._router = router;
        }
    }
    interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    model(model) {
        this._app.model(this.interopRequireDefault(model).default);
    }
    start(root) {
        this._app.router(this._router);
        this._app.start(root ? root : '#root');
    }
}
export default function (options) {
    return new Init(options);
}
export * from 'dva';
