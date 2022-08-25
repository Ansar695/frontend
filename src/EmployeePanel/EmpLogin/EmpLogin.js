import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom'
import { userID } from '../../Redux/Actions/Action';
import "./emplogin.css"

const EmpLogin = () => {
  const navigate = useNavigate();
  const[id, setId] = useState('')
  const[pin, setPin] = useState('')
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });

  const dispatch = useDispatch()

  const errorHandler = async() => {
    setTimeout(() => {
      setErrorMsg({
        text: "",
        dispay: "none"
      })
    }, 3000)
  }

  const submitData = async(e) => {
    e.preventDefault();

    if(id===""||pin===""){
      setErrorMsg({
        ...errorMsg,
        text: "All fields are required!",
        dispay: "block"
      });
      errorHandler()
    }

    else if(id.length !== 6){
      setErrorMsg({
        text: "Invalid Id",
        dispay: "block",
        color: 'red'
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
    else{
        try {
          const res = await fetch("/save_user", {
            method: "POST",
            headers: {
              "content-type":"application/json"
            },
            body: JSON.stringify({id, pin})
          })
          const data = await res.json()
          if(res.status===201){
            alert("Log In successful")
            navigate(`/employee-home/${data._id}`)
            window.location.reload()
          }
          else if(res.status ===202){
            setErrorMsg({
              text: "Invalid Employee ID or Pin Code",
              dispay: "block",
              color: "red",
              borderColor: "red"
            })
            errorHandler()
          }
          else if(pin === "0000"){
            dispatch(userID(id))
            console.log(id)
            alert("Enter a new PIN Code again.")
            navigate("/employee-login_update")
          }else{
            setErrorMsg({
              text: "Default pin code is 0000",
              dispay: "block",
              color: "red",
              borderColor: "red"
            })
            errorHandler()
          }
        } catch (error) {
          console.error(error)
        }
      }
  }

  let uni_id;
  const uniqueID = () => {
    uni_id = "SE-"+Math.random().toString().substring(2, 5)
    setId(uni_id)
  }

  useEffect(() => {
      uniqueID()
  },[])

  return (
    <div className="login_main">
        <div className="left"></div>
        <div className="right"></div>

        <div className="login_popup">
          <div className="logo_content">
            <img className='img_logo' src="./images/emumba-logo.png" alt="" />
            <h3>Emumba Pvt Ltd</h3>
            <p>Bringing startup agility to enterprises</p>
          </div>

          <div className="login_content">
            <NavLink className="navlink" to="/help">Need help?</NavLink>
            <div className="login_box">
              <h2>Login</h2>

              <p className='error_msg' style={{
                  display: errorMsg.dispay,
                  color: errorMsg.color,
                  borderColor: errorMsg.color
              }}>{errorMsg.text}</p>

              <form>
                <label>Employee Id</label>
                <input type="text" name="id" value={id} onChange={(e)=>setId(e.target.value)} placeholder='Enter your employee id...' />

                <label>Pin Code</label>
                <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='Enter your employee id...' />

                <button type='submit' onClick={submitData}>Login Now</button>
              </form>
              <NavLink className="navlink login_as_admin" to="/admin-login-page">Login as Admin</NavLink>
            </div>
          </div>
        </div>
    </div>
  )
}

export default EmpLogin