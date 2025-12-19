import { Link } from 'react-router-dom';

import logo from '/src/images/indice.jpg';

import './registro.css';


const Registrar = () => {
    return (
        <>
            <div className='container-registro'>
                <img className='logo' src={logo} alt="" />

                <h2>Criar Conta</h2>

                <small  >Preencha os dados para criar sua conta</small>

                <form className='form-registro'>
                    <label htmlFor="">Nome Completo</label>
                    <input type="text" />
                    <label htmlFor="">Email</label>
                    <input type="email" />
                    <label htmlFor="">Tipo de usuário</label>
                    <select name="" id="">
                        <option value="Operador">Operador</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <label htmlFor="">Senha</label>
                    <input type="password" />
                    <label htmlFor="">Confirme a senha</label>
                    <input type="password" />

                    <button>Registrar</button>
                </form>

                <span>ja tem Conta? <Link to="/">Fazer login</Link></span>

            </div>
        </>
    )
}

export default Registrar;