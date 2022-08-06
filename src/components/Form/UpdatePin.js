import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./form.css"

const UpdatePin = ({ID}) => {
  const navigate = useNavigate();
  const[pin, setPin] = useState('')
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });

  const submitData = async(e) => {
    e.preventDefault();

    if(ID===""||pin===""){
      console.log("test")
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
          const res = await fetch("/save_new_user", {
            method: "POST",
            headers: {
              "content-type":"application/json"
            },
            body: JSON.stringify({id:ID, pin})
          })
          const data = await res.json()
          if(res.status===200){
            alert("Log In successful")
            navigate(`/${data._id}`)
          }
          else if(res.status==400 || res.status==401){
            setErrorMsg({
              text: "Pin Code already registered.",
              dispay: "block",
              color: "red",
              borderColor: "red"
            })
            errorHandler()
          }
          else{
            navigate("/update-user-pin")
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

  useEffect(() => {
    console.log(ID)
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
            <input type="text" name="id" defaultValue={ID} placeholder='Employee ID'/>
            
            <label>Pin Code:</label>
            <input type="text" name="pin" value={pin} onChange={(e)=>setPin(e.target.value)} placeholder='4 digits PIN Code'/>
            <button type='submit' onClick={submitData}>SUBMIT</button>
        </form>

        </div>
    </div>
  )
}

export default UpdatePin