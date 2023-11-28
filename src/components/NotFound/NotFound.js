import { Link } from "react-router-dom";

function NotFound() {
    return (
        <div className="container-fluid text-bg-dark bg-dark-subtle mt-5">
            <h2>Swing and a miss!</h2>
            <h3>404</h3>
            <h5>Page not found.</h5>
            <Link className="btn btn-primary" to='/home'>Take me home!</Link>
        </div>
    )
}

export default NotFound;