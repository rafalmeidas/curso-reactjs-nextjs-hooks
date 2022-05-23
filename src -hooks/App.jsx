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
  return (
    <div>
      <h1>Oi</h1>
    </div>
  );
}

export default App;
