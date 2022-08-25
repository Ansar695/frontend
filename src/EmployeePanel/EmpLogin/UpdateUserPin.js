import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./emplogin.css"

const UpdateUserPin = () => {
    const {userid} = useSelector(state => state)
    const navigate = useNavigate();
    let id = userid
    const[pin, setPin] = useState('')
    const[userData, setUserData] = useState({
      name: "",
      email: "",
      mobile: "",
    })
    const[errorMsg, setErrorMsg] = useState({
      text: "",
      dispay: "none",
      color: "red"
    });

    const errorHandler = async() => {
      setTimeout(() => {
        setErrorMsg({
          text: "",
          dispay: "none"
        })
      }, 3000)
    }

    const handleChange = (e) => {
      const name = e.target.name
      const val = e.target.value

      setUserData({
        ...userData,
        [name]: val
      })
    }
  const submitData = async(e) => {
    e.preventDefault()
    const {name, email, mobile} = userData
    console.log({name, email, mobile})
    if(name===""||email==="" || mobile==="" || pin==="" || id ===""){
      setErrorMsg({
        color: "red",
        text: "All fields are required!",
        dispay: "block"
      });
      errorHandler()
    }
    else if(pin.length <= 3 || pin.length >= 5 || isNaN(pin)){
      setErrorMsg({
        ...errorMsg,
        text: "Pin code should be of 4 digits!",
        dispay: "block"
      })
      errorHandler()
    }
    else if(mobile.length <= 7 || pin.length >= 12 || isNaN(mobile)){
      setErrorMsg({
        ...errorMsg,
        text: "Invalid mobile number!",
        dispay: "block"
      })
      errorHandler()
    }else{
      try {
          const res = await fetch("/signup_as_employee", {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({id, name, email, mobile, pin})
          })
          const data = await res.json()
          if(res.status===400){
            setErrorMsg({
              text: "Employee ID and Pin Code already exit",
              dispay: "block",
              color: "red",
            })
            errorHandler()
          }
          else if(res.status === 200){
              alert("Registered successfully.")
              navigate(`/employee-home/${data._id}`)
              window.location.reload()
          }
      } catch (error) {
          console.error(error)
      }
    }
  }
  
  return (
    <div className="login_main">
        <div className="left"></div>
        <div className="right"></div>

        <div className="login_popup">
          <div className="logo_content">
            <img className='img_logo' src="./images/emumba-logo.png" alt="" />
            <h3>Emumba Pvt Ltd</h3>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. adipisicing elit</p>
          </div>

          <div className="login_content">
            <div className="login_box">
              <h2>Profile Info</h2>

              <p className='error_msg' style={{
                  display: errorMsg.dispay,
                  color: errorMsg.color,
                  borderColor: errorMsg.color
              }}>{errorMsg.text}</p>

              <form>
              <label>Full Name</label>
                <input type="text" name='name' onChange={handleChange} placeholder="Enter your name." />

                <label>Mobile</label>
                <input type="text" name='mobile' onChange={handleChange} placeholder="Enter your mobile." />

                <label>Email Address</label>
                <input type="email" name='email' onChange={handleChange} placeholder="Enter your email." />

                <label>Pin Code</label>
                <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='Enter your pin code.' />

                <button type='submit' onClick={submitData}>SUBMIT</button>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UpdateUserPin