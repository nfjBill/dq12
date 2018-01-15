var DpsLasted = /** @class */ (function () {
    function DpsLasted() {
        this.delay = 200;
    }
    DpsLasted.prototype.run = function (callback) {
        if (this.interval) {
            clearTimeout(this.interval);
        }
        this.interval = window.setTimeout(function () {
            callback();
        }, this.delay);
    };
    return DpsLasted;
}());
export { DpsLasted };
