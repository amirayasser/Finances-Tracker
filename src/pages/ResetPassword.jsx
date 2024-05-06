import React, { useState } from 'react'
import { confirmResetPassword } from '../firebase/auth';
import ResetPassSvg from '../components/svgs/ResetPassword';
import GoBack from '../utilities/GoBack';

import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const email = location.state?.email || ""; // Access email safely
  const initialMsg = location.state?.msg || ""; // Access msg safely
  // Set initial message
  useState(() => {
    setMsg(initialMsg);
  }, [initialMsg]);

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
   try {
     e.preventDefault();
     if (!newPassword) {
       setMsg("Please enter a new password.");
       return; // Exit the function if password field is empty
     }
     await confirmResetPassword(email, newPassword);
     setMsg("Password reset successfully.");
      setTimeout(() => {
         // Navigate to the login page after successful password reset
          navigate("/login")
        } , 1000)
    
   } catch (error) {
     console.error("Error resetting password:", error);
     setMsg("Error resetting password. Please try again.");
   }
  };
  return (
    <div
      style={{
        background: "#304D30",
        height: "100vh",
        display: "flex",
        flexDirection: "row-reverse",
        width: "100%",
      }}
    >
      <ResetPassSvg />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          position: "relative",
          height: "100vh",
          flexGrow: 2,
        }}
      >
        <GoBack
          addStyling={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        />
        <h2 style={{ color: "#E7B10A" }}>Enter New Password</h2>
        <form>
          <input
            type="password"
            value={newPassword}
            onChange={handlePasswordChange}
            placeholder="Enter your new password"
            required
          />
          <button
            onClick={handleResetPassword}
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
