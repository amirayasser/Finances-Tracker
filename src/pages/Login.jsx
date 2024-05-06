import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GoBack from "../utilities/GoBack";
import LogInSVG from "../components/svgs/LogIn";
import { loginWithEmailAndPassword } from "../firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginProcess = await loginWithEmailAndPassword(
        user.email,
        user.password
      );
      if (loginProcess.success) {
        setUser({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/home");
      } else {
        console.log("Login error:", loginProcess.error);
        setLoginError(loginProcess.error); // Ensure this sets the error state correctly
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setLoginError("An error occurred. Please try again later.");
    }
  };

  const IpStyling = {
    minWidth: "350px",
    width: "70%",
    padding: "10px",
    borderColor: loginError ? "#f01717" : "#E7B10A",
    boxShadow: loginError ? "0 0 3px 1px #f01717" : "none",
    borderRadius: "25px",
    background: "#EEF0E5",
    color: "#163020",
    outlineColor: "#B6C4B6",
  };

  return (
    <div
      style={{
        background: "#304D30",
        color: "#EEF0E5",
        height: "100vh",
        display: "flex",
        flexDirection: "row-reverse",
        padding: "10px 20px",
      }}
    >
      <LogInSVG />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "55%",
          flexGrow: 2,
        }}
      >
        <GoBack
          addStyling={{
            alignSelf: "start",
            position: "absolute",
            top: "30px",
            left: "22px",
          }}
        />
        <h2
          style={{
            margin: "40px 0",
            color: "#E7B10A",
          }}
        >
          welcome back
        </h2>
        <p>hey you're back, fill in your details to get back in</p>

        <form onSubmit={handleSubmit}>
          <input
            style={IpStyling}
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            autoComplete="off"
          />
          <input
            style={IpStyling}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="password"
            autoComplete="new-password"
          />

          <p
            style={{
              width: "70%",
              minWidth: "350px",
              padding: " 10px",
              textAlign: "end",
            }}
          >
            <NavLink
              to={"/forget-password"}
              style={{
                color: "#E7B10A",
              }}
            >
              forget password
            </NavLink>{" "}
          </p>

          {loginError && (
            <p
              style={{
                color: "#f01717",
                fontSize: "0.8rem",
                fontWeight: "500",
                padding: "4px 10px",
                marginTop: "20px",
                width: "50%",
                minWidth: "300px",
                textAlign: "center",
              }}
            >
              {loginError}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "70%",
            }}
          >
            <button
              type="submit"
              className="login"
              style={{
                padding: "0px 20px",
                backgroundColor: "#E7B10A",
                color: "#163020",
                fontSize: "0.8rem",
                fontWeight: "600",
                borderRadius: "35px",
                marginTop: "80px",
                cursor: "pointer",
                border: "none",
                opacity: "0.8",
              }}
              onClick={() => navigate("/register")}
            >
              SignUp
            </button>

            <button
              type="submit"
              className="login"
              style={{
                padding: "10px 20px",
                backgroundColor: "#E7B10A",
                color: "#163020",
                fontSize: "1.3rem",
                fontWeight: "600",
                borderRadius: "35px",
                marginTop: "80px",
                cursor: "pointer",
                border: "none",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
