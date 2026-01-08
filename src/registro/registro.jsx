import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '/src/images/indice.jpg';
import Alert from '../components/alert/alert';


import './registro.css';


const LOCAL_STORAGE_KEY = 'userCadastrados'

const Registrar = () => {

    const [alertOn, setAlertOn] = useState(false)
    const [aletMensagem, setAlertMensagem] = useState('')
    const [alertType, setAlertType] = useState('')
    /*const [users, setUsers] = useState()  /* => {
         const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
         return storedUser ? JSON.parse(storedUser) : []
     })*/


    function showAlert(mensagem, tipo) {
        setAlertMensagem(mensagem)
        setAlertType(tipo)

        setAlertOn(true)

        setTimeout(() => {
            setAlertOn(false)
        }, 4000);

    }
    const [usuario, setUsuario] = useState({
        id: Date.now,
        data: new Date().toLocaleString(),
        username: '',
        email: '',
        tipo_usuario: '',
        senha: '',
        conf_senha: ''
    })


    /* useEffect(() => {
         localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users))
     }, [users])*/

    function handleChange(e) {
        const { name, value } = e.target;
        setUsuario(prevUsuario => ({
            ...prevUsuario, [name]: value
        }))
    }

    function addUser() {
        setUsuario({
            id: Date.now,
            data: new Date().toLocaleString(),
            username: '',
            email: '',
            tipo_usuario: '',
            senha: '',
            conf_senha: ''

        })
    }

    async function salvarUser(e) {
        e.preventDefault();

        if (!usuario.username || !usuario.email || !usuario.tipo_usuario || !usuario.senha || !usuario.conf_senha) {
            showAlert('Por favor, preencha todos os campos obrigatorios!', 'erro')
            setAlertOn(true)

            return;
        }

        if (usuario.senha !== usuario.conf_senha) {
            showAlert('Campo confirme senha diferente de senha.', 'erro')
            setAlertOn(true)
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:3003/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: usuario.username,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario,
                    senha: usuario.senha
                })
            })
            const dados = await response.json()

            if (response.ok) {
                showAlert('Registrado com sucesso', 'sucesso')
                addUser()
            } else {
                showAlert(dados.mensagem || 'Erro ao registrar', 'erro')
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            showAlert('Erro de conexão com o servidor.', 'erro');
        }
    }
    return (
        <>

            {alertOn && <Alert mensagem={aletMensagem} tipo={alertType} />}
            <div className='container-registro'>
                <img className='logo' src={logo} alt="" />

                <h2>Criar Conta</h2>

                <small  >Preencha os dados para criar sua conta</small>

                <form className='form-registro' onSubmit={salvarUser}>
                    <label htmlFor="nome_completo">Nome Completo</label>
                    <input type="text" id='nome_completo' name="username" value={usuario.username} onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' name="email" value={usuario.email} onChange={handleChange} />
                    <label htmlFor="tipo_usuario">Tipo de usuário</label>
                    <select name="tipo_usuario" id='tipo_usuario' value={usuario.tipo_usuario} onChange={handleChange}>
                        <option value="">Selecione um tipo</option>
                        <option value="Operador">Operador</option>
                        <option value="Administrador">Administrador</option>
                    </select>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id='password' name='senha' value={usuario.senha} onChange={handleChange} />
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