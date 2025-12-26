import { useState } from "react";

import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCurrencyDollar, BsGraphUpArrow, BsFillCalendar2Fill, BsBag } from "react-icons/bs";


import './relatorio.css'


const LOCAL_STORAGE_VENDAS = 'tbVendas';

const Relatorios = () => {


    const [vendas] = useState(() => {
        const storedVendas = localStorage.getItem(LOCAL_STORAGE_VENDAS);
        return storedVendas ? JSON.parse(storedVendas) : []
    })

    const totaisPorMetodo = vendas.reduce((acc, venda) => {
        const metodo = venda.formaPagamento;
        const valor = Number(venda.total || 0);

        if (!acc[metodo]) {
            acc[metodo] = 0
        }
        acc[metodo] += valor;
        return acc;
    }, {})


    const totalVendas = vendas.length
    const receitaTotal = vendas.reduce((acc, venda) => acc + Number(venda.total || 0), 0)

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
                        qtd={"R$" + receitaTotal.toFixed(2)}
                        description={'0 vendas realizadas'}
                    />

                    <Card
                        title='Total de Vendas'
                        icon={<BsBag />}
                        qtd={totalVendas}
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
                        qtd={"R$" + (receitaTotal / totalVendas).toFixed(2)}
                        description='Valor médio por venda'
                    />
                </div>

                <div className="container">
                    <div className="container-hisotricoVendas">
                        <h3>Histórico de Vendas</h3>
                        <p>Lista das 5 ultimas vendas realizadas</p>

                        {vendas.length <= 0 ? (
                            <h4>Sem vendas realizadas</h4>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome/Razão Social</th>
                                        <th>Data</th>
                                        <th>Valor</th>

                                    </tr>

                                </thead>

                                <tbody>
                                    {vendas.map((v, index) => (
                                        <tr key={index}>
                                            <td>{v.cliente}</td>
                                            <td>{v.data}</td>
                                            <td>{"R$ " + v.total.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}


                    </div>
                    <div className="container-formaDePagamento">
                        <h3>Formas de Pagamento</h3>
                        <p>Distribuição dos métodos de pagamento</p>

                        <ul>
                            <li>Dinheiro <span>R$ {(totaisPorMetodo['Dinheiro'] || 0).toFixed(2)}</span></li>
                            <li>Crédito <span>R$ {(totaisPorMetodo['Crédito'] || 0).toFixed(2)}</span></li>
                            <li>Débito <span>R$ {(totaisPorMetodo['Débito'] || 0).toFixed(2)}</span></li>
                            <li>Pix <span>R$ {(totaisPorMetodo['Pix'] || 0).toFixed(2)}</span></li>
                        </ul>
                    </div>
                </div>
            </DashboardLayout>

        </>
    )
}

export default Relatorios;