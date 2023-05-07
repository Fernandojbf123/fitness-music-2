import React from 'react'
import "../styles/modal.css"

const Modal = ({timeLeft, currentExerciseName}) => {
  return (
    <div className='modalbg activeBg'>
      <div className='modalWindow activeWindow'>
            <div className='innerArea1'>
                {timeLeft}
            </div>

            <div className='innerArea2'>{currentExerciseName}</div>

            <div className='innerArea3'>
                
                <button className='btn btnFull'>PAUSE</button>
                <button className='btn btnFull'>STOP</button>
            </div>

      </div>
    </div>
  )
}

export default Modal
