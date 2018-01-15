/**
 * Created by ningfujun on 2017/7/5.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { DpsLasted } from '../utils';
var style = "\n  .resize-triggers {\n    visibility: hidden;\n  }\n  \n  .resize-triggers, .resize-triggers > div, .contract-trigger:before {\n    content: \"\";\n    display: block;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1000;\n  }\n  \n  .resize-triggers > div {\n    background: #eee;\n    overflow: hidden;\n  }\n  \n  .contract-trigger:before {\n    width: 1200%;\n    height: 1200%;\n  }\n";
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lastDimensions = {
            width: null,
            height: null
        };
        _this.dps = new DpsLasted();
        _this.style = function () {
            var resizableStyle = document.querySelector('#resizableStyle');
            if (!resizableStyle) {
                _this.loadStyle(style);
            }
        };
        return _this;
    }
    Resizable.prototype.requestFrame = function (fn) {
        return (window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (innerFn) {
            return window.setTimeout(innerFn, 20);
        })(fn);
    };
    Resizable.prototype.cancelFrame = function (id) {
        return (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout)(id);
    };
    Resizable.prototype.componentDidMount = function () {
        var _this = this;
        this.style();
        this.resetTriggers();
        this.initialResetTriggersTimeout = window.setTimeout(function () { return _this.resetTriggers; }, 1000);
    };
    Resizable.prototype.componentWillUnmount = function () {
        clearTimeout(this.initialResetTriggersTimeout);
    };
    Resizable.prototype.componentDidUpdate = function () {
        this.resetTriggers();
    };
    Resizable.prototype.resetTriggers = function () {
        this.el = this.refs.resizable;
        var contract = this.refs.contract;
        var expandChild = this.refs.expandChild;
        var expand = this.refs.expand;
        this.el.parentNode.style.position = 'relative';
        contract.scrollLeft = contract.scrollWidth;
        contract.scrollTop = contract.scrollHeight;
        expandChild.style.width = expand.offsetWidth + 1 + 'px';
        expandChild.style.height = expand.offsetHeight + 1 + 'px';
        expand.scrollLeft = expand.scrollWidth;
        expand.scrollTop = expand.scrollHeight;
    };
    Resizable.prototype.onScroll = function () {
        if (this.r) {
            this.cancelFrame(this.r);
        }
        var that = this;
        this.r = this.requestFrame(function () {
            var dimensions = that.getDimensions();
            if (that.haveDimensionsChanged(dimensions)) {
                that.lastDimensions = dimensions;
                that.dps.run(function () {
                    that.props.onResize(dimensions);
                });
            }
        }.bind(this));
    };
    Resizable.prototype.getDimensions = function () {
        this.el = this.refs.resizable;
        return {
            width: this.el.parentNode.offsetWidth,
            height: this.el.parentNode.offsetHeight
        };
    };
    Resizable.prototype.haveDimensionsChanged = function (dimensions) {
        return dimensions.width !== this.lastDimensions.width || dimensions.height !== this.lastDimensions.height;
    };
    Resizable.prototype.loadStyle = function (css) {
        var style = document.createElement('style');
        style.id = 'resizableStyle';
        style.appendChild(document.createTextNode(css));
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    };
    Resizable.prototype.render = function () {
        var _this = this;
        var triggersClass = 'resize-triggers', expandClass = 'expand-trigger', contractClass = 'contract-trigger';
        var _a = this.props, onResize = _a.onResize, rest = __rest(_a, ["onResize"]);
        var props = Object.assign({}, rest, { onScroll: function () { return _this.onScroll(); }, ref: 'resizable' });
        return (React.createElement("div", __assign({}, props),
            React.createElement("div", { className: triggersClass },
                React.createElement("div", { className: expandClass, ref: "expand" },
                    React.createElement("div", { ref: "expandChild" })),
                React.createElement("div", { className: contractClass, ref: "contract" })),
            this.props.children));
    };
    return Resizable;
}(React.Component));
export { Resizable };
export default Resizable;
