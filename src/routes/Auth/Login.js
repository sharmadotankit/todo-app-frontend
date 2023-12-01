import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { login } from "../../utils/actions/authActions";
import { ApplicationContext } from "../../context/context";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const { setCurrentUser } = useContext(ApplicationContext);



  const [error, setError] = useState("");
  
  const handleUserInfoChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnLogin = async () => {
    try {
      setError("");
      const { email, password } = userData;
      if (
        !email ||
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
      ) {
        setError("Enter a valid email");
        return;
      }

      if (!password) {
        setError("Enter a valid password");
        return;
      }

      let response = await login(userData);
      if (response.status) {
        setCurrentUser({
          name: response?.data?.name,
          email: response?.data?.email,
          token: response?.data?.token,
          _id: response?.data?._id,
          isLoggedIn: true,
        });

        localStorage.setItem("name", response?.data?.name);
        localStorage.setItem("email", response?.data?.email);
        localStorage.setItem("_id", response?.data?._id);
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        localStorage.setItem("isLoggedIn", true);

        toast.success("User login successful");
        navigate("/home");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  const onKeyDown = (e) => {
    const code = e.keyCode ? e.keyCode : e.which;
    if (code == 13) {
      e.preventDefault();
      handleOnLogin();
    }
  };

  return (
    <>
      <div className="signUpDiv">
        <div className="container-signup">
          <h1 className="signup-heading">Login</h1>
          <p className="signup-heading">
            Please fill in this form to login to your account.
          </p>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            name="email"
            value={userData.email}
            id="email"
            onChange={handleUserInfoChange}
            onKeyDown={onKeyDown}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span>
              <label htmlFor="psw-repeat">
                <b>Password</b>
              </label>
            </span>
          </div>

          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="psw-repeat"
            value={userData.password}
            onChange={handleUserInfoChange}
            onKeyDown={onKeyDown}
          />
          {error && error === "Enter a valid password" ? (
            <div style={{ color: "red", fontSize: "14px" }}>
              <p>Password must be : </p>
              <li>at least 8 character long</li>
              <li>at least 1 symbol</li>
              <li>at least 1 lower case</li>
              <li>at least 1 upper case</li>
            </div>
          ) : null}

          <button type="submit" className="registerbtn" onClick={handleOnLogin}>
            Login
          </button>

          <div className="">
            <p>
              Do not have an account?{" "}
              <Link to="/signup" className="button-link">
                Register
              </Link>
              .
            </p>
            {error ? (
              <h4 style={{ color: "red", marginTop: "20px" }}>{error}</h4>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
