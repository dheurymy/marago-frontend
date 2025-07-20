import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import '../assets/styles/card-local.css';

const CardDeslizavel = ({ local, onSwipe }) => {
  const x = useMotionValue(0);

  // Cores de fundo baseadas na direção do arrasto
  const backgroundColor = useTransform(x, [-200, 0, 200], ['#ffdddd', '#ffffff', '#ddeeff']);

  // Opacidade dos rótulos visuais
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;
    if (offsetX > 100) {
      onSwipe('right');
    } else if (offsetX < -100) {
      onSwipe('left');
    }
    // senão, card volta ao centro automaticamente
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, backgroundColor, cursor: 'grab' }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
      transition={{ bounceStiffness: 500, bounceDamping: 20 }}
      className="card-local card-deslizavel"
    >
      {/* Rótulo Curtir */}
      <motion.div className="swipe-label like-label" style={{ opacity: likeOpacity }}>
        💙
      </motion.div>

      {/* Rótulo Passar */}
      <motion.div className="swipe-label pass-label" style={{ opacity: passOpacity }}>
        ❌
      </motion.div>

      <img src={local.imagens[0]} alt={local.nome} className="card-local-imagem" />
      <div className="card-local-info">
        <h3>{local.nome} <br></br>
          <small>{local.cidade}, {local.estado}</small>
        </h3>
        <p>{local.descricao}</p>

      </div>
    </motion.div>
  );
};

export default CardDeslizavel;