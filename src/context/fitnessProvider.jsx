import { createContext, useState } from "react";
import { initialData } from "../exampleData";
import { generateId, isBlank } from "../helpers/helper";
const FitnessContext = createContext()

const FitnessProvider = ({children}) => {

      const [data, setData] = useState(initialData)
      const [errorMsg, setErrorMsg] = useState("")
      const [timeLeft, setTimeLeft] = useState();
      const [isModalActive,setIsModalActive] = useState(false)
      const [currentExerciseIdx, setCurrentExerciseIdx] = useState(0)
      const [timer, setTimer] = useState({});
      const [isTimerRunning, setIsTimerRunning] = useState(false)
      const [msgReader, setMsgReader] = useState({})
      const [status, setStatus] = useState("preparation") 



      // **** Functions of CRUD exercises *****  //
      function handleAddSet() {
        let newGroupId = generateId();
        let newExerciseId = generateId();
        let numberOfSets = data.sets.length;
        
        let newSet = {
          id: newGroupId, 
          title: `set ${numberOfSets+1}`, 
          exercisesId: [newExerciseId],
        }
        
        let newExercisesData = {
                                groupId: newGroupId,
                                id: newExerciseId, 
                                name: "", 
                                duration: 30, 
                                preparation: 20, 
                                isValid: false
                              }
        let newData = {
          sets: [...data.sets, newSet],
          exercisesData: [...data.exercisesData, newExercisesData],
          setsOrder: [...data.setsOrder, newGroupId]
        }
        console.log(newData)
        setData(newData)
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
      
      //update exercise
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

      //delete exercise
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

      //add exercise
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

      //copy a set of exercise
      function handleCopySet (id) {      
        //find the number of the new set 
        const numberOfSet = data.sets.length+1;
        // generate id for the new gruop of exercises
        const newGroupId = generateId();
        // make a copy of exercises of the selected group and generate unique id for each exercise
        let newExercisesData = data.exercisesData.filter ( exercise => exercise.groupId === id)
        //this will change the id of the exercises and also their gruop id
        let newExercisesDataWithNewIds = newExercisesData.map (exercise => {
          const copyExercise = {...exercise} 
          copyExercise.id = generateId();
          copyExercise.groupId = newGroupId;
           return copyExercise
        })

        //creat the new set
        let newSet = {
          id: newGroupId,
          title: `set ${numberOfSet}`,
          exercisesId: newExercisesDataWithNewIds.map( exercise => exercise.id)
        }

        //create the new data
        let newData = {
          sets: [...data.sets, newSet],
          exercisesData: [...data.exercisesData, ...newExercisesDataWithNewIds],
          setsOrder: [...data.setsOrder, newGroupId]
        }
        setData(newData)        
      }
    

      //**** Functions to check forms ****//
      function checkIfInputsAreWriten () {
        const {exercisesData} = data;
        let allFieldsValid = true;
        let newExerciseData = exercisesData.map ( exercise => {
          let exerciseCopy = {...exercise}
          if (exerciseCopy.name == "" || isBlank(exerciseCopy.name) ||exerciseCopy.duration <5 ){
            allFieldsValid = false
            return exerciseCopy
          }
          exerciseCopy.isValid = true;
          return exerciseCopy
        })

        if (!allFieldsValid){
          setErrorMsg("All exercises field are mandatory")
          setTimeout ( () =>{
            setErrorMsg("")
          },5000)
          return
        }

        let newData = {...data}
        newData.exercisesData = newExerciseData;
        setData({...newData})
        setErrorMsg("")
      }

      // ***** timer class ***** //

      class Timer{
        constructor(counter){
          this.setCounter(counter)
          this.running = false;
          this.instante = this;
        }

        setCounter(counter) {
          this.counter = counter
        }
        getCounter() {
          return this.counter;
        }

        getRunning() {
          return this.running;
        }
        
        getTimerId (){
          return this.timerId
        }

        play() {
          if (this.running){
            return
          }
          this.running = true;
          this.timerId = setInterval( () => {
            this.setCounter(this.counter-1)
            this.getCounter()
            setTimeLeft(this.getCounter())
            
            if (this.counter === 0){
              this.pause()
            }
          },1000)
        }

        pause () {
          if (!this.running){
            return
          }
          this.running = false;
          clearInterval(this.timerId)
        }
      }

      //**** voice and music functions*****//
      class MsgReader {
        constructor(){
          this.msg = new SpeechSynthesisUtterance();
          this.voices = window.speechSynthesis.getVoices();
          this.msg.voice = this.voices[9]; 
          this.msg.volume = 1; // From 0 to 1
          this.msg.rate = 1.6; // From 0.1 to 10
          this.msg.pitch = 0; // From 0 to 2
          this.msg.lang = 'es-mx';
        }

        messageReader (textToRead) {
          this.msg.text = textToRead
          speechSynthesis.speak(this.msg)
        }
        
        decreaseSongVolume () {
          this.currentSong = document.getElementById("song");
          this.currentSong.volume = 0.2;
        }
        raiseSongVolume () {
          this.currentSong = document.getElementById("song");
          this.currentSong.volume = 0.8;
        }  
        
      }
    
      // **** button's handlers to control timer **** //

      function handleStart (){
        checkIfInputsAreWriten()
        setIsModalActive(true)
        setCurrentExerciseIdx(0)
        let initialTime = data.exercisesData[currentExerciseIdx].preparation;
        looper(initialTime)
        let voice = new MsgReader()
        voice.messageReader("Iniciando rutina de ejercicios")
        voice.messageReader(`Tienes ${initialTime} segundos de preparación y tu primer ejercicio es ${data.exercisesData[currentExerciseIdx].name}`)
        setMsgReader(voice)
      }

      function looper (time) {
        const timer = new Timer(time)
        setTimer(timer)
        setTimeLeft(timer.getCounter()) 
        timer.play()
        setIsTimerRunning(true)
      }

      function handlePausePlay () {
        if (timer.getRunning()){
          timer.pause()
          setIsTimerRunning(false)
          return
        }
        timer.play()
        setIsTimerRunning(true)       
      }

      function handleRestartTimer (){
        timer.pause()
        timer.setCounter(5)
        timer.play()
        setStatus("restarting")
      }

      function handleCloseModal () {
        setIsModalActive(false)
        timer.pause()
      }
        
      


    return (

        <FitnessContext.Provider
            value={
              { 
                data,
                errorMsg,
                isModalActive,
                timeLeft,
                currentExerciseIdx,
                isTimerRunning,
                msgReader,
                status,
                setStatus,
                handleAddSet,
                handleChangeExerciseDuration,
                handleUpdateExercise,
                handleDeleteExercise,
                handleAddExercise,
                handleCopySet,
                handleStart,
                looper,
                setCurrentExerciseIdx,
                handlePausePlay,
                handleRestartTimer,
                handleCloseModal,
                
              }}
        >
            {children}
        </FitnessContext.Provider>
    )

}

export { FitnessProvider }

export default FitnessContext
