import React from 'react'
import "../../../AdminPanel/Dashboard/dashboard.css"
import MarkAttendance from './MarkAttendance'

const EmpAttendance = () => {
  return (
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <MarkAttendance />
        </div>
    </div>
  )
}

export default EmpAttendance