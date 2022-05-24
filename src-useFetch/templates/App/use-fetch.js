import { useEffect, useRef, useState } from 'react';

// Comparar objetos
const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

export const useFetch = (url, options) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  // O useRef mantém a referência entre as renderizações do componente,
  // por isso é necessário alterar o seu valor manualmente com useEffect por exemplo
  useEffect(() => {
    let changed = false;

    if (!isObjectEqual(url, urlRef.current)) {
      urlRef.current = url;
      changed = true;
    }

    if (!isObjectEqual(options, optionsRef.current)) {
      optionsRef.current = options;
      changed = true;
    }

    if (changed) setShouldLoad((s) => !s);
  }, [url, options]);

  useEffect(() => {
    let wait = false;
    const controller = new AbortController();
    const signal = controller.signal;
    console.log('EFFECT', new Date().toLocaleString());
    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const response = await fetch(urlRef.current, {
          signal,
          ...optionsRef.current,
        });
        const jsonResult = await response.json();
        if (!wait) {
          setResult(jsonResult);
          setLoading(false);
        }
      } catch (error) {
        if (!wait) {
          setLoading(false);
        }
        throw error;
      }
    };

    fetchData();

    return () => {
      wait = true;
      controller.abort();
    };
  }, [shouldLoad]);

  return [result, loading];
};
