import React from 'react'
import "../styles/exerciseCard.css"
import AddExercise from './addExercise';
import Exercise from './exercise'

const ExerciseCard = ({exerciseCard,key}) => {

    let {num, exercisesData} = exerciseCard;

  return (
    <div className='exerciseCard' key={key}>
    
        <div className='cardHeader'>

            <div className='cardHeaderSpace'>
            </div>

            <div className='cardHeaderName'>
                SET Nº {num}
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
                        exerciseData={exercise}
                    />

                ))  
            ):(
                <AddExercise />
            )}
                

            <div className='addMore'>
                + 1
            </div>
        </div>
      
    </div>
  )
}

export default ExerciseCard
