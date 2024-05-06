import React from 'react'
import { IoMenu } from "react-icons/io5";

const MenuBtn = ({open , setOpen}) => {

    const toggleBtn = ()=>{
        setOpen(!open);
    }
  return (
    <button
      onClick={toggleBtn}
      style={{
        backgroundColor: "#304D30",
        color: "#e6eebf",
        border: "none",
        fontSize: "2.5rem",
        borderRadius: "10px",
        position: "absolute",
        top: "20px",
        left: open ? "145px" : " 20px",
        padding:'0 2px',
        cursor: "pointer",
        zIndex: 9,
        display:'flex',

      }}
    >
      <IoMenu style={{ padding: "0px", margin:0,}} /> 
    </button>
  );
}

export default MenuBtn
