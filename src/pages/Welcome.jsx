import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import bgwelcome from "../assets/4399381_2329777.svg";
import MoneySvg from "../components/svgs/money";



function Welcome() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#304D30",
        backgroundImage: screenWidth > 440 ? `url(${bgwelcome})` : "none",

        width: "100%",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "30px 5%",
        gap: "14vh",
        color: "#d69a00",
        fontWeight: "600",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: screenWidth > 430 ? "row" : "column-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            color: screenWidth > 430 ? "#238052" : "#e6eebf",
            padding: 0,
            flexGrow: 2,
          }}
        >
          welcome to our budget tracker
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            gap: "30px",
            marginLeft: screenWidth > 430 ? "30px" : "auto",
            marginBottom: screenWidth > 430 ? "0" : "15vh",
          }}
        >
          <h4>
            new user?
            <NavLink
              to={"/register"}
              style={{
                color: screenWidth > 430 ? "#34bf89" : "#e6eebf",
                textDecoration: "none",
                display: "block",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              create account
            </NavLink>
          </h4>
          <h4>
            our user?
            <NavLink
              to={"/login"}
              style={{
                color: screenWidth > 430 ? "#34bf89" : "#e6eebf",
                textDecoration: "none",
                display: "block",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              continue
            </NavLink>
          </h4>
        </div>
      </div>

      <div>
        <p>you ought to know where your money goes?</p>
        <p
          style={{
            color: "#94b04c",
            marginTop: "6px",
          }}
        >
          you are in the right place
        </p>
      </div>

      {screenWidth <= 430 && <MoneySvg />}
    </div>
  );
}

export default Welcome;
