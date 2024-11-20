import { useState } from 'react';
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
      id: "five",
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

  const [solution,updateSolution] = useState("");
  const [output,updateOutput] = useState("0");

  return (
    <div className="App" >
      <div id="calculator">
        <div id="display">
          <p id="solution">{solution}</p>
          <p id="output">{output}</p>
        </div>
        {
          Object.keys(buttons).map((index) => {
            const button = buttons[index];
            return (
              <button id={button.id} key={index} className='keyBtns'>
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
