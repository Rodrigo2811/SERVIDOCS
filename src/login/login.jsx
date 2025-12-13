import { Link } from 'react-router-dom';
import logo from '/public/indice.jpg';

import './login.css'


const Login = () => {
    return (
        <>
            <div className='container-login'>
                <img className='logo' src={logo} alt="" />

                <h2>Entrar no Sistema</h2>

                <small>Faça login para acessar o sistema de gestão</small>

                <form className='form-login'>
                    <label htmlFor="">Email</label>
                    <input type="email" />
                    <label htmlFor="">Senha</label>
                    <input type="password" />

                    <button>Entrar</button>
                </form>

                <span>Não tem Conta? <Link to="/registro">Criar conta</Link></span>

            </div>
        </>
    )
}

export default Login;