import { createContext, useState } from "react";
import { initialData } from "../exampleData";
import { generateId } from "../helpers/helper";
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

      function handleDeleteExercise(e, id, groupId){
        e.preventDefault()
        
        const idx = data.sets.findIndex(set => set.id === groupId);
        let {exercisesId: copyExercisesId} = data.sets[idx]
        let updatedSets
        let updatedExercisesData
        let updatedExercisesId 
        let updateSetOrders

        setTimeout ( () => {
          //verify there is at least 1 exercise
          if (data.sets[idx].exercisesId.length === 1 && data.sets.length===1) {
            setErrorMsg("There must be at least one exercise")
            return
          }

          //verify that this is last exercise in the set (delete the set)
          if (data.sets[idx].exercisesId.length === 1 && data.sets.length>1) {
            console.log("ACA")
            updatedSets = data.sets.filter( set => set.id != groupId)
            updateSetOrders = data.setsOrder.filter( setId => setId != groupId)
          }

          //else there are more exercises in the set (delete the exercise)
          else if (data.sets[idx].exercisesId.length>1 && data.sets.length>=1) { 
            //update sets exercisesId
            
            updatedExercisesId = copyExercisesId.filter( exerciseId => exerciseId != id)
            updatedSets = data.sets.map( set => {
              if (set.id === groupId){
                return {
                  id: set.id,
                  title: set.title,
                  exercisesId: updatedExercisesId
                }
              }
              return set
            })
            updateSetOrders = data.setsOrder
          }

          
          //update exercisesData
          updatedExercisesData = data.exercisesData.filter( exercise => exercise.id != id)

          //update all data
          const updatedData = {
            sets: updatedSets,
            exercisesData: updatedExercisesData,
            setsOrder: updateSetOrders
          }

          setData(updatedData) 

        },100)
      }

      function handleAddExercise (e, groupId) {
        
        const newId = generateId();
        //update exercisesData with new id
        const newExercise = {
          groupId, 
          id: newId, 
          name: "", 
          duration: 30, 
          preparation: 20, 
          isValid: false,
        }

        let updatedExercisesData = [...data.exercisesData, newExercise];
        

        //update sets with new id
        let idx = data.sets.findIndex( set => set.id === groupId);
        let updatedSets = data.sets;
        updatedSets[idx].exercisesId.push(newId)
        
        //update all data
        const updatedData = {
          sets: updatedSets,
          exercisesData: updatedExercisesData,
          setsOrder: data.setsOrder
        }

        setData(updatedData)
      }
    

    return (

        <FitnessContext.Provider
            value={
              { 
                data,
                handleAddSet,
                handleChangeExerciseDuration,
                handleUpdateExercise,
                handleDeleteExercise,
                handleAddExercise
              }}
        >
            {children}
        </FitnessContext.Provider>
    )

}

export { FitnessProvider }

export default FitnessContext
