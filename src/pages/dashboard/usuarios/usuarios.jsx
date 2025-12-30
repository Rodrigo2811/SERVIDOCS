import { useState } from "react";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"

import Card from "../../../components/card/card";


import { BsPerson, BsFillShieldLockFill } from 'react-icons/bs'



import './usuarios.css'

const LOCAL_STORAGE_KEY = 'userCadastrados'

const Usuarios = () => {

    const [user] = useState(() => {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)

        return storedUser ? JSON.parse(storedUser) : []
    })

    const listaAdm = user.filter(ad => ad.tipo_usuario === "Administrador")


    let totalAdm = listaAdm.length
    let totalUsuarios = user.length



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
                        qtd={totalUsuarios}
                        description='Usuários cadastrados'
                    />

                    <Card

                        title='Administradores'
                        icon={<BsFillShieldLockFill />}
                        qtd={totalAdm}
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
                            {user.map(u => (
                                <tr key={u.id}>
                                    <td>{u.nome_completo}</td>
                                    <td>{u.email}</td>
                                    <td>{u.tipo_usuario}</td>
                                    <td>{u.data}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>


            </DashboardLayout>

        </>

    )
}
export default Usuarios