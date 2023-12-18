import './App.css';
import { GraphManipulator } from './GraphManipulator/GraphManipulator.tsx';
import { About } from './static-content/About.tsx';

function App() {
  return (
    <main className="App">
      <GraphManipulator/>
      <About/>
    </main>
  )
}

export default App;
