import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import '../assets/styles/card-local.css';
import { useEffect } from 'react';

const CardDeslizavel = ({ local, onSwipe, animarInicio }) => {
  const x = useMotionValue(0);

  useEffect(() => {
    if (!animarInicio) return;
    // Animação inicial ao montar o componente
    const animacaoInicial = async () => {
      await animate(x, -100, { duration: 0.5 });
      await animate(x, 30, { duration: 0.4 });
      await animate(x, -30, { duration: 0.4 });
      await animate(x, 100, { duration: 0.5 });
      await animate(x, 0, { duration: 0.5 });
    };
    animacaoInicial();
  }, [x, animarInicio]);


  const backgroundColor = useTransform(x, [-100, 0, 100], ['#ffdddd', '#ffffff', '#ddeeff']);
  const rotate = useTransform(x, [-100, 100], [-15, 15]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const passOpacity = useTransform(x, [-150, -50], [1, 0]);

  const handleDragEnd = (_, info) => {
    const offsetX = info.offset.x;

    if (offsetX > 100) {
      onSwipe('right');
    } else if (offsetX < -100) {
      onSwipe('left');
    } else {
      // Swipe fraco → animar de volta ao centro
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  return (
    <motion.div
      drag="x"
      style={{ x, rotate, backgroundColor, cursor: 'grab' }}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
      className="card-local card-deslizavel"
    >
      {/* Rótulo Curtir */}
      <motion.div className="swipe-label like-label" style={{ opacity: likeOpacity }}>
        💙 Curtir
      </motion.div>

      {/* Rótulo Passar */}
      <motion.div className="swipe-label pass-label" style={{ opacity: passOpacity }}>
        ❌ Passar
      </motion.div>

      <img src={local.imagens[0]} alt={local.nome} className="card-local-imagem" />
      <div className="card-local-info">
        <h3>{local.nome}<br />
          <small>{local.cidade}, {local.estado}</small>
        </h3>
        <p>{local.descricao}</p>
      </div>
    </motion.div>
  );
};

export default CardDeslizavel;