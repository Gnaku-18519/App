/* With "Simple React Snippets" extension 
 * we could use "sfc" (stateless function component) to create a function template
 */

import { useState, useEffect } from "react"; //Hook
import BlogList from "./BlogList";
import useFetch from "./useFetch";
import URL from "./URL";

const Home = () => {
    const handleClick = () => {
        console.log('Hello');
    }

    const handleClickWithParam = (name, e) => {
        console.log("Hello" + name, e.target); //Output: HelloJT <button>​Click Again​</button>​
    }

    const [name, setName] = useState('Richard');
    const handleClickChangeName = () => {
        setName('Jason');
    }

    const [initBlogs, setInitBlogs] = useState([
        { title: 'Blog1', body: 'This is blog1', author: 'R', id: 1 },
        { title: 'Blog2', body: 'This is blog2', author: 'J', id: 2 },
        { title: 'Blog3', body: 'This is blog3', author: 'J', id: 3 }
    ]);

    const handleHide = (id) => {
        const newBlogs = initBlogs.filter(blog => blog.id !== id);
        setInitBlogs(newBlogs);
    }

    useEffect(() => {
        console.log("This function initially runs for EVERY RENDER, and now runs depending on name changes");
    }, [name]); //the second parameter is the dependency -> the function runs when the dependency changes

    const { data: blogs, isPending, error } = useFetch(URL());

    return (
        <div className="home">
            <h2>Homepage</h2>
            <button onClick={handleClick}>Click Here</button>
            <button onClick={(e) => { //'e' stands for event
                handleClickWithParam('JT', e) //Wrapped in an anonymous function, so handleClickWithParam() won't be invoke at the very beginning
            }}>Click Again</button>

            <p>{name}</p>
            <button onClick={handleClickChangeName}>Change Name</button>

            {error && <h2>{error}</h2>}
            {isPending && <h1>Loading...</h1>}
            {blogs && <BlogList blogs={blogs} title="All Blogs:" handleHide={handleHide}></BlogList> /* when blogs === null, do not pass on */}
            {blogs && <BlogList blogs={blogs.filter((blog) => blog.author === 'J')} title="J's Blogs:" handleHide={handleHide}></BlogList>}
        </div>
    );
}

export default Home;