import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./login.css"

const Login = () => {
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
        const data = await res.json()
        if(res.status===200){
          alert("Log In successful")
          navigate(`/admin/${data._id}`)
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
    <div className='form_main'>
        <div className="inner">

        <p className='error_msg' style={{
            display: errorMsg.dispay,
            color: errorMsg.color,
            borderColor: errorMsg.color
        }}>{errorMsg.text}</p>

        <form>
            <label>Admin ID:</label>
            <input type="text" name="id" value={id} onChange={(e)=>setId(e.target.value)} placeholder='Employee ID'/>
            
            <label>Pin Code:</label>
            <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='PIN Code *0000'/>
            <button type='submit' onClick={submitData}>SUBMIT</button>
        </form>
        <NavLink className="navlink" to="/">Login as Employee</NavLink>
        </div>
    </div>
  )
}

export default Login