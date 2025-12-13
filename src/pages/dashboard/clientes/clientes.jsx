import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

import './clientes.css'

const Clientes = () => {


    function editar() {
        alert('editar')
    }


    function excluir() {
        alert('deletar')
    }
    return (
        <>
            <DashboardLayout>
                <header className="header-clientes">

                    <div>
                        <h1>Clientes</h1>
                        <p>Gerencie seus clientes cadastrados</p>

                    </div>


                    <button className="btn-novoCliente">Novo Cliente</button>


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




            </DashboardLayout >


        </>
    )
}

export default Clientes;
