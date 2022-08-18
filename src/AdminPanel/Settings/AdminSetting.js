import React,{ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SearchText } from '../../Redux/Actions/Action'
import "../Dashboard/dashboard.css"
import SettingTable from './Sub-Files/SettingTable'
import UpdateOverlay from './Sub-Files/UpdateOverlay'

const AdminSetting = () => {
  const[search, setSearch] = useState('')
  const dispatch = useDispatch()
  const show = useSelector(state => state)
  console.log(show)

  return (
    <>
    <div className={`show_update_overlay ${show.stateShow? 'show_update_overlay_active':''}`}>
      <UpdateOverlay />
    </div>
    <div className="dashboard_main">
        <div className="left"></div>
        <div className="right">
            <div className="employes_list">
              <h2>Employes List</h2>
            </div>
            <div className="entries">
                <div className="entry_num">
                  Show 
                  <select>
                    <option value="all">All</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select> 
                  entries
                </div>
                <div className="searchbar">
                  <input type="text" placeholder='Search here Name, Email, Id... ' 
                    onChange={(e)=>setSearch(e.target.value)}
                  />
                  <i className='fa fa-search'
                    onClick={()=>dispatch(SearchText(search))}
                  ></i>
                </div>
            </div>
            <SettingTable />
        </div>
    </div>
    </>
  )
}

export default AdminSetting