import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '/src/images/indice.jpg';

import { dataRegistro } from '../components/util/util';

import './registro.css';


const LOCAL_STORAGE_KEY = 'userCadastrados'

const Registrar = () => {

    const [users, setUsers] = useState(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
        return storedUser ? JSON.parse(storedUser) : []
    })

    const [usuario, setUsuario] = useState({
        data: dataRegistro(),
        id: null,
        nome_completo: '',
        email: '',
        tipo_usuario: '',
        password: '',
        conf_senha: ''
    })


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users))
    }, [users])

    function handleChange(e) {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario, [name]: value
        }))
    }

    function addUser() {
        setUsuario({
            data: dataRegistro(),
            id: null,
            nome_completo: '',
            email: '',
            tipo_usuario: '',
            password: '',
            conf_senha: ''

        })
    }

    function salvarUser(e) {
        e.preventDefault();

        if (!usuario.nome_completo || !usuario.email || !usuario.tipo_usuario || !usuario.password || !usuario.conf_senha) {
            alert('Por favor, preencha tos os campos obriga')
            return;
        }

        if (usuario.password !== usuario.conf_senha) {
            alert('Campo confirme senha diferente de senha')
            return;
        }

        const novoUsuario = { ...usuario, id: Date.now() };

        setUsers(prevUsers => [...prevUsers, novoUsuario])

        addUser()
    }
    return (
        <>
            <div className='container-registro'>
                <img className='logo' src={logo} alt="" />

                <h2>Criar Conta</h2>

                <small  >Preencha os dados para criar sua conta</small>

                <form className='form-registro' onSubmit={salvarUser}>
                    <label htmlFor="nome_completo">Nome Completo</label>
                    <input type="text" id='nome_completo' name="nome_completo" value={usuario.nome_completo} onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name="email" value={usuario.email} onChange={handleChange} />
                    <label htmlFor="tipo_usuario">Tipo de usuário</label>
                    <select name="tipo_usuario" id='tipo_usuario' value={usuario.tipo_usuario} onChange={handleChange}>
                        <option value="">Selecione um tipo</option>
                        <option value="Operador">Operador</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' name='password' value={usuario.password} onChange={handleChange} />
                    <label htmlFor="conf_senha">Confirme a senha</label>
                    <input type="password" id='conf_senha' name='conf_senha' value={usuario.conf_senha} onChange={handleChange} />

                    <button type='submit'>Registrar</button>
                </form>

                <span>ja tem Conta? <Link to="/">Fazer login</Link></span>

            </div>
        </>
    )
}

export default Registrar;