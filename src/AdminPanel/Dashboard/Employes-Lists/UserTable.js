import React, { useState }  from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const UserTable = () => {
  const[users, setUsers] = useState()
  const text = useSelector(state => state)
    console.log(text.text)
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

const searchText = () => {
    const byName = users&&users.filter((user) => {
        return Object.values(user.name).join('').toLowerCase().includes(text.text&&text.text.toLowerCase())
    } )

    setUsers(byName)
}

useMemo(() => {
    if(text.text){
        searchText()
    }
}, [text.text])

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
    <>
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
    </>
  )
}

export default UserTable