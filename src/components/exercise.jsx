import React from 'react'
import "../styles/exercise.css"
import { useState, useEffect } from 'react';


const Exercise = ({numberOfSet, exerciseNumber, exerciseData, handleEditCard}) => {

 let [name, setName] = useState(exerciseData.name);
 let [duration, setDuration] = useState(exerciseData.duration);
 
 function handleDeleteExercise (e) {
  e.preventDefault();
  console.log(e.target)
  console.log("presionando borrar")
 }

 useEffect ( () => {
  let newExerciseData = 
    {
      name:name,
      duration:duration,
      preparation: 10,
    }
    if(newExerciseData.name !== "" & newExerciseData.duration >= 5){
      newExerciseData.isValid=true
    }
    else{
      newExerciseData.isValid=false
    }
  handleEditCard(numberOfSet, exerciseNumber,newExerciseData)
 },[name])

 useEffect ( () => {
  let newExerciseData = 
  {
    name:name,
    duration:duration,
    preparation: 10,
  }
  
  console.log(newExerciseData.duration)
  if(newExerciseData.name !== "" & newExerciseData.duration >= 5){
    newExerciseData.isValid=true
  }
  else{
    newExerciseData.isValid=false
  }
  handleEditCard(numberOfSet, exerciseNumber, newExerciseData)
 },[duration])



 return (

    <form className='exercise'>
       <div className='exerciseName'>
            <input
              type='text'
              placeholder='add an exercise'
              value={name}
              onChange={ e => setName(e.target.value)}
            />
       </div>
       <div className='exerciseDuration'>
         <input
            type='number'
            placeholder="30"
            value={duration}
            onChange={ e => setDuration(+e.target.value)}
         />
       </div>
       
       <div className='exerciseDel'>
         <button 
          className='btnDel'
          onClick={e => handleDeleteExercise(e)}
         >X</button>
       </div>

    </form>
  )
  
}

export default Exercise
