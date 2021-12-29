# Key
We are not compiling TypeScript, but its JavaScript  
1. ```tsc main.ts``` and ```node main.js```
2. ```tsc main --watch``` and ```node main``` (this would auto update changes from .ts to .js)
3. Debugging with Chrome: Chrome uses JavaScript, so we need to add ```sourceMap: True``` in tsconfig.json to see issues in .ts directly

# Background
TypeScript is a superset of JavaScript (TS supports every JS, and with more functions).  
TypeScript has strong typing, object-oriented features, compile-time errors and great tooling.  
TypeScript ---Transpile---> JavaScript (for browser to understand)  

# Async Functions & Await
This allows us to utilize the ```await``` keyword in front of an express that will return a promise and pause the execution of the function until the ```await```-ed promise resolves with a result.  
The ```async``` keyword will still return a promise which can be used in conjunction with something like ```Promise.all()```. This gives us the flexibility to run our asynchronous functions in an asynchronous manner whilst ensuring the execution within those functions remains synchronous.  
eg. 
```
async function myAsyncFunction(input: number) {
  let result = await setTimeout(() => {
    console.log("Function: %d executed", input);
  }, 1000 * input);
}
Promise.all([myAsyncFunction(3), myAsyncFunction(2), myAsyncFunction(1)]);
``` 
will return 
```
[Node] [nodemon] starting `node dist/app.js`
[Node] Function: 1 executed
[Node] Function: 2 executed
[Node] Function: 3 executed
```
