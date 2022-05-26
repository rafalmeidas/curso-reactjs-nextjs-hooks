import { useDebugValue, useEffect, useRef, useState } from 'react';

const useMediaQuery = (queryValue, initialValue = false) => {
  const [match, setMatch] = useState(false);

  // é possível ver um lo direto na extensão dev do react ao inspecionar os componentes
  useDebugValue(`Query: ${queryValue}`, (name) => {
    name + 'modificado';
  });

  useEffect(() => {
    let isMounted = true;
    const matchMedia = window.matchMedia(queryValue);

    const handleChange = () => {
      if (!isMounted) return;

      setMatch(Boolean(matchMedia.matches));
    };

    matchMedia.addEventListener('change', handleChange);

    setMatch(Boolean(matchMedia.matches));

    return () => {
      isMounted = false;
      matchMedia.removeEventListener('change', handleChange);
    };
  }, [queryValue]);

  return match;
};

function App() {
  const huge = useMediaQuery('(min-width: 980px)');
  const big = useMediaQuery('(max-width: 979px) and (min-width: 768px)');
  const medium = useMediaQuery('(max-width: 767px) and (min-width: 321px)');
  const small = useMediaQuery('(max-width: 321px)');

  const background = huge
    ? 'green'
    : big
    ? 'red'
    : medium
    ? 'yellow'
    : small
    ? 'cyan'
    : null;

  useEffect(() => {
    console.log(huge);
  }, [huge]);

  return <div style={{ fontSize: '60px', background }}>Olá</div>;
}

export default App;
