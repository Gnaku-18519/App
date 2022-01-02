import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Not Found</h1>
            <h2>Sorry, this page cannot be found</h2>
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default NotFound;