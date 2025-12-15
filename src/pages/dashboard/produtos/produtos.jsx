import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import './produtos.css'
import { useState } from "react";

const Produtos = () => {

    const [modalOpen, setModalOpen] = useState(false)


    function handleAddProdutoServico() {
        setModalOpen(true)
    }
    function CloseModal() {
        setModalOpen(false)
    }

    function cadastrarProduto(e) {
        e.preventDefaul();

        alert('produto cadastrado')
        setModalOpen(false)
    }


    return (

        <>
            <DashboardLayout>

                <header className="header-produtos">
                    <div>
                        <h1>Produtos</h1>
                        <p>Gerencie seu estoque e preços</p>

                    </div>

                    <button className="btn-novoProduto" onClick={handleAddProdutoServico}><BsPlus className="inconBTN" />Novo Produto/Serviço</button>

                </header>

                <div className="navCard-user">

                    <Card
                        title={'Total de Produtos'}
                        qtd={1}
                    />
                    <Card
                        title={'Estoque Total'}
                        qtd={50}
                    />
                    <Card
                        title={'Valor em Estoque'}
                        qtd={'R$' + Number(0).toFixed(2)}
                    />
                </div>


                <div className="container-usuarios" >
                    <h3>Lista de usuarios</h3>
                    <p>Total de 0 usuarios cadastrados</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Categoria</th>
                                <th>Preço</th>
                                <th>Estoque</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>
                            <tr>
                                <td>papel</td>
                                <td>produto</td>
                                <td>2.50</td>
                                <td>50</td>
                                <td>Disponivel</td>
                                <td><button className="btn-acao" ><BsFillPencilFill /></button> <button className="btn-acao" onClick={cadastrarProduto}><BsFillTrashFill /></button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                {modalOpen && (

                    <div className="modal-addProdutos" >
                        <header>
                            <h3>Novo Produto</h3>
                            <p>Preencha os dados para cadastrar um novo produto</p>
                        </header>
                        <form >

                            <label >Novo Produto</label><br />
                            <input type="text" placeholder="Novo Produto" />
                            <label >Categoria</label>
                            <input type="text" placeholder="Categoria" />
                            <label >Preço</label><br /><br />
                            <input type="Preço" placeholder="Preço" />
                            <label >Quantidade em estoque</label><br />
                            <input type="Number" placeholder="Quantedade em estoque" />
                            <label >Descrição</label><br />
                            <input type="text" placeholder="Descrição" />

                            <footer><button className="btn-cancelar" onClick={CloseModal}>Cancelar</button> <button className="btn-cadastrar">Cadastrar</button></footer>
                        </form>
                    </div>
                )}
            </DashboardLayout>

        </>
    )
}

export default Produtos;