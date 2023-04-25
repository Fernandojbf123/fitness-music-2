import React from 'react'
import "../styles/header.css"

const Header = () => {
  return (
    <div className='header'>
      <div className='headerTxt'>Make a set and add an exercise</div>
      <div className='headerBtn'>
        <button className='btn transparent'>ADD SET</button>
      </div>
    </div>
  )
}

export default Header
