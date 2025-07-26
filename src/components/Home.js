

import '../assets/styles/home.css';
import Logo from '../assets/images/logo-marago-branco.jpg';
import ExplorarIcon from '../assets/images/explorar-icon.svg';

import RotaIcon from '../assets/images/rota-icon.svg';
import BadgeIcon from '../assets/images/badge-icon.svg';
import CodigoMALogo from '../assets/images/codigoma-logo.svg';
import { useState } from 'react';
import CardsFuncionalidade from './CardFuncionalidade';
import CardMedalha from './CardMedalha';
const LandingPage = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(prev => !prev);
  };
  return (
    <div className="landing-page">
      <div className='header'>
        {/* Botão de Menu */}
        <div className='header-menu'>
          <label className="hamburger">
            <input type="checkbox" checked={menuAberto} onChange={toggleMenu} />
            <svg viewBox="0 0 32 32">
              <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
              <path className="line" d="M7 16 27 16"></path>
            </svg>
          </label>
        </div>

        {/* Logo */}
        <div className='content'>
          <div className='content-logo'>
            <img src={Logo} alt="Logo MaraGO" />
          </div>
          <button onClick={() => window.location.href = '/login'}>Entrar</button>
        </div>

        {/* Menu Dinâmico */}
        {menuAberto && (
          <div className='menu'>
            <ul>

            </ul>
          </div>
        )}
      </div>

      <main className='main-content'>
        <h1>
          
          <span className='linha1'>O que você</span>
          <span className='linha2'>quer <strong>fazer</strong></span>
          <span className='linha3'>hoje?</span>
        </h1>
        
        
      </main>
      <section className='cards-funcionalidades'>
        <h2>Conheça tudo que o MaraGO tem a oferecer:</h2>
        <div className='card'>
          <div className='card-title'>
            <img src={ExplorarIcon} alt="Ícone Explorar" />
            <h2>Explorar</h2>
          </div>
          <CardsFuncionalidade />
          <div className='card-content'>
            <p>Descubra novos rolês com a facilidade de um deslizar.</p>
            <button className='botao-piscar' onClick={() => window.location.href = '/cadastro'}>Experimentar</button>
          </div>
        </div>
        
        <div className='card'>
          <div className='card-title'>
            <img src={RotaIcon} alt="Ícone Rota" />
            <h2>Rotas</h2>
          </div>
          <div className='card-content'>
            <p>Crie rotas personalizadas com seus lugares favoritos. Veja qual o mais perto de você, veja detalhes dos rolês. Organize seus rolês de forma prática e divertida!</p>
          </div>
        </div>
        <div className='card'>
          <div className='card-title'>
            <img src={BadgeIcon} alt="Ícone Insígnia" />
            <h2>Medalhas</h2>
          </div>
          <CardMedalha />

          <div className='card-content'>
            <p>Ganhe medalhas por explorar, conhecer novos lugares e completar desafios. </p>
          </div>
        </div>
      </section>

      <footer className='footer'>
        <p>© 2025 MaraGO. Todos os direitos reservados.</p>
        <p>Desenvolvido por <a href="/">
        <img src={CodigoMALogo} alt="CódigoMA Logo" className='codigoma-logo' />
        </a></p>
      </footer>
    </div>
  );
};

export default LandingPage;