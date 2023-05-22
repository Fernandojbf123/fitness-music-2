import React, { useEffect } from 'react'
import "../Styles/errorMsg.css"

const ErrorMsg = ({errorMsg, isErrorActive}) => {

  return (

    isErrorActive && 
        <div className='errorMsg'>
            {errorMsg}
        </div>
  )
}

export default ErrorMsg
