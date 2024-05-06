import React, { useState } from 'react'
import { checkIfUserExists, registerWithEmailPassword } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoBack from '../utilities/GoBack';
import SignUpSVG from '../components/svgs/SignUp';


export const IpStyling = {
    width:'70%',
    padding: '10px',
    borderColor:  '#E7B10A',
    borderRadius: '25px',
    background: '#EEF0E5',
    color: '#163020',
    outlineColor: '#B6C4B6',
};

const initialUser = {
    userName : '',
    email:'',
    password :'',
}

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(initialUser);

  const [error , setError] = useState('')

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  // let allow = false;

  // Validate user input
  if (!user.userName || !user.email || !user.password) {
    setError("Please fill in all fields.");
    return;
  }

  // // Check if the user already exists with the provided email
  // const userExists = await checkIfUserExists(user.email);
  // if (userExists) {
  //   console.log("User already exists. Please choose a different email.");
  //   // Handle the case where the user already exists
  //   setError("User already exists. Please choose a different email.");
  //   return;
  // }

  // Attempt to register user
    const registrationResult = await registerWithEmailPassword(
      user.email,
      user.password
    );
  
 

  // Handle registration result
  if (registrationResult.success) {
    navigate("/home");
  } else {
    setError(registrationResult.error);
  }
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
      <SignUpSVG />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 2,
          alignItems: "center",
          justifyContent: "center",
          width: "55%",
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
          welcome to budget tracker
        </h2>
        <p>complete the sign up to get started</p>
        <form onSubmit={handleSubmit}>
          <input
            style={IpStyling}
            type="text"
            name="userName"
            value={user.userName}
            placeholder="Name"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            style={IpStyling}
            type="email"
            name="email"
            value={user.email}
            placeholder="Email"
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <input
            style={IpStyling}
            type="password"
            name="password"
            value={user.password}
            placeholder="password"
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          {error && (
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
              {error}
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
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              type="submit"
              className="signUp"
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
