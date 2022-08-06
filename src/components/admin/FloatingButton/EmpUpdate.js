import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./empupdate.css"

const EmpUpdate = ({overlay}) => {
  const params = useParams()
  const navigate = useNavigate()
  const[id, setId] = useState('')
  const[pin, setPin] = useState('')
  const[duty, setDuty] = useState('')
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });
  const[user, setUser] = useState()

  const getUserDet = async() => {
    const _id = params.id
    try {
        const res = await fetch("/get_user_det", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({_id})
        })
        const data = await res.json()
        setUser(data)
        setId(data.id)
        setPin(data.pin)
        setDuty(data.duty)
        console.log(data)
    } catch (error) {
        console.error(error)
    }
  }

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
        const _id = params.id
      try {
          const res = await fetch(`/update_employee/${_id}`, {
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
              alert("Employee updated successfully")
              navigate("/admin-settings")
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
    getUserDet()
  }, [])

  return (
    <div className="update_main">
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
                <input type="text"  value={pin} onChange={(e)=>setPin(e.target.value)} name='pin' placeholder='Enter 4 digits Pin Code' />
                
                <label>Duty Time</label>
                <input type="text" value={duty} onChange={(e)=>setDuty(e.target.value)} name='duty' placeholder='e.g. 9AM - 6PM' />
                
                <div className="btns">
                    <button onClick={updateData}>Update Now</button>
                    <button id='goback' onClick={()=>navigate("/admin-settings")}>Go Back</button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default EmpUpdate