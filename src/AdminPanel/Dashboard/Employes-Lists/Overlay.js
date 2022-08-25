import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ChangeState } from '../../../Redux/Actions/Action'

const Overlay = () => {
  const dispatch = useDispatch()
  const[id, setId] = useState()
  const[userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    duty: ""
  })
  let uni_id;

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

  const submitData = async(e) => {
    e.preventDefault()
    const {name, email, mobile, role, duty} = userData
    console.log({name, email, mobile, role, duty})
    if(name===""||email==="" || mobile==="" || duty==="" || role===""){
      setErrorMsg({
        color: "red",
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
    }else{
      try {
          const res = await fetch("/add_employee", {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({id, name, email, mobile, role, duty})
          })
          if(res.status===201){
            setErrorMsg({
              text: "Please try Different email or Id",
              dispay: "block",
              color: "red",
            })
            errorHandler()
          }
          else if(res.status === 200){
              alert("Employee saved successfully")
              dispatch(ChangeState(false))
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
    <div className="inner">
        <div className="heading">
            <h2>Add New Employee</h2>
            <i className='fa fa-times-circle' onClick={()=>dispatch(ChangeState(false))}></i>
        </div>
        <div className="credentials">
          <p className='error_msg' style={{
              display: errorMsg.dispay,
              color: errorMsg.color,
              borderColor: errorMsg.color
          }}>{errorMsg.text}</p>
            <form>
                <label>Full Name</label>
                <input type="text" name='name' onChange={handleChange} />

                <label>Mobile</label>
                <input type="text" name='mobile' onChange={handleChange} />

                <label>Email Address</label>
                <input type="email" name='email' onChange={handleChange} />

                <label>Role</label>
                <input type="text" name='role' onChange={handleChange} />

                <label>Duty</label>
                <input type="text" name='duty' onChange={handleChange} />

                <button onClick={submitData}>Save</button>
            </form>
        </div>
    </div>
  )
}

export default Overlay