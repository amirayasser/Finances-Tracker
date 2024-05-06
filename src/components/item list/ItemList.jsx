import React, { useEffect, useRef, useState } from "react";
import "./itemList.css";
import UseFirestore from "../../firebase/UseFirestore";
import { MdDelete } from "react-icons/md";
import { getLatestItems, getTodayItems } from "../../utilities/GetSpecificItems";
// import fly from '../../assets/Payment (3).png';
// import pig from '../../assets/piggy-bank.svg';
import flypic from "../../assets/payment (2).png";
import pigpic from "../../assets/piggy-bank.png";

export default function ItemList({ items }) {
  const { deleteItem } = UseFirestore();
  const delBtn = useRef([]);

 

 
  return (
    <div className="listItems">
      <ul
        style={{
          padding: "10px 0",
        }}
      >
        {items.length === 0 ? (
          <div style={{ color: "#EEF0E5", textAlign: "center" }}>
            <p>look like you haven't added any expenses today yet.</p>
            <p style={{ fontSize: "0.8rem", padding: "6px 0" }}>
              no worries, just hit the <span className="add">'add'</span> button
              to get started
            </p>
          </div>
        ) : (
          items.map(
            (item) =>
              item.title !== "Budget" && (
                <li key={item.id}>
  
                  <img
                    src={item.type === "expense" ? flypic : pigpic}
                    alt=""
                    style={{ width: "32px", height: "32px" , marginRight:'15px'}}
                  />
                  <div>
                    <p className="title" style={{ color: "#304D30" }}>
                      {item.title}
                    </p>
                    <p
                      className={item.type === "expense" ? "expense" : "income"}
                    >
                      $ {Math.abs(item.amount)}
                    </p>
                    <p className="theDate" style={{ color: "#B6C4B6" }}>
                      {item.date}
                    </p>
                  </div>
                  <button
                    className="del"
                    ref={delBtn}
                    onClick={() => deleteItem(item.id, item.amount)}
                    style={{}}
                  >
                    <MdDelete style={{ color: "#f01717" }} />
                  </button>
                </li>
              )
          )
        )}
      </ul>
    </div>
  );
}
