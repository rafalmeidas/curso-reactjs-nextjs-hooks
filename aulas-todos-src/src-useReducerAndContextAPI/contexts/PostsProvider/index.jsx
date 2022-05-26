import { useReducer } from 'react';
import P from 'prop-types';

import { PostsContext } from './context';
import { reducer } from './reducer';
import { data } from './data';

export const PostsProvider = ({ children }) => {
  const [postsState, postsDispatch] = useReducer(reducer, data);

  return (
    <PostsContext.Provider value={{ postsState, postsDispatch }}>
      {children}
    </PostsContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: P.node.isRequired, // P.oneOfType([P.string, P.element, P.node]).isRequired
};
