import React, {Suspense} from "react"
import { Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import Float from "./AdminPanel/Settings/Float"
import store from "./Redux/store"
const AdminLogin = React.lazy(() => import("./AdminPanel/AdminLogin/AdminLogin"))
const EmpLogin  = React.lazy(() => import("./EmployeePanel/EmpLogin/EmpLogin"))
const Header  = React.lazy(() => import("./AdminPanel/Header/Header"))
const Dashboard  = React.lazy(() => import("./AdminPanel/Dashboard/Dashboard"))
const Employes = React.lazy(() => import("./AdminPanel/Dashboard/Sub-Files/Employes"))
const Attendance = React.lazy(() => import("./AdminPanel/Dashboard/Sub-Files/Attendance"))
const AdminSetting = React.lazy(() => import("./AdminPanel/Settings/AdminSetting"))
const UpdateUserPin = React.lazy(() => import("./EmployeePanel/EmpLogin/UpdateUserPin"))
const FilterEmpRecord = React.lazy(() => import("./EmployeePanel/Dashboard/Sub-Files/FilterEmpRecord"))

const EmpHeader = React.lazy(() => import("./EmployeePanel/EmpHeader/EmpHeader"))
const EmpDashboard = React.lazy(() => import("./EmployeePanel/Dashboard/EmpDashboard"))
const EmpAttendance = React.lazy(() => import("./EmployeePanel/Dashboard/Sub-Files/EmpAttendance"))

const App = () => {

  return (
    <Provider store={store}>
    <Suspense fallback={
      <div className="loading">
        <div className="loader_inner">
          <h1>Loading...</h1>
        </div>
      </div>
    }>

      <Routes>
          <Route path="/admin-login-page" element={ <AdminLogin /> } />
          <Route path="/admin-dashboard" element={
              <>
                <Header />
                <Dashboard />
                <Float />
              </>
            } />
          
          <Route path="/employes-record" element={
              <>
                <Header />
                <Employes />
                <Float />
              </>
            } />

          <Route path="/employes-attendance" element={
              <>
                <Header />
                <Attendance />
                <Float />
              </>
            } />

          <Route path="/admin-employes-settings" element={
              <>
                <Header />
                <AdminSetting />
              </>
            } />


            {/* EMPLOYES NAV PATHS */}
            <Route path="/employee-home/:id" element={
              <>
                <EmpHeader />
                <EmpDashboard />
              </>
            } />

            <Route path="/employee-attendance/:id" element={
              <>
                <EmpHeader />
                <EmpAttendance />
              </>
            } />

            <Route path="/filter-employee-record/:id" element={
              <>
                <EmpHeader />
                <FilterEmpRecord />
              </>
            } />

            <Route path="/" element={ <EmpLogin /> } />

            <Route path="/employee-login_update" element={ <UpdateUserPin /> } />
            <Route path="*" element={<EmpLogin />} />
      </Routes>
    </Suspense>
    </Provider>
  )
}

export default App
