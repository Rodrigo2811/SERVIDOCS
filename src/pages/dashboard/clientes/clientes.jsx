import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import './clientes.css'

const Clientes = () => {
    return (
        <>
            <DashboardLayout>
                <header>

                    <div>
                        <h1>Clientes</h1>
                        <p>Gerencie seus clientes cadastrados</p>

                    </div>


                    <button className="btn-novoCliente">Novo Cliente</button>


                </header>

                <div className="container-clientes">
                    <h3>Lista de Clientes</h3>
                    <p>Total de 0 clientes cadastrados</p>
                    <input type="text" />

                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Email</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>Rodrigo</td>
                                    <td>111.000.000-01</td>
                                    <td>teste@teste.com</td>
                                    <td>71 3356-1875</td>
                                    <td><button>Editar</button> <button>Excluir</button></td>
                                </tr>
                            </tbody>
                        </thead>
                    </table>

                </div>




            </DashboardLayout >


        </>
    )
}

export default Clientes;
