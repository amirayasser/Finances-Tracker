import React, { useState } from 'react'
import {  sendPasswordReset } from '../firebase/auth';
import ForgetPassSvg from '../components/svgs/ForgetPassword';
import GoBack from './GoBack';
import ResetPassword from '../pages/ResetPassword';
import {useNavigate } from 'react-router-dom';


const ForgetPassword = () => {

    const navigate = useNavigate()

    const [email , setEmail] = useState('');
    const [msg , setMsg] = useState('');

    const [resetEmailSent, setResetEmailSent] = useState(false);

    const handleChange = ({target})=>{
        setEmail(target.value);
    }

   const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       await sendPasswordReset(email);
       setMsg("Password reset email sent. Please check your inbox.");
       setTimeout(() => {
        // Navigate to the reset password page after a while
       navigate("/reset-password", { state: { email, msg } });
       }, 2500);
       
     } catch (error) {
       console.error("Error sending password reset email:", error.message);
       setMsg("Error sending password reset email. Please try again.");
     }
   };

      



  return (
    <div
      style={{
        background: "#304D30",
        height: "100vh",
        display: "flex",
        flexDirection: "row-reverse",
      }}
    >
      <ForgetPassSvg />
      <div
        style={{
          color: "#EEF0E5",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50%",
          position: "relative",
          flexGrow: 2,
        }}
      >
        <GoBack
          addStyling={{
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
          Forgot Password?
        </h2>
        {resetEmailSent ? (
          <ResetPassword email={email} msg={msg} setMsg={setMsg} />
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <button
              type="submit"
              style={{
                padding: "10px 60px",
                backgroundColor: "#E7B10A",
                color: "#163020",
                fontSize: "1.5rem",
                fontWeight: "600",
                borderRadius: "35px",
                marginTop: "80px",
                marginBottom: "80px",
                cursor: "pointer",
                border: "none",
              }}
            >
              Reset Password
            </button>
          </form>
        )}
        {msg && (
          <p
            style={{
              color: "#E7B10A",
              marginTop: "20px",
              textAlign: "center",
              fontSize: "1.2rem",
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword
