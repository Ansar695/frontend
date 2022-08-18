import React from 'react'
import "./dashboard.css"
import AttendChart from './Sub-Files/AttendChart'
import Welcome from './Sub-Files/Welcome'

const Dashboard = () => {
  return (
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <Welcome />
            <AttendChart />
        </div>
    </div>
  )
}

export default Dashboard