import { useEffect, useState } from "react";

import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCurrencyDollar, BsGraphUpArrow, BsFillCalendar2Fill, BsBag } from "react-icons/bs";

import { FormData } from '../../../components/util/util.js'


import './relatorio.css'


const Relatorios = () => {
    const [vendas, setVendas] = useState([])
    const [receitaTotal, setReceitaTotal] = useState(0)
    const [itensVendidos, setItensVendidos] = useState(0)
    const [totaisPorMetodo, setTotaisPorMetodo] = useState({})

    useEffect(() => {
        const buscarVendas = async () => {
            try {

                const response = await fetch('http://127.0.0.1:3003/vendas')
                const data = await response.json()
                if (response.ok) {
                    setVendas(data)
                    const totalCalculado = data.reduce((acc, vendas) => acc + Number(vendas.total || 0), 0)
                    const totalItensVendidos = data.reduce((acc, item) => acc + (item.quantidade || 0), 0)

                    setReceitaTotal(totalCalculado)
                    setItensVendidos(totalItensVendidos)

                    const totaisPorMetodoCalculado = data.reduce((acc, venda) => {
                        const metodo = venda.formaPagamento || 'Desconhecido'
                        acc[metodo] = (acc[metodo] || 0) + Number(venda.total || 0)
                        return acc
                    }, {})


                    setTotaisPorMetodo(totaisPorMetodoCalculado)
                } else {
                    setVendas([])
                }
            } catch (error) {
                console.error(error)
            }
        }
        buscarVendas()

    }, [vendas])

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
                        description={`${vendas.length} vendas realizadas`}
                    />

                    <Card
                        title='Total de Vendas'
                        icon={<BsBag />}
                        qtd={vendas.length}
                        description='Tranzações concluidas'
                    />

                    <Card
                        title='Itens Vendidos'
                        icon={<BsGraphUpArrow />}
                        qtd={itensVendidos}
                        description='Produtos comercializados'
                    />

                    <Card
                        title='Ticket Médio'
                        icon={<BsFillCalendar2Fill />}
                        qtd={"R$" + Number(vendas.length > 0 ? (receitaTotal / vendas.length).toFixed(2) : "0.00")}
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
                                            <td>{FormData(v.data)}</td>
                                            <td>{"R$ " + v.total}</td>
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
                            {Object.entries(totaisPorMetodo).map(([nome, valor]) => (
                                <li key={nome}>{nome} <span>R$ {valor.toFixed(2)}</span></li>
                            ))}
                        </ul>
                    </div>
                </div>
            </DashboardLayout>
        </>
    )
}

export default Relatorios;