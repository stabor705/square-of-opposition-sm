import './App.css';
import { GraphManipulator } from './GraphManipulator/GraphManipulator.tsx';
import { CodeWindow } from './code-generation/CodeWindow.tsx';
import { About } from './static-content/About.tsx';
import { Footer } from './static-content/Footer.tsx';

function App() {
  return (
    <main className="App">
      <GraphManipulator/>
      <CodeWindow/>
      <About/>
      <Footer/>
    </main>
  )
}

export default App;
