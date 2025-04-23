import React, { useState, useContext } from 'react'
import { LeaveContext } from '../User/LeaveContext'
import './ApplyLeave.css'

export default function ApplyLeave() {
  const { addLeave } = useContext(LeaveContext)
  const [form, setForm] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  })

  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.leaveType || !form.startDate || !form.endDate || !form.reason) {
      setMessage('Please fill all fields')
      return
    }
    addLeave(form)
    setMessage('Leave applied successfully')
    setForm({ leaveType: '', startDate: '', endDate: '', reason: '' })
  }

  return (
    <div className="apply-leave-container">
      <h2 className="title">Apply for Leave</h2>
      <form className="leave-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Leave Type</label>
          <select name="leaveType" value={form.leaveType} onChange={handleChange}>
            <option value="">-- Select Leave Type --</option>
            <option value="Casual">Casual</option>
            <option value="Sick">Sick</option>
            <option value="Earned">Earned</option>
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>Reason</label>
          <textarea name="reason" rows="4" value={form.reason} onChange={handleChange}></textarea>
        </div>

        {message && <p className="message">{message}</p>}

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  )
}
