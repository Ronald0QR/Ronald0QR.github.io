// Importa BrowserRouter, Route y Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import CieloComponente from './components/CieloComponente';
import MuroComponente from './components/MuroComponente';
import Categorias from './components/Categoria';
import Cotizador from './components/Cotizador';
// Otros imports...

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Otras rutas */}
        <Route path="/cdm/cielo-drywall" element={<CieloComponente />} />
        <Route path="/cdm/cmd-muro" element={<MuroComponente />} />
        <Route path="/drywall/productos" element={<Categorias />} />
        <Route path='/cocielo-drywall' element={ <Cotizador/>} />
      </Routes>
    </Router>
  );
}

export default App;

