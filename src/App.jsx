import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import P from 'prop-types';
import './App.css';

const useMyHook = (callback, delay = 1000) => {
  const savedCb = useRef();

  useEffect(() => {
    savedCb.current = callback;
  }, [callback]);

  useEffect(() => {
    const interval = setInterval(() => {
      savedCb.current();
    }, delay);

    return () => clearInterval(interval);
  }, [delay]);
};

function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(100);

  useMyHook(() => setCounter((c) => c + 1), delay);

  return (
    <div>
      <h1>Contador: {counter}</h1>
      <h1>Delay: {delay}</h1>
      <button onClick={() => setDelay((d) => d + incrementor)}>
        +{incrementor}
      </button>
      <button onClick={() => setDelay((d) => d - incrementor)}>
        -{incrementor}
      </button>
      <input
        type="number"
        value={incrementor}
        onChange={(e) => setIncrementor(Number(e.target.value))}
      />
    </div>
  );
}

export default App;
