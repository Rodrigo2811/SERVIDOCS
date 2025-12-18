import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"

import { BsPlus } from 'react-icons/bs'

import './despesas.css'

const Despesas = () => {
    return (
        <>
            <DashboardLayout>
                <header className="header-despesas">

                    <div>
                        <h1>Despesas</h1>
                        <p>Gerencie suas despesas cadastrados</p>

                    </div>

                    <button className="btn-novoCliente" onClick={''}><BsPlus className="iconBTN" />Nova Despesa</button>

                </header>

                <div className="container-despesas">

                </div>
            </DashboardLayout>

        </>
    )
}

export default Despesas;