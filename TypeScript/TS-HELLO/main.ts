/**Preparation Process:
 * >mkdir ts-hello
 * >cd ts-hello
 * >code main.ts
 * >tsc main.ts //this will compile TS and get main.js
 * >node main.js //see how main.js looks like
 */

export {}; //in order to prevent functions to be in global scope, add "export {};" on top (or just export this function)

function log(text) {
    console.log(text);
}
var text = 'Hello World';
log(text);

//Two ways of declaring a variable
var number = 1; //a variable declared with "var" keyword is scoped to the nearest function
let num = 2; //the variable is only valid for its block

function wordVar() {
    for (var i=0; i<5; i++) {
        console.log(i);
    }
    console.log('Finally, ' + i); //declaring var i in the loop before, but i is still meaningful outside of that loop
    //Here, the nearest function of var i is wordVar(), so i is valid within wordVar()
    //If we replace "var" with "let" here, TypeScript will get an error (during the compilation step);
    //however, it could still generate a JavaScript code by automatically replacing "let" back to "var" (as there is no "let" in JS)
}
wordVar();

let test; //now test could be any type (number, boolean, string, char, ...)
let a: number;
let b: boolean;
let c: string;
let d: any;
let e: number[] = [1,2,3];
let f: any[] = [1, true, 'a']; //not good, but possible

const ColorRed = 0;
const ColorYellow = 1;
const ColorBlue = 2;

enum Color {Red = 0, Yellow = 1, Blue = 2};
let backgroundColor = Color.Blue;

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
let ang = function(message) {
    console.log(message);
}
let doLog = (message) => {
    console.log(message);
}

//In-Line Annotation -> could work, but Interface would be better
let drawPoint = (point: {x: number, y: number}) => {
    //...
}
drawPoint({
    x: 1,
    y: 2
})

//Interface
interface Point {
    x: number,
    y: number,
}
let drawPoint2 = (point: Point) => {
    //...
}

//Class: groups variables (properties) and functions (methods) that are highly related
class Point {
    x: number;
    y: number;

    draw() {
        //no need to include parameters, x and y can be directly used
        console.log('Class point has X: ' + this.x + ', Y: ' + this.y);
    }
    
    getDistance(anotherPoint: Point) {
        //...
    }
}
let point = new Point();
point.x = 1;
point.y = 2;
point.draw();

//Constructor
class Point2 {
    //Access Modifier: public, private, protected
    private x: number;
    y: number;

    constructor(_x?: number, y?: number) {
        //'?' makes the parameter OPTIONAL
        this.x = _x; //add '_' emphasizes that it is a variable, and there could be another x() method / property
        this.y = y;
    }

    //The above can be simplified as: constructor(private _x?: number, public y?: number) {}

    draw() {
        //no need to include parameters, x and y can be directly used
        console.log('Constructor point has X: ' + this.x + ', Y: ' + this.y);
    }
    
    getDistance(anotherPoint: Point) {
        //...
    }

    //Method
    getX() {
        return this.x;
    }
    //Property (equivalent to the Method getX())
    //Note that Accessors are only available when targeting ECMAScript 5 and higher -> needs >tsc -t es5 main.ts
    get X() { //this is not a method anymore
        return this.x;
    }

    //Method
    setX(value) {
        if (value < 0) {
            throw new Error('value cannot be less than 0');
        }
        this.x = value;
    }
    //Property (equivalent to the Method setX())
    set X(value) {
        if (value < 0) {
            throw new Error('value cannot be less than 0');
        }
        this.x = value;
    }
}
let point1 = new Point2(3, 4);
//As x is private, we cannot modify point1.x, but we can modify point2.x
let point2 = new Point(); //no error without parameters as they are optional
point2.x = 5;
point2.y = 6;
point.draw();

//getX() and setX() cannot be used in point2
let xx = point1.getX();
point1.setX(10);
let xxx = point1.X; //clear syntax, but works the same
point1.X = 10;

//Module
import {ModulePoint} from './module'; //if multiple imports are needed, split them with comma
let point3 = new ModulePoint(7, 8);
point3.print();