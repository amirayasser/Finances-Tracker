import React, { createContext, useState } from "react";

export const UserInfoContext = createContext();

export const UserInfoProvider = ({ children }) => {
  const [usrBudget, setusrBudget] = useState(0);
  const [usrName, setUsrName] = useState("");
console.log('user i/p:' , usrBudget , '\n user i/p name:' , usrName)
  return (
    <UserInfoContext.Provider
      value={{ usrBudget, setusrBudget, usrName, setUsrName }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};
