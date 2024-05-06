import React from "react";
import ItemList from "../components/item list/ItemList";
import UseFirestore from "../firebase/UseFirestore";
import { getTodayItems } from "../utilities/GetSpecificItems";
import GoBack from "../utilities/GoBack";
import ItemsSvg from "../components/svgs/Items";

const ShowAllItems = () => {
  const { items } = UseFirestore();
  console.log("show all items", items);
  const todayItems = getTodayItems(items);

  return (
    <div
      style={{
        background: "#304D30",
        minHeight: "100vh",
        display: "flex",
        padding: window.innerWidth <= 430 ? "50px 10%" : "50px 50px 50px 100px",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#304D30",
          minHeight: window.innerWidth < 430 ? "100vh" : "auto",
          display: "flex",
          flexDirection: "column",
          padding: window.innerWidth < 430 ? "50px 10%" : "0px 5% 0 0",
          width: "100%",
          flexGrow: "2",
        }}
      >
        <GoBack
          addStyling={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h2
            style={{
              color: "#E7B10A",
              marginTop: "30px",
              fontSize: "2rem",
            }}
          >
            See all your Transactions
          </h2>
        </div>

        <div>
          <div
            style={{
              margin: "10px 0 30px",
              padding: "10px 0",
              borderBottom: "1px solid #B6C4B6",
            }}
          >
            <h4 style={{ color: "#B6C4B6", marginBottom: "15px" }}>
              today's tansactions
            </h4>
            <ItemList items={todayItems} />
          </div>
          <div>
            <h4 style={{ color: "#B6C4B6", margin: "22px 0 15px" }}>
              all tansactions
            </h4>
            <ItemList items={items} />
          </div>
        </div>
      </div>
      <ItemsSvg />
    </div>
  );
};

export default ShowAllItems;
