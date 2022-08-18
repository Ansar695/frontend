import React from 'react'
import "../../AdminPanel/Dashboard/dashboard.css"
import BasicInfo from './Sub-Files/BasicInfo'
import EmpAttendChart from './Sub-Files/EmpAttendChart'

const EmpDashboard = () => {
  return (
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <BasicInfo />
            <EmpAttendChart />
        </div>
    </div>
  )
}

export default EmpDashboard