import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/logo-marago-branco.jpg';
import GoogleLogo from '../assets/images/google-logo.svg';
import '../assets/styles/login-usuario.css';

const LoginUsuario = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensagem('');

    try {
      const res = await fetch('https://marago-backend.vercel.app/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const json = await res.json();

      if (res.ok && json.token) {
        localStorage.setItem('token', json.token);
        localStorage.setItem('usuario', JSON.stringify(json.usuario));
        navigate('/explorar'); // Redireciona para a página de exploração
      } else {
        setMensagem(json.erro || 'Login falhou');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setMensagem('Erro de conexão com o servidor');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='login-usuario-container'>
      <div className='login-usuario-header'>
        <img src={Logo} alt='Logo Marago' />
        <h1>Acesse seu perfil no MaraGO e tenha acesso a recursos exclusivos!</h1>
      </div>

      <form className='login-usuario-form' onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        {mensagem && <p style={{ color: 'red', marginTop: '10px' }}>{mensagem}</p>}

        <div className="login-social">
          <p>Ou entre com:</p>
          <a href="https://marago-backend.vercel.app/auth/google">
            <button type="button" className="google-button">
              <img src={GoogleLogo} alt="Google logo" />
              Entrar com Google
            </button>
          </a>
        </div>

        <p className='login-usuario-footer'>
          Ainda não tem uma conta? <a href='/cadastro'>Faça o cadastro!</a>
        </p>
      </form>
    </div>
  );
};

export default LoginUsuario;
