# React
## DOM = Document Object Model
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

## Hooks (https://beta.reactjs.org/reference/react)
### useState()
* A state variable to retain the data between renders
* The set function only updates the state variable for the next render (**calling the set function does not change the current state in the already executing code**)
* Usage
  * Adding state to a component: `const [name, setName] = useState('Taylor');`
  * Updating state based on the previous state: `setAge(age + 1);` or `setAge(a => a + 1);`
  * Updating objects and arrays in state
    * In React, state is considered read-only, so you should replace it rather than mutate your existing objects
    * Don't mutate an object in state like this: `form.firstName = 'Taylor';`
    * Replace state with a new object: `setForm({ ...form, firstName: 'Taylor' });`
  * Avoiding recreating the initial state: React saves the initial state once and ignores it on the next renders
### useEffect()
* Let you synchronize a component with an external system
* Call at the top level of your component to declare an Effect (return `undefined`)
* Usage: synchronize between React and outside
```ts
// Dependency
// Pass nothing
useEffect(() => {
  // Runs on every render
});

// Pass an empty array
useEffect(() => {
  // Runs only on the first render
}, []);

// Pass props or state values
useEffect(() => {
  // Runs on the first render and any time any dependency value changes
}, [prop, state]);

// Connect to an external system
function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useEffect(() => {
  	const connection = createConnection(serverUrl, roomId);
    connection.connect();
  	return () => {
      connection.disconnect();
  	};
  }, [serverUrl, roomId]);
}

// Wrapping Effects in custom Hooks
function useChatRoom({ serverUrl, roomId }) {
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}
``` 
### useContext()
* Let you read and subscribe to context from your component
* Call at the top level of your component to read and subscribe to context
* Always looks for the closest provider above the component that calls it
* It searches upwards and does not consider providers in the component from which you’re calling
```ts
function MyComponent() {
  const theme = useContext(ThemeContext);
}
```
### useCallback()
* Let you cache a function definition between re-renders
* Call at the top level of your component to **cache a function definition** between re-renders
* **You should only rely on it as a performance optimization**
* React will not throw away the cached function unless there is a specific reason to do that
* By default, when a component re-renders, React re-renders all of its children recursively
```ts
export function useToggle(on: boolean): [boolean, () => void] {
  const [onOrOff, setOnOrOff] = useState(on);
  const toggle = useCallback(() => setOnOrOff(prev => !prev), []);
  return [onOrOff, toggle]
}

function ProductPage({ productId, referrer, theme }) {
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails,
    });
  }, [productId, referrer]);
}
```
### useRef()
* Persist values between renders
* Used to store a mutable value that does not cause a re-render when updated
* Used to access a DOM element directly
```ts
export function useIsFirstRender(): boolean {
  const isFirstRender = useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false;
    return true;
  }
  return false;
}

export function usePrevious<T>(value: T): T | undefined {
  /* The ref object is a generic container whose current property is mutable
  and can hold any value, similar to an instance property on a class */
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
```

## Memo()
* Skip rendering a component if its props have not changed
* Improve performance
```ts
const B = memo(() => {
  console.log('B')
  return <C/>
})
```

## Function vs Class
| Aspect | Function | Class |
|:-------|:---------|:------|
| param | accept props as an argument | extend from React.Component |
| return | return a React element(JSX) | create a render function which returns a React element |
| state | stateless, simply accept data and display in some form | stateful, implement logic and state |
| constructor | no | yes |
| when to use | lighter, most of the time | heavier, preferred when require the state of the component |

## Use Module for Scalibility
* Group a set of related components, methods and assets together, providing a public interface to be used by other modules
* A module is a series of components, whereas a component is a single part

## Process
* `async`: promise-based, try to resolve data as close as possible to where it will be used
* `dynamic`: hold off loading some parts of a web page until a user needs them
* `static`: preserve value even out of scope, can pass a static variable to the child component and it will act as a constant value
