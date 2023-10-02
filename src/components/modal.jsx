import { useEffect, useState } from "react"
import useFitness from "../hooks/useFitness";

const Modal = () => {

  const {timeLeft, isTimerRunning, looper, data, currentExerciseIdx, setCurrentExerciseIdx, handlePausePlay, handleRestartTimer} = useFitness();
  const [status, setStatus] = useState("preparation") 
  const [currentExerciseName, setCurrentExerciseName] = useState(data.exercisesData[currentExerciseIdx].name);

  useEffect ( () => { 
    //Ending
    if (timeLeft === 0 && status === "workout" && currentExerciseIdx=== data.exercisesData.length-1){
      console.log("Terminaste felicidades")
      return
    }
    //
    else if (timeLeft===0 && status === "workout" && currentExerciseIdx<data.exercisesData.length-1){
      setStatus("preparation")
      setCurrentExerciseIdx( () => currentExerciseIdx+1)
      let initialTime = data.exercisesData[currentExerciseIdx].preparation
      looper(initialTime)     
     }

   else if (timeLeft===0 && status === "preparation"){
    setStatus("workout")
    let initialTime = data.exercisesData[currentExerciseIdx].duration
    looper(initialTime)
    if (currentExerciseIdx>=1){
      setCurrentExerciseName(data.exercisesData[currentExerciseIdx].name)
    }
    
   }
  },[timeLeft, status])
  
  useEffect (()=> {
    if (currentExerciseIdx>=1){
      setCurrentExerciseName(data.exercisesData[currentExerciseIdx].name)
    }
  },[status])
  

  return (
    <div className="w-screen min-h-screen bg-pink-300/50 z-20 absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[80%] h-[300px] bg-purple-600 rounded-md flex flex-col justify-center items-center">
          <div className="flex-1 w-full flex justify-center items-center">
            <div className="w-1/2 aspect-square border-2 border-white rounded-full flex flex-col justify-center items-center">
                <p className="text-5xl text-slate-200 font-bold">{timeLeft}</p>
                <p className="text-slate-200 font-bold">{currentExerciseName}</p>
                <p className="text-slate-200 ">{status}</p>
            </div>
            
          </div>

          <div className="flex gap-5 mb-5 [&>button]:bg-slate-200 [&>button]:px-2 [&>button]:py-1 [&>button]:rounded-md">
            <button onClick={handlePausePlay}>{isTimerRunning ? "Pause" : "Play"}</button>
            <button onClick={handleRestartTimer}>restart current exercise</button>
          </div>
      </div>
    </div>
  )
}

export default Modal
