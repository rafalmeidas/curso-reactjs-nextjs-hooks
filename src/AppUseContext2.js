import './App.css';

import { Div } from './components/Div/index.jsx';
import { AppContext } from './contexts/App';

function App() {
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
}

export default App;
