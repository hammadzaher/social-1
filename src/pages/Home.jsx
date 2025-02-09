import React, { useContext, useEffect, useState } from 'react'
// import context from 'react-bootstrap/esm/AccordionContext'
import { GlobalContext } from '../context/context'
import './pages.css'




const Home = () => {
  let { state, dispatch } = useContext(GlobalContext)

  return (
    <>
      <div id='flex'>
        {/* <h1 class="shadow-dance-text">SHADOW</h1>
        <h2>{state?.user?.displayName}</h2>
        <h3>{state?.user?.email}</h3>
        <img src={state?.user?.photoURL} alt="" /> */}
      </div>
      <a href="/profile" id='link1'> Profile </a> 
      <div className="text">
      <div class="shadow-dance-container">
        <h1 class="shadow-dance-text">{state?.user?.displayName}</h1>
        <h1 class="shadow-dance-text">{state?.user?.email}</h1>
      </div>
      </div>

    </>
  )
}

export default Home
