import { useState } from "react";
import { useHistory } from 'react-router-dom';
import URL from "./URL";

const Create = () => {
    const [title, setTitle] = useState('Welcome');
    const [body, setBody] = useState('Content Here');
    const [author, setAuthor] = useState('J');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault(); //prevent the page refresh
        const blog = { title, body, author };

        setIsPending(true);

        fetch(URL(), {
            method: 'POST', //POST will automatically generate the id
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog) //we need to pass a json string, and this convert an object to a json string
        }).then(() => {
            setIsPending(false);
            //history.go(-1); //go back to the previous page
            history.push('/');
        });
    }

    return (
        <div className="create">
            <h2>Add A New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title: </label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}></input>
                <label>Blog Body: </label>
                <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
                <label>Blog Author: </label>
                <select value={author} onChange={(e) => setAuthor(e.target.value)}>
                    <option value={"R"}>R</option>
                    <option value={"J"}>J</option>
                    <option value={"T"}>T</option>
                    <option value={"D"}>D</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding Your Blog</button>}
            </form>
        </div>
    );
}

export default Create;