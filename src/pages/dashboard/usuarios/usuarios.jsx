import { useEffect, useState } from "react";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"

import Card from "../../../components/card/card";


import { BsPerson, BsFillShieldLockFill } from 'react-icons/bs'



import './usuarios.css'


const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])


    useEffect(() => {
        const buscarUsuarios = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3003/usuarios')
                const data = await response.json()
                setUsuarios(data)

            } catch (error) {
                setUsuarios([])
                console.error(error)
            }
        }
        buscarUsuarios()
    }, [])

    const listaAdmFilter = usuarios.filter(ad => ad.tipo_usuario?.toString().trim().toLowerCase() === "administrador")

    let totalAdm = listaAdmFilter.length
    let totalUsuarios = usuarios.length

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
                    <p>Total de {totalUsuarios} usuarios cadastrados</p>
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
                            {usuarios.map(u => (
                                <tr key={u.id}>
                                    <td>{u.username}</td>
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