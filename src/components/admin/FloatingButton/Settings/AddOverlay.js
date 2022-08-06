import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./addoverlay.css"

const AddOverlay = ({overlay}) => {
  const[ID,  setID] = useState()
  const[id, setId] = useState('')
  const[pin, setPin] = useState('')
  const[duty, setDuty] = useState('')
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });
  let uni_id;

  const updateData = async(e) => {
    e.preventDefault()
    console.log(id,pin,duty)
    if(id===""||pin==="" || duty===""){
      console.log("test")
      setErrorMsg({
        ...errorMsg,
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
    }
    else if(pin.length <= 3 || pin.length >= 5 || isNaN(pin)){
      setErrorMsg({
        text: "Pin code should be of 4 digits!",
        dispay: "block",
        color: "red"
      })
      errorHandler()
    }else{
      try {
          const res = await fetch("/add_employee", {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({id, pin, duty})
          })
          if(res.status===201 || res.status===202){
            setErrorMsg({
              text: "Employee ID and Pin Code already exit",
              dispay: "block",
              color: "red",
            })
            errorHandler()
          }
          else{
              alert("Employee saved successfully")
              overlay()
              window.location.reload()
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
    <div className="update_add_main">
      <div className="inner">
      <p className='error_msg' style={{
            display: errorMsg.dispay,
            color: errorMsg.color,
            borderColor: errorMsg.color
        }}>{errorMsg.text}</p>
        
            <form>
                <label>Employe Id</label>
                <input type="text" value={id} onChange={(e)=>setId(e.target.value)} name='id' placeholder='Enter Employee ID' />
                
                <label>Pin Code</label>
                <input type="text" onChange={(e)=>setPin(e.target.value)} name='pin' placeholder='Enter 4 digits Pin Code' />
                
                <label>Duty Time</label>
                <input type="text" onChange={(e)=>setDuty(e.target.value)} name='duty' placeholder='e.g. 9AM - 6PM' />
                
                <div className="btns">
                    <button onClick={updateData}>Update Now</button>
                    <button id='goback' onClick={()=>overlay()}>Go Back</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default AddOverlay