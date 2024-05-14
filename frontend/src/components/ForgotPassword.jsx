import "./ForgotPassword.css";
import { useState, useEffect } from "react";
import axios from "axios";
const ForgotPassword = () => {
  const [credentials, setcredentials] = useState({ email: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setcredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
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
  const handleforgot = async (e) => {
    e.preventDefault();
    let data = {
      email: credentials.email,
    };
    try {
      await axios.post(
        "http://localhost:4000/api/v1/users/forgot-password",
        data,
        { withCredentials: true }
      );
      // toast.success("User LoggedIn Successfully");
      setcredentials({
        email: "",
      });
      // setErrors({});
      // navigate("/");
    } catch (error) {
      console.log(error, "couldnot post request for now");
      setcredentials({
        email: "",
      });
    }
  };
  return (
    <div className="form">
      <h1>Verify Account</h1>
      <form onSubmit={handleforgot}>
        <div className="field-wrap">
          <label>
            Email<span className="req">*</span>
          </label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          {/* {errors.email && <label className="error-message">{errors.email}</label>} */}
        </div>

        <p className="forgot">
          <a href="/signup">SignUp</a>
        </p>

        <button type="submit" className="button button-block">
          Submit
        </button>
        {/* {Loginerror && <p className="error-message">{Loginerror}</p>} */}
      </form>
    </div>
  );
};

export default ForgotPassword;
