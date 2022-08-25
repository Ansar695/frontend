import React, { useState } from 'react'
import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetShow } from '../../../Redux/Actions/Action'
import "../../Dashboard/dashboard.css"

const UpdateOverlay = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state)
    const[userData, setUserData] = useState({
      name: "",
      email: "",
      mobile: "",
      role: "",
      duty: ""
    })

    const[errorMsg, setErrorMsg] = useState({
      text: "",
      dispay: "none",
      color: "red"
    });
    
    const handleChange = (e) => {
      const name = e.target.name
      const val = e.target.value
  
      setUserData({
        ...userData,
        [name]: val
      })
    }

    const getSingleEmployee = async() => {
        try {
            const res = await fetch("/get_single_employee", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({_id: id.id})
            })
            const data = await res.json()
            if(res.status === 200){
                setUserData({
                    name: data.name,
                    mobile: data.mobile,
                    email: data.email,
                    role: data.role,
                    duty: data.duty,
                })
            }
        } catch (error) {
            console.error(error)
        }
    }

    useMemo(() => {
        if(id.id !== undefined){
            getSingleEmployee()
        }
    }, [id.id])
  
    const submitData = async(e) => {
      e.preventDefault()
      const {name, email, mobile, role, duty} = userData
      console.log({name, email, mobile, role, duty})
      if(name===""||email==="" || mobile==="" || duty==="" || role===""){
        setErrorMsg({
          color: "red",
          text: "All fields are required!",
          dispay: "block"
        });
        errorHandler()
      }
      else if(duty.length <= 6 || duty.length >= 15){
        setErrorMsg({
          text: "Please enter valid duty time",
          dispay: "block",
          color: "red"
        })
        errorHandler()
      }else{
        try {
            const res = await fetch("/update_employee", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({id: id.id, name, email, mobile, role, duty})
            })
            if(res.status === 200){
                alert("Employee Updated successfully")
                dispatch(SetShow(false))
                window.location.reload()
            }else{
                alert("Error occured, try again")
                dispatch(SetShow(false))
            }
        } catch (error) {
            console.error(error)
        }
      }
    }
  
    const errorHandler = () => {
      setTimeout(() => {
        setErrorMsg({
          text: "",
          dispay: "none"
        })
      }, 3000)
    }

    return (
    <div className="inner">
        <div className="heading">
            <h2>Add New Employee</h2>
            <i className='fa fa-times-circle' onClick={()=>dispatch(SetShow(false, ""))}></i>
        </div>
        <div className="credentials">
          <p className='error_msg' style={{
              display: errorMsg.dispay,
              color: errorMsg.color,
              borderColor: errorMsg.color
          }}>{errorMsg.text}</p>
            <form>
                <label>Full Name</label>
                <input type="text" name='name' value={userData.name} onChange={handleChange} />

                <label>Mobile</label>
                <input type="text" name='mobile' value={userData.mobile} onChange={handleChange} />

                <label>Email Address</label>
                <input type="email" name='email' value={userData.email} onChange={handleChange} />

                <label>Role</label>
                <input type="text" name='role' value={userData.role} onChange={handleChange} />

                <label>Duty</label>
                <input type="text" name='duty' value={userData.duty} onChange={handleChange} />

                <button onClick={submitData}>Save</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateOverlay