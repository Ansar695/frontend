import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChangeState, SearchText } from '../../../Redux/Actions/Action'
import "../dashboard.css"
import Overlay from '../Employes-Lists/Overlay'
import UserTable from '../Employes-Lists/UserTable'

const Employes = () => {
  const[search, setSearch] = useState('')
  const show = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <>
    <div className={`show_overlay ${show.overlayState? 'show_overlay_active':''}`}>
      <Overlay />
    </div>
    <div className="dashboard_main">
        <div className="left">
        </div>
        <div className="right">
            <div className="employes_list">
              <h2>Employes List</h2>
              <button onClick={()=>dispatch(ChangeState(true))}><i className='fa fa-plus'></i> Add New</button>
            </div>
            <div className="entries">
                <div className="entry_num">
                  Show 
                  <select onChange={(e)=>dispatch(SearchText(e.target.value))}>
                    <option value="all">All</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select> 
                  entries
                </div>
                <div className="searchbar">
                  <input type="text" placeholder='Search here... ' 
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <i className='fa fa-search'
                    onClick={()=>dispatch(SearchText(search))}
                  ></i>
                </div>
            </div>
            <UserTable />
        </div>
    </div>
    </>
  )
}

export default Employes