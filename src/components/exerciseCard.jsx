import React from 'react'
import "../styles/exerciseCard.css"
import AddExercise from './addExercise';
import Exercise from './exercise'

const ExerciseCard = ({exerciseCard, handleEditCard, handleAddExercise}) => {

    let {numberOfSet, exercisesData} = exerciseCard;

  return (
    <div className='exerciseCard'>
    
        <div className='cardHeader'>

            <div className='cardHeaderSpace'>
            </div>

            <div className='cardHeaderName'>
                SET Nº {numberOfSet}
            </div>
        
            <div className='cardHeaderBtn'>
                <div>BTN CONFIG</div>    
            </div>

        </div>
            

        <div className='cardBody'>

            {exercisesData.length > 0 ? (
                exercisesData.map( (exercise,idx) => (
                    <Exercise 
                        key={idx}
                        numberOfSet={numberOfSet} //set number
                        exerciseNumber={idx}
                        exerciseData={exercise}
                        handleEditCard={handleEditCard}
                    />
                ))  
            ):(
                <AddExercise />
            )}
                

            <button 
                className='btn addMore'
                onClick={e => handleAddExercise(numberOfSet-1)}
                >ADD EXERCISE
            </button>
        </div>
      
    </div>
  )
}

export default ExerciseCard
