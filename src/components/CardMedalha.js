import React, { useEffect, useRef, useState } from 'react';
import Caolho from '../assets/images/medalha-caolho.jpg';
import Olho from '../assets/images/medalha-olho-dagua.jpg';
import Gastronomia from '../assets/images/medalha-gastronomia.jpg';
import '../assets/styles/card-medalha.css';

const CardMedalha = () => {
  const refContainer = useRef();
  const [animar, setAnimar] = useState(false);
  const [colarAnimacao, setColarAnimacao] = useState([false, false, false]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimar(true);
        }
      },
      { threshold: 0.5 }
    );

    if (refContainer.current) observer.observe(refContainer.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  if (!animar) return;

  let index = 0;
  let modo = 'aparecer';

  const ciclo = setInterval(() => {
    setColarAnimacao((prev) => {
      const novo = [...prev];
      novo[index] = modo === 'aparecer';
      return novo;
    });

    index++;

    if (index === 3) {
      index = 0;
      modo = modo === 'aparecer' ? 'desaparecer' : 'aparecer';
    }
  }, 2000); // tempo entre cada passo da animação

  return () => clearInterval(ciclo);
}, [animar]);

  const imagens = [Caolho, Olho, Gastronomia];
  const nomes = ['Medalha 01', 'Medalha 02', 'Medalha 03'];

  return (
    <div className='card-medalha-container' ref={refContainer}>
      {imagens.map((img, index) => (
        <div className='local-medalha' key={index}>
          <div className={`medalha-item ${colarAnimacao[index] ? 'colar-animacao' : ''}`}>
            <img className='imagem' src={img} alt={nomes[index]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardMedalha;