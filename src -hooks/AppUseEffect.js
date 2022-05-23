import './App.css';
import { useEffect, useState } from 'react';

const eventFn = () => {
  console.log('h1 clicado');
};

function AppUseEffect() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);
  // componentDidUpdate - executa toda vez que o componente atualiza
  // useEffect(() => {
  //   console.log('componentDidUpdate');
  // });

  // componentDidMount - executa 1x ao componente ser montado (caso seja feita alteração no código e é remontado)
  useEffect(() => {
    console.log('componentDidMount');
    document.querySelector('h1').addEventListener('click', eventFn);

    // componentWillUmount - limpeza do componente
    return () => {
      document.querySelector('h1').removeEventListener('click', eventFn);
    };
  }, []);

  // com dependência - executa toda vez que a dependência mudar
  useEffect(() => {
    console.log('C1', counter, 'C2', counter2);
  }, [counter, counter2]);

  return (
    <div className="App">
      <h1>
        C1: {counter} C2: {counter2}
      </h1>
      <button
        type="button"
        onClick={() => {
          setCounter((counter) => counter + 1);
        }}
      >
        +
      </button>
    </div>
  );
}

export default AppUseEffect;
