/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import ErrorModal from './ErrorModal';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import WelcomeModal from './WelcomeModal';

const Wordle = ({ solution }) => {
  const {currentGuess, handleKeyUp, handleKeyTouch, newGame, guesses, isCorrect, turn, usedKeys, error, setError, errorText, showModal, setShowModal} = useWordle(solution);
  const [showWModal, setShowWModal] = useState(true);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    if (turn > 5 && !isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener('keyup', handleKeyUp);
    }

    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp, turn, isCorrect])

  useEffect(() => {
    setTimeout(() => {
      setError(false);
    }, 1500);
  }
  , [error, setError])

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleKeyTouch={handleKeyTouch}/>
      {showWModal && <WelcomeModal setShowWModal={setShowWModal}/>}
      {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} newGame={newGame} />}
      {error && <ErrorModal text={errorText}/>}
    </div>
  )
}

export default Wordle