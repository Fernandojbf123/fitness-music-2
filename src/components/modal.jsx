import React, { useEffect, useState } from 'react'
import "../styles/modal.css"

const Modal = ({timeLeft, timeOutID, clockRunning, clockPaused, currentExerciseName, setIsAppRunning}) => {

  let [isPaused, setIsPaused] = useState(false)

  useEffect ( () => {
    if (isPaused){
      clockPaused(timeOutID)
    }
    else {
      clockRunning(timeOutID)
    }
  },[isPaused])
  
  return (
    <div className='modalbg activeBg'>
      <div className='modalWindow activeWindow'>
            <div className='innerArea1'>
                {timeLeft}
            </div>

            <div className='innerArea2'>{currentExerciseName}</div>

            <div className='innerArea3'>
                <button 
                  className='btn btnFull'
                  onClick={ e => setIsPaused(!isPaused)}  
                  >{isPaused? "PLAY" : "PAUSE"}
                  </button>

                <button 
                  className='btn btnFull'
                  onClick={ e => setIsAppRunning(false)}  
                  >STOP
                </button>
            </div>

      </div>
    </div>
  )
}

export default Modal
