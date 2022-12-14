import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import "../../../AdminPanel/Dashboard/dashboard.css"

const FilterEmpRecord = () => {
    const params = useParams()
    const[user, setUser] = useState()
    const[userRecord, setUserRecord] = useState()

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
                setUserRecord(data)
            }
        } catch (error) {
            console.error(error)
        }
      } 

      const searchUser = async(e) => {
        const search = e.target.value
        const date = new Date(search).toDateString()
        const result = userRecord&&userRecord.schedule&&userRecord.schedule.filter((usr) => usr.date === date)
        const data = {
            name: userRecord.name,
            schedule: result
        }
        setUser(data)
      }

      useEffect(() => {
        getUser()
      }, [])

  return (
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <div className="filter_record">
                <div className="filter_box">
                    <h2>Attendance Record</h2>
                    <input role="date_filter" type="date" onChange={searchUser} />
                </div>

                <div className="user_table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Punched-In</th>
                            <th>Punched-Out</th>
                        </tr>
                    </thead>
                    <tbody>
                    {user&&user.schedule&&user.schedule.map((usr, index) => (
                            <tr key={usr._id}>
                                <td>{user.name}</td>
                                <td>{usr.date}</td>
                                <td style={usr.leave==="yes"?{color: "red"}:{color: "black"}}>{usr.leave==="yes"?'On-Leave':'Present'}</td>
                                <td>{usr.start?usr.start:"N/A"}</td>
                                <td>{usr.end?usr.end:"N/A"}</td>        
                            </tr>
                            ))
                            }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    </div>
  )
}

export default FilterEmpRecord