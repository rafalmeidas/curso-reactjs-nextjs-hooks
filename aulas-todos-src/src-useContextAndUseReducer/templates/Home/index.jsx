import { useEffect, useState, useCallback, useReducer } from 'react';

import './styles.css';

import { useCounterContext } from '../../contexts/CounterContext';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';

export const Home = () => {
  const [state, actions] = useCounterContext();
  const [countValue, setCountValue] = useState(state.counter);

  const handleError = () => {
    actions
      .asyncError()
      .then((r) => console.log(r))
      .catch((e) => console.log(e.name, ':', e.message));
  };

  const handleSetCounterValue = (value) => {
    console.log(value);
    if (Number(value) >= 0) setCountValue(value);
  };

  return (
    <div>
      <Heading />
      <div>
        <Button onButtonClick={actions.increase}>Increase </Button>
        <Button onButtonClick={actions.decrease}>Decrease </Button>
        <Button onButtonClick={actions.reset}>reset</Button>
        <Button onButtonClick={() => actions.set({ counter: 15 })}>
          set 15
        </Button>
        <Button onButtonClick={() => actions.set({ counter: 100 })}>
          set 100
        </Button>
        <Button disabled={state.loading} onButtonClick={actions.asyncIncrease}>
          async Increase
        </Button>
        <Button disabled={state.loading} onButtonClick={handleError}>
          async Error
        </Button>

        <p>
          <input
            type="number"
            min={0}
            value={countValue}
            onChange={(e) => handleSetCounterValue(e.target.value)}
            placeholder="Digite a quantidade que deseja inserir"
          />
          <Button onButtonClick={() => actions.set({ counter: countValue })}>
            set {`${countValue}`}
          </Button>
        </p>
      </div>
    </div>
  );
};
