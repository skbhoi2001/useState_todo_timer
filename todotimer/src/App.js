import logo from './logo.svg';
import './App.css';
import { Timer } from './Timer/Timer';
import { Todo } from './Todo/Todo';

function App() {
  return (
    <div className="App App-header">
        {/* <Timer initial={1} final={10}/> */}
        <Todo/>
    </div>
  );
}

export default App;
