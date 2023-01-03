import { useContext, useState } from "react";
import { SolutionContext } from "../contexts/SolutionContext";
import { guesses as guessesList } from "../data/guesses";
import { solutions as solutionsList } from "../data/solutions";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]); // Each guess is an array
  const [history, setHistory] = useState([]); // Each guess is a string
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({}); // {a: 'green', b: 'yellow', c: 'gray'}
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {setSolution} = useContext(SolutionContext);

  
  // Format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess.toLowerCase()].map((l) => {
      return {key: l, color: 'gray'}
    });

    // Find any green letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    })

    // Find any yellow letters
    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    }) 

    return formattedGuess;
  }

  // Add a new guess to the guesses state
  // Update the isCorrect state if the guess is correct
  // Add one to the turn state
  const addNewGuess = (formattedGuess) => {
    if (currentGuess.toLowerCase() === solution) setIsCorrect(true);
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    })
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      let newKeys = {...prevUsedKeys};

      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === 'green') {
          newKeys[l.key] = 'green';
          return;
        }
        if (l.color === 'yellow' && currentColor !== 'green') {
          newKeys[l.key] = 'yellow';
          return;
        }
        if (l.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[l.key] = 'gray';
          return;
        }
      })

      return newKeys;
    });
    setCurrentGuess('');
  }

  // Handle KeyUp event & track current guess
  // If user presses enter add the new guess
  const handleKeyUp = ({ key }) => {
    if (key === 'Enter') {
      // Only add guess if turn is less than 5
      if (turn > 5) {
        setError(true);
        setErrorText('OUT OF GUESSES!');
        return;
      }
      // Do not allowed duplicate words
      if (history.includes(currentGuess)) {
        setError(true);
        setErrorText('WORD REPEATED!');
        return;
      }
      // Check if word is 5 characters long
      if (currentGuess.length !== 5) {
        setError(true);
        setErrorText('INCORRECT LENGTH!');
        return;
      }
      // Check if the word is within the guesses or solutions lists
      if (guessesList.indexOf(currentGuess.toLowerCase()) === -1 && solutionsList.indexOf(currentGuess.toLowerCase()) === -1) {
        setError(true);
        setErrorText('WORD NOT IN LIST!');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      })
      return; // We don't need to check the other if because it will always be false
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        })
      } 
    }
  }

  // Handle keys from touchpad & track current guess
  // If user presses enter add the new guess
  const handleKeyTouch = (key) => {
    if (key === 'Enter') {
      // Only add guess if turn is less than 5
      if (turn > 5) {
        setError(true);
        setErrorText('OUT OF GUESSES!');
        return;
      }
      // Do not allowed duplicate words
      if (history.includes(currentGuess)) {
        setError(true);
        setErrorText('WORD REPEATED!');
        return;
      }
      // Check if word is 5 characters long
      if (currentGuess.length !== 5) {
        setError(true);
        setErrorText('INCORRECT LENGTH!');
        return;
      }
      // Check if the word is within the guesses or solutions lists
      if (guessesList.indexOf(currentGuess) === -1 && solutionsList.indexOf(currentGuess) === -1) {
        setError(true);
        setErrorText('WORD NOT IN LIST!');
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === 'Backspace') {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      })
      return; // We don't need to check the other if because it will always be false
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        })
      } 
    }
  }

  const newGame = () => {
    const randomSolution = solutionsList[Math.floor(Math.random() * solutionsList.length)]
    setSolution(randomSolution);
    setIsCorrect(false);  
    setCurrentGuess('');
    setGuesses([...Array(6)]);
    setUsedKeys({});
    setHistory([]);
    setShowModal(false);
    setTurn(0);
  }

  return {turn, currentGuess, guesses, isCorrect, history, usedKeys, error, setError, errorText, handleKeyUp, handleKeyTouch, newGame, showModal, setShowModal}

}

export default useWordle;