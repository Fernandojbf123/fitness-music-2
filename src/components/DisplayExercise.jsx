import React, { useEffect, useState } from 'react'
import ErrorMsg from './errorMsg';
import  "../styles/DisplayExercise.css"

const DisplayExercise = ({keyOfSet, keyOfExercise, idx, data, setData}) => {

  let [name, setName] = useState(data.exercisesData[keyOfExercise].name);
  let [duration, setDuration] = useState(data.exercisesData[keyOfExercise].duration);
  let [isErrorActive, setIsErrorActive] = useState(false);

  useEffect ( () => {
    let copy = {...data}
    if (name.length > 3 & duration >= 5) {
      copy.exercisesData[keyOfExercise].isValid = true;
      copy.exercisesData[keyOfExercise].name = name;
      return
    }
    copy.exercisesData[keyOfExercise].isValid = false;
    setData({...copy})
  },[name])

  useEffect ( () => {
    let copy = {...data}
    if (name.length > 3 & duration >= 5) {
      copy.exercisesData[keyOfExercise].isValid = true;
      copy.exercisesData[keyOfExercise].duration = duration;
      return 
    }
    copy.exercisesData[keyOfExercise].isValid = false;
    setData({...copy})
  },[duration])

    function handleUp (e,keyOfExercise) {
      e.preventDefault()
      setDuration(duration+5);
      let tmpDuration = duration+5;
      let copy = {...data}
      copy.exercisesData[keyOfExercise].duration = tmpDuration;
      setData({...copy})
    }
    
    function handleDown(e, keyOfExercise) {
      e.preventDefault()
      let tmpDuration
      if (duration-5 <5){ 
        setDuration(5);
        tmpDuration = 5;
      }
      else {
        setDuration(duration-5)
        tmpDuration = duration-5;
      }
      
      let copy = {...data}
      copy.exercisesData[keyOfExercise].duration = tmpDuration;
      setData({...copy})
    }

    function handleDeleteExercise(e, keyOfSet, keyOfExercise, idx) {
      e.preventDefault()

      if (Object.keys(data.sets).length === 1 & data.sets[keyOfSet].exercisesId.length === 1){
        //Cannot be deleted
        //ADD YOU CANT DELETE MESSAGE
        return
      }

      let copy = {...data}
      copy.sets[keyOfSet].exercisesId.splice(idx,1)
      delete copy.exercisesData[keyOfExercise]
      setData({...copy})
    }

  return (
    <>
    <form className='exercise'>
      <div className='exerciseName'>
        <input
          type='text'
          placeholder='add an exercise'
          value={name}
          onChange={ e => setName(e.target.value)}/>
      </div>

      <div className='exerciseDuration'>
        <input
          type='number'
          placeholder="30"
          value={duration}
          onChange={ e => setDuration(+e.target.value)}/>
      </div>

      <div className='timerBtns'>
        <button className='smallBtn' onClick={e => handleUp(e,keyOfExercise)}>+</button>
        <button className='smallBtn' onClick={e => handleDown(e,keyOfExercise)}>-</button>
      </div>

      <div className='exerciseDel'>
        <button 
          className="btnDel"
          onClick={e => handleDeleteExercise(e, keyOfSet, keyOfExercise, idx)}
        >X</button>
      </div>
    </form>  
  </>
  )
}

export default DisplayExercise

            
            