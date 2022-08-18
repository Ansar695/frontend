import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { logedInUser, UpdateShow } from '../../../Redux/Actions/Action'
import "../empdashboard.css"
import EmpUpdateOverlay from './EmpUpdateOverlay'

const BasicInfo = () => {
  const params = useParams() 
  const[user, setUser] = useState()
  const dispatch = useDispatch()
  const show = useSelector(state => state)

  const getUser = async() => {
    const id = params.id
    try {
        const res = await fetch(`/get_user/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if(res.status===200){
            setUser(data)
            dispatch(logedInUser(data))
        }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="info_wrapper">

    <div className={`show_update_overlay ${show.updateShow? 'show_update_overlay_active':''}`}>
      <EmpUpdateOverlay />
    </div>

        <div className="left">
            <div className="avatar">
                <h1>{user?user.name.charAt(0):'U'}</h1>
            </div>
            <h2>{user?user.name:"User Name"}</h2>
            <p>{user?user.mobile: "user mobile"}</p>
            <small>Joined: {new Date(user&&user.login_at).toDateString()}</small>
            <button onClick={() => dispatch(UpdateShow(true, user&&user._id))}>Update Profile</button>
        </div>
        <div className="right">
            <h2>Basic Info</h2>
            <div className="details_wrapper">
                <div className="child email">
                    <p className='caption'>Email</p>
                    <p>{user&&user.email}</p>
                </div>
                <div className="child contacts">
                    <p className='caption'>User Id</p>
                    <p>{user&&user.id}</p>
                </div>
                <div className="child contacts">
                    <p className='caption'>Last Login</p>
                    <p>{new Date(user&&user.login_at).toDateString()}</p>
                </div>
            </div>
            <h2 style={{marginTop: '3rem'}}>Job info</h2>
            <div className="details_wrapper" style={{justifyContent: 'left'}}>
                <div className="child email">
                    <p className='caption'>Role</p>
                    <p>{user?user.role:"developer"}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BasicInfo