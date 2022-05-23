import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function AppUseState() {
  const [reverse, setReverse] = useState(false);
  const [counter, setCounter] = useState(0);
  const reverseClass = reverse ? 'reverse' : '';

  const handleClick = () => {
    setReverse((reverse) => !reverse);
  };

  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

        <h1>Contador: {counter}</h1>

        <p>
          <button type="button" onClick={handleClick}>
            Reverse {reverseClass}
          </button>
          <button type="button" onClick={handleIncrement}>
            Increment {counter}
          </button>
        </p>
      </header>
    </div>
  );
}

export default AppUseState;
