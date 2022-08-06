import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmpUpdate from '../EmpUpdate'
import AddOverlay from './AddOverlay'
import "./empsetting.css"

const EmpSetting = () => {
    const navigate = useNavigate()
    const[search, setSearch] = useState()
    const[users, setUsers] = useState()
    const[active, setActive] = useState(false)
    const[updateActive, setUpdateActive] = useState(false)

    const overlay = () => {
        setActive(false)
      }

    const getUsers = async() => {
        console.log("test")
        try {
            const res = await fetch("/admin_settings", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            if(res.status===200){
                setUsers(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmployee = async (_id) => {
        const isDel = window.confirm("Are you sure?")
        try {
            if(isDel){
                const res = await fetch(`/delete_employee/${_id}`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                })
                const data = await res.json()
                getUsers()
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

    const sortData = async(e) => {
        const sortD = e.target.value;
        try {
            const res = await fetch(`/sort_users`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({sortD})
            })
            const data = await res.json()
            setUsers(data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getUsers()
    }, [])

  return (
    <div className="emp_setting">
    <div className={`add_overlay ${active? 'add_overlay_active': ''}`}>
        <AddOverlay overlay={overlay} />
    </div>
        <div className="top">
            <select onChange={sortData}>
                <option value="">Sort Employes</option>
                <option value="name">Sort by name</option>
                <option value="email">Sort Id</option>
                <option value="id">Sort email</option>
            </select>
            <div className="btn">
                <button onClick={(e)=>setActive(true)}>Add Employee</button>
            </div>
        </div>
        <div className="bottom">
            <div className="search">
                <h2>Employes</h2>
                <div className="input">
                    <input type="text" placeholder='Search here' onChange={(e)=>setSearch(e.target.value)} />
                    <i className='fa fa-search' onClick={searchUsers}></i>
                </div>
            </div>
            <div className="low">
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Id</th>
                            <th>Pin Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?users.map((usr) => (
                            <tr>
                                <td>{usr.name?usr.name:'New Employee'}</td>
                                <td>{usr.email?usr.email:'New Employee'}</td>
                                <td>{usr.id}</td>
                                <td>{usr.pin}</td>
                                <td>
                                    <i className='fa fa-pencil' onClick={()=>navigate(`/update/${usr._id}`)}></i>
                                    <i className='fa fa-trash' onClick={()=>deleteEmployee(usr._id)}></i>
                                </td>      
                            </tr>
                        )): 
                            <tr>
                                <td>New Employee</td>
                                <td>New Employee</td>
                                <td>N/A</td>
                                <td>N/A</td>
                                <td id='last_child'>
                                    <i className='fa fa-pencil'></i>
                                    <i className='fa fa-trash'></i>
                                </td>      
                            </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default EmpSetting