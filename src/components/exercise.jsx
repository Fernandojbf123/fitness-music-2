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
         <div>{duration}</div>
       </div>
       
       <div className='exerciseDel'>
         <button className='btnDel'>X</button>
       </div>

    </div>
  )
  
}

export default Exercise
