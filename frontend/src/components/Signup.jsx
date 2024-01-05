import { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [activeTab, setActiveTab] = useState("signup");
    const [credentials, setcredentials] = useState({ email: "", password: "", username: "", reenterPassword: "" })
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
        console.log("I am changed")
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const formInputs = document.querySelectorAll(".form input, .form textarea");
        formInputs.forEach((input) => {
            input.addEventListener("keyup", handleInput);
            input.addEventListener("blur", handleInput);
            input.addEventListener("focus", handleInput);

            return () => {
                input.removeEventListener("keyup", handleInput);
                input.removeEventListener("blur", handleInput);
                input.removeEventListener("focus", handleInput);
            };
        });

        return () => {
            formInputs.forEach((input) => {
                input.removeEventListener("keyup", handleInput);
                input.removeEventListener("blur", handleInput);
                input.removeEventListener("focus", handleInput);
            });
        };
    });

    const handleInput = (e) => {
        const { type, value } = e.target;
        const label = e.target.previousElementSibling;

        if (type === "text" || type === "password" || type === "email") {
            if (value === "") {
                label.classList.remove("active", "highlight");
            } else {
                label.classList.add("active", "highlight");
            }
        }
    };

    const handleRegister = async (e) => {
        console.log("hi");
        e.preventDefault();
        let data = {
            email: credentials.email,
            password: credentials.password,
            username: credentials.username,
        }
        try {
            const res = await axios.post("http://localhost:4000/api/v1/users/register", data);
            console.log(res);
            toast.success("User Registered Successfully");
            setcredentials({
                email: "",
                password: "",
                username: "",
                reenterPassword: ""
            });
        } catch (error) {
            console.error("Error during Registering", error);
        }
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        let data;
        if (credentials.email.includes("@")) {
            data = {
                email: credentials.email,
                password: credentials.password,
            };
        } else {
            data = {
                username: credentials.email,
                password: credentials.password,
            };
        }
        try {
            const res = await axios.post("http://localhost:4000/api/v1/users/login", data, { withCredentials: true });
            console.log(res);
            toast.success("User LoggedIn Successfully");
            setcredentials({
                email: "",
                password: ""
            });
            navigate("/");
        } catch (error) {
            console.error("Error during login:", error);
        }
    }

    return (
        <>
            <div className="form">
                <ul className="tab-group">
                    <li className={`tab ${activeTab === "signup" ? "active" : ""}`}>
                        <a onClick={() => handleTabClick("signup")}>Sign Up</a>
                    </li>
                    <li className={`tab ${activeTab === "login" ? "active" : ""}`}>
                        <a href="#Login" onClick={() => handleTabClick("login")}>Log In</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div id="signup" style={{ display: activeTab === "signup" ? "block" : "none" }}>
                        <h1>Sign Up for Free</h1>
                        <form onSubmit={handleRegister} >
                            <div className="top-row"></div>
                            <div className="field-wrap">
                                <label>
                                    Email Address<span className="req">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Username<span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={credentials.username}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Password<span className="req">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Re-enter Password<span className="req">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="reenterPassword"
                                    value={credentials.reenterPassword}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <button type="submit" className="button button-block">
                                Get Started
                            </button>
                        </form>
                    </div>

                    <div
                        id="login"
                        style={{ display: activeTab === "login" ? "block" : "none" }}
                    >
                        <h1>Welcome Back!</h1>
                        <form>
                            <div className="field-wrap">
                                <label>
                                    Email/Username<span className="req">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <div className="field-wrap">
                                <label>
                                    Password<span className="req">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete="off"
                                />
                            </div>

                            <p className="forgot">
                                <a href="#">Forgot Password?</a>
                            </p>

                            <button type="submit" onClick={handleLogin} className="button button-block">
                                Log In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;