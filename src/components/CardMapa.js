import '../assets/styles/card-mapa.css';

const CardMapa = ({ local, distanciaKm, urlGoogleMaps, onFechar }) => {
  if (!local) return null;

  return (
    <div className="card-mapa">
      <button className="fechar-card" onClick={onFechar}>✖</button>

      {local.imagens?.[0] && (
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

        {distanciaKm && (
          <p className="distancia-local">🧭 {distanciaKm} km de você</p>
        )}

        <p>{local.descricao}</p>

        {urlGoogleMaps && (
          <a
            href={urlGoogleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="botao-maps"
          >
            📍 Abrir no Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default CardMapa;