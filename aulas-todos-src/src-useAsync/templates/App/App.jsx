import { useEffect, useState } from 'react';
import { useAsync } from './use-async';

const fetchData = async () => {
  await new Promise((r) => setTimeout(r, 2000));
  const data = await fetch('https://jsonplaceholder.typicode.com/posts');
  const json = await data.json();
  return json;
};

function App() {
  const [posts, setPosts] = useState(null);
  const [reFetchData, result, error, status] = useAsync(fetchData, false);

  useEffect(() => {
    reFetchData();
  }, [reFetchData]);

  if (status === 'idle') return <pre>idle: Nada executando</pre>;

  if (status === 'pending') return <pre>pending: Carregando...</pre>;

  if (status === 'error') return <pre>error: {error.message}</pre>;

  if (status === 'settled')
    return <pre>settled: {JSON.stringify(result, null, 2)}</pre>;
}

export default App;
