# React
## Use `npx tsc --noEmit` from the repo root directory (report all errors across the project)
## Use `npm run build` to mimic what our build server does (only report one error at a time)

## Hoisting
JavaScript Hoisting refers to the process whereby the interpreter appears to move the declaration of functions, variables or classes to the top of their scope, prior to execution of the code

## Const `const Report = () => {};` vs Function `function Report() {}`
1. Prefer Const
2. `Const` == Anonymous Function, `function` == Named Function
3. In certain cases, const functions can show as anonymous in profiling / call stacks
4. Function has some unique scoping rules that can lead to trouble if not carefully use `this`, eg.
```ts
const admins = db.filterUsers(function (this: User) {
  return this.admin;
});
```

## Named Export vs Default Export
```ts
// Named, usually preferred
export const Report = () => {};
import { Report } from './Report';
 
// Default, used in root pages / components due to NextJS requirement
const Report = () => {};
export default Report;
// import hardToFindReport from './Report';
//     this leads us to name things twice, and
//     it is easier to change the name of the export which can make it harder to find usages
```

## Use index.js files to allow import of files from a directory
```ts
// usually preferred
// components/index.js
import { ComponentA } from './ComponentA';
import { ComponentB } from './ComponentB';
export { ComponentA, ComponentB };

import { ComponentA, ComponentB } from '@/components';
//     selectively -- this introduces overhead
//     for use when a collection of similar files exist and want to treat more like a library than searching through a local directory
```

## Interface vs Type
* **Rule of thumb: start with interface until you find you need to use type**
* Interface == often used to say what shape a variable should take (what props it should have)
* Type == often used to say this thing should be one of these things, with | used to say this OR that)
```ts
type Model = 'S' | '3' | 'X' | 'Y';
let model: Model;
```

## Recoil Atoms / Selectors
* Recoil lets you create a data-flow graph that flows from atoms (shared state) through selectors (pure functions) and down into your React components
  * advantage: help eliminate the unnecessary re-renders which happens while using the Context API or Redux (eg. change the state of context, but not data)
* Atoms are units of state that components can subscribe to
* Selectors transform this state either synchronously or asynchronously
```ts
const fontSizeState = atom({
  key: 'fontSizeState',
  default: 14,
});
const [fontSize, setFontSize] = useRecoilState(fontSizeState);

const fontSizeLabelState = selector({
  key: 'fontSizeLabelState',
  get: ({get}) => {
    const fontSize = get(fontSizeState);
    const unit = 'px';

    return `${fontSize}${unit}`;
  },
});
const fontSizeLabel = useRecoilValue(fontSizeLabelState);
```

## Type React Components with Props
* The most consistent / reliable way to type the props object is to leverage React.VFC
```ts
export const IDCard: React.VFC<{
  age: number;
  name: string;
  role: 'Software Engineer' | 'Data Engineer';
}> = ({ name, role, age }) => {
  return (
    <div>
      ...
    </div>
  );
};
```

