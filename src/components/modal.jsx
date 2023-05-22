import React, { useEffect, useState } from 'react'
import "../styles/modal.css"

const Modal = ({timeLeft, timeOutID, clockPaused, currentExerciseName, setIsAppRunning}) => {

  let [isPaused, setIsPaused] = useState(false)

  useEffect ( () => {
    if (isPaused){
      clockPaused(timeOutID)
    }
    else {
      clockReStart
    }
  },[isPaused])

  function clockReStart (timeOutID) {
    setTimeout ( () => {
      setTimeLeft(timeLeft-1);
    },[1000])
    if (timeLeft <= 0) {
      clearTimeout(timeOutID)
    }
    return timeOutID
  }

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
