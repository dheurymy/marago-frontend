import React from 'react';
import '../assets/styles/card-local.css';

const CardLocal = ({ local }) => {
  if (!local) return null;

  return (
    <div className="card-local">
      <img src={local.imagens[0]} alt={local.nome} className="card-local-imagem" />
      <div className="card-local-info">
        <h3>{local.nome} <br></br>
        <small>{local.cidade}, {local.estado}</small>
        </h3>
        
        <p>{local.descricao}</p>
        
      </div>
    </div>
  );
};

export default CardLocal;