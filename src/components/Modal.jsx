import React from 'react'

const Modal = ({ isCorrect, turn, solution, newGame }) => {
  return (
    <div className='modal'>
      {isCorrect && (
        <div>
          <h1 className='modal--text'>You Win!</h1>
          {turn === 1 ? <p>You found the solution in 1 guess :)</p> : <p>You found the solution in {turn} guesses :)</p>}
          <button onClick={newGame}>Play again</button>
        </div>
      )}
      {!isCorrect && (
        <div>
          <h1 className='modal--text'>Nevermind!</h1>
          <p className='solution'>The solution was: {solution}!</p>
          <p>Better luck next time :)</p>
          <button onClick={newGame}>Play again</button>
        </div>
      )}
    </div>
  )
}

export default Modal