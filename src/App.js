import { useState } from 'react';
import { evaluate } from 'mathjs';

import './App.css';

function App() {

  const buttons = {
    1: {
      id: "clear",
      value: "AC",
      type: "clear"
    },
    2: {
      id: "divide",
      value: "/",
      type:"operator"
    },
    3: {
      id: "multiply",
      value: "*",
      type:"operator"
    },
    4: {
      id: "seven",
      value: "7",
      type:"number"
    },
    5: {
      id: "eight",
      value: "8",
      type:"number"
    },
    6: {
      id: "nine",
      value: "9",
      type:"number"
    },
    7: {
      id: "subtract",
      value: "-",
      type:"operator"
    },
    8: {
      id: "four",
      value: "4",
      type:"number"
    },
    9: {
      id: "five",
      value: "5",
      type:"number"
    },
    10: {
      id: "six",
      value: "6",
      type:"number"
    },
    11: {
      id: "add",
      value: "+",
      type:"operator"
    },
    12: {
      id: "one",
      value: "1",
      type:"number"
    },
    13: {
      id: "two",
      value: "2",
      type:"number"
    },
    14: {
      id: "three",
      value: "3",
      type:"number"
    },
    15: {
      id: "equals",
      value: "=",
      type:"equate"
    },
    16: {
      id: "zero",
      value: "0",
      type:"number"
    },
    17: {
      id: "decimal",
      value: ".",
      type:"number"
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
    }
  }

  const handleOperators = (value) => {


    if (!solution && !result) {
      return
    }

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
    let newOutput = output + value;

    setSolutionDisplay(newSolution);
    setSolution(newSolution);
    setOutput(newOutput);
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
                className='keyBtns'
                data-set-btnType={button.type}>
                {button.value}
              </button>
            )
          })
        }
      </div>
      <footer id="footer">by<a href='https://github.com/Shishwami'> <i class="fa fa-github"></i> Shishwami</a></footer>
    </div>
  );
}

export default App;
