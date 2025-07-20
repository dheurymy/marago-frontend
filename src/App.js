import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import './assets/styles/global.css'; 

import CadastroUsuario from './components/CadastroUsuario';
import LoginUsuario from './components/LoginUsuario';
import Home from './components/Home';
import Explorar from './components/Explorar';
import RotaProtegida from './components/RotaProtegida';
import MapaLocais from './components/MapaLocais';
import Header from './components/Header';


function App() {
  return (
    

    <Router>
        <div className="App">
          <Routes>
            {/* Rotas públicas (qualquer um pode acessar) */}
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<CadastroUsuario />} />
            <Route path="/login" element={<LoginUsuario />} />
            <Route path="/header" element={<Header />} />
           

            {/* Rotas protegidas (apenas usuários logados podem acessar) */}

            <Route path="/explorar" element={<RotaProtegida><Explorar /></RotaProtegida>} />
            <Route path="/mapa" element={<RotaProtegida><MapaLocais /></RotaProtegida>} />
            
            
          </Routes>
        </div>
      </Router>
  );
}

export default App;
