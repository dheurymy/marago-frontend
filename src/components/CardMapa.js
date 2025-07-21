// CardMapa.js
import '../assets/styles/card-mapa.css';

const CardMapa = ({ local, onFechar }) => {
  if (!local) return null;

  return (
    <div className="card-mapa">
      <button className="fechar-card" onClick={onFechar}>✖</button>

      {/* Imagem do local */}
      {local.imagens && local.imagens.length > 0 && (
        <img
          src={local.imagens[0]}
          alt={local.nome}
          className="card-mapa-imagem"
        />
      )}

      <div className="card-mapa-info">
        <h3>{local.nome}</h3>
        <small>
          {local.cidade}, {local.estado}, {local.pais || 'Brasil'}
        </small>
        <p>{local.descricao}</p>
      </div>
    </div>
  );
};

export default CardMapa;