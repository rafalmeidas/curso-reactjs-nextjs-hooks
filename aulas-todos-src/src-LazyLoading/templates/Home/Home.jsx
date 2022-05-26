import React, { Suspense, useContext, useEffect, useState } from 'react';

// Lazy loading no React
// import LazyComponent from './lazy-component';
// const LazyComponent = React.lazy(() => import('./lazy-component'));

/* Lazy loading por intenção de clique no botão, ao usuário passar o mouse em cima
 * do botão já vai começar a carregar o componente, e quando ele clicar já vai estar
 * carregado ou quase carregado, serve para componentes grandes (função chamada no onMouseOver)
 */
const loadComponent = () => import('./lazy-component');
const LazyComponent = React.lazy(loadComponent);

export const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <p>
        <button onMouseOver={loadComponent} onClick={() => setShow((s) => !s)}>
          Show {show ? 'LC on screen' : 'LC off screen'}
        </button>
      </p>
      {show && (
        <Suspense fallback={<p>Carregando...</p>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
