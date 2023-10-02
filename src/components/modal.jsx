import { useEffect, useState } from "react"
import useFitness from "../hooks/useFitness";

const Modal = () => {

  const {timeLeft, looper, data, currentExerciseIdx, setCurrentExerciseIdx} = useFitness();
  const [status, setStatus] = useState("preparation") 
  
  useEffect ( () => { 
    if (timeLeft === 0 && status === "workout" && currentExerciseIdx=== data.exercisesData.length-1){
      console.log("Terminaste felicidades")
      return
    }

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
   }
  },[timeLeft, status])
  
  // QUEDÉ ACÁ ARREGLANDO QUE FUNCIONEN LOS BOTONES DE PAUSA Y RESET

  return (
    <div className="w-screen min-h-screen bg-pink-300/50 z-20 absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[80%] h-[300px] bg-purple-600 rounded-md flex flex-col justify-center items-center">
          <div className="flex-1 w-full flex justify-center items-center">
            <p className="w-1/2 h-1/2 border-2 border-white rounded-full">{timeLeft}</p>
          </div>

          <div className="flex gap-5 mb-5 [&>button]:bg-slate-200 [&>button]:px-2 [&>button]:py-1 [&>button]:rounded-md">
            <button>pause</button>
            <button>reset</button>
          </div>
      </div>
    </div>
  )
}

export default Modal
