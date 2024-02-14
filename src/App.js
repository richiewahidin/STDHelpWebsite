import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NB from "./components/Navbar";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Counties from "./pages/ModelOne/Counties";
import Locator from "./pages/Locator";
import Prevalence from "./pages/ModelTwo/Prevalence";
import Alameda from "./pages/ModelOne/Alameda";
import LosAngeles from "./pages/ModelOne/LosAngeles";
import Merced from "./pages/ModelOne/Merced";
import InstancePrevalence from "./pages/ModelTwo/InstancePrevalence";

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
        <Route path="/counties/alameda" element={<Alameda />} />
        <Route path="/counties/losangeles" element={<LosAngeles />} />
        <Route path="/counties/merced" element={<Merced />} />
        <Route path="/prevalence/:id" element={<InstancePrevalence />} />
      </Routes>
    </Router>
  );
}

export default App;
