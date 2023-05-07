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
  let [isFirstSet, setIsFirstSet] = useState(true);
  
  let [numberOfSets, setNumberOfSets] = useState(1);
  let [currentSet, setCurrentSet] = useState(0);
  let [numberOfExercises, setNumberOfExercises] = useState(1);
  let [currentExercise, setCurrentExercise] = useState(0)
  
  let [timeLeft, setTimeLeft] = useState();
  let [timeOutID, setTimeOutID] = useState();

  let [isExercise,setIsExercise] = useState(true);

  let [areFieldsEmpty, setAreFieldsEmpty] = useState([true]);

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
      messageReader(`Prepárate para iniciar tu rutina de ejercicio. Tienes ${timeLeft} segundos`)
      
    }
    else{
      messageReader("Deteniendo rutina de ejercicios")
    }
  },[isAppRunning])

  // useEffect (() => {
  //   const workingOut = clockRunning()
  //   setTimeOutID(workingOut)
  //   let exerciseName='';
  //   if (isFirstSet) {
  //     if (timeLeft === 10) {
  //       messageReader(`Tu primer ejercicio es ${exerciseCards[0].exercisesData[0].name}`)
  //     }
  //     else if (timeLeft <= 5 && timeLeft>=1){
  //       messageReader(timeLeft)
  //     }
  //     else if (timeLeft === 0) {
  //       setTimeLeft(exerciseCards[0].exercisesData[0].duration)
  //       setIsFirstSet(false)
  //       messageReader(`A darle con todo tigre!. Tienes ${exerciseCards[0].exercisesData[0].duration} segundos por delante`)
  //       setIsExercise(true)
  //     }
  //   }
  //   else {
  //     //AGREGAR DISPLAY DE LOS NÚMEROS
  //     //AGREGAR QUE SUENE LA MUSICA
  //     //AGREGAR QUE LEA LOS MENSAJES

  //     if (timeLeft <= 5 && timeLeft >=1){
  //       messageReader(timeLeft)
  //     }
  //     else if (timeLeft===0 & isExercise){
  //       //Start preparation time
        
  //       setIsExercise(false)
  //       let prepTime = exerciseCards[currentSet].exercisesData[currentExercise].preparation;
  //       messageReader(`Terminaste este ejercicio. Tienes ${prepTime} segundos para prepararte`)
  //       if (currentExercise+1 < tmpNumberOfExercises) {
  //         setCurrentExercise(currentExercise+1) 
  //         setTimeLeft(prepTime)
  //         exerciseName = exerciseCards[currentSet].exercisesData[currentExercise].name
  //         messageReader(`Tu siguiente ejercicio es ${exerciseName}`)
  //       }
  //       else{
  //         setCurrentSet(currentSet+1)
  //         setCurrentExercise(0)
  //         if (currentSet+1<numberOfSets){
  //           messageReader(`Excelente!, terminaste este set de ejercicios. Avanzando al siguiente`)
  //           console.log("VINE A AVANZAR AL SIGUIENTE SET")
  //         }
  //         else{
  //           clearTimeout(workingOut)
  //           messageReader("Felicidades, has terminado toda la rutina de ejercicios")
  //           setIsAppRunning(false)
  //           setTimeLeft(0)
  //           console.log("VINE AL FINAL DE LA RUTINA DE EJERCICIOS")
  //         }
  //       }
  //     }
  //     else if (timeLeft === 0 & !isExercise){
  //       //Start next exercise
  //       console.log("AVANZO AL SIGUIENTE EJERCICIO")
  //       console.log(`current set = ${currentSet}`)
  //       console.log(`current exercise = ${currentExercise+1}`)
  //       setTimeLeft(exerciseCards[currentSet].exercisesData[currentExercise].duration)
  //       setIsExercise(true)
  //     } 

  //   }
  // },[timeLeft])


  let tmpCurrentSet = 0;
  let tmpCurrentExercise = 0;
  let tmpNumberOfExercises = numberOfExercises;

  useEffect ( () => {
    const workingOut = clockRunning()
    setTimeOutID(workingOut)

    let tmpDuration_old = exerciseCards[tmpCurrentSet].exercisesData[tmpCurrentExercise].duration;
    let tmpPreparation_old = exerciseCards[tmpCurrentSet].exercisesData[tmpCurrentExercise].preparation;
    let tmpName_old = exerciseCards[tmpCurrentSet].exercisesData[tmpCurrentExercise].name;

    if (tmpCurrentExercise === 0 & isFirstSet){
      //Estoy inciiando por primera vez
      console.log(`Iniciando el set ${tmpCurrentSet}`)
      console.log(`Tienes ${timeLeft} segundos de preparación.`)
      console.log(`A darle con todo tigre!. Tu primer ejercicio es ${tmpName_old} por ${tmpDuration_old} segundos`)
      console.log(`faltan ${timeLeft} segundos`)
      setIsExercise(false)

      if (timeLeft === 0 & !isExercise){
        console.log(`Esto terminando el tiempo de preparacion`)
        setIsExercise(true)
        setTimeLeft(tmpDuration_old)
      }
      else if (timeLeft === 0 & isExercise){
        console.log(`Esto terminando el tiempo de ejercicio`)
        //verificar que exista el proximo ejercicio
        tmpCurrentExercise++
        if(tmpCurrentExercise < tmpNumberOfExercises){  
          console.log(`Felicidades terminaste ${tmpName_old}. Tienes ${tmpPreparation_old} segundos de preparación.`)
          setTimeLeft(tmpPreparation_old)
          tmpName = exerciseCards[tmpCurrentSet].exercisesData[tmpCurrentExercise].name;
          tmpDuration = exerciseCards[tmpCurrentSet].exercisesData[tmpCurrentExercise].duration;        
          console.log(`Tu siguiente ejercicio es ${tmpName} por ${tmpDuration}`)
        }
        else{
          //verificar que existe el proximo set
          tmpCurrentSet++
          if(tmpCurrentSet < numberOfSets){
            console.log(`Felicidades terminaste el set ${tmpCurrentSet-1}`)
            setTimeLeft(tmpPreparation_old)
            tmpCurrentExercise=0;
            tmpNumberOfExercises=exerciseCards[tmpCurrentSet].exercisesData.length;
          }
          else{
            console.log(`Felicidades terminates toda la rutina de ejercicio`)
          }
        }
      }
    }
    else {
      console.log("ESTO POR FUERA")
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
    console.log("PRESIONO START")  
    let allFieldsValid = true;
    //review that all fields are ok
    
    for (let iset = 0; iset < numberOfSets; iset++){
      let tmpNumberOfExercises = exerciseCards[iset].exercisesData.length;
      for (let iexercise = 0; iexercise < tmpNumberOfExercises; iexercise++){
        if(!exerciseCards[iset]?.exercisesData[iexercise]?.isValid){
          allFieldsValid = false;
        } 
      }
    }
    if (!allFieldsValid){
      //ADD ERROR MESSAGE
      console.log("HAY CAMPOS EN BLANCO")
    }
    else {
      setIsAppRunning(true)
      setNumberOfSets(exerciseCards.length)
      setCurrentSet(0)
      setNumberOfExercises(exerciseCards[0].exercisesData.length)
      setCurrentExercise(0)
      let tmpTimeLeft = exerciseCards[0].exercisesData[0].preparation;
      setTimeLeft(tmpTimeLeft)
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
      preparation: 10,
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
    if (!newExerciseData.isValid) {
      //AGREGA MENSAJE DE ERROR
      console.log("HAY CAMPOS INCORRECTOS")
    }
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
