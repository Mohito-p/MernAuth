import React from 'react'
import Register from './components/auth/Register.jsx'
import Login from './components/auth/Login.jsx'
import {Routes,Route} from 'react-router-dom'
import ForgetPassword from './components/auth/ForgetPassword.jsx'
import VerifyOtp from './components/auth/VerifyOtp.jsx'
import UpdatePassword from './components/auth/UpdatePassword.jsx'
//import Super from './components/ui/Super.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/forget/password" element={<ForgetPassword/>}/>
      <Route path="/verifyOtp" element={<VerifyOtp/>}/>
      <Route path="/updatepassword" element={<UpdatePassword/>}/>
      {/*<Route element ={<Super/>}></Route>*/}
    </Routes>
  )
}

export default App
