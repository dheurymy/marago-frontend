import React, { useState } from 'react';
import '../assets/styles/header.css';
import Logo from '../assets/images/logo-marago-branco.jpg';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  const toggleMenu = () => {
    setMenuAberto(prev => !prev);
  };

  return (
    <div className='header-container'>
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
      <div className='header-content'>
        <img src={Logo} alt="Logo MaraGO" />
      </div>

      {/* Menu Dinâmico */}
      {menuAberto && (
        <div className='menu-itens'>
          <ul>
            <li><a href="/">🏠 Início</a></li>
            <li><a href="/perfil">👤 Perfil</a></li>
            <li><a href="/explorar">🧭 Explorar</a></li>
            <li><a href="/favoritos">💙 Favoritos</a></li>
            <li><a href="/mapa">📍 Mapa</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;