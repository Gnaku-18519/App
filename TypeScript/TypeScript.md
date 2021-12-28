# Key
We are not compiling TypeScript, but its JavaScript  
1. ```tsc main.ts``` and ```node main.js```
2. ```tsc main --watch``` and ```node main``` (this would auto update changes from .ts to .js)
3. Debugging with Chrome: Chrome uses JavaScript, so we need to add ```sourceMap: True``` in tsconfig.json to see issues in .ts directly
# Notes
TypeScript is a superset of JavaScript (TS supports every JS, and with more functions).  
TypeScript has strong typing, object-oriented features, compile-time errors and great tooling.  
TypeScript ---Transpile---> JavaScript (for browser to understand)  
