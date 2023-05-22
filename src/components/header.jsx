import React from 'react'
import { useState } from 'react'
import ErrorMsg from './errorMsg'

import "../styles/header.css"

const Header = ({data, setData, checkIfInputsAreWriten, isErrorActive, setIsErrorActive, errorMsg, setErrorMsg}) => {


  let [isClicked, setIsClicked] = useState(false);

  function handleAddSet () {
    setIsClicked(true)
      setTimeout ( () => {
        setIsClicked(false)
    },[200])
    
    let allFieldsValid = checkIfInputsAreWriten();
    if (!allFieldsValid) {
      setErrorMsg("Llena todos los campos antes de agregar un nuevo set")
      setIsErrorActive(true)
      return
    }
    let copy = {...data}
    copy.addSet()
    setData({...copy})
    
  }

  return (
    <div className='header'>
      <div className='headerTxt'>
        <ErrorMsg 
          errorMsg={errorMsg}
          isErrorActive={isErrorActive}/>
      </div>
      <div className='headerBtn'>
        <button 
          className={`btn transparent ${isClicked && `clicked`}`}
          onClick = {e => handleAddSet (e)}>ADD SET</button>
      </div>
    </div>
  )
}

export default Header
