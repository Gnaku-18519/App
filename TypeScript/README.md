# TypeScript
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
