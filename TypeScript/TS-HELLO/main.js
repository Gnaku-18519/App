"use strict";
/**Preparation Process:
 * >mkdir ts-hello
 * >cd ts-hello
 * >code main.ts
 * >tsc main.ts //this will compile TS and get main.js
 * >node main.js //see how main.js looks like
 */
Object.defineProperty(exports, "__esModule", { value: true });
function log(text) {
    console.log(text);
}
var text = 'Hello World';
log(text);
//Two ways of declaring a variable
var number = 1; //a variable declared with "var" keyword is scoped to the nearest function
var num = 2; //the variable is only valid for its block
function wordVar() {
    for (var i = 0; i < 5; i++) {
        console.log(i);
    }
    console.log('Finally, ' + i); //declaring var i in the loop before, but i is still meaningful outside of that loop
    //Here, the nearest function of var i is wordVar(), so i is valid within wordVar()
    //If we replace "var" with "let" here, TypeScript will get an error (during the compilation step);
    //however, it could still generate a JavaScript code by automatically replacing "let" back to "var" (as there is no "let" in JS)
}
wordVar();
var test; //now test could be any type (number, boolean, string, char, ...)
var a;
var b;
var c;
var d;
var e = [1, 2, 3];
var f = [1, true, 'a']; //not good, but possible
var ColorRed = 0;
var ColorYellow = 1;
var ColorBlue = 2;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var backgroundColor = Color.Blue;
//The endsWith() needs to be compiled with >tsc --target ES6 "main.ts"
/*
let message = 'abc';
let endsWithC = message.endsWith('c');
//How to do type assertion:
//let anyType; <- the type would be any
//1. (<string>anyType).doSomething()
//2. (anyType as string).doSomething()
let testType;
testType = 'abc'; //although the value of testType is stated here, testType is still an any type
let check1 = (<string>testType).endsWith('b');
let check2 = (testType as string).endsWith('b');
*/
//Interact with Angular
var ang = function (message) {
    console.log(message);
};
var doLog = function (message) {
    console.log(message);
};
//In-Line Annotation -> could work, but Interface would be better
var drawPoint = function (point) {
    //...
};
drawPoint({
    x: 1,
    y: 2
});
var drawPoint2 = function (point) {
    //...
};
//Class: groups variables (properties) and functions (methods) that are highly related
var Point = /** @class */ (function () {
    function Point() {
    }
    Point.prototype.draw = function () {
        //no need to include parameters, x and y can be directly used
        console.log('Class point has X: ' + this.x + ', Y: ' + this.y);
    };
    Point.prototype.getDistance = function (anotherPoint) {
        //...
    };
    return Point;
}());
var point = new Point();
point.x = 1;
point.y = 2;
point.draw();
//Constructor
var Point2 = /** @class */ (function () {
    function Point2(_x, y) {
        //'?' makes the parameter OPTIONAL
        this.x = _x; //add '_' emphasizes that it is a variable, and there could be another x() method / property
        this.y = y;
    }
    //The above can be simplified as: constructor(private _x?: number, public y?: number) {}
    Point2.prototype.draw = function () {
        //no need to include parameters, x and y can be directly used
        console.log('Constructor point has X: ' + this.x + ', Y: ' + this.y);
    };
    Point2.prototype.getDistance = function (anotherPoint) {
        //...
    };
    //Method
    Point2.prototype.getX = function () {
        return this.x;
    };
    Object.defineProperty(Point2.prototype, "X", {
        //Property (equivalent to the Method getX())
        //Note that Accessors are only available when targeting ECMAScript 5 and higher -> needs >tsc -t es5 main.ts
        get: function () {
            return this.x;
        },
        //Property (equivalent to the Method setX())
        set: function (value) {
            if (value < 0) {
                throw new Error('value cannot be less than 0');
            }
            this.x = value;
        },
        enumerable: false,
        configurable: true
    });
    //Method
    Point2.prototype.setX = function (value) {
        if (value < 0) {
            throw new Error('value cannot be less than 0');
        }
        this.x = value;
    };
    return Point2;
}());
var point1 = new Point2(3, 4);
//As x is private, we cannot modify point1.x, but we can modify point2.x
var point2 = new Point(); //no error without parameters as they are optional
point2.x = 5;
point2.y = 6;
point.draw();
//getX() and setX() cannot be used in point2
var xx = point1.getX();
point1.setX(10);
var xxx = point1.X; //clear syntax, but works the same
point1.X = 10;
//Module
var module_1 = require("./module"); //if multiple imports are needed, split them with comma
var point3 = new module_1.ModulePoint(7, 8);
point3.print();
