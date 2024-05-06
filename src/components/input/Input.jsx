import React, { useState , useRef } from "react";
import './input.css';
import { NavLink } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import UseFirestore from "../../firebase/UseFirestore";

const initialItem = {title:'', type:'', date:''}

export default function Input() {

  const { addItem , addBudgetAsIncome } = UseFirestore();

  const [items , setItems] = useState(initialItem)
  const [amount , setAmount] = useState('')

  const selectedOption = useRef(null)

  function handleChange({target}){
    setItems({
      ...items,
      [target.name]: target.value,
      type: selectedOption.current.value,

    })
  }

  function handleAmount ({target}){
    setAmount( target.value)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    let actualAmount =
      selectedOption.current.value === "expense"
        ? -Math.abs(parseInt(amount) || 0)
        : parseInt(amount) || 0;

    await addItem(items, actualAmount);

  setItems(initialItem);
  setAmount('');
  }


  return (
    <div className="inputContainer">
      <h1>add new expense</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={items.title}
        />
        <input
          type="number"
          name="amount"
          placeholder="amount"
          onChange={handleAmount}
          value={amount}
        />
        <input
          type="date"
          name="date"
          value={items.date}
          onChange={handleChange}
        />

        <div className="typeBox">
          <label htmlFor="type">Type</label>

          <select
            name="type"
            value={items.type}
            onChange={handleChange}
            ref={selectedOption}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <button className='submit' type="submit" >
            <IoIosAdd
              style={{
                fontSize: "35px",
              }}
            />
          </button>
        </div>
      </form>

      <NavLink
        to={"/home"}
        style={{
          textDecoration: "none",
          color: "#B6C4B6",
          fontWeight: "600",
          fontSize: "1.5rem",
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: "auto",
          marginBottom: "50px",
        }}
      >
        <IoArrowBackCircle />
        back
      </NavLink>
    </div>
  );
}
