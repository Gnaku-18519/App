import { Link } from 'react-router-dom';

const BlogList = (props) => {
    //props helps passing parameters from parent to child
    const blogs = props.blogs;
    const title = props.title;
    const handleHide = props.handleHide;

    return (
        <div className="blog-list">
            <h3>{title}</h3>
            {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>
                        <h2>{blog.title}</h2>
                    </Link>
                    <p>Written by {blog.author}</p>
                    <button onClick={() => handleHide(blog.id)}>Hide Blog</button>
                </div>
            ))}
        </div>
    );
}

export default BlogList;