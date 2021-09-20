"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulePoint = void 0;
//Need to add "export" to let the class be visible outside of this file
var ModulePoint = /** @class */ (function () {
    function ModulePoint(_x, y) {
        this._x = _x;
        this.y = y;
    }
    ModulePoint.prototype.print = function () {
        console.log('Get elements from another module, X: ' + this._x + ", Y: " + this.y);
    };
    return ModulePoint;
}());
exports.ModulePoint = ModulePoint;
