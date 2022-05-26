import { createContext, useContext, useReducer, useRef, useState } from 'react';
import P from 'prop-types';
import { buildActions } from './build-actions';
import { reducer } from './reducer';

export const initialState = {
  counter: 0,
  loading: false,
};

const Context = createContext();

export const CounterContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //useRef não muda nas atualizações/renderizações do componente, então não via causar renderizações a mais no navegador
  const actions = useRef(buildActions(dispatch));

  return (
    <Context.Provider value={[state, actions.current]}>
      {children}
    </Context.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: P.node.isRequired,
};

export const useCounterContext = () => {
  const context = useContext(Context);

  // valida que para usar o hook é necessário que use o CounterContextProvider
  if (typeof context === 'undefined') {
    throw new Error(
      'You have to use useCounterContext inside <CounterContextProvider />',
    );
  }

  return [...context];
};
