import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"

import Card from "../../../components/card/card";


import { BsPerson, BsFillShieldLockFill } from 'react-icons/bs'

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

                <div className="navCard-user">

                    <Card
                        title='Total de Usuários'
                        icon={<BsPerson />}
                        qtd={0}
                        description='Usuários cadastrados'
                    />

                    <Card

                        title='Administradores'
                        icon={<BsFillShieldLockFill />}
                        qtd={1}
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
                                <th>Tipo</th>
                                <th>Cadastro</th>
                            </tr>

                        </thead>

                        <tbody>
                            <tr>
                                <td>Rodrigo</td>
                                <td>teste@teste.com</td>
                                <td>Administrador</td>
                                <td>11/12/2025</td>
                            </tr>
                        </tbody>
                    </table>

                </div>


            </DashboardLayout>

        </>

    )
}
export default Usuarios