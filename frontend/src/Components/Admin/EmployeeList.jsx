// import React, { useContext, useState } from "react";
// import { EmployeeContext } from "./EmployeeContext";
// import EmployeeDetails from "./EmployeeDetails";
// import EditEmployee from "./EditEmployee";
// import "./EmployeeList.css";
// import AdminNavbar from "../Common/AdminNavbar";

// const EmployeeList = () => {
//   const { employees } = useContext(EmployeeContext);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [updatingEmployee, setUpdatingEmployee] = useState(null);

//   return (
//     <div className="admin-employee-container">
//       {!selectedEmployee && !updatingEmployee ? (
//         <div className="admin-employee-list">
//           <h1 className="admin-employee-title">List of Employees</h1>
//           <table className="admin-employee-table">
//             <thead>
//               <tr>
//                 <th>Employee ID</th>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Department</th>
//                 <th>Contact Info</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {employees.map((employee) => (
//                 <tr key={employee.id}>
//                   <td>{employee.id}</td>
//                   <td>{employee.name}</td>
//                   <td>{employee.designation}</td>
//                   <td>{employee.department}</td>
//                   <td>{employee.email}</td>
//                   <td>
//                     <button className="admin-view-btn" onClick={() => setSelectedEmployee(employee)}>View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="admin-export-buttons">
//             <button className="admin-export-btn">Export list (CSV)</button>
//             <button className="admin-export-btn">Export with details (CSV)</button>
//             <button className="admin-export-btn">Export list (PDF)</button>
//             <button className="admin-export-btn">Export with details (PDF)</button>
//           </div>
//         </div>
//       ) : updatingEmployee ? (
//         <EditEmployee employee={EditEmployee} goBack={() => setUpdatingEmployee(null)} />
//       ) : (
//         <EmployeeDetails
//           employee={selectedEmployee}
//           goBack={() => setSelectedEmployee(null)}
//           updateEmployee={() => {
//             setUpdatingEmployee(selectedEmployee);
//             setSelectedEmployee(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default EmployeeList;












import React, { useContext, useState } from "react";
import { EmployeeContext } from "./EmployeeContext";
import EmployeeDetails from "./EmployeeDetails";
import EditEmployee from "./EditEmployee";
import AdminNavbar from "../Common/AdminNavbar";
import "./EmployeeList.css";

const EmployeeList = () => {
  const { employees } = useContext(EmployeeContext);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [updatingEmployee, setUpdatingEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  const filteredEmployees = employees.filter((emp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      emp.name.toLowerCase().includes(searchLower) ||
      emp.designation.toLowerCase().includes(searchLower) ||
      emp.department.toLowerCase().includes(searchLower)
    );
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="admin-panel">
      <AdminNavbar />

      {!selectedEmployee && !updatingEmployee ? (
        <div className="admin-employee-list">
          <h1 className="admin-employee-title">List of Employees</h1>

          <input
            type="text"
            placeholder="Search by name, designation, or department"
            className="admin-search-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <table className="admin-employee-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Contact Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.department}</td>
                  <td>{employee.email}</td>
                  <td>
                    <button className="admin-view-btn" onClick={() => setSelectedEmployee(employee)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="admin-pagination">
            <button
              className="admin-pagination-btn"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="admin-pagination-text">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="admin-pagination-btn"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Export Buttons */}
          <div className="admin-export-buttons">
            <button className="admin-export-btn">Export list (CSV)</button>
            <button className="admin-export-btn">Export with details (CSV)</button>
            <button className="admin-export-btn">Export list (PDF)</button>
            <button className="admin-export-btn">Export with details (PDF)</button>
          </div>
        </div>
      ) : updatingEmployee ? (
        <EditEmployee employee={updatingEmployee} goBack={() => setUpdatingEmployee(null)} />
      ) : (
        <EmployeeDetails
          employee={selectedEmployee}
          goBack={() => setSelectedEmployee(null)}
          updateEmployee={() => {
            setUpdatingEmployee(selectedEmployee);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
