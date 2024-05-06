import React, { useContext, useEffect, useState } from 'react'
import ItemList from '../components/item list/ItemList';
import { NavLink } from 'react-router-dom';
import UseFirestore from '../firebase/UseFirestore';
import ProgressBar from '../components/ProgressBar';
import {calculateRatio} from "../utilities/calcBudget";
import { getLatestItems } from '../utilities/GetSpecificItems';
import MenuBtn from '../components/MenuBtn';
import Sidebar from '../components/Sidebar';
import { UserInfoContext } from '../components/context/InfoContext';
import HomeSvg from '../components/svgs/Home';
import fly from '../assets/payment (2).png'


export default function Home() {
  const { budget, user, items } = UseFirestore();
  console.log('items in home: ', items);
  const { usrBudget, usrName } = useContext(UserInfoContext);

  // Check if user object exists before accessing its properties
  const userEmail = user ? user.email : "";
  // Extract the string before numbers in the email address
  const userName = userEmail.match(/^([^0-9]*)/)[0];

  // State to hold total income, total expenses, and ratio

  // Initialize total income state with budget amount
  const [totalIncome, setTotalIncome] = useState(
    parseFloat(localStorage.getItem("totalIncome")) || budget || 0
  );

  const [totalExpenses, setTotalExpenses] = useState(
    () => parseFloat(localStorage.getItem("totalExpenses")) || 0
  );
  const [ratio, setRatio] = useState(
    () => parseFloat(localStorage.getItem("ratio")) || 0
  );
  const latestItems = getLatestItems(items, window.innerWidth <= 430 ?  3 : 2 );

 

  useEffect(() => {
    let income = budget || 0;
    let expenses = 0;

    items.forEach((item) => {
      if (item.type === "income") {
        income += parseFloat(item.amount);
      } else if (item.type === "expense") {
        expenses += parseFloat(item.amount);
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);

    const newRatio = calculateRatio(income, expenses);
    setRatio(newRatio);

    // Store state values in localStorage
    // Persist total income in local storage
    localStorage.setItem("totalIncome", income.toString());
    localStorage.setItem("totalExpenses", expenses);
    localStorage.setItem("ratio", newRatio);
  }, [items, budget]);

  const availBalance = totalIncome + totalExpenses;

  const [open, setOpen] = useState(false);

  console.log(user, user?.displayName);

  return (
    <div
      style={{
        background: "#304D30",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Sidebar open={open} usr={userName} fireUser={user} />

      <MenuBtn open={open} setOpen={setOpen} />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: "66px 10% 30px",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          position: "relative",
          opacity: open ? "0.2" : 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          {/* Render user email if user exists, otherwise render a default message */}
          <h1 style={{ padding: "0" }}>
            Hello {user?.displayName || userName}
          </h1>

          <h3
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: " #E7B10A",
              backgroundColor: "#EEF0E5",
              textAlign: "center",
              padding: "5px 10px",
              borderRadius: "10px",
            }}
          >
            Available Balance
            <span
              style={{
                color: "#304D30",
                paddingTop: "4px",
                paddingLeft: "10px",
                width: "88px",
                minWidth: "35px",
              }}
            >
              $ {availBalance}
            </span>
          </h3>
        </div>

        <ProgressBar
          balance={budget}
          ratio={ratio}
          Tincome={totalIncome}
          Tex={totalExpenses}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "30px",
            color: "#304D30",
            minWidth: "300px",
            width: "50%",
            margin: "10px auto",
            padding: "10px",
          }}
        >
          <p
            style={{
              width: "120px",
              backgroundColor: "#EEF0E5",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Total income{" "}
            <p
              style={{
                textAlign: "center",
                padding: "5px",
                marginTop: "6px",
                fontWeight: "700",
                backgroundColor: "#E7B10A",
              }}
            >
              ${totalIncome}
            </p>
          </p>
          <p
            style={{
              width: "120px",
              backgroundColor: "#EEF0E5",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            Total Expenses{" "}
            <p
              style={{
                textAlign: "center",
                padding: "5px",
                marginTop: "6px",
                fontWeight: "700",
                backgroundColor: "#E7B10A",
              }}
            >
              ${Math.abs(totalExpenses)}
            </p>
          </p>
        </div>

        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "15px 5px",
              margin: "0 auto",
              width: "80%",
            }}
          >
            <h3
              style={{
                color: "#E7B10A",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img src={fly} alt="" style={{ width: "30px", height: "30px" }} />
              Latest Transactions
            </h3>

            <NavLink
              to={"/add"}
              style={{
                borderRadius: "20px",
                border: "1px solid #304D30",
                color: "#304D30",
                textDecoration: "none",
                lineHeight: "34px",
                width: "40px",
                height: "40px",
                textAlign: "center",
                backgroundColor: "#E7B10A",
                boxShadow: "0 0 3px 1px #E7B10A ",
              }}
            >
              add
            </NavLink>
          </div>

          <ItemList items={latestItems} />
        </div>
      </div>

      <HomeSvg />
    </div>
  );
}
