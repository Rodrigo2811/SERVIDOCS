import { useState } from "react";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCCircle, BsCurrencyDollar, BsXCircle } from 'react-icons/bs'

import './caixa.css'


const LOCAL_STORAGE_ESTOQUE = 'produtosEstoque';
const LOCAL_STORAGE_CLIENTE = 'clientesCadastrados'
const LOCAL_STORAGE_VENDAS = 'tbVendas';
const Caixa = () => {

    const [vendas, setVendas] = useState(() => {
        const storedVendas = localStorage.getItem(LOCAL_STORAGE_VENDAS);
        return storedVendas ? JSON.parse(storedVendas) : []
    })
    const [cliente] = useState(() => {
        const storedClientes = localStorage.getItem(LOCAL_STORAGE_CLIENTE);
        return storedClientes ? JSON.parse(storedClientes) : []
    })
    const [clienteSelecionado, SetClienteSelecionado] = useState('')
    const [formaPagamento, setFormaPagamento] = useState('')
    const [desconto, setDesconto] = useState(0)
    const [valorRecebido, setValorRecebido] = useState(0)
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
                return itensAtuais.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
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

        if (carrinho.length === 0) {
            alert('O carrinho está vazio');
            return;
        }

        if (formaPagamento === "") {
            alert('Escolha uma forma de pagamento')
            return
        }

        const novaVenda = {
            id: Date.now,
            data: new Date().toLocaleString(),
            cliente: clienteSelecionado || "Consumidor final",
            itens: carrinho,
            subTotal: subTotal,
            desconto: desconto,
            total: valorTotal,
            formaPagamento: formaPagamento
        }

        const vendasAtualizadas = [...vendas, novaVenda];
        setVendas(vendasAtualizadas)

        localStorage.setItem(LOCAL_STORAGE_VENDAS, JSON.stringify(vendasAtualizadas))

        setCarrinho([])
        setDesconto(0)
        SetClienteSelecionado("")
        setFormaPagamento("")
        setValorRecebido(0)

        alert('Venda Finalizada com sucesso!')
    }

    const cancelarVenda = () => {
        if (window.confirm("Deseja cancelar a venda?")) {
            setCarrinho([])
            setDesconto(0)
            setValorRecebido(0)
        }
    }

    const alteraQuantidade = (id, prod) => {
        setCarrinho((itensAtuais) => {
            return itensAtuais.map(item => {
                if (item.id === id) {
                    const novaQuantidade = item.quantidade + prod;

                    return { ...item, quantidade: novaQuantidade < 1 ? 1 : novaQuantidade }
                }
                return item
            })
        })

    }


    const subTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    const valorTotal = subTotal - desconto
    const troco = (valorRecebido - valorTotal).toFixed(2)

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
                                <span>{item.nome} </span>
                                <span>{"R$ " + (item.preco * item.quantidade).toFixed(2)}</span>
                                <div style={{ display: 'flex', justifyContent: 'space-around', gap: '5px', alignItems: 'center' }}>
                                    <button onClick={() => alteraQuantidade(item.id, 1)} style={{ padding: '5px', width: '35px', backgroundColor: 'green', border: 'none', color: 'white' }}>+</button>
                                    <span>{item.quantidade}</span>
                                    <button onClick={() => alteraQuantidade(item.id, -1)} style={{ padding: '5px', width: '35px', backgroundColor: 'red', border: 'none', color: 'white' }} > -</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <label >Selecione um Cliente(Opcional)</label>
                    <select onChange={(e) => SetClienteSelecionado(e.target.value)}>
                        <option value="Selecione um cliente">Selecione um Cliente</option>
                        {
                            cliente.map((element, index) => {
                                return <option key={index} value={element.nome}>{element.nome}</option>
                            })
                        }
                    </select>

                    <label>Forma de Pagamento</label>
                    <select name="forma_pagamento" id="forma_pagamento" value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} >
                        <option value=""></option>
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Débito">Débito</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Pix">Pix</option>
                    </select>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div>
                            <label >Valor Recebido(R$)</label><br />
                            <input type="number" className="impValorRecebido" placeholder="0,00" onChange={(e) => setValorRecebido(e.target.value).toFixed(2)} />
                        </div>

                        <div>
                            <label >Desconto(R$)</label><br />
                            <input type="number" className="impDesconto" placeholder="0,00" onChange={(e) => setDesconto(e.target.value)} />
                        </div>

                        <div>
                            <label >Troco(R$)</label><br />
                            <input type="number" className="impTroco" placeholder="0,00" value={troco} disabled />
                        </div>


                    </div>
                    <hr />
                    <span className="subtotal">Subtotal <span>{subTotal.toFixed(2)}</span></span>
                    <span className="total">Total: <span className="rsTOtal">R$ {(valorTotal).toFixed(2)} </span></span>

                    <div className="footer-carrinho">

                        <button className="btn-cancelarCarrinho" onClick={cancelarVenda}><BsXCircle />Cancelar Venda</button>
                        <button className="btn-finalizarVenda" onClick={finalizarVenda}><BsCurrencyDollar />Finalizar Venda</button>
                    </div>
                </div>
            </div>
        </DashboardLayout >
    )
}

export default Caixa;