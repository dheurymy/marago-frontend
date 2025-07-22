

import '../assets/styles/home.css';
import Logo from '../assets/images/logo-marago-branco.jpg';
import { useState } from 'react';

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
        <p>Com o MaraGO você encontra rolês incríveis perto de você. Explore as opções disponíveis, escolha os que dão match com você, tenha um mapa personalizado com seus rolês favoritos, ganhe insignias por conhecer novos lugares, compartilhe suas experiências e conecte-se com outros usuários!</p>
        <button onClick={() => window.location.href = '/cadastro'}>Cadastre-se</button>
      </main>



    </div>
  );
};

export default LandingPage;