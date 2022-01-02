import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from "react-router-dom";
import URL from "./URL";

const BlogDetails = () => {
    const { id } = useParams(); //grasp parameters from Route
    const { data: blog, isPending, error } = useFetch(URL() + id);
    const history = useHistory();

    const handleDelete = () => {
        fetch(URL() + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        });
    }

    return (
        <div className="blog-details">
            {error && <h2>{error}</h2>}
            {isPending && <h1>Loading...</h1>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <div>{blog.body}</div>
                    <button onClick={handleDelete}>Delete This Blog</button>
                </article>
            )}
        </div>
    );
}

export default BlogDetails;