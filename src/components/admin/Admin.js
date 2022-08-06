import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import "./admin.css"
import UpdateAdmin from './UpdateAdmin'

const Admin = () => {
    const params = useParams()
    const[user, setUser] = useState()
    const[users, setUsers] = useState()
    const[search, setSearch] = useState()
    const[active, setActive] = useState(1)
    const[activeUpd, setActiveUpd] = useState(false)
    let todayDate;
    todayDate = new Date().toDateString()

    const getUser = async() => {
        const id = params.id
        try {
            const res = await fetch(`/admin/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if(res.status===200){
                setUser(data.result)
                setUsers(data.result2)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const searchUsers = async() => {
        try {
            const res = await fetch(`/search/${search}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getUnavailable = async() => {
        try {
            const res = await fetch("/get_unavailable", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }

    const getOnLeave = async() => {
        console.log("test")
        try {
            const res = await fetch("/get_onleave", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }

    const overlay = () => {
        setActiveUpd(false)
    }

    useEffect(() => {
        getUser()
    }, [])

  return (
    <div className="admin_main">
    <div className={`update_overlay ${activeUpd?'update_overlay_active':''}`}>
        <UpdateAdmin overlay={overlay} />
    </div>
        <div className="admin_intro">
            <div className="avatar">
                {user?user.name.charAt(0):'A'}
            </div>
            <h2>Hey, {user?user.name: 'Admin'}</h2>
        </div>
        <div className="details">
            <div className="top">
                <div className="date">
                    <p>{todayDate}</p>
                </div>
                <div>
                    <button id='profile' onClick={()=>setActiveUpd(true)}>Update Profile</button>
                </div>
            </div>
            <div className="low">
            <div className="search">
                <div className="menus">
                    <p className={`${active==1?'active': ''}`} onClick={(e)=>{
                        setActive(1)
                        getUser()
                    }}>Available</p>
                    <p className={`${active==2?'active': ''}`} onClick={(e)=>{
                        setActive(2)
                        getUnavailable()
                    }}>Unavailable</p>
                    <p className={`${active==3?'active': ''}`} onClick={(e)=>{
                        setActive(3)
                        getOnLeave()
                    }}>On-Leave</p>
                </div>
                <div className="input">
                    <input type="text" onChange={(e)=>setSearch(e.target.value)} placeholder='Search by name, email, id' />
                    <i className='fa fa-search' onClick={searchUsers}></i>
                </div>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Id</th>
                            <th>Scheduled</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?users.map((usr) => (
                            <tr>
                                <td>{usr.name?usr.name:'New Employee'}</td>
                                <td>{usr.email?usr.email:'New Employee'}</td>
                                <td>{usr.id}</td>
                                <td>{usr.duty}</td>
                                <td>Fullstack</td>      
                            </tr>
                        )): 
                            <tr>
                                <td>New Employee</td>
                                <td>New Employee</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td>Fullstack</td>      
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Admin