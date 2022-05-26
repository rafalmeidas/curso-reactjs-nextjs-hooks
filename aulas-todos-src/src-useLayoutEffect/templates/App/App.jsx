import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function App() {
  const [counted, setCounted] = useState([0, 1, 2, 3, 4]);
  const divRef = useRef();

  // rolar a página para o ultimo item da lista ao atualizar o componente - componentDidUpdate (com use effect)
  // com useEffect o navegador atualiza o valor do contador e depois de 1,5s ele rola para o ultimo item da lista
  // com useLayoutEffect o navegador rola a página sincronizado com o DOM, o navegador aguarda o tempo do while para depois sincronizar os dois juntos contador e movimento (não recomendado)
  useLayoutEffect(() => {
    const now = Date.now();
    while (Date.now() < now + 1500);
    divRef.current.scrollTop = divRef.current.scrollHeight;
  });

  const handleClick = () => {
    setCounted((c) => [...c, Number(c.slice(-1)) + 1]);
  };

  return (
    <>
      <button onClick={handleClick}>Count {counted.slice(-1)}</button>
      <div
        ref={divRef}
        style={{ height: '200px', width: '100px', overflowY: 'scroll' }}
      >
        {counted.map((count, index) => (
          <p key={index}>{count}</p>
        ))}
      </div>
    </>
  );
}

export default App;
