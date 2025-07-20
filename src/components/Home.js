import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Bem-vindo à plataforma MaraGO!</h1>
      <p>Aqui você pode encontrar uma variedade de recursos e ferramentas para ajudá-lo em sua jornada.</p>
      <button onClick={() => window.location.href = '/cadastro'}>Cadastre-se</button>
      <button onClick={() => window.location.href = '/login'}>Entrar</button>
      <p>Explore nossas funcionalidades e aproveite ao máximo sua experiência!</p>
    </div>
  )
}

export default Home
