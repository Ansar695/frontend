import React, { useEffect, useState } from 'react' 
import Chart from 'react-apexcharts'

const AttendChart = () => {
    const[users, setUsers] = useState()
    const[displayUsers, setDisplayUsers] = useState({
        min: 0,
        max: 5
    })

    let catArr = []
    let dataArr = []
    let total = 0;
    let attend = 0

    const usersList = users&&users.slice(displayUsers.min, displayUsers.max)
    usersList&&usersList.map((user) => {
        catArr.push(user.id)
        user.schedule&&user.schedule.map((usr) => {
            if(usr.leave === "no"){
                attend += 1
            }
            total += 1
        })
        const l = user.schedule.length
        var percen = Math.floor((attend/l)*100)
        attend = 0
        dataArr.push(percen)
    })

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
        }
    }

    //  GET ALL EMPLOYES
  const getEmployes = async() => {
    try {
        const res = await fetch("/get_employes", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        if(res.status===200){
            setUsers(data)
            data.map((d) => {
                catArr.push(d.id)
            })
            console.log(catArr)
            options.xaxis.categories = catArr
            console.log(options)
        }
    } catch (error) {
        console.error(error)
    }
}

    const IncreaseUsers = () => {
        setDisplayUsers({
            min: displayUsers.min+5,
            max: displayUsers.max+5
        })
        console.log(displayUsers)
    }

    const DecreaseUsers = () => {
        setDisplayUsers({
            min: displayUsers.min-5,
            max: displayUsers.max-5
        })
        console.log(displayUsers)
    }

    useEffect(() => {
        getEmployes()
    },[])

  return (
    <div className='charts'>
        <h1>Employes Attendance Graphs</h1>
        <Chart options={options&&options} series={options.series} type="bar" className="chart" />
        <div className="pagination_btns">
            <button disabled={displayUsers.min===0?true:false} className='Prev' onClick={DecreaseUsers}><i className='fa fa-angle-double-left'></i> Prev</button>
            <button className='Next' onClick={IncreaseUsers}>Next <i className='fa fa-angle-double-right'></i></button>
        </div>
    </div>
  )
}

export default AttendChart