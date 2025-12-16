import { useState } from "react";
import Card from "../../components/card/card";
import DashboardLayout from "../../components/dashboardLayout/dashboardLayout";
import { BsPerson, BsBoxSeam, BsCart3, BsCurrencyDollar } from "react-icons/bs";

import './dashboard.css'


const LOCAL_STORAGE_PRODUTOS = 'produtosEstoque';
const LOCAL_STORAGE_CLIENTES = 'clientesCadastrados'

const Dashboard = () => {


    const [produtos] = useState(() => {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_PRODUTOS);

        return storedProducts ? JSON.parse(storedProducts) : [];
    });
    const [clientes] = useState(() => {
        const storedClientes = localStorage.getItem(LOCAL_STORAGE_CLIENTES)
        return storedClientes ? JSON.parse(storedClientes) : []
    })


    const totalClientes = clientes.length
    const totalProdutos = produtos.length;

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
                        qtd={0}
                        description='Vendas realizadas  '
                    />

                    <Card

                        title='Receita Total'
                        icon={<BsCurrencyDollar />}
                        qtd={Number(0).toFixed(2)}
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
                        <li><span>Relatórios:</span> Acompanhe o desempenho do seu negócio</li>
                    </ul>

                </div>

            </DashboardLayout>
        </>
    )
}

export default Dashboard;