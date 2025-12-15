import { Link } from 'react-router-dom'

import logo from '/src/images/indice.jpg'


import { BsPerson, BsBoxSeam, BsPeople, BsCart3, BsBarChart, BsGrid1X2, BsArrowBarRight } from "react-icons/bs";
import './dashboardLayout.css'

const DashboardLayout = ({ children }) => {

    function logout() {
        const deslogar = confirm('Deseja realmente sair do sistema?');

        if (!deslogar) {
            return false
        }

        window.location.href = '/'
    }

    return (

        <>
            <section className="container-sidebar">
                <img src={logo} alt="" />
                <nav className='sidebar'>
                    <ul>
                        <li ><Link to={'/Dashboard'}><BsGrid1X2 className='icon' />Dashboard</Link></li>
                        <li><Link to={'/Clientes'}><BsPeople className='icon' />Clientes </Link></li>
                        <li><Link to={'/Produtos'}><BsBoxSeam className='icon' /> Produtos</Link></li>
                        <li><Link to={'/Caixa'}><BsCart3 className='icon' /> Frente de Caixa</Link></li>
                        <li><Link to={'/Relatorios'}><BsBarChart className='icon' />Relatórios</Link></li>
                        <li><Link to={'/Usuarios'}><BsPerson className='icon' /> Usuários</Link></li>
                    </ul>

                </nav>

                <div>
                    <span></span>
                    <span></span>
                </div>
                <button className='btn-sair' onClick={logout}><BsArrowBarRight />Sair</button>
            </section >
            <div className='main'>
                {children}
            </div>
        </>
    )
}

export default DashboardLayout;