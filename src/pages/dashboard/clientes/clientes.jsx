import { useState } from "react";

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import './clientes.css'


const Clientes = () => {

    const [clientes, setCLientes] = useState([])

    const [modalOpen, setModalClose] = useState(false);
    const [cliente, setCliente] = useState({
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
            nome: '',
            cpf: '',
            email: '',
            telefone: '',
            endereco: ''
        })
        setModalClose(true)
    }

    function salvarCliente(e) {
        e.preventDefault()
        setCLientes(prevClientes => [...prevClientes, cliente])

        console.log('CLiente salvo:', cliente)

        addCliente()

        console.log(clientes)
    }

    function editar() {
        alert('editar')
    }


    function excluir() {
        alert('deletar')
    }


    function closeModal() {
        setModalClose(false)
    }


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
                    <p>Total de 0 clientes cadastrados</p>
                    <input type="text" placeholder="Pesquisar Cliente" />

                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>
                            <tr>
                                <td>Rodrigo</td>
                                <td>111.000.000-01</td>
                                <td>teste@teste.com</td>
                                <td>71 3356-1875</td>
                                <td><button className="btn-acao" onClick={editar}><BsFillPencilFill /></button> <button className="btn-acao" onClick={excluir}><BsFillTrashFill /></button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>


                {modalOpen && (
                    <div className="modal-addCliente" >
                        <header>
                            <h3>Novo Cliente</h3>
                            <p>Preencha os dados para cadastrar um novo cliente</p>
                        </header>
                        <form onSubmit={salvarCliente}>

                            <label >Novo Completo</label><br />
                            <input type="text" name="nome" placeholder="Novo Completo" value={cliente.nome} onChange={handleChange} />
                            <label >CPF</label>
                            <input type="text" name="cpf" placeholder="CPF" onChange={handleChange} value={cliente.cpf} />
                            <label >Telefone</label><br /><br />
                            <input type="Preço" name="telefone" placeholder="Telefone" onChange={handleChange} value={cliente.telefone} />
                            <label >Email</label><br />
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={cliente.email} />
                            <label >Endereço</label><br />
                            <input type="text" name="endereco" placeholder="Endereço" onChange={handleChange} value={cliente.endereco} />

                            <footer><button className="btn-cancelar" onClick={closeModal}>Cancelar</button> <button className="btn-cadastrar" type="submit">Cadastrar</button></footer>
                        </form>
                    </div>
                )}

            </DashboardLayout >


        </>
    )
}

export default Clientes;
