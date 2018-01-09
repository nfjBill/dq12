import 'isomorphic-fetch';
export interface PBody {
    options?: any;
    url: string;
}
export interface PConf {
    name: string;
    [propName: string]: any;
}
export declare class Fetch {
    private _conf;
    constructor(_conf: PConf);
    parseJSON(response: any): any;
    checkStatus(response: any): any;
    setBody({options, url}: PBody): any;
    request: (url: string, options: any) => Promise<any>;
}
export default function (options: PConf): Fetch;
