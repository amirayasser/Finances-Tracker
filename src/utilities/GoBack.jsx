import React from 'react'
import { IoArrowBackCircle } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import { IoLogOutOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";

const GoBack = ({addStyling}) => {
    const navigate = useNavigate()
    const goBack = () => {
      navigate(-1); // Go back one page in history
    };
  return (
    <button
      onClick={goBack}
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#B6C4B6",
        fontWeight: "600",
        display: "flex",
        gap: "5px",
        alignItems: "center",
        fontSize:'2rem',
        cursor:'pointer',
        ...addStyling
      }}
    >
      <TbLogout2/>
        {/* <IoLogOutOutline/> */}
      {/* <IoArrowBackCircle /> */}
      {/* back */}
    </button>
  );
}

export default GoBack
