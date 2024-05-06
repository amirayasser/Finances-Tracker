import { useState, useEffect } from "react";
import { db, auth } from "./firebase"; 
import {
  collection,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { addDoc, deleteDoc } from "firebase/firestore";


const UseFirestore = () => {
  
  // Initialize state variables using useState
  const [items, setItems] = useState([]); // State variable to store items from Firestore
  const [budget, setBudget] = useState(0); // State variable to store total budget

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribeAuth();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // useEffect hook to perform side effects (like fetching data) when the component mounts
  useEffect(() => {
    if (user) {
      // Subscribe to real-time updates on the Firestore collection named "items"
      const unsubscribe = onSnapshot(
        query(
          collection(db, "items"),
          where("userId", "==", user.uid),
          orderBy("date", "desc")
        ),
        (snapshot) => {
          let fetched = snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
              title: doc.data().title || "Budget",
            }; // Set default title if missing};
          });
          let totalBudget = snapshot.docs.reduce((acc, curr) => {
            return acc + curr.data().amount;
          }, 0);
          setItems(fetched);
          setBudget(totalBudget);
        },

        (error) => {
          console.error("Error fetching items:", error);
        }
      );
      return unsubscribe;
    } else {
      setItems([]);
      setBudget(0);
    }
  }, [user]);

  const addBudgetAsIncome = async (userId, amount) => {
    try {
      const newIncomeItem = {
        amount: parseFloat(amount),
        category: "income",
        date: new Date(),
        userId: userId,
      };

      // Add the new income item to the Firestore collection
      await addDoc(collection(db, "items"), newIncomeItem);

      // Update the budget state to reflect the new income
      setBudget((prevBudget) => prevBudget + newIncomeItem.amount);
    } catch (error) {
      console.error("Error adding budget as income:", error);
    }
  };

  // Function to add a new item to the Firestore collection
  const addItem = async (item, amount) => {
    if (user) {
      await addDoc(collection(db, "items"), {
        ...item,
        amount,
        userId: user.uid,
      });
      // Update budget by adding the amount of the new item
      setBudget((prevBudget) => prevBudget + amount);
    }
  };

  // Function to delete an item from the Firestore collection
  const deleteItem = async (id, amount) => {
    if (user) {
      try {
        // Construct a reference to the document to be deleted
        const itemRef = doc(db, "items", id);

        // Delete the document from Firestore
        await deleteDoc(itemRef);
        // Update budget by subtracting the amount of the deleted item
        setBudget((prevBudget) => prevBudget - amount);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
  };

  // Return an object containing state variables and functions to interact with Firestore
  return { items, addItem, deleteItem, budget, user, addBudgetAsIncome };
};

// Export the UseFirestore hook for use in other components
export default UseFirestore;
