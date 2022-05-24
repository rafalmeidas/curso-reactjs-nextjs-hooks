import { useEffect, useRef, useState } from 'react';

// Comparar objetos
const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
};

const useFetch = (url, options) => {
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
    console.log('EFFECT', new Date().toLocaleString());
    setLoading(true);

    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 1000));

      try {
        const response = await fetch(urlRef.current, optionsRef.current);
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
    };
  }, [shouldLoad]);

  return [result, loading];
};

function App() {
  const [postId, setPostId] = useState('');
  const [result, loading] = useFetch(
    'https://jsonplaceholder.typicode.com/posts/' + postId,
    {
      headers: {
        abc: '123' + postId,
      },
    },
  );
  //console.log('result', result, 'loading', loading);

  useEffect(() => {
    console.log('ID do post', postId);
  }, [postId]);

  const handleClick = (id) => {
    setPostId(id);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!loading && result) {
    return (
      <div>
        {result?.length > 0 ? (
          result.map((post) => (
            <div key={post.id} onClick={() => handleClick(post.id)}>
              <p>{post.title}</p>
            </div>
          ))
        ) : (
          <div onClick={() => handleClick('')}>
            <p>{result.title}</p>
          </div>
        )}
      </div>
    );
  }
}

export default App;
