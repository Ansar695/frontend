import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import "../dashboard.css"

const Attendance = () => {
  const[users, setUsers] = useState()
  const[search, setSearch] = useState()
  const[dir, setDir] = useState({
    nameDir: false,
    emailDir: false,
    idDir: false
  })

  //  GET ALL EMPLOYES
const getEmployes = async() => {
  try {
      const res = await fetch(`/get_employes`, {
          method: "GET",
          headers: {
              "content-type": "application/json"
          },
          credentials: "include"
      })
      const data = await res.json()
      if(res.status===200){
          setUsers(data)
      }
  } catch (error) {
      console.error(error)
  }
}

  //  Search ALL EMPLOYES
  const searchEmployee = async() => {
    try {
        const res = await fetch(`/search_employes`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({search})
        })
        const data = await res.json()
        if(res.status===200){
            setUsers(data)
        }
    } catch (error) {
        console.error(error)
    }
  }

// SORTING BY NAME
const sortByName = async() => {
  setDir({...dir, nameDir: !dir.nameDir})

  const myData = [].concat(users).sort((a, b) => {
      if(a.name > b.name){
          return 1
      }else{
          return -1
      }
  })
  setUsers(myData)
}

// SORTING BY EMAIL
const sortByEmail = async() => {
  setDir({...dir, emailDir: !dir.emailDir})
  const myData = [].concat(users).sort((a, b) => {
      if(a.email > b.email){
          return 1
      }else{
          return -1
      }
  })
  setUsers(myData)
}

// SORTING BY USER ID
const sortById = async() => {
  setDir({...dir, idDir: !dir.idDir})
  const myData = [].concat(users).sort((a, b) => {
      if(a.id > b.id){
          return 1
      }else{
          return -1
      }
  })
  setUsers(myData)
}


useEffect(() => {
  getEmployes()
}, [])

  return (
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <div className="entries">
              <h2>Attendance Record</h2>
              <div className="searchbar">
                <input type="text" placeholder='Search here' onChange={(e)=>setSearch(e.target.value)} />
                <i className='fa fa-search' onClick={searchEmployee}></i>
              </div>
            </div>
            <div className="user_table">
        <table>
            <thead>
                <tr>
                    <th>Name 
                        <i className={`fa ${dir.nameDir?'fa-caret-up': 'fa-caret-down'}`} onClick={sortByName}></i>
                    </th>
                    <th>Email 
                        <i className={`fa ${dir.emailDir?'fa-caret-up': 'fa-caret-down'}`} onClick={sortByEmail}></i>
                    </th>
                    <th>User Id
                        <i className={`fa ${dir.idDir?'fa-caret-up': 'fa-caret-down'}`} onClick={sortById}></i>
                    </th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
            {users?users.map((usr) => 
                    <>
                    {usr&&usr.schedule.map((u) => (
                      <tr>
                        <td>{usr.name?usr.name:'New Employee'}</td>
                        <td>{usr.email?usr.email:'New Employee'}</td>
                        <td>{usr.id}</td>
                        <td>{u.date}</td>
                        <td style={u.leave=="yes"?{color: "red"}:{color: "black"}}>{u.leave=="yes"?'On-Leave':'Present'}</td>     
                    </tr>
                    ))}
                    </>
                    ): 
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

export default Attendance