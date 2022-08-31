import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { leaveState } from '../../../Redux/Actions/Action'
import "../empdashboard.css"
import LeaveOverlay from './LeaveOverlay'

const MarkAttendance = () => {
  const checkRef = useRef()
  const labelRef = useRef()
  const leaveRef = useRef()
  const params = useParams()
  const[check, setCheck] = useState(false)
  const[user, setUser] = useState()
  let todayDate = new Date().toDateString()
  const dispatch = useDispatch()
  const {leave} = useSelector(state => state)

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
            data&&data.schedule&&data.schedule.map((d) => {
                if(d.date===todayDate && d.start!=="" && d.end === "06:00:00 PM"){
                    setCheck(true)
                }
                else if(d.date===todayDate && d.start!=="" && d.end !== "06:00:00 PM"){
                    setCheck(false)
                    labelRef.current.style.color="silver"
                    checkRef.current.disabled=true
                }
                else if(d.date===todayDate && d.leave === "yes" && d.start!==""){
                    setCheck(false)
                    labelRef.current.style.color="silver"
                    checkRef.current.disabled=true
                    leaveRef.current.disabled = true
                    leaveRef.current.style.backgroundColor = "red"
                    leaveRef.current.style.cursor = "auto"
                }
                else if(d.date===todayDate && d.leave === "yes" && d.start===""){
                    labelRef.current.style.color="silver"
                    checkRef.current.disabled=true
                }
            })
        }
    } catch (error) {
        console.error(error)
    }
  }

  //   PUNCH IN
  const setPunchIn = async() => {
    const id = params.id
    try {
        const res = await fetch(`/punch/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            }
        })
        
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
    try {
        const res = await fetch(`/update/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
        })
        
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
    <div className='attendance_main'>

    <div className={`show_leave_overlay ${leave? 'show_leave_overlay_active':''}`}>
      <LeaveOverlay />
    </div>

        <div className="top">
            <div className="date">
                <p data-testid="para">{todayDate}</p>
            </div>
            <div className="toggle">
                <label className='toggle_label' ref={labelRef}>
                {check?"Punch-Out": "Punch-In"}
                </label>
                <label data-testid="checkbox_label" className='switch'>
                    <input type="checkbox" 
                        ref={checkRef}
                        checked={check}
                        data-testid="check_input"
                        onChange={(e)=>setCheck(!check)} 
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
                <button onClick={()=>dispatch(leaveState(true))} ref={leaveRef}>Apply For Leave</button>
            </div>
        </div>
        <div className="bottom">
        <h2>About Today</h2>
            <div className="user_table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Punched-In</th>
                            <th>Punched-Out</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user&&user.schedule&&user.schedule.map((usr) => (
                        <>
                        {usr.date === todayDate&&
                            <tr key={usr._id}>
                                <td data-testid="user-data">{user.name}</td>
                                <td>{user.email}</td>
                                <td style={usr.leave==="yes"?{color: "red"}:{color: "black"}}>{usr.leave==="yes"?'On-Leave':'Present'}</td>
                                <td>{usr.start?usr.start:"N/A"}</td>
                                <td>{usr.end?usr.end:"N/A"}</td>        
                            </tr>
                        }
                        </>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default MarkAttendance