import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import "../../AdminPanel/Header/header.css"

const EmpHeader = () => {
  const params = useParams()
  const {data}= useSelector(state => state)
  const[show, setShow] = useState(false)
  const id = params.id
  console.log("data")
  console.log(data)
  return (
    <>
    <div className="nav">
        {/* <img className='logo_img' src="./images/emumba-logo.png" alt="" /> */}
        <p className='logo_name'>Emumba Pvt LTD</p>
        <i className={`fa ${show?'fa-times': 'fa-bars'}`} onClick={()=>setShow(!show)}></i>
    </div>
    <div className={`dashboard ${show?'dashboard_active':''}`}>
      <div className="panels">
            <NavLink className="navlink" to={`/employee-home/${id}`}><i className='fa fa-tachometer'></i> Home</NavLink>
            <NavLink className="navlink" to={`/filter-employee-record/${id}`}><i className='fa fa-search'></i> Filter Records</NavLink>
            <NavLink className="navlink" to={`/employee-attendance/${id}`}><i className='fa fa-calendar'></i> Attendance</NavLink>
            <NavLink className="navlink" to={`/`}><i className='fa fa-sign-out'></i> Logout</NavLink>
      </div>
    </div>
    </>
  )
}

export default EmpHeader