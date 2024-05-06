import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../firebase/auth";
import { UserInfoContext } from "./context/InfoContext";
import { BiLogOut } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import MoneySvg from "./svgs/money";

export default function Sidebar({ open, usr, fireUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const { usrName } = useContext(UserInfoContext);

  return (
    <div
      style={{
        backgroundColor: "#e6eebf",
        paddingTop: "100px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1%",
        justifyContent: "space-around",
        alignItems: "center",
        color: "#304d30",
        fontWeight: "600",
        fontSize: "1.2rem",
        width: open ? "180px" : 0,
        overflow: "hidden",
        position: "absolute",
        top: "0",
        left: "0",
        zIndex: 8,
      }}
    >
      <MoneySvg />
      <h3
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          marginBottom: " 50px ",
          marginTop: "30px",
          borderBottom: "2px solid",
          borderTop: "2px solid",
          padding: "10px 0",
          width: "80%",
        }}
      >
        <FaUserCircle />
        {usrName || fireUser?.displayName || usr}
      </h3>
      <NavLink
        to={"/info"}
        style={{
          textDecoration: "none",
          color: "#304d30",
          marginBottom: "40px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <IoSettingsSharp />
        Info Settings
      </NavLink>
      <NavLink
        to={"/all-items"}
        style={{
          textDecoration: "none",
          color: "#304d30",
        }}
      >
        All Transactions
      </NavLink>

      <button
        onClick={handleLogout}
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: "600",
          padding: "10px 12px",
          borderRadius: "6px",
          backgroundColor: "#304d30",
          color: "#e6eebf",
          margin: "auto 0 80px",
        }}
      >
        <BiLogOut />
        Logout
      </button>
    </div>
  );
}
