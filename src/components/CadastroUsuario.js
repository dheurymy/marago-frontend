import { React, useState, useEffect } from 'react';
import '../assets/styles/cadastro-usuario.css';
import Logo from '../assets/images/logo-marago-branco.jpg';
import GoogleLogo from '../assets/images/google-logo.svg';
import { redirect } from 'react-router-dom';

const CadastroUsuario = () => {
    const [listaDePaises, setListaDePaises] = useState([]);

    const [usuarioDisponivel, setUsuarioDisponivel] = useState(null);
    const [verificandoUsuario, setVerificandoUsuario] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function buscarPaises() {
            try {
                const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
                const json = await res.json();

                // o retorno agora é um array: [{ name: { common: "Brasil", ... } }]
                const nomesOrdenados = json
                    .map(p => p.name?.common)
                    .filter(Boolean)
                    .sort();

                setListaDePaises(nomesOrdenados);
            } catch (err) {
                console.error('Erro ao buscar países:', err);
            }
        }

        buscarPaises();
    }, []);


    const verificarDisponibilidadeUsuario = async (usuario) => {
        if (!usuario || usuario.trim() === '') {
            setUsuarioDisponivel(null);
            return;
        }
        console.log('Buscando usuário:', usuario);

        setVerificandoUsuario(true);
        try {
            const res = await fetch(`https://marago-backend.vercel.app/usuarios/disponivel?usuario=${usuario}`);
            const json = await res.json();

            if ('disponivel' in json) {
                setUsuarioDisponivel(json.disponivel);
            } else {
                setUsuarioDisponivel(null);
            }
        } catch (err) {
            console.error('Erro ao verificar usuário:', err);
            setUsuarioDisponivel(null);
        } finally {
            setVerificandoUsuario(false);
            setUsuarioDisponivel(prev => prev === null ? null : prev); // mantém o estado se já foi verificado
        }
    };

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        usuario: '',
        senha: '',
        confirmarSenha: '',
        pais: '',
        cidade: '',
        data_nascimento: '',
        genero: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            if (formData.usuario) {
                verificarDisponibilidadeUsuario(formData.usuario);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [formData.usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('https://marago-backend.vercel.app/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {

                alert('Usuário cadastrado com sucesso!');
                redirect('/login');

                setFormData({
                    nome: '',
                    email: '',
                    usuario: '',
                    senha: '',
                    confirmarSenha: '',
                    pais: '',
                    cidade: '',
                    data_nascimento: '',
                    genero: ''
                });
            } else {
                alert(`Erro: ${data.erro}`);
                
                
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro de conexão com o servidor.');
        } finally {
            setIsLoading(false);

        }
    };



    return (
        <div className='cadastro-usuario-container'>
            <div className='cadastro-usuario-header'>
                <img src={Logo} alt='Logo Marago' />
                <h1>Cadastre-se na plataforma MaraGO e tenha acesso a recursos exclusivos!</h1>
            </div>

            <form onSubmit={handleSubmit} className='cadastro-usuario-form'>
                <label htmlFor='nome'>Nome Completo:</label>
                <input
                    type='text'
                    id='nome'
                    name='nome'
                    placeholder='Digite seu nome completo'
                    required
                    value={formData.nome}
                    onChange={handleChange}
                />
                <label htmlFor='email'>E-mail:</label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    placeholder='Digite seu e-mail'
                    required
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor='usuario'>Nome de Usuário:</label>
                <input
                    type="text"
                    name="usuario"
                    id="usuario"
                    value={formData.usuario}
                    onChange={(e) => {
                        handleChange(e);
                        verificarDisponibilidadeUsuario(e.target.value); // pode usar debounce aqui
                    }}
                    placeholder="Escolha um nome de usuário"
                    required
                />
                {verificandoUsuario && <p>🔎 Verificando disponibilidade...</p>}
                {usuarioDisponivel === true && <p style={{ color: 'green' }}>✅ Nome de usuário disponível</p>}
                {usuarioDisponivel === false && <p style={{ color: 'red' }}>🚫 Nome de usuário já está em uso</p>}
                {usuarioDisponivel === null && <p style={{ display: 'none' }}></p>}
                <label htmlFor='senha'>Senha:</label>
                <input
                    type='password'
                    id='senha'
                    name='senha'
                    placeholder='Digite sua senha'
                    required
                    value={formData.senha}
                    onChange={handleChange}
                />
                <label htmlFor='confirmarSenha'>Confirmar Senha:</label>
                <input
                    type='password'
                    id='confirmarSenha'
                    name='confirmarSenha'
                    placeholder='Confirme sua senha'
                    required
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                />

                <label htmlFor='pais'>País:</label>

                <select
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione o país</option>
                    {listaDePaises.map((pais, index) => (
                        <option key={index} value={pais}>{pais}</option>
                    ))}
                </select>


                <label htmlFor='data_nascimento'>Data de Nascimento:</label>
                <input
                    type='date'
                    id='data_nascimento'
                    name='data_nascimento'
                    required
                    value={formData.data_nascimento}
                    onChange={handleChange}
                />
                <label htmlFor='genero'>Gênero:</label>
                <select id='genero' name='genero' value={formData.genero} onChange={handleChange} required>
                    <option value='' disabled>Selecione seu gênero</option>
                    <option value='masculino'>Masculino</option>
                    <option value='feminino'>Feminino</option>
                    <option value='outro'>Outro</option>
                    <option value='nao_especificado'>Prefiro não informar</option>
                </select>



                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
                <div className="login-social">
                    <p>Ou entre com:</p>
                    <a href="https://marago-backend.vercel.app/auth/google">
                        <button type="button" className="google-button">
                            <img src={GoogleLogo} alt="Google logo"  />
                            Entrar com Google
                        </button>
                    </a>
                </div>
                <p>Ao se cadastrar, você concorda com nossos Termos de Serviço e Política de Privacidade.</p>
                <p className='cadastro-usuario-footer'>
                    Já tem uma conta? <a href='/login'>Faça login</a>
                </p>


            </form>

        </div >
    )
}



export default CadastroUsuario;


