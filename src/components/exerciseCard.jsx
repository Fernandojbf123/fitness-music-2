import React, { useEffect, useState } from 'react'
import DisplayExercise from './DisplayExercise'

import "../styles/exerciseCard.css"
import configImg from "../images/gear.png"

const ExerciseCard = ({keyOfSet, numberOfSet, data, setData}) =>  {

    let [isClicked, setIsClicked] = useState(false);
    let exercisesId = data.sets[keyOfSet].exercisesId;

    useEffect ( () => {
        //Card updater
        if (data.sets[keyOfSet].exercisesId.length === 0 & Object.keys(data.sets).length > 1 ) {
            let copy = {...data}
            delete copy.sets[keyOfSet]
            setData({...data})      
        }
    },[data])

    function handleClickConfig(e) {
        setIsClicked(true)
        setTimeout ( () => {
            setIsClicked(false)
        },[200])
    }

    function handleAddExercise (e, keyOfSet) {
        e.preventDefault()
        let exercisesIdLength = data.sets[keyOfSet].exercisesId.length;
        let newExerciseId = `${numberOfSet + 1}-${exercisesIdLength + 1}`
        let copy = {...data}
        copy.addExcercise(keyOfSet, newExerciseId)
        setData({...copy})
    }

  return (
    <div className='exerciseCard'>
    
        <div className='cardHeader'>

            <div className='cardHeaderSpace'>
            </div>

            <div className='cardHeaderName'>
                SET Nº {numberOfSet + 1}
            </div>
        
            <div className='cardHeaderBtn'>
                <div>
                    <img src={configImg} 
                         alt="config buttom" 
                         className={`configImg ${isClicked && "clicked"} `}
                         onClick={e => handleClickConfig(e)}
                    />
                </div>    
            </div>

        </div>
            

        <div className='cardBody'>

            {exercisesId.length > 0 && (
                exercisesId.map( (exerciseId,idx) => {
                    let keyOfExercise = exerciseId

                    return(
                        <DisplayExercise 
                            key = {keyOfExercise}
                            keyOfSet = {keyOfSet}
                            keyOfExercise = {keyOfExercise}
                            idx = {idx}
                            data = {data}
                            setData = {setData}
                        />)
                })
             
            )}

            <button 
                className='btn addMore'
                onClick={ e => handleAddExercise(e, keyOfSet)}
                >ADD EXERCISE
            </button>
        </div>
      
    </div>
  )
}

export default ExerciseCard