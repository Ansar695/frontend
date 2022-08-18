import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetShow } from '../../../Redux/Actions/Action'

const SettingTable = () => {
    const[users, setUsers] = useState()
    const text = useSelector(state => state)
    const dispatch = useDispatch()

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
  
  const deleteEmployee = async(id) => {
    const sure = window.confirm("Are you sure?")
    if(!sure) return false
    try {
        const res = await fetch(`/delete_employee`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({id})
        })
        const data = await res.json()
        if(res.status===200){
            alert("Employee deleted...")
            getEmployes()
        }
    } catch (error) {
        console.error(error)
    }
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
                    <th>Pin Code</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            {users?users.map((usr) => (
                    <tr>
                        <td>{usr.name?usr.name:'New Employee'}</td>
                        <td>{usr.email?usr.email:'New Employee'}</td>
                        <td>{usr.id}</td>
                        <td>{usr.pin}</td>
                        <td id='last_child'>
                            <i className='fa fa-pencil' onClick={()=>dispatch(SetShow(true, usr._id))}></i>
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
    </>
  )
}

export default SettingTable







