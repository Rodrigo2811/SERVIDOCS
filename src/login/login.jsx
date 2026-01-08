import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Alert from '../components/alert/alert.jsx';
import logo from '/src/images/indice.jpg';


import './login.css'


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [alertOn, setAlertOn] = useState(false)
    const [aletMensagem, setAlertMensagem] = useState('')
    const [alertType, setAlertType] = useState('')

    function showAlert(mensagem, tipo) {
        setAlertMensagem(mensagem)
        setAlertType(tipo)

        setAlertOn(true)

        setTimeout(() => {
            setAlertOn(false)
        }, 4000);

    }

    async function logar(e) {
        e.preventDefault();

        setAlertOn(false)

        if (email === "" && senha === "") {
            showAlert('Preencha os campos usuário e senha !', 'erro')
            return
        }

        try {
            const response = await fetch('http://127.0.0.1:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                }),
            });
            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('logado', data.usuario.email)
                showAlert(data.mensagem, 'sucesso');

                setTimeout(() => {
                    navigate('/Dashboard');
                }, 2000)
            } else {
                showAlert(data.mensagem, 'erro')
            }
        } catch (error) {
            showAlert('Erro ao conectar com o servidor!', 'erro');
            console.error('Erro:', error)
        }

    }

    /*const userSalvos = JSON.parse(localStorage.getItem('userCadastrados') || "[]");
   
           const userEncontrato = userSalvos.find(user => user.email === email && user.password === String(password));
   
           if (userEncontrato) {
               localStorage.setItem('logado', email)
               showAlert(email + ' Logado com sucesso !', 'sucesso')
   
               setTimeout(() => {
                   window.location.href = '/Dashboard'
               }, 3000)
   
           } else {
               showAlert('Email ou senha incorreto(s) !', 'erro')
   
           }*/

    return (
        <>
            {alertOn && <Alert mensagem={aletMensagem} tipo={alertType} />}
            <div className='container-login'>

                <img className='logo' src={logo} alt="" />

                <h2>Entrar no Sistema</h2>

                <small>Faça login para acessar o sistema de gestão</small>

                <form className='form-login' onSubmit={logar}>
                    <label >Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                    <label >Senha</label>
                    <input type="password" onChange={(e) => setSenha(e.target.value)} />

                    <button>Entrar</button>
                </form>

                <span>Não tem Conta? <Link to="/registro">Criar conta</Link></span>

            </div>
        </>
    )
}

export default Login;