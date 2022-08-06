import React from 'react'
import { NavLink } from 'react-router-dom'
import "./setting.css"

const Setting = () => {
  return (
    <div className="icon">
        <NavLink to="/admin-settings"><i className='fa fa-cog'></i></NavLink>
    </div>

  )
}

export default Setting