import { Link, useNavigate } from 'react-router-dom'

import logo from '/src/images/indice.jpg'


import { BsPerson, BsBoxSeam, BsPeople, BsCart3, BsBarChart, BsGrid1X2, BsArrowBarRight, BsCalculatorFill } from "react-icons/bs";
import './dashboardLayout.css'

const DashboardLayout = ({ children }) => {

    const navigate = useNavigate()

    function logout() {


        const deslogar = confirm('Deseja realmente sair do sistema?');

        if (!deslogar) {
            return false
        }
        localStorage.removeItem('logado')
        navigate('/')
    }

    return (

        <>
            <section className="container-sidebar">
                <img src={logo} alt="" />
                <nav className='sidebar'>
                    <ul>
                        <li ><Link to={'/Dashboard'}><BsGrid1X2 className='icon' />Dashboard</Link></li>
                        <li><Link to={'/Clientes'}><BsPeople className='icon' />Clientes </Link></li>
                        <li><Link to={'/Produtos'}><BsBoxSeam className='icon' /> Produtos / Serviços</Link></li>
                        <li><Link to={'/Caixa'}><BsCart3 className='icon' /> Frente de Caixa</Link></li>
                        <li><Link to={'/Despesas'}><BsCalculatorFill className='icon' /> Despesas</Link></li>
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