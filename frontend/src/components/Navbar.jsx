// import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import axios from "axios";
import toast from "react-hot-toast";
// import { Context, server } from "../main";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        let accessTokenCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('accessToken='));
        if (accessTokenCookie) {
            setIsAuthenticated(true);
        }
    }, [location]);

    const logoutHandler = async () => {
        const accessToken = document.cookie.split('; ')
        console.log(accessToken)
        axios
            .post("http://localhost:4000/api/v1/users/logout", [], {
                withCredentials: true
            })
            .then((response) => {
                console.log(response);
                toast.success("Logged Out Successfully");
                setIsAuthenticated(false);
                navigate("/");
            })
            .catch((error) => {
                console.error("Error during logout:", error);
            });
    };
    return (
        <>
            <header>
                <nav className="Navbar">
                    <div>
                        <h2>Todo App</h2>
                    </div>
                    <article>
                        <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to={"/"}>
                            Home
                        </Link>
                        <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to={"/about"}>
                            About
                        </Link>
                        {isAuthenticated ? (
                            <Link
                                className={`nav-link ${location.pathname === "/logout" ? "active" : ""}`} to={"/"}
                                // disabled={loading}
                                onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link className={`nav-link ${location.pathname === "/signUp" ? "active" : ""}`} to={"/signUp"}>
                                Signup
                            </Link>
                        )}
                    </article>
                </nav>
            </header>
        </>
    );
};

export default Navbar;