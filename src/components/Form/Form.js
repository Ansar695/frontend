import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import "./form.css"

const Form = ({userID}) => {
  const navigate = useNavigate();
  const[id, setId] = useState('')
  const[pin, setPin] = useState('')
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });
  let uni_id;

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
            navigate(`/${data._id}`)
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
          else if(pin == "0000"){
            userID(id)
            alert("Enter a new PIN Code again.")
            navigate("/update-user-pin")
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

  const errorHandler = () => {
    setTimeout(() => {
      setErrorMsg({
        text: "",
        dispay: "none"
      })
    }, 3000)
  }

  const uniqueID = () => {
    uni_id = "SE-"+Math.random().toString().substring(2, 5)
    setId(uni_id)
  }

  useEffect(() => {
      uniqueID()
  },[])

  return (
    <div className='form_main'>
        <div className="inner">

        <p className='error_msg' style={{
            display: errorMsg.dispay,
            color: errorMsg.color,
            borderColor: errorMsg.color
        }}>{errorMsg.text}</p>

        <form>
            <label>Employee ID:</label>
            <input type="text" name="id" value={id} onChange={(e)=>setId(e.target.value)} placeholder='Employee ID'/>
            
            <label>Pin Code:</label>
            <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='PIN Code *0000'/>
            <button type='submit' onClick={submitData}>SUBMIT</button>
        </form>
        <NavLink className="navlink" to="/admin-login">Login as Admin</NavLink>
        </div>
    </div>
  )
}

export default Form