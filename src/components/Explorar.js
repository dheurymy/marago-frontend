import React, { useState, useEffect } from 'react';
import CardLocal from './CardLocal';
import '../assets/styles/explorar.css';
import Logo from '../assets/images/logo-marago-branco.jpg';
import Coracao from '../assets/images/coracao-azul.svg';
import X from '../assets/images/x-vermelho.svg';
import Pular from '../assets/images/pular-amarelo.svg';
import { useNavigate } from 'react-router-dom';

const Explorar = () => {
  const [locais, setLocais] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [locaisCurtidos, setLocaisCurtidos] = useState([]);
  const navigate = useNavigate();
  const [primeiroNome, setPrimeiroNome] = useState('');

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem('usuario'));
    if (dados?.nome) {
      const nomeSeparado = dados.nome.split(' ')[0];
      setPrimeiroNome(nomeSeparado);
    }
  }, []);

  useEffect(() => {
    async function buscarLocais() {
      try {
        const res = await fetch('https://marago-backend.vercel.app/pontos/filtro');
        const json = await res.json();
        setLocais(json);
        console.log('Locais encontrados:', json);
      } catch (err) {
        console.error('Erro ao buscar locais:', err);
      } finally {
        setCarregando(false);
      }
    }

    buscarLocais();
  }, []);

  useEffect(() => {
    if (indexAtual >= locais.length && locais.length > 0) {
      const todosTipos = locaisCurtidos
        .flatMap(local => local.tipo) // junta todos os tipos
        .filter(Boolean);             // remove nulos/vazios

      const tiposUnicos = [...new Set(todosTipos)];
      console.log('Tipos únicos selecionados:', tiposUnicos);

      const usuario = JSON.parse(localStorage.getItem('usuario'));
      const idUsuario = usuario?._id;
      console.log('ID do usuário:', idUsuario);

      if (idUsuario && tiposUnicos.length > 0) {
        fetch(`https://marago-backend.vercel.app/usuarios/${idUsuario}/preferencias`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preferencias_turisticas: tiposUnicos }),
        })
          .then(res => res.json())
          .then(data => {
            console.log('✅ Preferências atualizadas:', data.usuario.preferencias_turisticas);
          })
          .catch(err => console.error('⚠️ Erro ao enviar preferências:', err));
      }

      navigate('/mapa', { state: { locais: locaisCurtidos } });
    }
  }, [indexAtual, locais.length, locaisCurtidos, navigate]);

  const handleLike = () => {
    const localCurtido = locais[indexAtual];
    setLocaisCurtidos(prev => [...prev, localCurtido]);
    setIndexAtual(prev => prev + 1);
  };

  const handlePassar = () => {
    console.log('⛔ Ignorado:', locais[indexAtual]);
    setIndexAtual(prev => prev + 1);
  };
  return (
    <div className="explorar-container">


      <div className='explorar-header'>
        <img src={Logo} alt='Logo Marago' />
        <h1>Olá, {primeiroNome}, bem vindo ao MaraGO! Conta pra gente com que locais você dá um match.</h1>
      </div>


      {carregando ? (
        <p>🔄 Carregando destinos...</p>
      ) : locais.length > 0 && indexAtual < locais.length ? (
        <>
          <CardLocal local={locais[indexAtual]} />

          <div className="explorar-botoes">
            <button className="botao-passar" onClick={handlePassar}>
              <img src={X} alt="Passar" />
            </button>
            <button className="botao-curtir" onClick={handleLike}>
              <img src={Coracao} alt="Curtir" />
            </button>
          </div>
          <div className='explorar-pular'>
            <button className="botao-pular" onClick={() => navigate('/mapa')}>
              <img src={Pular} alt="Pular" />
              pular
            </button>
          </div>
        </>
      ) : (
        <p>🎉 Você explorou todos os lugares por hoje. Volte mais tarde!</p>
      )}
    </div>
  );
};

export default Explorar;