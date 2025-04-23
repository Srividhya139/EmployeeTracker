import React, { createContext, useState } from "react";

export const LeaveContext = createContext();

const LeaveProvider = ({ children }) => {
  const [leaves, setLeaves] = useState([]);

  const addLeave = (leave) => {
    setLeaves([...leaves, { ...leave, id: Date.now(), status: "Pending" }]);
  };

  const updateLeaveStatus = (id, status) => {
    setLeaves(leaves.map(leave => leave.id === id ? { ...leave, status } : leave));
  };

  return (
    <LeaveContext.Provider value={{ leaves, addLeave, updateLeaveStatus }}>
      {children}
    </LeaveContext.Provider>
  );
};

export default LeaveProvider;
