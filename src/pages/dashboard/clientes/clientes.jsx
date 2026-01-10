import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";
import Alert from "../../../components/alert/alert";

import { formataTel, formataCPF } from "../../../components/util/util";

import './clientes.css'


const Clientes = () => {
    const [alertOn, setAlertOn] = useState(false)
    const [alertMensagem, setAlertMensagem] = useState('')
    const [alertType, setAlertType] = useState('')
    const [modalOpen, setModalClose] = useState(false);
    const [clientes, setClientes] = useState([])


    function showAlert(mensagem, tipo) {
        setAlertMensagem(mensagem)
        setAlertType(tipo)
        setAlertOn(true)
        setTimeout(() => {
            setAlertOn(false)
        }, 3000)
    }

    useEffect(() => {
        const buscarCliente = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3003/clientes')
                const data = await response.json()

                if (response.ok) {
                    setClientes(data)
                } else {
                    setClientes([])
                }

            } catch (error) {
                console.error('Erro ao buscar clientes', error);
                showAlert('Erro ao carregar lista de clientes', error)
            }
        }
        buscarCliente()
    }, [])

    const [cliente, setCliente] = useState({
        id: null,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;

        setCliente(prevCliente => ({
            ...prevCliente, [name]: value
        }))
    }


    function addCliente() {
        setCliente({
            id: null,
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            endereco: ''
        })
        setModalClose(true)
    }

    async function salvarCliente(e) {
        e.preventDefault();

        if (!cliente.nome || !cliente.cpf || !cliente.email || !cliente.telefone || !cliente.endereco) {
            showAlert('Por favor, preencha todos os campos obrigatórios', 'erro')
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:3003/cadClientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: cliente.nome,
                    cpf: cliente.cpf,
                    email: cliente.email,
                    telefone: cliente.telefone,
                    endereco: cliente.endereco
                }),
            });

            const data = await response.json();

            if (response.ok) {
                showAlert(data.mensagem, 'sucesso')
                addCliente()

            } else {
                showAlert(data.mensagem, 'erro')
            }
        } catch (error) {
            showAlert('Erro de conexão com o banco', 'erro');
            console.error('Erro:', error)
        }


    }

    function editar(id) {
        showAlert('editar: ' + id)
    }


    async function removerCliente(id) {
        if (!window.confirm('Deseja realmente excluir?')) return

        try {
            const response = await fetch(`http://127.0.0.1:3003/clientes/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setClientes(prev => prev.filter(c => c.id !== id));
                showAlert('Cliente removido com sucesso', 'sucesso')

            }
        } catch (error) {
            showAlert('Erro ao remover do banco de dados', error)
        }
    }

    const totalClientes = clientes.length



    return (
        <>
            {alertOn && <Alert mensagem={alertMensagem} tipo={alertType} />}
            <DashboardLayout>
                <header className="header-clientes">

                    <div>
                        <h1>Clientes</h1>
                        <p>Gerencie seus clientes cadastrados</p>

                    </div>

                    <button className="btn-novoCliente" onClick={addCliente}><BsPlus className="iconBTN" />Novo Cliente</button>

                </header>

                <div className="container-clientes">
                    <h3>Lista de Clientes</h3>
                    <p>Total de {totalClientes} clientes cadastrados</p>
                    <input type="text" placeholder="Pesquisar Cliente" />

                    {clientes.length <= 0 ? (
                        <h4>Sem clientes cadastrados</h4>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome/Razão Social</th>
                                    <th>CPF/CNPJ</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th>Ações</th>
                                </tr>

                            </thead>

                            <tbody>
                                {clientes.map(c => (
                                    <tr key={c.id}>
                                        <td>{c.nome}</td>
                                        <td>{formataCPF(c.cpf)}</td>
                                        <td>{c.email}</td>
                                        <td>{formataTel(c.telefone)}</td>

                                        <td><button className="btn-acao" onClick={() => editar(c.id)}><BsFillPencilFill /></button>
                                            <button className="btn-acao" onClick={() => removerCliente(c.id)}><BsFillTrashFill /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                </div>


                {modalOpen && (
                    <div className="modal-addCliente" >
                        <header>
                            <h3>Novo Cliente</h3>
                            <p>Preencha os dados para cadastrar um novo cliente</p>
                        </header>
                        <form onSubmit={salvarCliente}>

                            <label >Novo / Ração Social</label><br />
                            <input type="text" name="nome" placeholder="Novo Completo" value={cliente.nome} onChange={handleChange} />
                            <label >CPF / CNPJ</label>
                            <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} value={cliente.cpf} />
                            <label >Telefone</label><br /><br />
                            <input type="Preço" name="telefone" placeholder="Telefone" onChange={handleChange} value={cliente.telefone} />
                            <label >Email</label><br />
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={cliente.email} />
                            <label >Endereço</label><br />
                            <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} value={cliente.endereco} />

                            <footer><button className="btn-cancelar" onClick={() => setModalClose()}>Cancelar</button> <button className="btn-cadastrar" type="submit">Cadastrar</button></footer>
                        </form>
                    </div>
                )}

            </DashboardLayout >


        </>
    )
}

export default Clientes;
