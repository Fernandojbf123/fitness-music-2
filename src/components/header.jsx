import React from 'react'
import { useState } from 'react'
import ErrorMsg from './errorMsg'

import "../styles/header.css"

const Header = ({exerciseCards, setExerciseCards, checkIfInputsAreWriten, isErrorActive, setIsErrorActive, errorMsg, setErrorMsg}) => {

  const handleAddSet = () => {
    let allFieldsValid = checkIfInputsAreWriten();
    let numberOfSets = exerciseCards.length;
    if (!allFieldsValid) {
      setErrorMsg("Llena todos los campos antes de agregar un nuevo set")
      setIsErrorActive(true)
      return
    }
    let numberOfSet=numberOfSets+1;
    let exercisesData = [{
      name: "",
      duration: 30,
      preparation: 20,
      isValid: false
    }]
    setExerciseCards([...exerciseCards, {numberOfSet, exercisesData}])    
    setErrorMsg("")
    setIsErrorActive(false)
  }

  return (
    <div className='header'>
      <div className='headerTxt'>
        <ErrorMsg 
          errorMsg={errorMsg}
          isErrorActive={isErrorActive}/>
      </div>
      <div className='headerBtn'>
        <button className='btn transparent' onClick={handleAddSet}>ADD SET</button>
      </div>
    </div>
  )
}

export default Header
