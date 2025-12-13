import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"

import Card from "../../../components/card/card";


import './usuarios.css'

const Usuarios = () => {
    return (
        <>

            <DashboardLayout>

                <header>
                    <div>
                        <h2>Usuarios</h2>

                        <p>Gerenciar usuários do sistema</p>
                    </div>

                </header>

                <div className="navCard">

                    <Card
                        title='Total de Usuários'
                        icon={''}
                        qtd={0}
                        description='Usuários cadastrados'
                    />

                    <Card

                        title='Administradores'
                        icon={''}
                        qtd={0}
                        description='Com permissões administrativas'
                    />
                </div>


                <div className="container-usuarios">
                    <h3>Lista de usuarios</h3>
                    <p>Total de 0 usuarios cadastrados</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Cadastro</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>Rodrigo</td>
                                    <td>teste@teste.com</td>
                                    <td>71 3356-1875</td>

                                </tr>
                            </tbody>
                        </thead>
                    </table>

                </div>


            </DashboardLayout>

        </>

    )
}
export default Usuarios