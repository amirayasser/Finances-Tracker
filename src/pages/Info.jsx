import React, { useContext, useEffect, useState } from "react";
import purse from "../assets/coins.png";
import GoBack from "../utilities/GoBack";
import UseFirestore from "../firebase/UseFirestore";
import { UserInfoContext } from "../components/context/InfoContext";
import { db } from "../firebase/firebase";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import MoneySvg from "../components/svgs/money";

const desktopStyles = {
  flexDirection: "row-reverse", // Default direction
};
const mobileStyles = {
  flexDirection: "column-reverse", // Change to column layout
  flexGrow: "0",
};

const screenWidth = window.innerWidth;

console.log(screenWidth);

const Info = () => {
  const { user, addBudgetAsIncome } = UseFirestore();
  const userEmail = user ? user.email : "";
  const Name = userEmail.match(/^([^0-9]*)/)[0];

  const { usrBudget, setusrBudget, usrName, setUsrName } =
    useContext(UserInfoContext);

    console.log(user?.displayName , usrName)

  const [balance, setBalance] = useState(usrBudget || 0);

  const handleBalanceChange = (e) => {
    setBalance(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    await addBudgetAsIncome(user.uid, balance);

    // Update the user's budget
    setusrBudget(balance);

    // Add the user's budget as an income item to Firestore
    if (user) {
      try {
        // Create a new income item document
        const incomeItem = {
          type: "income",
          amount: balance,
          timestamp: Timestamp.now(), // Add a timestamp to track when the item was added
          userId: user.uid, // Add the user's ID to associate the item with the user
        };

        // Add the income item to the Firestore collection
        await addDoc(collection(db, "items"), incomeItem);

        console.log("User's budget added as an income item successfully!");
      } catch (error) {
        console.error("Error adding user's budget as an income item:", error);
      }
    } else {
      console.error("No user is currently authenticated.");
    }
  };


  useEffect(() => {
    // Load usrName from localStorage on component mount
    const savedUsrName = localStorage.getItem("usrName");
    if (savedUsrName) {
      setUsrName(savedUsrName);
    }
  }, []);

  useEffect(() => {
    // Save usrName to localStorage whenever it changes
    localStorage.setItem("usrName", usrName);
  }, [usrName]);

  // State to store the current style
  const [currentStyle, setCurrentStyle] = useState(desktopStyles);

  // useEffect hook to update the style on component mount
  useEffect(() => {
    const updateStyle = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 430) {
        setCurrentStyle(mobileStyles);
      } else {
        setCurrentStyle(desktopStyles);
      }
    };

    // Call updateStyle on component mount
    updateStyle();

    // Add event listener for window resize
    window.addEventListener("resize", updateStyle);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", updateStyle);
  }, []);

  return (
    <div
      style={{
        background: "#304D30",
        color: "#E7B10A",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        ...currentStyle, // Apply current style
      }}
    >
      <MoneySvg width={window.innerWidth > 430 ? "45%" : "66%"} />
      <div
        style={{
          background: "#304D30",
          color: "#E7B10A",
          minHeight: screenWidth >= 440 ? "100vh" : "auto",
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          flexGrow: 2,
        }}
      >
        <GoBack
          addStyling={{
            position: "absolute",
            left: screenWidth >= 440 ? "20px" : "-60px",
            top: "20px",
          }}
        />
        <h2 style={{ marginTop: "30px" }}>Manage your information</h2>
        <p
          style={{
            color: "#eef0e5",
            borderBottom: "2px solid",
            borderTop: "2px solid",
            padding: "10px",
            marginTop: "20px",
            fontSize: "1.2rem",
          }}
        >
          Hello { user?.displayName  || usrName }
        </p>
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "40px",
            marginTop: "5vh",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <p
              style={{
                backgroundImage: `url(${purse})`,
                width: "55px",
                height: "55px",
                marginBottom: "8px",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></p>
            <input
              name="budget"
              type="number"
              placeholder="your budget"
              value={balance}
              onChange={handleBalanceChange}
              style={{ width: "130px", paddingLeft: "20px" }}
            />
          </div>
          <label>
            Name
            <input
              type="text"
              name="userName"
              id="displayNameInput"
              placeholder="enter your Name"
              style={{ width: "70%", marginLeft: "20px", paddingLeft: "20px" }}
              value={usrName}
              onChange={(e) => setUsrName(e.target.value)}
            />
          </label>
          <label>
            your email is{" "}
            <span
              style={{
                color: "#EEF0E5",
              }}
            >
              {userEmail}
            </span>
          </label>
          <button
            style={{
              padding: "8px 30px",
              backgroundColor: "#E7B10A",
              color: "#163020",
              fontSize: "1.3rem",
              fontWeight: "600",
              borderRadius: "35px",
              cursor: "pointer",
              border: "none",
            }}
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Info;
