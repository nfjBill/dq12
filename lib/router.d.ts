/// <reference types="react" />
import * as React from 'react';
export interface PRouter {
    redirect?: string;
    routes: Array<object>;
    error?: React.Component;
}
export interface PRoutes {
    history: any;
    app: any;
}
export default function (options: PRouter): ({history, app}: PRoutes) => JSX.Element;
