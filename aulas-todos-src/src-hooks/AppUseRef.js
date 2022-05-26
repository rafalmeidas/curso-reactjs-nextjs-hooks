import './App.css';
import P from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';

const Post = ({ post, fnClick }) => {
  console.log('Filho, renderizou');
  return (
    <div className="post" key={post.title}>
      <h1 style={{ fontSize: '14px' }} onClick={() => fnClick(post.title)}>
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};

Post.propTypes = {
  post: P.shape({
    id: P.number,
    title: P.string,
    body: P.string,
  }),
  fnClick: P.func.isRequired,
};

function AppUseRef() {
  console.log('Pai, renderizou');
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const contadorRef = useRef(0);

  // componentDidMount - executado 1x
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r));
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [value]);

  useEffect(() => {
    contadorRef.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h6>Renderizou: {contadorRef.current}x</h6>
      <p>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </p>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post.id} post={post} fnClick={handleClick} />
        ))}

      {posts.length <= 0 && <div>Carregando...</div>}
    </div>
  );
}

export default AppUseRef;
