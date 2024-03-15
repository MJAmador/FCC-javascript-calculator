import { useState } from 'react';
import './App.css';
import { create, all } from 'mathjs';

const operators = ["+", "-", "*", "/"];

const math = create(all); // Using function from Math.js library instead of eval for enhancing security

function App() {
  const [input, setInput] = useState("0"); // Initial state set to 0
  const [calculatorData, setCalculatorData] = useState(""); // initial state set to ""

  const clearCalculator = () => {
    setInput("0");
    setCalculatorData("");
  };

  const calculateResult = () => {
    try {
      const result = math.evaluate(calculatorData); // using math for evaluating mathematical expressions    
      
      if (isNaN(result) || result === Infinity) {
        throw new Error("Invalid Input");
      }
      setInput(result.toString());
      setCalculatorData(result.toString());
    } catch (error) {
      setInput("Error");
      setCalculatorData("Error");
    }
  };

  const handleNumberInput = (inputValue: string) => {
    if (input === "0" || operators.includes(input)) { // If the current input is "0" or if it's one of the operators
      // Setting the input to the pressed number and appending the pressed number to the existing calculator data if the condition is true
      setInput(inputValue);
      setCalculatorData(prevData => prevData + inputValue);
    }  else {
      // If it's false allow the use to append the pressed number to the currently displayed number and also append it to the existing calculator data
      setInput(prevInput => prevInput + inputValue);
      setCalculatorData(prevData => prevData + inputValue);
    }
  };

  const handleOperatorInput = (inputValue: string) => {
    const lastChar = calculatorData.slice(-1); // Extracting the last character from the "calculatorData" string
    const prevLastChar = calculatorData.slice(-2, -1); // Extracting the character before the last one from the "calculatorData" string

    if (inputValue === "-" && calculatorData === "") {
      // If the user starts with "-" in the empty display, initialize the display and data with "-" to allow negative numbers to be input
      setInput("-");
      setCalculatorData("-");
    } else if (inputValue === "-" && operators.includes(lastChar) && lastChar !== "-") {
      // Handling the input of negative numbers when the minus sign represents a unary minus rather than a subtraction operator
      setInput("-");
      setCalculatorData(prevData => prevData + "-");
    } else if (inputValue === "*" && (/\d|\./).test(lastChar)) {
      // Handling the multiplication operator where it should be treated different than numbers or expressions
      setInput(inputValue);
      setCalculatorData(prevData => prevData + inputValue);
    } else if (operators.includes(lastChar) && inputValue !== "-" && lastChar !== "-") {
      // If the last character is an operator (excluding -), replace it with the new one
      setCalculatorData(prevData => prevData.slice(0, -1) + inputValue);
    } else if (operators.includes(prevLastChar) && prevLastChar !== "-" && inputValue !== "-") {
      // If the character before the last one is an operator (excluding -), replace it with the new one
      setCalculatorData(prevData => prevData.slice(0, -2) + inputValue);
    } else {
      // If none of the conditions above are met, handle it as usual
      setInput(inputValue);
      setCalculatorData(prevData => prevData + inputValue);
    }
  };

  const handleDecimalInput = () => {
    if (!input.includes(".")) { // Checking if the input doesn't include a decimal point
      // Allowing the user to add a decimal point 
      setInput(prevInput => prevInput + ".");
      setCalculatorData(prevData => prevData + ".");
    }
  };

  // Calling a specific function deppending on the button pressed
  const handleInput = (inputValue: string) => {
    if (inputValue === "AC") {
      clearCalculator();
    } else if (inputValue === "=") {
      calculateResult();
    } else if (inputValue === ".") {
      handleDecimalInput();
    } else if (operators.includes(inputValue)) {
      handleOperatorInput(inputValue);
    } else {
      handleNumberInput(inputValue);
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div className="output">
          <span id="display" className="input">{input}</span>
        </div>
        <div className="keys">
          <button className="clear-button" id="clear" onClick={() => handleInput("AC")}>AC</button>
          <button className="operator-button" id="divide" onClick={() => handleInput("/")}>÷</button>
          <button className="operator-button" id="multiply" onClick={() => handleInput("*")}>×</button>
          <button className="number-button" id="seven" onClick={() => handleInput("7")}>7</button>
          <button className="number-button" id="eight" onClick={() => handleInput("8")}>8</button>
          <button className="number-button" id="nine" onClick={() => handleInput("9")}>9</button>
          <button className="operator-button" id="subtract" onClick={() => handleInput("-")}>−</button>
          <button className="number-button" id="four" onClick={() => handleInput("4")}>4</button>
          <button className="number-button" id="five" onClick={() => handleInput("5")}>5</button>
          <button className="number-button" id="six" onClick={() => handleInput("6")}>6</button>
          <button className="operator-button" id="add" onClick={() => handleInput("+")}>+</button>
          <button className="number-button" id="one" onClick={() => handleInput("1")}>1</button>
          <button className="number-button" id="two" onClick={() => handleInput("2")}>2</button>
          <button className="number-button" id="three" onClick={() => handleInput("3")}>3</button>
          <button className="equals-button" id="equals" onClick={() => handleInput("=")}>=</button>
          <button className="number-button" id="zero" onClick={() => handleInput("0")}>0</button>
          <button className="number-button" id="decimal" onClick={() => handleInput(".")}>.</button>
        </div>
      </div>
      <footer>
        <code>Designed and Coded By Marcio Amador</code>
      </footer>
    </div>
  );
}

export default App;