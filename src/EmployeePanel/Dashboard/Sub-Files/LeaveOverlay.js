import React, { useState } from 'react'
import "../../../AdminPanel/Dashboard/dashboard.css"
import { useDispatch } from 'react-redux'
import { leaveState } from '../../../Redux/Actions/Action'
import { useParams } from 'react-router-dom'

const LeaveOverlay = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const[leave, setLeave] = useState('')

//  APPLY FOR LEAVE
    const applyForLeave = async(e) => {
        e.preventDefault()
        const id = params.id
        console.log(id)
        try {
            const res = await fetch(`/leave/${id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({leave})
            })
            if(res.status === 400){
                alert("Invalid date, This date is already spent")
                dispatch(leaveState(false))
            }else{
                alert("Applied for leave successfully")
                dispatch(leaveState(false))
                // window.location.reload()
            }
        } catch (error) {
            console.error(error)
        }
    }


  return (
    <div className="inner">
        <div className="heading">
            <h2>Apply for leave</h2>
            <i className='fa fa-times-circle' onClick={()=>dispatch(leaveState(false))}></i>
        </div>
        <div className="credentials">
            <form>
                <label>Select Date</label>
                <input type="date" name='date' onChange={(e)=>setLeave(e.target.value)} />

                <button onClick={applyForLeave}>Apply Now</button>
            </form>
        </div>
    </div>
  )
}

export default LeaveOverlay