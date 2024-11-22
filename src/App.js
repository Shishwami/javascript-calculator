import { useState } from 'react';
import { evaluate } from 'mathjs';

import './App.css';

function App() {

  const buttons = {
    1: {
      id: "clear",
      value: "AC"
    },
    2: {
      id: "divide",
      value: "/"
    },
    3: {
      id: "multiply",
      value: "*"
    },
    4: {
      id: "seven",
      value: "7"
    },
    5: {
      id: "eight",
      value: "8"
    },
    6: {
      id: "nine",
      value: "9"
    },
    7: {
      id: "subtract",
      value: "-"
    },
    8: {
      id: "four",
      value: "4"
    },
    9: {
      id: "five",
      value: "5"
    },
    10: {
      id: "six",
      value: "6"
    },
    11: {
      id: "add",
      value: "+"
    },
    12: {
      id: "one",
      value: "1"
    },
    13: {
      id: "two",
      value: "2"
    },
    14: {
      id: "three",
      value: "3"
    },
    15: {
      id: "equals",
      value: "="
    },
    16: {
      id: "zero",
      value: "0"
    },
    17: {
      id: "decimal",
      value: "."
    },
  }

  const defaultSolution = "";
  const defaultOutput = "0";

  const [solution, setSolution] = useState(defaultSolution);
  const [solutionDisplay, setSolutionDisplay] = useState(defaultSolution);
  
  const [output, setOutput] = useState(defaultOutput);
  const [result, setResult] = useState(null);

  const [hasDecimal, setHasDecimal] = useState(false);

  const [hasOperator, setHasOperator] = useState(false);
  const [operators, setOperators] = useState(0);

  const buttonClick = (value) => {
    if (value === "AC") {
      handleClear();
    } else if (value === "=") {
      handleEvaluation();
    } else if (/[+\-*/]$/.test(value)) {
      handleOperators(value);
    } else if (value === ".") {
      handleDecimal(value);
    } else {
      handleNumbers(value);
    }
  }

  const handleClear = () => {
    setSolution(defaultSolution);
    setSolutionDisplay(defaultSolution);
    setOutput(defaultOutput);
    setHasDecimal(false);
    setHasOperator(false);
    setResult(null);
    setOperators(0);

  }

  const handleEvaluation = () => {
    try {
      if (solution) {
        const newResult = evaluate(solution)
        console.log("Sol:", solution, "\t Res:", newResult);

        setResult(newResult);
        setOutput(newResult);
        setSolution(defaultSolution);
        setHasDecimal(false);
        setHasOperator(false);
        setOperators(0);
      }
    } catch (error) {
      return
    }
  }

  const handleOperators = (value) => {

    let newSolution = solution + value;
    setOperators(operators + 1);

    if (result) {
      newSolution = result + newSolution;
    }

    if (hasOperator) {
      if (value === "-" && operators >= 1) {
        newSolution = solution + value;
        setOperators(operators + 1);

      } else if (value !== "-" && operators === 2) {
        newSolution = newSolution.slice(0, -3) + value;
        setOperators(operators - 2);
      } else {
        newSolution = newSolution.slice(0, -2) + value;
        setOperators(operators - 1);
      }
    }



    setSolutionDisplay(newSolution);
    setSolution(newSolution);
    setOutput(defaultOutput);

    setHasDecimal(false);
    setHasOperator(true);
  }

  const handleDecimal = (value) => {

    if (hasDecimal) {
      return
    }

    let newSolution = solution + value;

    setSolutionDisplay(newSolution);
    setSolution(newSolution);
    setOutput(newSolution);
    setHasDecimal(true);
  }

  const handleNumbers = (value) => {

    const newSolution = solution === "0" ? value : solution + value;
    const newOutput = output === "0" ? value : output + value;

    setSolutionDisplay(newSolution);
    setSolution(newSolution);
    setOutput(newOutput);
    setHasOperator(false);
  }

  return (
    <div className="App" >
      <div id="calculator">
        <div id="displayContainer">
          <p id="solution">{solutionDisplay}</p>
          <p id="display">{output}</p>
        </div>
        {
          Object.keys(buttons).map((index) => {
            const button = buttons[index];
            return (
              <button
                id={button.id}
                onClick={() => buttonClick(button.value)}
                key={index}
                className='keyBtns'>
                {button.value}
              </button>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
