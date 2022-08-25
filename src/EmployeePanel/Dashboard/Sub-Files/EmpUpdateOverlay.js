import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SetShow, UpdateShow } from '../../../Redux/Actions/Action'
import "../../../AdminPanel/Dashboard/dashboard.css"

const EmpUpdateOverlay = () => {
    const dispatch = useDispatch()
    const id = useSelector(state => state)

    const[userData, setUserData] = useState({
      name: "",
      email: "",
      mobile: "",
      pin: ""
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
                body: JSON.stringify({_id: id.updateId})
            })
            const data = await res.json()
            console.log("get single user")
            console.log(data)
            if(res.status === 200){
                setUserData({
                    name: data.name,
                    mobile: data.mobile,
                    email: data.email,
                    pin: data.pin
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    useMemo(() => {
        if(id.updateId !== undefined){
            getSingleEmployee()
        }
    }, [id.updateId])
    
      const submitData = async(e) => {
        e.preventDefault()
        const {name, email, mobile, pin} = userData
        console.log({name, email, mobile, pin})
        if(name===""||email==="" || mobile==="" || pin==="" || id.updateId===""){
          setErrorMsg({
            color: "red",
            text: "All fields are required!",
            dispay: "block"
          });
          errorHandler()
        }
        else if(pin.length <= 3 || pin.length >= 5 || isNaN(pin)){
          setErrorMsg({
            text: "Pin code should be of 4 digits",
            dispay: "block",
            color: "red"
          })
          errorHandler()
        }else{
          try {
              const res = await fetch("/update_employee_data", {
                  method: "POST",
                  headers: {
                      "content-type": "application/json"
                  },
                  body: JSON.stringify({id: id.updateId, name, email, mobile, role: "Engineer", duty: "9 AM - 6 PM", pin})
              })
              if(res.status === 200){
                  alert("Employee Updated successfully")
                  dispatch(UpdateShow(false))
                  window.location.reload()
              }
              else if(res.status === 400){
                alert("this pin code already exists")
              }
              else{
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
            <h2>Update Info</h2>
            <i className='fa fa-times-circle' onClick={()=>dispatch(UpdateShow(false, ""))}></i>
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

                <label>Pin Code</label>
                <input type="email" name='email' value={userData.pin} onChange={handleChange} />

                <button onClick={submitData}>Save</button>
            </form>
        </div>
    </div>
  )
}

export default EmpUpdateOverlay