import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import NB from './components/Navbar';
import Landing from './pages/Landing';
import About from './pages/About';
import Counties from './pages/Counties';
import Locator from './pages/Locator';

function App() {
  return (
    <Router>
      <NB />
      <Routes>
        <Route path="/home" element={<Landing />} />
        <Route path="/about" element={<About />} />
                <Route path="/counties" element={<Counties />} />
                <Route path="/locator" element={<Locator />} />
        <Route path="/prevalence" element={<Prevalence />} />
      </Routes>
    </Router>
  );
}

export default App;
