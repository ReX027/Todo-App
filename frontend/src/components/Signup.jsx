import { useState, useEffect } from "react";
import "./Signup.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("signup");
    const [credentials, setcredentials] = useState({ email: "", password: "", username: "", reenterPassword: "" })
    const [errors, setErrors] = useState({});
    const [existedUsererror, setErrorMessageUser] = useState('');
    const [existedEmailerror, setErrorMessageEmail] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setcredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value
        }));
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
        e.preventDefault();
        let errors = {};
        if (!credentials.username.trim()) {
            errors.username = "Username is required"
        }
        if (!credentials.email) {
            errors.email = "Email is required"
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email)) {
            errors.email = "Email address is invalid"
        }
        if (!credentials.password) {
            errors.password = "Password is required"
        } else if (credentials.password.length < 6) {

            errors.password = "Password needs to be more than 5 characters"
        }
        if (!credentials.reenterPassword) {
            errors.reenterPassword = "Password is required"
        } else if (credentials.reenterPassword !== credentials.password) {
            errors.reenterPassword = "Passwords do not match"
        }
        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            const parser = new DOMParser();
            let data = {
                email: credentials.email,
                password: credentials.password,
                username: credentials.username,
            }
            try {
                await axios.post("http://localhost:4000/api/v1/users/register", data);
                toast.success("User Registered Successfully");
                setErrorMessageUser('');
                setErrorMessageEmail('');
                setcredentials({
                    email: "",
                    password: "",
                    username: "",
                    reenterPassword: ""
                });
                setErrors({});
            } catch (error) {
                const doc = parser.parseFromString(error.response.data, 'text/html');
                const extractedErrorMessage = doc.querySelector('pre').textContent.trim();
                const usernameerror = extractedErrorMessage.slice(7, 30)
                if (usernameerror === "Username already exists") {
                    setErrorMessageUser(usernameerror)
                    setErrorMessageEmail('');
                } else {
                    setErrorMessageEmail("Email already exists")
                    setErrorMessageUser('');
                }
            }

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
            await axios.post("http://localhost:4000/api/v1/users/login", data, { withCredentials: true });
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

                                    autoComplete="off"
                                />
                                {errors.email && <label className="error-message">{errors.email}</label>}
                                {existedEmailerror && <label className="error-message">{existedEmailerror}</label>}
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

                                    autoComplete="off"
                                />
                                {errors.username && <label className="error-message">{errors.username}</label>}
                                {existedUsererror && <label className="error-message">{existedUsererror}</label>}
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

                                    autoComplete="off"
                                />
                                {errors.password && <label className="error-message">{errors.password}</label>}
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

                                    autoComplete="off"
                                />
                                {errors.reenterPassword && <label className="error-message">{errors.reenterPassword}</label>}
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