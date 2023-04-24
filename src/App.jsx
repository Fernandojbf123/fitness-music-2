import './App.css'
import AddExercise from './components/addExercise'
import ExerciseCard from './components/exerciseCard'
import Header from "./components/header"
import exerciseCards from './exampleData'

import { useState, useEffect } from 'react'


function App() {
  
  let [isAppRunning, setIsAppRunning] = useState(false);
  let [timeLeft, setTimeLeft] = useState();


  useEffect ( () => {
    if ('speechSynthesis' in window) {
    // Speech Synthesis supported 🎉

    }
    else{
     // Speech Synthesis Not Supported 😣
     alert("Sorry, your browser doesn't support text to speech!");
   }
  },[])
 
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

  function lowerSongVolume () {
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
  }

  function handleStop () {
    setIsAppRunning(false)
    console.log("PRESIONO STOP")
  }

  useEffect ( () => {
    
    if (isAppRunning){
      messageReader("iniciando rutina de ejercicios")
    }
    else{
      messageReader("Deteniendo rutina de ejercicios")
    }
  },[isAppRunning])

  useEffect (() => {
    
  },[timeLeft])

  return (
    
    <div className='App'>
      <section className='AppHeader'>
        <Header />

      </section>
        
      <section className='AppBody'>

        {exerciseCards.length > 0 ? (
            exerciseCards.map( (exerciseCard,idx) => (  

                <ExerciseCard 
                  key={idx}
                  exerciseCard={exerciseCard}
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
