import React, { useState } from 'react'
import './updateprofile.css'
import {useParams} from "react-router-dom" 

const UpdateProfile = ({overlay}) => {
  const param = useParams()
  const[profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: ""
  })
  const[errorMsg, setErrorMsg] = useState({
    text: "",
    dispay: "none",
    color: "red"
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setProfile({
        ...profile,
        [name]:val
    })
  }

  const updateData = async(e) => {
    e.preventDefault()
    const id = param.id
    const{name, mobile, email} = profile
    if(name.length<=4 || mobile.length<7||email.leng<4){
      setErrorMsg({
        text: "Please enter correct details",
        dispay: "block",
        color: "red"
      });
      errorHandler()
    }
    else if(isNaN(mobile)){
      setErrorMsg({
        text: "Invalid mobile umber",
        dispay: "block",
        color: "red"
      });
      errorHandler()
    }
    else{
      try {
        const res = await fetch("/update_user_info", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({id, name, mobile, email})
        })

        if(res.status===200){
            alert("Records updated successfully")
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

  return (
    <div className="update_main">

        <div className="inner">
        <p className='error_msg' style={{
            display: errorMsg.dispay,
            color: errorMsg.color,
            borderColor: errorMsg.color
        }}>{errorMsg.text}</p>

            <form>
                <label>Full Name</label>
                <input type="text" onChange={handleChange} name='name' placeholder='Enter full name.' />

                <label>Cell Phone</label>
                <input type="mobile" onChange={handleChange} name='mobile' placeholder='Enter cell phone' />

                <label>Email</label>
                <input type="email" onChange={handleChange} name='email' placeholder='Enter email' />
                <div className="btns">
                    <button onClick={updateData}>Update Now</button>
                    <button id='goback' onClick={()=>overlay()}>Go Back</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateProfile