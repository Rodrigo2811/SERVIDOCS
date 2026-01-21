import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import DashboardLayout from "../../components/dashboardLayout/dashboardLayout";
import { BsPerson, BsBoxSeam, BsCart3, BsCurrencyDollar, BsCalculatorFill } from "react-icons/bs";

import { buscarClientes, buscarDespesas, buscarProdutos, buscarVendas } from "../../components/util/api";

import './dashboard.css'


const Dashboard = () => {

    const [totalClientes, setTotalClientes] = useState(0);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);
    const [totalVendas, setTotalVendas] = useState(0)
    const [receitaTotal, setReceitaTotal] = useState(0)

    useEffect(() => {
        const fetchData = async () => {

            try {
                const [clientes, produtos, despesas, vendas] = await Promise.all([
                    buscarClientes(),
                    buscarProdutos(),
                    buscarDespesas(),
                    buscarVendas()
                ])
                setTotalClientes(clientes.length)
                setTotalProdutos(produtos.length)
                setTotalDespesas(despesas.length)
                setTotalVendas(vendas.length)
                const totalCalculado = vendas.reduce((acc, vendas) => acc + Number(vendas.total || 0), 0)
                setReceitaTotal(totalCalculado)
            } catch (error) {
                console.error(error)

            }
        }
        fetchData()
    }, [])


    return (
        <>
            <DashboardLayout>

                <header>
                    <h1>Dashboard</h1>
                    <p>Visão geral do sistema</p>


                </header>

                <div className="navCard">
                    <Card

                        title='Total de Clientes'
                        icon={<BsPerson />}
                        qtd={totalClientes}
                        description='Clientes cadastrados'
                    />

                    <Card

                        title='Total de Produtos'
                        icon={<BsBoxSeam />}
                        qtd={totalProdutos}
                        description='Produtos cadastrados'
                    />

                    <Card

                        title='Total de Vendas'
                        icon={<BsCart3 />}
                        qtd={totalVendas}
                        description='Vendas realizadas  '
                    />
                    <Card

                        title='Total de Despesas'
                        icon={<BsCalculatorFill />}
                        qtd={totalDespesas}
                        description='Despesas'
                    />
                    <Card

                        title='Receita Total'
                        icon={<BsCurrencyDollar />}
                        qtd={"R$" + receitaTotal.toFixed(2)}
                        description='Valor total em vendas'
                    />

                </div>


                <div className="container-rodape">
                    <h3>Bem vindo a SERVIDOCS</h3>
                    <p>Sistema de Gestão para Documentos e Serviços </p>
                    <p>Utilize o menu lateral para navegar entre as funcionalidades do sistema:</p>

                    <ul>
                        <li><span>Clientes:</span> Cadastre e gerencie seus clientes</li>
                        <li><span>Produtos:</span> Controle seu estoque e preços</li>
                        <li><span>Frente de Caixa:</span> Realize vendas de forma rápida e eficiente</li>
                        <li><span>Despesas:</span> Cadastre e gerencie suas despesas</li>
                        <li><span>Relatórios:</span> Acompanhe o desempenho do seu negócio</li>
                    </ul>

                </div>

            </DashboardLayout>
        </>
    )
}

export default Dashboard;