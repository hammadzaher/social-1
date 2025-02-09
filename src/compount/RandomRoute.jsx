
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Signup from '../pages/Signup'
import Login from "../pages/login"
import Home from '../pages/Home'
import { GlobalContext } from '../context/context'
import { CircularProgress } from '@mui/material'
import Profile from '../pages/profile'

const RandomRoute = () => {

    let {state , dispatch} = useContext(GlobalContext)
  


  return (
    <div>
      {(state?.isLogin == true) ?
      <Routes>
      {/* <Route path="/detail/:id" element={<ProductDetail />} /> */}
      <Route path='/profile' element={<Profile />} />
      <Route path="/home" element={<Home/>} />
      <Route path='*' element={<Navigate to={"/home"} />} /> 
    </Routes>
    :
    (state?.isLogin == false) ?
    <Routes>
      <Route path="/sign" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path='*' element={<Navigate to={"/login"} />} /> 
    </Routes>
    :
    <CircularProgress  size={"10rem"} style={{textAlign : "center"}}/>
    // <p>hh</p>
      }
      
    </div>
  )
}

export default RandomRoute
