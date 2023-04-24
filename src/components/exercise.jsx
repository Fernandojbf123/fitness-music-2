import React from 'react'
import "../styles/exercise.css"

const Exercise = ({exerciseData}) => {


    let {name, duration } = exerciseData

 return (

    <div className='exercise'>
       <div className='exerciseName'>
            <div>{name}</div>
       </div>
       <div className='exerciseDuration'>
            {duration}
       </div>
       
       <div className='exerciseDel'>
        X
       </div>

    </div>
  )
  
}

export default Exercise
