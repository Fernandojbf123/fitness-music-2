import './App.css'

import ExerciseCard from './components/exerciseCard';
import Header from './components/header';
import Modal from './components/modal';

import {initialData} from './exampleData'
import { useState, useEffect } from 'react'


function App() {
    
  let [data,setData] = useState(initialData);
  
  let [isAppRunning, setIsAppRunning] = useState(false);
  let [isFirstRead, setIsFirstRead] = useState(true);
  
  let [numberOfSets, setNumberOfSets] = useState(1);
  let [currentSet, setCurrentSet] = useState(0);
  let [currentSetId, setCurrentSetId] = useState("")
  
  let [currentExerciseId, setCurrentExerciseId] = useState("")
  let [currentExercise, setCurrentExercise] = useState(0)
  let [currentExerciseName, setCurrentExerciseName] = useState("");
  let [currentExerciseDuration, setCurrentExerciseDuration] = useState(0);
  let [numberOfExercisesOfSet, setNumberOfExercisesOfSet] = useState(1)
  
  let [timeLeft, setTimeLeft] = useState();
  let [timeOutID, setTimeOutID] = useState();

  let [isExercise,setIsExercise] = useState(true);

  let [areFieldsEmpty, setAreFieldsEmpty] = useState(true); //true =there are empty fields
  let [isErrorActive, setIsErrorActive] = useState(false); //true = there are errors
  let [errorMsg, setErrorMsg] = useState("");

  let msg = startMsgReader()

  useEffect ( () => {
    if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉
    }
    else{
     // Speech Synthesis Not Supported 😣
     alert("Sorry, your browser doesn't support text to speech!");
   }
  },[])

  useEffect ( () => {
    if (isAppRunning){
      messageReader(`Prepárate para iniciar tu rutina de ejercicio. Tienes ${timeLeft-5} segundos de preparacion`)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
      document.body.style.overflow = 'hidden';
    }
    else{
      messageReader("Deteniendo rutina de ejercicios")
      clockPaused(timeOutID)
      document.body.style.overflow = 'unset';
    }
  },[isAppRunning])

  useEffect ( () => {
    const workingOut = clockRunning()
    setTimeOutID(workingOut)
    let nextExerciseId
    let nextExerciseName
    let prepTime
    let nextExerciseDuration
    let nextSet
    let nextSetId
    
    if (currentSet === 0 & currentExercise === 0 & isFirstRead & isAppRunning){
        messageReader(`Tu primer ejercicio es ${currentExerciseName} por ${currentExerciseDuration} segundos. A darle con todo tigre`)
        setIsFirstRead(false)
    }

    if (timeLeft >= 0 & timeLeft <= 10){
      if (timeLeft === 10) {
        messageReader(`quedan ${timeLeft} segundos`)
      }
      else if (timeLeft >0 & timeLeft<= 5){
        messageReader(`${timeLeft}`)
      }
      else if (timeLeft === 0 & isExercise){ //exercise finished
        setCurrentExercise(currentExercise+1)
        setIsExercise(false)
      
        if (currentExercise+1<numberOfExercisesOfSet){ //next exercise
          nextExerciseId = data.sets[currentSetId].exercisesId[currentExercise+1];
          nextExerciseName = data.exercisesData[nextExerciseId].name
          prepTime = data.exercisesData[nextExerciseId].preparation;
          nextExerciseDuration = data.exercisesData[nextExerciseId].duration;
          messageReader(`Haz terminado. Tu siguiente ejercicio es ${nextExerciseName} por ${nextExerciseDuration} segundos. Tienes ${prepTime} segundos de preparacion`)
          setTimeLeft(prepTime)
          setCurrentExerciseName(nextExerciseName)
          setCurrentExerciseId(nextExerciseId)
          setCurrentExerciseDuration(nextExerciseDuration)
        }
        else if (currentExercise+1 >= numberOfExercisesOfSet){ //next set
          nextSet = currentSet+1
          setCurrentSet(nextSet)
          setCurrentSetId(nextSetId)
          setCurrentExercise(0)
                if (currentSet+1 < numberOfSets){   
                  nextSetId = data.setsOrder[nextSet]
                  nextExerciseId = data.sets[nextSetId].exercisesId[0];
                  nextExerciseName = data.exercisesData[nextExerciseId].name
                  prepTime = data.exercisesData[nextExerciseId].preparation;
                  nextExerciseDuration = data.exercisesData[nextExerciseId].duration;
                  messageReader(`Felicidades. Terminaste este set. Avanzando al siguiente set. Tu siguiente ejercicio es ${nextExerciseName} por ${nextExerciseDuration} segundos. Tienes ${prepTime} segundos de preparacion`)
                  setTimeLeft(prepTime)
                  let tmpNumberOfExercisesOfSet = data.sets[nextSetId].exercisesId.length;
                  setNumberOfExercisesOfSet(tmpNumberOfExercisesOfSet)
                  setCurrentExerciseName(nextExerciseName)
                  setCurrentExerciseId(nextExerciseId)
                  setCurrentExerciseDuration(nextExerciseDuration)
                }
                else {
                  messageReader(`Felicidades terminaste todos tus sets de ejercicios`)
                  setTimeLeft(0)
                  setIsAppRunning(false)
                  clockPaused(timeOutID)
                }
              }
            }
            else if (timeLeft === 0 & !isExercise){ //prep time finished
              let ExerciseTime = data.exercisesData[currentExerciseId].duration;
              setTimeLeft(ExerciseTime)
              setIsExercise(true)
              messageReader(`Inicia`)
      
            }
          }   
  },[timeLeft])

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

  function messageReader (textToRead) {  
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
    //check that all fields are ok
    let allFieldsValid = checkIfInputsAreWriten();
    
    if (!allFieldsValid){
      //ADD ERROR MESSAGE
      setErrorMsg("El tiempo debe ser mayor a 5 segs y debes llenar todos los campos antes de empezar")
      setAreFieldsEmpty(true)
      setIsErrorActive(true)
    }
    else {
      setIsAppRunning(true)
      setNumberOfSets(Object.keys(data.sets).length)
      setCurrentSet(0)
      setCurrentSetId(data.setsOrder[0])
      setCurrentExercise(0)
      let tmpCurrentSet = data.setsOrder[0];
      let tmpCurrentExerciseId = data.sets[tmpCurrentSet].exercisesId[0]
      let tmpTimeLeft = data.exercisesData[tmpCurrentExerciseId].preparation;
      setTimeLeft(tmpTimeLeft+5)
      setIsExercise(false)
      setIsErrorActive(false)
      setCurrentExerciseId(tmpCurrentExerciseId)
      setCurrentExerciseName(data.exercisesData[tmpCurrentExerciseId].name)
      setCurrentExerciseDuration(data.exercisesData[tmpCurrentExerciseId].duration)
      setNumberOfExercisesOfSet(data.sets[tmpCurrentSet].exercisesId.length)
    }
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




  function checkIfInputsAreWriten () {
    let allFieldsValid = true;
    let numberOfExercises = Object.keys(data.exercisesData).length
    let exercisesKeys = Object.keys(data.exercisesData)
    for (let i = 0; i< numberOfExercises; i++) {
      if (!data.exercisesData[exercisesKeys[i]].isValid) {
        allFieldsValid = false
        return allFieldsValid        
      }
    }
    return allFieldsValid
  }


  return (
    
    <div className='App'>
      <section className='AppHeader'>
        <Header 
          data = {data}
          setData = {setData}
          checkIfInputsAreWriten={checkIfInputsAreWriten}
          isErrorActive = {isErrorActive}
          setIsErrorActive = {setIsErrorActive}
          errorMsg = {errorMsg}
          setErrorMsg = {setErrorMsg}
        />
      </section>
        
      <section className='AppBody'>
        {Object.keys(data.sets).length > 0 && (
          Object.keys(data.sets).map( (keyOfSet,idx) => {
           let idOfSet = keyOfSet;
           let numberOfSet = idx;

           return( 
             <ExerciseCard 
                key = {keyOfSet}
                keyOfSet = {keyOfSet}
                numberOfSet = {numberOfSet}
                data = {data}
                setData = {setData}
            />)
          })
        )}
        
        <div>
          <button className='btn' onClick={handleStart}>START</button>
        </div>

        {isAppRunning && 
          <Modal 
            timeLeft={timeLeft}
            timeOutID={timeOutID}
            clockRunning = {clockRunning}
            clockPaused = {clockPaused}
            currentExerciseName={currentExerciseName}
            setIsAppRunning={setIsAppRunning}/>
        }
      </section>

    </div>
  )
}

export default App
