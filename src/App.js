import React, {Suspense, useState} from "react"
import { Routes, Route } from "react-router-dom"
import Setting from "./components/admin/FloatingButton/Setting"
import Header from "./components/Header/Header"
const Form = React.lazy(() => import("./components/Form/Form"))
const UpdatePin = React.lazy(() => import("./components/Form/UpdatePin"))
const Card = React.lazy(() => import("./components/User/Card"))
const Admin = React.lazy(() => import("./components/admin/Admin"))
const Login = React.lazy(() => import("./components/admin/Login"))
const EmpSetting  = React.lazy(() => import("./components/admin/FloatingButton/Settings/EmpSetting"))
const EmpUpdate  = React.lazy(() => import("./components/admin/FloatingButton/EmpUpdate"))

const App = () => {
  const[ID, setID] = useState();

  const userID = (id) => {
    setID(id)
  }

  return (
    <Suspense fallback={
      <div className="loading">
        <div className="loader_inner">
          <h1>Loading...</h1>
        </div>
      </div>
    }>

      <Header/>
      <Routes>
          <Route path="/" element={ <Form userID={userID} /> } />
          <Route path="/update-user-pin" element={ <UpdatePin ID={ID} /> } />
          <Route path="/:id" element={ <Card /> } />
          <Route path="/admin-login" element={ <Login /> } />
          <Route path="/admin/:id" element={ 
            <>
              <Admin />
              <Setting />
            </>
           } />
          <Route path="/admin-settings" element={ <EmpSetting /> } />
          <Route path="/update/:id" element={ <EmpUpdate /> } />
      </Routes>

    </Suspense>
  )
}

export default App
