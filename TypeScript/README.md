# TypeScript
## Key
We are not compiling TypeScript, but its JavaScript  
1. ```tsc main.ts``` and ```node main.js```
2. ```tsc main --watch``` and ```node main``` (this would auto update changes from .ts to .js)
3. Debugging with Chrome: Chrome uses JavaScript, so we need to add ```sourceMap: True``` in tsconfig.json to see issues in .ts directly

## Background
TypeScript is a superset of JavaScript (TS supports every JS, and with more functions).  
TypeScript has strong typing, object-oriented features, compile-time errors and great tooling.  
TypeScript ---Transpile---> JavaScript (for browser to understand)  

## Async Functions & Await
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

## Map
```ts
var map = new Map([["a",10], ["b",20], ["c",30]]);
map.set("d",40);
for (let entry of map.entries()) { // entry = key-value pair, also have map.keys() and map.values()
    console.log(entry[0], entry[1]);
}

let arr = [...map.keys()]; 
console.log(arr); // gives ["a","b","c","d"]

var map1 = new Map().set(1,'a').set(2,'b').set(3,'c').set(4,'d');
let map2 = new Map([...map1].filter(([k, v]) => k < 4)); 
```

## map()
```ts
let newValues = values.map((v, i) => {
    return [v*v, v*v*v, v+1]; // i is the "key", but not necessarily needed
}); 
```

## Sorting
```ts
var rawData = getData().sort((n1,n2) => {
    if (n1.region > n2.region) {
        return 1;
    }
    return -1;
});
```

## Array
```ts
rawData = rawData.filter(function(param) { return param.model === currentModel });
rawData.push("all");

// getData() returns [{region: xxx, model: yyy, total: aaa, expected: bbb}, ...]
var allRegions = getData().map((obj) => obj.region));
```

## Set
```ts
var uniqueRegions = new Set<string>(getData().map((obj) => obj.region));
```
