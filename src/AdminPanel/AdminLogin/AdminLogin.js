import React, {useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "../../EmployeePanel/EmpLogin/emplogin.css"

const AdminLogin = () => {
    const navigate = useNavigate();
    const[id, setId] = useState('')
    const[pin, setPin] = useState('')
    const[errorMsg, setErrorMsg] = useState({
      text: "",
      dispay: "none",
      color: "red"
    });
  
    const submitData = async(e) => {
      e.preventDefault();
      try {
          const res = await fetch("/save_admin", {
            method: "POST",
            headers: {
              "content-type":"application/json"
            },
            body: JSON.stringify({id, pin})
          })
          
          if(res.status===200){
            alert("Log In successful")
            navigate(`/admin-dashboard`)
            window.location.reload()
          }else{
              setErrorMsg({
                  text: "Invalid Admin ID or Pin Code",
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
  
    const errorHandler = () => {
      setTimeout(() => {
        setErrorMsg({
          text: "",
          dispay: "none"
        })
      }, 3000)
    }  


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
                <input data-testid="input_id" type="text" name="id" value={id} onChange={(e)=>setId(e.target.value)} placeholder='Enter your employee id...' />

                <label>Pin Code</label>
                <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='Enter your employee id...' />

                <button type='submit' onClick={submitData}>Login Now</button>
              </form>
              <NavLink className="navlink login_as_admin" to="/">Login as Employee</NavLink>
            </div>
          </div>
        </div>
    </div>
  )
}

export default AdminLogin