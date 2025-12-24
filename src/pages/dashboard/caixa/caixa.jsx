import { useState } from "react";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCCircle, BsCurrencyDollar, BsXCircle } from 'react-icons/bs'

import './caixa.css'


const LOCAL_STORAGE_ESTOQUE = 'produtosEstoque';
const LOCAL_STORAGE_CLIENTE = 'clientesCadastrados'

const Caixa = () => {
    const [cliente] = useState(() => {
        const storedClientes = localStorage.getItem(LOCAL_STORAGE_CLIENTE);
        return storedClientes ? JSON.parse(storedClientes) : []
    })
    const [desconto, setDesconto] = useState(0)
    const [carrinho, setCarrinho] = useState([])
    const [searchTem, setSearchTerm] = useState('')
    const [foundProducts, setFoudProducts] = useState([])

    function handleSearch(e) {
        const term = e.target.value;
        setSearchTerm(term)

        if (term.trim() === '') {
            setFoudProducts([])
            return;
        }

        try {
            const productJson = localStorage.getItem(LOCAL_STORAGE_ESTOQUE);
            const allProducts = productJson ? JSON.parse(productJson) : []

            const filtered = allProducts.filter(product =>
                product.nome.toLowerCase().includes(term.toLowerCase()) ||
                String(product.id).includes(term)
            )
            setFoudProducts(filtered)
        } catch (error) {
            console.error('Erro ao buscar ou analisar produtos:', error);
            setFoudProducts([])
        }
    }

    const addCarrinho = (produto) => {
        setCarrinho((itensAtuais) => {
            const itemExistente = itensAtuais.find(item => item.id === produto.id)

            if (itemExistente) {
                return itemExistente.map(item =>
                    item.id === produto.id
                        ? { ...item, quatidade: item.quatidade + 1 }
                        : item
                );
            }
            return [...itensAtuais, { ...produto, quantidade: 1 }];
        })
        setSearchTerm('');
        setFoudProducts([])
    }


    function finalizarVenda(e) {
        e.preventDefault()

        alert('Venda Finalizada')
    }


    const subTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    return (
        <DashboardLayout>

            <header>
                <h1>Frente de Caixa</h1>
                <p>Sistema de vendas PDV</p>

            </header>


            <div className="container-vendas">
                <div className="container-listaProdutos">
                    <h3>Adicionar Produtos</h3>
                    <p>Busque e adicione produtos à venda</p>
                    <input type="text" value={searchTem} onChange={handleSearch} className="inputPesquisaProduto" placeholder="Buscar Produto..." />

                    {foundProducts.length > 0 && (
                        <div className="results-dropdown">
                            {foundProducts.map(product => (
                                <div key={product.id} className="result-item" onClick={() => addCarrinho(product)} styele={{ cursor: 'pointer' }}>
                                    <span>{product.nome}</span>
                                    <span className="product-price">{parseFloat(product.preco).toFixed(2)}</span>
                                    <BsCCircle />
                                </div>
                            ))}

                        </div>
                    )}
                </div>

                <div className="container-carrinho">
                    <h3>Resumo da Venda</h3>

                    <div className="lsita-itens-carrinho">
                        {carrinho.map((item) => (
                            <div key={item.id} className="item-carrinho">
                                <span>{item.nome} (x{item.quantidade})</span>
                                <span>{"R$ " + (item.preco * item.quantidade).toFixed(2)}</span>

                            </div>
                        ))}
                    </div>

                    <label >Selecione um Cliente(Opcional)</label>
                    <select>
                        <option value="Selecione um cliente">Selecione um Cliente</option>
                        {
                            cliente.map((element, index) => {
                                return <option key={index} value={element.nome}>{element.nome}</option>
                            })
                        }
                    </select>

                    <label>Forma de Pagamento</label>
                    <select name="forma_pagamento" id="forma_pagamento" >
                        <option value=""></option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Débito">Débito</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Pix">Pix</option>
                    </select>

                    <label >Desconto(R$)</label>
                    <input type="number" className="inpDesconto" placeholder="0,00" onChange={(e) => setDesconto(e.target.value)} />
                    <hr />
                    <span className="subtotal">Subtotal <span>{subTotal.toFixed(2)}</span></span>
                    <span className="total">Total: <span className="rsTOtal">R$ {(subTotal - desconto).toFixed(2)} </span></span>

                    <div className="footer-carrinho">

                        <button className="btn-cancelarCarrinho" onClick={''}><BsXCircle />Cancelar Venda</button>
                        <button className="btn-finalizarVenda" onClick={finalizarVenda}><BsCurrencyDollar />Finalizar Venda</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Caixa;