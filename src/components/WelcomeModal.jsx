import React from 'react'

const WelcomeModal = ({ setShowWModal }) => {
  return (
    <div className='modal'>
      <div>
        <h1 className='x' onClick={() => setShowWModal(false)}>X</h1>
        <h1>Welcome to Wordle!</h1>
        <p>Guess the 5 letter world in less than 6 attempts. Have fun :)</p>
      </div>
    </div>
  )
}

export default WelcomeModal