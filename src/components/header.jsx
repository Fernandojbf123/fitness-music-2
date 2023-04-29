import React from 'react'
import "../styles/header.css"

const Header = ({exerciseCards, setExerciseCards}) => {


  const handleAddSet = () => {

    let numberOfSets = exerciseCards.length;
    let numberOfExercises = exerciseCards[numberOfSets-1].exercisesData.length;
    let lastExerciseName = exerciseCards[numberOfSets-1].exercisesData[numberOfExercises-1].name;
    let lastExerciseDuration = exerciseCards[numberOfSets-1].exercisesData[numberOfExercises-1].duration;

    if (lastExerciseName === "" || lastExerciseDuration==="" ) {
      console.log("ERROR")
      //ADD AN ERROR MSG
      return
    }
    
    let numberOfSet=numberOfSets+1;
    let exercisesData = [{
      name: "",
      duration: 30,
      preparation: 10
    }]

    setExerciseCards([...exerciseCards, {numberOfSet, exercisesData}])
    
  }

  return (
    <div className='header'>
      <div className='headerTxt'>Make a set and add an exercise</div>
      <div className='headerBtn'>
        <button className='btn transparent' onClick={handleAddSet}>ADD SET</button>
      </div>
    </div>
  )
}

export default Header
