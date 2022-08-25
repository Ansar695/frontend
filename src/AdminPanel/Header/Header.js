import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./header.css"

const Header = () => {
  const[show, setShow] = useState(false)

  return (
    <>
    <div className="nav">
        <p data-testid="logo_title" className='logo_name'>Emumba Pvt LTD</p>
        <i className={`fa ${show?'fa-times': 'fa-bars'}`} onClick={()=>setShow(!show)}></i>
    </div>
    <div className={`dashboard ${show?'dashboard_active':''}`}>
      <div className="panels">
        <NavLink className="navlink" to="/admin-dashboard"><i className='fa fa-tachometer'></i> Dashboard</NavLink>
        <NavLink className="navlink" to="/employes-record"><i className='fa fa-users'></i> Employes</NavLink>
        <NavLink className="navlink" to="/employes-attendance"><i className='fa fa-calendar'></i> Attendance</NavLink>
        <NavLink className="navlink" to="/admin-login-page"><i className='fa fa-sign-out'></i> logout</NavLink>
      </div>
    </div>
    </>
  )
}

export default Header