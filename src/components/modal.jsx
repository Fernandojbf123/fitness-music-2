import { useEffect, useState } from "react"
import useFitness from "../hooks/useFitness";

const Modal = () => {

  const {data, timeLeft, currentExerciseIdx, isTimerRunning, msgReader, looper, setCurrentExerciseIdx, handlePausePlay, handleRestartTimer, handleCloseModal} = useFitness();
  const [status, setStatus] = useState("preparation") 
  const [currentExerciseName, setCurrentExerciseName] = useState(data.exercisesData[currentExerciseIdx].name);
  const [finishRutine, setFinishRutine] = useState(false)

  useEffect ( () => { 
    //Ending
    if (timeLeft === 0 && status === "workout" && currentExerciseIdx=== data.exercisesData.length-1){
      console.log("Terminaste felicidades")
      setFinishRutine(true)
      return
    }
    //switching status to preparation and restarting timer
    else if (timeLeft===0 && status === "workout" && currentExerciseIdx<data.exercisesData.length-1){
      setStatus("preparation")
      setCurrentExerciseIdx( () => currentExerciseIdx+1)
      let initialTime = data.exercisesData[currentExerciseIdx].preparation
      looper(initialTime)     
      msgReader.messageReader(`Inicia preparación`)
     }
    //switching status to workout and restarting timer
   else if (timeLeft===0 && status === "preparation"){
    setStatus("workout")
    let initialTime = data.exercisesData[currentExerciseIdx].duration
    looper(initialTime)
    msgReader.messageReader(`Inicia ejercicio`)
    if (currentExerciseIdx>=1){
      setCurrentExerciseName(data.exercisesData[currentExerciseIdx].name)
    }
   }

    //read msg when reaching 10 segs
    if (timeLeft === 10 && status === "preparation"){
      msgReader.messageReader("10 segundos")
      if (currentExerciseIdx+1 > data.exercisesData.length-1){
        return
      }
      const nextExerciseName = data.exercisesData[currentExerciseIdx].name
      msgReader.messageReader(`tu siguiente ejercicio es ${nextExerciseName}`)

    }

    if (timeLeft <= 5 && timeLeft>=1){
      msgReader.messageReader(timeLeft)
    }



  },[timeLeft, status])
  
  useEffect (()=> {
    if (currentExerciseIdx>=1){
      setCurrentExerciseName(data.exercisesData[currentExerciseIdx].name)
    }
  },[status])
  

  return (
    <div className="w-screen min-h-screen bg-pink-300/50 z-20 absolute top-0 left-0 flex justify-center items-center">
      <div className="w-[80%] h-[300px] bg-purple-600 rounded-md relative flex flex-col justify-center items-center">
          
          {finishRutine ? (

            <div className="w-full flex justify-center items-center text-center">
                  <p className="p-2 text-4xl text-slate-200 font-bold">{`FELICIDADES HAS TERMINADO!!`}</p>
                  <div className="absolute top-0 right-0  flex justify-center items-center ">
                    <button 
                      className="w-[30px] h-[30px] bg-slate-200 rounded-md active:scale-90"
                      onClick={handleCloseModal}
                      >{`X`}</button>
                  </div>
            </div>

          ):(
            <>
              <div className="flex-1 w-full flex justify-center items-center">
                <div className="w-1/2 aspect-square border-2 border-white rounded-full flex flex-col justify-center items-center">
                    <p className="text-5xl text-slate-200 font-bold">{timeLeft}</p>
                    <p className="text-slate-200 font-bold">{currentExerciseName}</p>
                    <p className="text-slate-200 ">{status}</p>
                </div>
                
              </div>

              <div className="flex gap-5 mb-5 [&>button]:bg-slate-200 [&>button]:px-2 [&>button]:py-1 [&>button]:rounded-md ">
                <button 
                  className="active:scale-90"
                  onClick={handlePausePlay}>{isTimerRunning ? "Pause" : "Play"}</button>
                <button 
                  className="active:scale-90"
                  onClick={handleRestartTimer}>restart current exercise</button>
              </div>
              
              <div className="absolute top-0 right-0  flex justify-center items-center ">
                <button 
                  className="w-[30px] h-[30px] bg-slate-200 rounded-md active:scale-90"
                  onClick={handleCloseModal}
                  >{`X`}</button>
              </div>
            </>
          )}
      </div>

      
    </div>
  )
}

export default Modal
