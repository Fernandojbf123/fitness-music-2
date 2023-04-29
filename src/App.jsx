import './App.css'
import AddExercise from './components/addExercise'
import ExerciseCard from './components/exerciseCard'
import Header from "./components/header"
import exerciseCard1 from './exampleData'

import { useState, useEffect } from 'react'


function App() {
  
  
  //let [exerciseCards,setExerciseCards] = useState(exerciseCard1);
  let [exerciseCards,setExerciseCards] = useState(exerciseCard1);
  
  let [isAppRunning, setIsAppRunning] = useState(false);
  
  let [numberOfSets, setNumberOfSets] = useState(1);
  let [currentSet, setCurrentSet] = useState(0);
  let [numberOfExercises, setNumberOfExercises] = useState(1);
  let [currentExercise, setCurrentExercise] = useState(0)
  
  
  
  let [timeLeft, setTimeLeft] = useState();
  let [timeOutID, setTimeOutID] = useState();

  let [isExercise,setIsExercise] = useState(true);
  

  useEffect ( () => {
    if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
    }
    else{
     // Speech Synthesis Not Supported 😣
     alert("Sorry, your browser doesn't support text to speech!");
   }
  },[])

  useEffect( () =>{
    if (exerciseCards.length === 0){
      //CREAR EL EXERCISE CARD nº 1
      return
    }
    
    setNumberOfSets(exerciseCards.length)
    
  },[exerciseCards])

  useEffect ( () => {
    
    if (isAppRunning){
      messageReader("iniciando rutina de ejercicios")
    }
    else{
      messageReader("Deteniendo rutina de ejercicios")
    }
  },[isAppRunning])

  useEffect (() => {
    const workingOut = clockRunning()
    setTimeOutID(workingOut)
    console.log(`Timeleft = ${timeLeft} currentSet = ${currentSet} currentExercise = ${currentExercise}`)
    //AGREGAR DISPLAY DE LOS NÚMEROS
    //AGREGAR QUE SUENE LA MUSICA
    //AGREGAR QUE LEA LOS MENSAJES

    if (currentSet>=numberOfSets){
      console.log("TERMINASTE LOS SETS")
      setIsAppRunning(false)
      clearTimeout(workingOut)
      return
    }
    if (currentExercise>=numberOfExercises){
      console.log("Terminaste los ejercicios, avanza al siguiente set")
      setCurrentSet(currentSet+1)
      setCurrentExercise(0)
    }

    if (timeLeft===0 & isExercise){
      //preparation time
      setIsExercise(false)
      setTimeLeft(exerciseCards[currentSet].exercisesData[currentExercise].preparation)
    }
  
    else if (timeLeft === 0 & !isExercise){
      //next exercise
      let tmpCurrentExercise = currentExercise+1;
      setIsExercise(true)
      setTimeLeft(exerciseCards[currentSet].exercisesData[currentExercise].duration)
      setCurrentExercise(currentExercise+1);
    }
  },[timeLeft])

 
  let msg = startMsgReader()

  function startMsgReader () {
    let msg = new SpeechSynthesisUtterance();
    let voices = window.speechSynthesis.getVoices();
    msg.voice = voices[9]; 
    msg.volume = 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 0; // From 0 to 2
    msg.lang = 'es-mx';
    return msg
  }

  function messageReader (textToRead ) {  
    msg.text = textToRead
    speechSynthesis.speak(msg);
  }

  function decreaseSongVolume () {
    let currentSong = document.getElementById("song");
    currentSong.volume = 0.2;
  }

  function raiseSongVolume () {
    let currentSong = document.getElementById("song");
    setTimeout ( () => {
      currentSong.volume = 0.8;
    },2000)
  }
  
  function handleStart () {
    setIsAppRunning(true)
    console.log("PRESIONO START")
    
    //AGREGAR VALIDADOR DE CAMPOS EN BLANCO Y DE SETS en BLANCO
    //AGREGAR QUE SE ACTIVE EL MODAL
    
    setNumberOfSets(exerciseCards.length)
    setCurrentSet(0)
    setNumberOfExercises(exerciseCards[0].exercisesData.length)
    setCurrentExercise(0)
    let tmpTimeLeft = exerciseCards[0].exercisesData[0].duration;
    setTimeLeft(tmpTimeLeft)
  }

  function handleStop () {
    setIsAppRunning(false)
    console.log("PRESIONO STOP")
  }

  function clockRunning () {
    let timeOutID = setTimeout ( () => {
      setTimeLeft(timeLeft-1);
    },[1000])
    if (timeLeft <= 0) {
      clearTimeout(timeOutID)
    }
    return timeOutID
  }

  function clockPaused(timeOutID) {
    clearTimeout(timeOutID)
    setTimeLeft(timeLeft)
  }

  function handleAddExercise (numberOfSet) {
  //ADD AN EXERCISE
    let tmp = [...exerciseCards]
    let newExercisesData = {
      name: "",
      duration: 30,
      preparation: 10
    }

    tmp[numberOfSet].exercisesData.push(newExercisesData)

    console.log(tmp)
    setExerciseCards([...tmp])
  }

  function handleEditCard (currentSet, currentExercise, newExerciseData) {
  //EDIT A CARD
    let tmp = [...exerciseCards]
    tmp[currentSet-1].exercisesData[currentExercise].name=newExerciseData.name;
    tmp[currentSet-1].exercisesData[currentExercise].duration=newExerciseData.duration;
    setExerciseCards([...tmp])
  }

  return (
    
    <div className='App'>
      <section className='AppHeader'>
        <Header 
          exerciseCards={exerciseCards}
          setExerciseCards={setExerciseCards}
        />

      </section>
        
      <section className='AppBody'>

        {exerciseCards.length>0 ? (
            exerciseCards.map( (exerciseCard,idx) => (  

              <ExerciseCard 
                key={idx}
                exerciseCard={exerciseCard}
                handleEditCard={handleEditCard}
                handleAddExercise={handleAddExercise}
            />
          ))
        ):(
          
          <div>
            AGREGA UN SET DE EJERCICIOS
          </div>
                 
        )}
        <div className='addSet'>
          Add a new set
        </div>

        <div>
          <button className='btn btnFull' onClick={handleStart}>START</button>

          <button className='btn btnFull' onClick={handleStop}>STOP</button>

        </div>

      </section>
      
      
    </div>
  )
}

export default App
