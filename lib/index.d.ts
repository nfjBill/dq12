export interface PObj {
    history?: any;
    onError?: (error: any) => void;
    router: any;
}
export declare class Init {
    _app: any;
    _router: any;
    constructor({history, onError, router}: PObj);
    interopRequireDefault(obj: any): any;
    model(model: any): void;
    start(root: string): void;
}
export default function (options: PObj): Init;
export * from 'dva';
