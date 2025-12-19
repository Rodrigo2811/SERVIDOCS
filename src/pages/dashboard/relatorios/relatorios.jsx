import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCurrencyDollar, BsGraphUpArrow, BsFillCalendar2Fill, BsBag } from "react-icons/bs";


import './relatorio.css'

const Relatorios = () => {

    return (
        <>

            <DashboardLayout>



                <header>
                    <h1>Relatórios</h1>
                    <p>Análise de vendas e desempenho</p>
                </header>

                <div className="navCard">


                    <Card
                        title='Receita Total'
                        icon={<BsCurrencyDollar />}
                        qtd={Number(0).toFixed(2)}
                        description={'0 vendas realizadas'}
                    />

                    <Card
                        title='Total de Vendas'
                        icon={<BsBag />}
                        qtd={0}
                        description='Tranzações concluidas'
                    />

                    <Card
                        title='Itens Vendidos'
                        icon={<BsGraphUpArrow />}
                        qtd={0}
                        description='Produtos comercializados'
                    />

                    <Card
                        title='Ticket Médio'
                        icon={<BsFillCalendar2Fill />}
                        qtd={Number(0).toFixed(2)}
                        description='Valor médio por venda'
                    />
                </div>

                <div className="container">
                    <div className="container-hisotricoVendas">
                        <h3>Histórico de Vendas</h3>
                        <p>Lista completa de todas as vendas realizadas</p>
                    </div>
                    <div className="container-formaDePagamento">
                        <h3>Formas de Pagamento</h3>
                        <p>Distribuição dos métodos de pagamento</p>

                        <ul>
                            <li>Dinheiro <span>0</span></li>
                            <li>Crédito <span>0</span></li>
                            <li>Débito <span>0</span></li>
                            <li>Pix <span>0</span></li>
                        </ul>
                    </div>
                </div>
            </DashboardLayout>

        </>
    )
}

export default Relatorios;