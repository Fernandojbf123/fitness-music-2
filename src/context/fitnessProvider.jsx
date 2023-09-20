import { createContext, useState } from "react";
import { initialData } from "../exampleData";
const FitnessContext = createContext()

const FitnessProvider = ({children}) => {

    // function startMsgReader () {
    //     let msg = new SpeechSynthesisUtterance();
    //     let voices = window.speechSynthesis.getVoices();
    //     msg.voice = voices[9]; 
    //     msg.volume = 1; // From 0 to 1
    //     msg.rate = 1; // From 0.1 to 10
    //     msg.pitch = 0; // From 0 to 2
    //     msg.lang = 'es-mx';
    //     return msg
    //   }
    
    //   function messageReader (textToRead) {  
    //     msg.text = textToRead
    //     speechSynthesis.speak(msg);
    //   }
    
    //   function decreaseSongVolume () {
    //     let currentSong = document.getElementById("song");
    //     currentSong.volume = 0.2;
    //   }
    
    //   function raiseSongVolume () {
    //     let currentSong = document.getElementById("song");
    //     currentSong.volume = 0.8;
    //   }
      
      // function handleStart () {    
      //   //check that all fields are ok
      //   let allFieldsValid = checkIfInputsAreWriten();
        
      //   if (!allFieldsValid){
      //     //ADD ERROR MESSAGE
      //     setErrorMsg("El tiempo debe ser mayor a 5 segs y debes llenar todos los campos antes de empezar")
      //     setAreFieldsEmpty(true)
      //     setIsErrorActive(true)
      //   }
      //   else {
      //     setIsAppRunning(true)
      //     setNumberOfSets(Object.keys(data.sets).length)
      //     setCurrentSet(0)
      //     setCurrentSetId(data.setsOrder[0])
      //     setCurrentExercise(0)
      //     let tmpCurrentSet = data.setsOrder[0];
      //     let tmpCurrentExerciseId = data.sets[tmpCurrentSet].exercisesId[0]
      //     let tmpTimeLeft = data.exercisesData[tmpCurrentExerciseId].preparation;
      //     setTimeLeft(tmpTimeLeft+5)
      //     setIsExercise(false)
      //     setIsErrorActive(false)
      //     setCurrentExerciseId(tmpCurrentExerciseId)
      //     setCurrentExerciseName(data.exercisesData[tmpCurrentExerciseId].name)
      //     setCurrentExerciseDuration(data.exercisesData[tmpCurrentExerciseId].duration)
      //     setNumberOfExercisesOfSet(data.sets[tmpCurrentSet].exercisesId.length)
      //   }
      // }
      
      // function checkIfInputsAreWriten () {
      //   let allFieldsValid = true;
      //   let numberOfExercises = Object.keys(data.exercisesData).length
      //   let exercisesKeys = Object.keys(data.exercisesData)
      //   for (let i = 0; i< numberOfExercises; i++) {
      //     if (!data.exercisesData[exercisesKeys[i]].isValid) {
      //       allFieldsValid = false
      //       return allFieldsValid        
      //     }
      //   }
      //   return allFieldsValid
      // }

      const [data, setData] = useState(initialData)
      const [errorMsg, setErrorMsg] = useState("")

      function handleAddSet() {
        console.log("adding set")
      }

      function handleChangeExerciseDuration(e,id,value) {
        e.preventDefault()
        let updatedExercises = data.exercisesData.map (exercise => {
          if (exercise.id === id){
            return {...exercise, duration: Math.max(5,exercise.duration+value)}
          }
          return exercise
        })
        const updatedData = {
          sets: data.sets,
          exercisesData: updatedExercises,
          setsOrder: data.setsOrder
        }
        setData(updatedData)
        
      }
      
      function handleUpdateExercise (e,id) {
        e.preventDefault()
        let copyExercisesData = data.exercisesData.map( exercise => {
           if (exercise.id === id){
             return {...exercise, [e.target.name]:e.target.value}
           }
             return exercise
         });

        const updatedData = {
          sets: data.sets,
          exercisesData: copyExercisesData,
          setsOrder: data.setsOrder
        }
        setData(updatedData)
      }

      function handleDeleteExercise(e, id){
        e.preventDefault()
        setTimeout ( () => {
          if (data.exercisesData.length === 1 && data.sets.length === 1) {
            setErrorMsg("There must be at least one item")
            return
          }
          const updatedExercisesData = data.exercisesData.filter( exercise => exercise.id != id)
          const updatedSets = data.sets.filter (set => set.exercisesId != id)
          const updatedData = {
            sets: updatedSets,
            exercisesData: updatedExercisesData,
            setsOrder: data.setsOrder
          }

          setData(updatedData)
        },200)
      }
    

    return (

        <FitnessContext.Provider
            value={
              { 
                data,
                handleAddSet,
                handleChangeExerciseDuration,
                handleUpdateExercise,
                handleDeleteExercise
              }}
        >
            {children}
        </FitnessContext.Provider>
    )

}

export { FitnessProvider }

export default FitnessContext
