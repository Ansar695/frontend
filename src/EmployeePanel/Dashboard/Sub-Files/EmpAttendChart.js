import React, { useEffect, useState } from 'react' 
import Chart from 'react-apexcharts'
import { useParams } from 'react-router-dom'

const EmpAttendChart = () => {
    const params = useParams()
    const[user, setUser] = useState()
    const[displayUsers, setDisplayUsers] = useState({
        min: 0,
        max: 2
    })

    let catArr = [1, 2, 3, 4, 5, 6, 7]
    let dataArr = [1, 0]
    let dayArr = []
    let perArr = []
    
    user&&user.schedule&&user.schedule.map((u) => {
        if(u.leave === "yes"){
            perArr.push(0)
        }else{
            const startH = new Date(u.date+","+u.start).getTime()
            const endH = new Date(u.date+","+u.end).getTime()
            let diff = (endH - startH)/1000
            diff /= (60*60)
            const hrs = Math.floor(Math.abs(diff))
            let per = Math.floor(hrs/9)
            
            console.log(hrs)
            dataArr.push(per+1)
        }
    })

    console.log(dataArr, catArr)

    var options = {
        chart: {
            type: 'bar'
        },
        series: [
            {
            name: 'Attendance(%)',
            data: dataArr
            }
        ],
        xaxis: {
            categories: catArr
        },
        yaxis: {
            categories:[10,20,30,40,50,60,70,80,90,100]
        }
    }

    // GET ALL EMPLOYES
    const getEmployee = async() => {
        const id = params.id
        try {
            const res = await fetch(`/get_user/${id}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json()
            if(res.status===200){
                setUser(data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const IncreaseUsers = () => {
        setDisplayUsers({
            min: displayUsers.min+2,
            max: displayUsers.max+2
        })
        console.log(displayUsers)
    }

    const DecreaseUsers = () => {
        setDisplayUsers({
            min: displayUsers.min-2,
            max: displayUsers.max-2
        })
        console.log(displayUsers)
    }

    useEffect(() => {
        getEmployee()
    },[])

  return (
    <div className='charts'>
        <h1>Employes Attendance Graphs</h1>
        <Chart options={options&&options} series={options.series} type="bar" className="chart" />
        <div className="pagination_btns">
            <button disabled={displayUsers.min==0?true:false} className='Prev' onClick={DecreaseUsers}><i className='fa fa-angle-double-left'></i> Prev</button>
            <button className='Next' onClick={IncreaseUsers}>Next <i className='fa fa-angle-double-right'></i></button>
        </div>
    </div>
  )
}

export default EmpAttendChart