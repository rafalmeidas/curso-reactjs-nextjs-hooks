import React, { Children, cloneElement, useEffect, useState } from 'react';

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

// Passando para todos os child props
const TurnOnOff = ({ children }) => {
  const [isOn, setIsOn] = useState(false);
  const onTurn = () => setIsOn((s) => !s);

  return Children.map(children, (child) => {
    const newChild = cloneElement(child, { isOn, onTurn });
    return newChild;
  });
};

const TurnedOn = ({ isOn, children }) => (isOn ? children : null);

const TurnedOff = ({ isOn, children }) => (isOn ? null : children);

const TurnButton = ({ isOn, onTurn, ...props }) => (
  <button {...props} onClick={onTurn}>
    Turn {!isOn ? 'ON' : 'OFF'}
  </button>
);

const P = ({ children }) => <p {...s}>{children}</p>;

export const Home = () => {
  return (
    <TurnOnOff>
      <TurnedOn>
        <P>Aqui vai acontecer as coisas quando tiver on</P>
      </TurnedOn>
      <TurnedOff>
        <P>Aqui vai acontecer as coisas quando tiver off</P>{' '}
      </TurnedOff>
      <TurnButton {...s} />
    </TurnOnOff>
  );
};

export default Home;
