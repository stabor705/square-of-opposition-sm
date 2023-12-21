import './App.css';
import { GraphManipulator } from './GraphManipulator/GraphManipulator.tsx';
import { About } from './static-content/About.tsx';
import { Footer } from './static-content/Footer.tsx';

function App() {
  return (
    <main className="App">
      <GraphManipulator/>
      <About/>
      <Footer/>
    </main>
  )
}

export default App;
