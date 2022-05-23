import './App.css';
import P from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

const Post = ({ post }) => {
  console.log('Filho, renderizou');
  return (
    <div className="post" key={post.title}>
      <h1>{post.title}</h1>
    </div>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
};

function AppUseMemo() {
  console.log('Pai, renderizou');
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');

  // componentDidMount - executado 1x
  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((r) => r.json())
        .then((r) => setPosts(r));
    }, 5000);
  }, []);

  return (
    <div className="App">
      <p>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {useMemo(() => {
        return (
          posts.length > 0 &&
          posts.map((post) => <Post key={post.id} post={post} />)
        );
      }, [posts])}

      {posts.length <= 0 && <div>Carregando...</div>}
    </div>
  );
}

export default AppUseMemo;
