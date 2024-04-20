import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NB from "./components/Navbar";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Counties from "./pages/ModelOne/Counties";
import Locator from "./pages/Model3/Locator";
import Prevalence from "./pages/ModelTwo/Prevalence";
import Visualizations from "./pages/OurVisualizations/Visualizations";
import CountiesInstance from "./pages/ModelOne/CountiesInstance";
import InstancePrevalence from "./pages/ModelTwo/InstancePrevalence";
import LocatorInstance from "./pages/Model3/LocatorInstance";
import SearchResultsPage from "./pages/SearchResultsPage";

function App() {
  return (
    <Router>
      <NB />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/counties" element={<Counties />} />
        <Route path="/locator" element={<Locator />} />
        <Route path="/prevalence" element={<Prevalence />} />
        <Route path="/visualizations" element={<Visualizations/>} />
        <Route path="/counties/:id" element={<CountiesInstance />} />
        <Route path="/prevalence/:id" element={<InstancePrevalence />} />
        <Route path="/locator/:id" element={<LocatorInstance />} />
        <Route path="/search/:query" element={<SearchResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
