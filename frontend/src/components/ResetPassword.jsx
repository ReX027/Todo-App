import "./ResetPassword.css";
import { useState, useEffect } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [credentials, setcredentials] = useState({ password: "" });
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
  const handleReset = async (id, e) => {
    e.preventDefault();
    let data = {
      password: credentials.password,
    };
    try {
      await axios.post(
        `http://localhost:4000/api/v1/users/reset-password/${id}`,
        data,
        { withCredentials: true }
      );
      // toast.success("User LoggedIn Successfully");
      setcredentials({
        password: "",
      });
      // setErrors({});
      // navigate("/");
    } catch (error) {
      console.log(error, "couldnot post request for now");
      setcredentials({
        password: "",
      });
    }
  };
  return (
    <div className="form">
      <h1>Reset Password</h1>
      <form onSubmit={handleReset}>
        <div className="field-wrap">
          <label>
            New Password<span className="req">*</span>
          </label>
          <input
            type="text"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
            autoComplete="off"
          />
          {/* {errors.email && <label className="error-message">{errors.email}</label>} */}
        </div>
        <button type="submit" className="button button-block">
          Submit
        </button>
        {/* {Loginerror && <p className="error-message">{Loginerror}</p>} */}
      </form>
    </div>
  );
};

export default ResetPassword;
