import { Brightness6Rounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import { SolutionContext } from "./contexts/SolutionContext";
import { solutions } from "./data/solutions";

function App() {

  const [solution, setSolution] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const randomSolution = solutions[Math.floor(Math.random() * solutions.length)]
    setSolution(randomSolution);
  }, [])  

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    else {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  return (
    <SolutionContext.Provider value={{setSolution}}>
      <div>
        <div className='header'>
          <h1>Wordle</h1>
          <button className="themeSwitcher" onClick={switchTheme}><Brightness6Rounded /></button>
        </div>

          {solution && <Wordle solution={solution} />}
      </div>
    </SolutionContext.Provider>
  );
}

export default App;
