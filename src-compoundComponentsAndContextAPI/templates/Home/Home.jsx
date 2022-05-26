import React, {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const s = {
  style: {
    fontSize: '60px',
  },
};

// Modo de passar props para um child (exemplo, não utilizar)
const Parent = ({ children }) => {
  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { ...s });
    return newChild;
  });
};

const TurnOnOffContext = createContext();

// Passando para todos os child props
const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return (
    <TurnOnOffContext.Provider value={{ isOn, onTurn }}>
      {children}
    </TurnOnOffContext.Provider>
  );
};

/*
 * Exemplo de Compound Components sem Context API
 * Passando para todos os child props
const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { isOn, onTurn });
    return newChild;
  });
};
*/

const TurnedOn = ({ children }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  return isOn ? children : null;
};

const TurnedOff = ({ children }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  return isOn ? null : children;
};

const TurnButton = ({ ...props }) => {
  const { isOn, onTurn } = useContext(TurnOnOffContext);
  return (
    <button {...props} onClick={onTurn}>
      Turn {!isOn ? 'ON' : 'OFF'}
    </button>
  );
};

const P = ({ children }) => <p {...s}>{children}</p>;

export const Home = () => {
  return (
    <TurnOnOff>
      <div>
        <TurnedOn>
          <P>Aqui vai acontecer as coisas quando tiver on</P>
        </TurnedOn>
        <TurnedOff>
          <P>Aqui vai acontecer as coisas quando tiver off</P>{' '}
        </TurnedOff>
        <TurnButton {...s} />
      </div>
    </TurnOnOff>
  );
};

export default Home;
