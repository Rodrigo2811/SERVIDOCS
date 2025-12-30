import { useState, useEffect } from "react";

import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { formataTel, formataCPF } from "../../../components/util/util";

import './clientes.css'

const LOCAL_STORAGE_KEY = 'clientesCadastrados'

const Clientes = () => {
    const [modalOpen, setModalClose] = useState(false);
    const [clientes, setClientes] = useState(() => {
        const storedClientes = localStorage.getItem(LOCAL_STORAGE_KEY)
        return storedClientes ? JSON.parse(storedClientes) : []
    })

    const [cliente, setCliente] = useState({
        id: null,
        nome: '',
        cpf: '',
        email: '',
        telefone: '',
        endereco: ''
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clientes))
    }, [clientes])


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

    function salvarCliente(e) {
        e.preventDefault();

        if (!cliente.nome || !cliente.cpf || !cliente.email || !cliente.telefone || !cliente.endereco) {
            alert('Por favor, preencha todos os campos obrigatórios')
            return;
        }

        const novoCliente = { ...cliente, id: Date.now() }

        setClientes(prevClientes => [...prevClientes, novoCliente])

        addCliente()
    }

    function editar(id) {
        alert('editar' + id)
    }


    function removerCliente(id) {
        setClientes(prevClientes => prevClientes.filter(c => c.id !== id))
        alert('Cliente removido com sucesso')
    }

    const totalClientes = clientes.length

    return (
        <>
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
