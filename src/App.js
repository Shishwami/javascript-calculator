import { useState } from 'react';
import { evaluate, re } from 'mathjs';

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

  const defaultSolution = ""
  const defaultOutput = "0"

  const [solution, updateSolution] = useState(defaultSolution);
  const [solutionDisplay, updateSolutionDisplay] = useState(defaultSolution);
  const [output, updateOutput] = useState(defaultOutput);
  const [result, updateResult] = useState(null);

  const buttonClick = (value) => {

    if (value == "AC") {
      updateSolution(defaultSolution);
      updateSolutionDisplay(defaultSolution);
      updateOutput(defaultOutput);
      updateResult(null);
    } else if (value === "=") {
      try {

       

        const newResult = evaluate(solution)
        console.log("EVALUATING:", solution, "\tResult:", newResult);
        updateResult(newResult);
        updateOutput(newResult);
        updateSolution(defaultSolution);

        
      } catch (error) {
        return
      }

    } else if (/[+\-*/]$/.test(value)) {
      if (result == null) {
        const newSolution = solution + value;
        updateSolutionDisplay(newSolution);
        updateSolution(newSolution);
        updateOutput(defaultOutput);
        updateResult(null);
      }
      else {
        const newResult = result + value;
        updateSolutionDisplay(newResult);
        updateSolution(newResult);
        updateOutput(defaultOutput);
      }

    } else {
      const newOutput = output === "0" ? value : output + value;
      const newSolution = solution + value;
      updateSolutionDisplay(newSolution);
      updateSolution(newSolution);
      updateSolution(solution + value);
      updateOutput(newOutput);
    }

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
