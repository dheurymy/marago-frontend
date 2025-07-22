import { useEffect, useState } from 'react';
import '../assets/styles/pagina-perfil.css';
import Header from './Header';

const PaginaPerfil = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('usuario');
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  if (!usuario) {
    return (
      <div className="pagina-perfil">
        <Header />
        <p>🔄 Carregando perfil...</p>
      </div>
    );
  }

  return (
    <div className="pagina-perfil">
      <Header />
      <div className="perfil-cabecalho">
        <img
          src="/images/avatar.png"
          alt="Foto de perfil"
          className="perfil-foto"
        />
        <div>
          <h2>{usuario.nome}</h2>
          <p>{usuario.email}</p>
          <small>Usuário: @{usuario.usuario}</small>
        </div>
      </div>

      <div className="perfil-detalhes">
        <p><strong>País:</strong> {usuario.pais}</p>
        <p><strong>Cidade:</strong> {usuario.cidade || 'Não informado'}</p>
        <p><strong>Gênero:</strong> {usuario.genero}</p>
        <p><strong>Data de nascimento:</strong> {new Date(usuario.data_nascimento).toLocaleDateString()}</p>
        <p><strong>Idioma:</strong> {usuario.idioma}</p>
      </div>

      <div className="perfil-preferencias">
        <h3>🌎 Preferências Turísticas</h3>
        <ul>
          {usuario.preferencias_turisticas.map((pref, i) => (
            <li key={i}>• {pref}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaginaPerfil;