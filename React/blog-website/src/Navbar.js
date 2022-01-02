import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>The BF Blog</h1>
            <div className="links">
                { /* using "Link to" doesn't make new request every time as "a href" does, so "Link to" is faster */}
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
}

export default Navbar;