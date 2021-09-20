//Need to add "export" to let the class be visible outside of this file
export class ModulePoint {
    constructor(private _x?: number, public y?: number) {}

    print() {
        console.log('Get elements from another module, X: ' + this._x + ", Y: " + this.y);
    }
}