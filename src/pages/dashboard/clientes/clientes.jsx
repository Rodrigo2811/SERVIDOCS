import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import './clientes.css'
import { useState } from "react";

const Clientes = () => {

    const [modalOpen, setModalClose] = useState(false)


    function addCliente() {
        setModalClose(true)
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
                        <form >

                            <label >Novo Completo</label><br />
                            <input type="text" placeholder="Novo Completo" />
                            <label >CPF</label>
                            <input type="text" placeholder="CPF" />
                            <label >Telefone</label><br /><br />
                            <input type="Preço" placeholder="Telefone" />
                            <label >Email</label><br />
                            <input type="email" placeholder="Email" />
                            <label >Endereço</label><br />
                            <input type="text" placeholder="Endereço" />

                            <footer><button className="btn-cancelar" onClick={closeModal}>Cancelar</button> <button className="btn-cadastrar">Cadastrar</button></footer>
                        </form>
                    </div>
                )}

            </DashboardLayout >


        </>
    )
}

export default Clientes;
