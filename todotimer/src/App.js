import logo from './logo.svg';
import './App.css';
import { Timer } from './Timer/Timer';

function App() {
  return (
    <div className="App App-header">
        <Timer initial={1} final={10}/>
    </div>
  );
}

export default App;
