import { useState, useEffect, useRef } from 'react';
import CardDeslizavel from './CardDeslizavel';

const CardsFuncionalidade = () => {
  const [locais, setLocais] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [iniciarAnimacao, setIniciarAnimacao] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    async function buscarLocais() {
      try {
        const res = await fetch('https://marago-backend.vercel.app/pontos');
        const todos = await res.json();
        const embaralhados = todos.sort(() => Math.random() - 0.5).slice(0, 10);
        setLocais(embaralhados);
      } catch (err) {
        console.error('Erro ao buscar locais:', err);
      }
    }

    buscarLocais();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIniciarAnimacao(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSwipe = () => {
    setIndexAtual((prev) =>
      prev + 1 >= locais.length ? 0 : prev + 1
    );
  };

  return (
    <div className="card-function" ref={cardRef}>
      {locais.length > 0 && (
        <CardDeslizavel
          key={`${indexAtual}-${locais[indexAtual]?.id || locais[indexAtual]?.nome}`}
          local={locais[indexAtual]}
          animarInicio={iniciarAnimacao}
          onSwipe={handleSwipe}
        />
      )}
    </div>
  );
};

export default CardsFuncionalidade;