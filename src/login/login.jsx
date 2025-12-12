import logo from '/public/indice.jpg'

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

                <span>Não tem Conta? <a href="/registro">Criar conta</a></span>

            </div>
        </>
    )
}

export default Login;