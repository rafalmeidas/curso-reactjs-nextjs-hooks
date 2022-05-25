import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

// forwardRef permite que utilizemos ref em componentes funcionais, é obrigatório utilizar uma função, e não uma arrow function
// as props vem como primeiro parâmetro da função e por segundo o ref
export const DisplayCounted = forwardRef(function DisplayCounted(
  { counted },
  ref,
) {
  const [range, setRange] = useState('0.21');
  const divRef = useRef();

  const handleClick = () => {
    setRange(Math.random().toFixed(2));
  };

  // Passo funções para serrem executadas pelo ref no componente pai, porém perco a referência correta no componente pai,
  // Sendo necessário passar uma nova referência para o componente pai reutilizar
  useImperativeHandle(ref, () => ({ handleClick, divRef: divRef.current }), []);

  return (
    <div
      ref={divRef}
      style={{ height: '200px', width: '100px', overflowY: 'scroll' }}
    >
      {counted.map((count, index) => (
        <p onClick={handleClick} key={index}>
          {count} +++ {range}
        </p>
      ))}
    </div>
  );
});

function App() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
  const divRef = useRef();

  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 300);
    divRef.current.divRef.scrollTop = divRef.current.divRef.scrollHeight; // useImperativeHandle
  });

  const handleClick = () => {
    setCounted((c) => [...c, Number(c.slice(-1)) + 1]);
    divRef.current.handleClick(); // useImperativeHandle
  };

  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <DisplayCounted counted={counted} ref={divRef} />
    </>
  );
}

export default App;
