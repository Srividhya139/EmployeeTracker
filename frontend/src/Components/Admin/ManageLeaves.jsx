import React, { useContext } from 'react'
import { LeaveContext } from '../User/LeaveContext'
import './ManageLeaves.css'

export default function ManageLeave() {
  const { leaves, updateLeaveStatus } = useContext(LeaveContext)

  return (
    <div className="manage-leave-container">
      <h2 className="title">Manage Leave Requests</h2>
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
              <th>Actions</th>
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
                <td>
                  {leave.status === 'Pending' ? (
                    <>
                      <button className="approve-btn" onClick={() => updateLeaveStatus(leave.id, 'Approved')}>Approve</button>
                      <button className="decline-btn" onClick={() => updateLeaveStatus(leave.id, 'Rejected')}>Decline</button>
                    </>
                  ) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
