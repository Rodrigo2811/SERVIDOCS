import { useState } from 'react';

import { Link } from 'react-router-dom';
import logo from '/src/images/indice.jpg';

import './login.css'


const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    function logar(e) {
        e.preventDefault();

        if (email === "" && password === "") {
            alert('Preencha os campos')
            return
        }
        const userSalvos = JSON.parse(localStorage.getItem('userCadastrados') || "[]");

        const userEncontrato = userSalvos.find(user => user.email === email && user.password === String(password));

        if (userEncontrato) {
            localStorage.setItem('logado', email)
            alert(email + ' Logado com sucesso!')
            window.location.href = '/Dashboard'
        } else {
            alert('Email ou senha incorretos')
        }
    }



    return (
        <>
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