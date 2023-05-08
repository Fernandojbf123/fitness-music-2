import './App.css'
import ExerciseCard from './components/exerciseCard'
import Header from "./components/header"
import Modal from './components/modal'
import exerciseCard1 from './exampleData'

import { useState, useEffect } from 'react'


function App() {
  
  
  //let [exerciseCards,setExerciseCards] = useState(exerciseCard1);
  let [exerciseCards,setExerciseCards] = useState(exerciseCard1);
  
  let [isAppRunning, setIsAppRunning] = useState(false);
  let [isFirstRead, setIsFirstRead] = useState(true);
  
  let [numberOfSets, setNumberOfSets] = useState(1);
  let [currentSet, setCurrentSet] = useState(0);
  let [numberOfExercises, setNumberOfExercises] = useState(1);
  let [currentExercise, setCurrentExercise] = useState(0)
  let [currentExerciseName, setCurrentExerciseName] = useState("");
  let [currentExerciseDuration, setCurrentExerciseDuration] = useState(0);
  
  let [timeLeft, setTimeLeft] = useState();
  let [timeOutID, setTimeOutID] = useState();

  let [isExercise,setIsExercise] = useState(true);

  let [areFieldsEmpty, setAreFieldsEmpty] = useState(true); //true =there are empty fields
  let [isErrorActive, setIsErrorActive] = useState(false); //true = there are errors
  let [errorMsg, setErrorMsg] = useState("Llena todos los campos");

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

  useEffect( () =>{
    if (exerciseCards.length === 0){
      //CREAR EL EXERCISE CARD nº 1
      return
    }
    setNumberOfSets(exerciseCards.length)
  },[exerciseCards])

  useEffect ( () => {
    if (isAppRunning){
      messageReader(`Prepárate para iniciar tu rutina de ejercicio. Tienes ${timeLeft-5} segundos de preparacion`)
    }
    else{
      messageReader("Deteniendo rutina de ejercicios")
    }
  },[isAppRunning])

 useEffect ( () => {
    const workingOut = clockRunning()
    setTimeOutID(workingOut)
    let nextExercise
    let prepTime
    let nextExerciseDuration
    setCurrentExerciseName(exerciseCards[currentSet].exercisesData[currentExercise].name)


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

        if (currentExercise+1<numberOfExercises){ //next exercise
          nextExercise = exerciseCards[currentSet].exercisesData[currentExercise+1].name;
          prepTime = exerciseCards[currentSet].exercisesData[currentExercise+1].preparation;
          nextExerciseDuration = exerciseCards[currentSet].exercisesData[currentExercise+1].duration;
          messageReader(`Haz terminado. Tu siguiente ejercicio es ${nextExercise} por ${nextExerciseDuration} segundos. Tienes ${prepTime} segundos de preparacion`)
          setTimeLeft(prepTime)
        }
        else if (currentExercise+1 >= numberOfExercises){ //next set
          setCurrentSet(currentSet+1)
          setCurrentExercise(0)
          if (currentSet+1 < numberOfSets){   
            nextExercise = exerciseCards[currentSet+1].exercisesData[0].name;
            prepTime = exerciseCards[currentSet+1].exercisesData[0].preparation;
            nextExerciseDuration = exerciseCards[currentSet+1].exercisesData[0].duration;
            messageReader(`Felicidades. Terminaste este set. Avanzando al siguiente set. Tu siguiente ejercicio es ${nextExercise} por ${nextExerciseDuration} segundos. Tienes ${prepTime} segundos de preparacion`)
            setTimeLeft(prepTime)
            let tmpNumberOfExercises = exerciseCards[currentSet+1].exercisesData.length;
            setNumberOfExercises(tmpNumberOfExercises)
          }
          else {
            messageReader(`Felicidades terminaste todos tus sets de ejercicios`)
            setTimeLeft(0)
            handleStop()
          }
        }
      }
      else if (timeLeft === 0 & !isExercise){ //prep time finished
        let ExerciseTime = exerciseCards[currentSet].exercisesData[currentExercise].duration;
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
      setErrorMsg("Debes llenar todos los campos antes de empezar")
      setAreFieldsEmpty(true)
      setIsErrorActive(true)
    }
    else {
      setIsAppRunning(true)
      setNumberOfSets(exerciseCards.length)
      setCurrentSet(0)
      setNumberOfExercises(exerciseCards[0].exercisesData.length)
      setCurrentExercise(0)
      let tmpTimeLeft = exerciseCards[0].exercisesData[0].preparation;
      setTimeLeft(tmpTimeLeft+5)
      setIsExercise(false)
      setIsErrorActive(false)
      setCurrentExerciseName(exerciseCards[0].exercisesData[0].name)
      setCurrentExerciseDuration(exerciseCards[0].exercisesData[0].duration)
    }
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
      preparation: 20,
      isValid: false,
    }
    tmp[numberOfSet].exercisesData.push(newExercisesData)
    setExerciseCards([...tmp])    
  }

  function handleEditCard (currentSet, currentExercise, newExerciseData) {
  //EDIT A CARD
    let tmp = [...exerciseCards]
    tmp[currentSet-1].exercisesData[currentExercise].name=newExerciseData.name;
    tmp[currentSet-1].exercisesData[currentExercise].duration=newExerciseData.duration;
    tmp[currentSet-1].exercisesData[currentExercise].isValid=newExerciseData.isValid;
    let allFieldsValid = checkIfInputsAreWriten();
    if (!allFieldsValid) {
      //AGREGA MENSAJE DE ERROR
      setErrorMsg("Haz dejado campos vacíos o con menos de 5 segs")
      setIsErrorActive(true)
      return
    }
    setExerciseCards([...tmp])
    setIsErrorActive(false)
  }

  function checkIfInputsAreWriten () {
    let allFieldsValid = true;
    for (let iset = 0; iset < numberOfSets; iset++){
      let tmpNumberOfExercises = exerciseCards[iset].exercisesData.length;
      for (let iexercise = 0; iexercise < tmpNumberOfExercises; iexercise++){
        if(!exerciseCards[iset]?.exercisesData[iexercise]?.isValid){
          allFieldsValid = false;
        } 
      }
    }
    return allFieldsValid
  }

  return (
    
    <div className='App'>
      <section className='AppHeader'>
        <Header 
          exerciseCards={exerciseCards}
          setExerciseCards={setExerciseCards}
          checkIfInputsAreWriten={checkIfInputsAreWriten}
          isErrorActive={isErrorActive}
          setIsErrorActive={setIsErrorActive}
          errorMsg={errorMsg}
          setErrorMsg={setErrorMsg}
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
          
          <div>NADA QUE MOSTRAR</div>
                 
        )}
        
        <div>
          <button className='btn btnFull' onClick={handleStart}>START</button>

          <button className='btn btnFull' onClick={handleStop}>STOP</button>

        </div>

        {isAppRunning && 
          <Modal 
            timeLeft={timeLeft}
            currentExerciseName={currentExerciseName}/>
        }
      </section>
      
      
    </div>
  )
}

export default App
