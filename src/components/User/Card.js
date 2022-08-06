import React, { useEffect, useState } from 'react'
import "./card.css"
import UpdateProfile from './UpdateProfile'
import {useParams} from "react-router-dom" 
import Leave from './Leave'

const Card = () => {
  const params = useParams()
  const[show, setShow] = useState(false)
  const[showLeave, setShowLeave] = useState(false)
  const[user, setUser] = useState('')
  const[check, setCheck] = useState(false)
  let todayDate;
  todayDate = new Date().toDateString()
  console.log(check)

  const overlay = () => {
    setShow(false)
  }

  const getUser = async() => {
    const id = params.id
    try {
        const res = await fetch(`/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if(res.status===200){
            setUser(data)
        }
    } catch (error) {
        console.error(error)
    }
  }


//   PUNCH IN
  const setPunchIn = async() => {
    const id = params.id
    console.log(id)
    try {
        const res = await fetch(`/punch/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        })
        const data = await res.json()
        if(res.status===200){
            getUser()
        }
    } catch (error) {
        console.error(error)
    }
  }

  //   PUNCH OUT
  const setPunchOut = async() => {
    const id = params.id
    console.log(id)
    try {
        const res = await fetch(`/update/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
        const data = await res.json()
        if(res.status===200){
            getUser()
        }
    } catch (error) {
        console.error(error)
    }
  }

  //  APPLY FOR LEAVE
  const applyForLeave = async() => {
    const id = params.id
    console.log(id)
    try {
        const res = await fetch(`/leave/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
        const data = await res.json()
        if(res.status===200){
            getUser()
        }
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="card_main">
    <div className={`update_profile_layout ${show?'update_profile_layout_active': ''}`}>
        <UpdateProfile overlay={overlay} />
    </div>
        <div className="user_intro">
            <div className="avatar">
                {user?user.name.charAt(0):'U'}
            </div>
            <h2>Hey, {user? user.name: 'User'}</h2>
        </div>
        <div className="user_details">
            <div className="top">
                <div className="date">
                    <p>{todayDate}</p>
                </div>
                <div className="toggle">
                    <label className='toggle_label'>{check?"Punch-Out": "Punch-In"}</label>
                    <br />
                    <label className='switch'>
                        <input checked={check} type="checkbox" onChange={(e)=>setCheck(!check)} 
                            onClick={()=>{
                                if(check===false){
                                    setPunchIn()
                                }else{
                                    setPunchOut()
                                }
                            }}
                        />
                        <span className='slider round'></span>
                    </label>
                </div>
                <div>
                <button id='profile' onClick={(e)=>setShow(true)}>Update Profile</button>
                <button id='profile' onClick={applyForLeave}>Apply for Leave</button>
                {/* <button id='profile' style={user&&user.schedule&&user.schedule.map((usr)=>{
                    usr.date==todayDate&&usr.leave=="yes"? {color: "red"}:{color: "white"}
                })} onClick={applyForLeave}>Apply for Leave</button> */}
                </div>
            </div>
            <div className="low">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Scheduled</th>
                            <th>Punch-In</th>
                            <th>Punch-Out</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user&&user.schedule?user.schedule.map((usr) => (
                        <>{usr.date == todayDate&&
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td style={usr.leave=="yes"?{color: "red"}:{color: "black"}} >{usr.leave=="yes"?'On-Leave':'Present'}</td>
                                    <td>{usr.duty}</td>
                                    <td>{usr.start}</td>
                                    <td>{usr.end}</td>
                                    <td>Fullstack</td>      
                                </tr>
                            }</>
                        )):<>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>
                            <td>N/A</td>      
                        </tr>
                        </>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Card