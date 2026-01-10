import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import DashboardLayout from "../../components/dashboardLayout/dashboardLayout";
import { BsPerson, BsBoxSeam, BsCart3, BsCurrencyDollar, BsCalculatorFill } from "react-icons/bs";

import { buscarClientes, buscarDespesas, buscarProdutos } from "../../components/util/api";

import './dashboard.css'


const LOCAL_STORAGE_VENDAS = 'tbVendas'

const Dashboard = () => {


    const [totalClientes, setTotalClientes] = useState(0);
    const [totalProdutos, setTotalProdutos] = useState(0);
    const [totalDespesas, setTotalDespesas] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const [clientes, produtos, despesas] = await Promise.all([
                buscarClientes(),
                buscarProdutos(),
                buscarDespesas()
            ])
            setTotalClientes(clientes.length)
            setTotalProdutos(produtos.length)
            setTotalDespesas(despesas.length)
        }
        fetchData()
    }, [])





    const [vendas] = useState(() => {
        const storedVendas = localStorage.getItem(LOCAL_STORAGE_VENDAS);
        return storedVendas ? JSON.parse(storedVendas) : []
    })




    const totalVendas = vendas.length
    const receitaTotal = vendas.reduce((acc, venda) => acc + Number(venda.total || 0), 0)


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