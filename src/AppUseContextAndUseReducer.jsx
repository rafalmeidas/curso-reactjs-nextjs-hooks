import { createContext, useContext, useReducer, useRef } from 'react';
import P from 'prop-types';
import './App.css';

// actions.js
export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

// data.js
export const globalState = {
  title: 'O titulo do contexto',
  body: 'O body do contexto',
  counter: 0,
};

// reducer.js
export const reducer = (state, action) => {
  console.log(action.type);

  switch (action.type) {
    case actions.CHANGE_TITLE:
      console.log('mudar titulo');
      return { ...state, title: action.payload };
  }
  return { ...state };
};

// AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };

  return (
    <Context.Provider value={{ state, changeTitle }}>
      {children}
    </Context.Provider>
  );
};

AppContext.propTypes = {
  children: P.node,
};

//H1/index.jsx
export const H1 = () => {
  const appContext = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1 onClick={() => appContext.changeTitle(inputRef.current.value)}>
        {appContext.state.title}
      </h1>
      <input type="text" ref={inputRef} />
    </>
  );
};

function AppUseContextAndUseReducer() {
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
  );
}

export default AppUseContextAndUseReducer;
