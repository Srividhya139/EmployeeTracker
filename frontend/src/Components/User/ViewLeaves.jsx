import React, { useContext } from 'react'
import { LeaveContext } from '../User/LeaveContext'
import './ViewLeaves.css'

export default function ViewLeave() {
  const { leaves } = useContext(LeaveContext)

  return (
    <div className="view-leave-container">
      <h2 className="title">My Leave History</h2>
      {leaves.length === 0 ? (
        <p className="no-leaves">No leave records found.</p>
      ) : (
        <table className="leave-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Start</th>
              <th>End</th>
              <th>Reason</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id}>
                <td>{leave.leaveType}</td>
                <td>{leave.startDate}</td>
                <td>{leave.endDate}</td>
                <td>{leave.reason}</td>
                <td className={`status ${leave.status.toLowerCase()}`}>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
