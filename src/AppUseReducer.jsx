import { useReducer } from 'react';
import './App.css';

export const globalState = {
  title: 'O titulo do contexto',
  body: 'O body do contexto',
  counter: 0,
};

const reducer = (state, action) => {
  console.log('ACTION', action);
  switch (action.type) {
    case 'muda': {
      console.log('Chamou muda com este payload', action.payload);
      return { ...state, title: action.payload };
    }
    case 'inverter': {
      console.log('Chamou inverter');
      const { title } = state;
      return { ...state, title: title.split('').reverse().join('') };
    }
  }

  return { ...state }; // caso não tenha um type deve retornar ao menos o estado anterior, se não vai quebrar a aplicação
};
/*
  useReducer é utilizado para controlar estados mais complexos, que requerem alguma lógica, os parâmetros são:
  1º meu estado (dados)
  2ª uma função reducer que vai realizar o controle do estado


  Exemplos de uso do useReducer, fazer login e logout na aplicação, adicionar item e retirar item de um carrinho...

  state meu estado passado para o useReducer
  dispatch é usada para disparar as ações, pega dados etc é o action..
 */
function AppUseReducer() {
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;

  return (
    <div>
      <h1>
        {title} {counter}
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: 'muda',
            payload: new Date().toLocaleString('pt-BR'),
          })
        }
      >
        Click
      </button>
      <button onClick={() => dispatch({ type: 'inverter' })}>Invert</button>
    </div>
  );
}

export default AppUseReducer;
