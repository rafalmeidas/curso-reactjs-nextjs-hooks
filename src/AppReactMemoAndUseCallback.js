import './App.css';
import React, { useCallback, useEffect, useState } from 'react';
import P from 'prop-types';

const Button = React.memo(function Button({ incrementButton }) {
  console.log('Filho, renderizou');
  return (
    <button type="button" onClick={() => incrementButton(10)}>
      +
    </button>
  );
});

Button.propTypes = {
  incrementButton: P.func.isRequired,
};

function AppReactMemoAndUseCallback() {
  console.log('Pai, renderizou');

  const [counter, setCounter] = useState(0);

  const incrementCounter = useCallback((num) => {
    setCounter((c) => c + num);
  }, []);

  return (
    <div className="App">
      <h1>C1: {counter}</h1>
      <Button incrementButton={incrementCounter} />
    </div>
  );
}

export default AppReactMemoAndUseCallback;
