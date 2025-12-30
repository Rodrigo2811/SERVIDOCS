import { useState } from 'react';
import { Link } from 'react-router-dom';

import Alert from '../components/alert/alert.jsx';
import logo from '/src/images/indice.jpg';


import './login.css'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    function logar(e) {
        e.preventDefault();

        setAlertOn(false)

        if (email === "" && password === "") {
            showAlert('Preencha os campos usuario e senha !', 'erro')
            return
        }
        const userSalvos = JSON.parse(localStorage.getItem('userCadastrados') || "[]");

        const userEncontrato = userSalvos.find(user => user.email === email && user.password === String(password));

        if (userEncontrato) {
            localStorage.setItem('logado', email)
            showAlert(email + ' Logado com sucesso !', 'sucesso')

            setTimeout(() => {
                window.location.href = '/Dashboard'
            }, 3000)

        } else {
            showAlert('Email ou senha incorreto(s) !', 'erro')

        }
    }



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
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />

                    <button>Entrar</button>
                </form>

                <span>Não tem Conta? <Link to="/registro">Criar conta</Link></span>

            </div>
        </>
    )
}

export default Login;