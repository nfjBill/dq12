/// <reference types="react" />
/**
 * Created by ningfujun on 2017/7/5.
 */
import * as React from 'react';
export interface ResizeParams {
    width: number | null;
    height: number | null;
}
export interface ResizableProps {
    onResize: (arg: ResizeParams) => void;
}
export declare class Resizable extends React.Component<ResizableProps> {
    private initialResetTriggersTimeout;
    private r;
    private lastDimensions;
    private dps;
    private el;
    requestFrame(fn: () => void): number;
    cancelFrame(id: number): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(): void;
    resetTriggers(): void;
    onScroll(): void;
    getDimensions(): {
        width: any;
        height: any;
    };
    haveDimensionsChanged(dimensions: ResizeParams): boolean;
    loadStyle(css: string): void;
    style: () => void;
    render(): JSX.Element;
}
export default Resizable;
