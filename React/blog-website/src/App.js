import Navbar from './Navbar';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';

function App() {
  //All before "return ()" are JS codes
  //const likes = 50;
  //const person = { name: 'JT', age: 22 }; -> React directly transform numbers, strings, arrays into strings, but it cannot transform booleans or objects

  /* Here is a JSX file (JSX template), not HTML, where JSX will do auto translation
   * Use "ClassName" instead of "Class", as "Class" is a reserved key word in JavaScript
   */
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/create">
              <Create></Create>
            </Route>
            <Route path="/blogs/:id">
              <BlogDetails></BlogDetails>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
          {/*<p>Liked {likes} times</p>*/}
        </div>
      </div>
    </Router>
  );
}

export default App; //export so we could use this template elsewhere
