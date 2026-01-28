import { useEffect, useState, useRef } from "react";

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsCCircle, BsCurrencyDollar, BsXCircle } from 'react-icons/bs'

import { buscarClientes, buscarProdutos } from "../../../components/util/api";

import './caixa.css'
import NotaServico from "../../../components/notaServico/notaServico";


const Caixa = () => {

    const [clientes, setClientes] = useState([])
    const [clienteSelecionado, setClienteSelecionado] = useState('')
    const [formaPagamento, setFormaPagamento] = useState('')
    const [desconto, setDesconto] = useState(0)
    const [valorRecebido, setValorRecebido] = useState(0)
    const [carrinho, setCarrinho] = useState([])
    const [searchTem, setSearchTerm] = useState('')
    const [foundProducts, setFoudProducts] = useState([])

    const [mostrarNota, setMostrarNota] = useState(false)
    const [vendaFinalizada, setVendaFinalizada] = useState(null)

    const imputRef = useRef(null)

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await buscarClientes()

                setClientes(data || [])
            } catch (error) {
                console.error('Erro ao buscar clientes: ', error)
            }

        }
        fetchClientes()
    }, [])

    async function handleSearch(e) {
        const term = e.target.value;
        setSearchTerm(term)

        if (term.trim() === '') {
            setFoudProducts([])
            return;
        }

        try {
            const allProducts = await buscarProdutos()

            const productsArray = typeof allProducts === 'string' ? JSON.parse(allProducts) : allProducts;

            if (Array.isArray(productsArray)) {
                const filtered = productsArray.filter(product =>
                    product.nome_produto.toLowerCase().includes(term.toLowerCase()) || String(product.id).includes(term)
                );
                setFoudProducts(filtered)
            }
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
        imputRef.current.focus()
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

    async function finalizarVenda(e) {
        e.preventDefault()

        if (carrinho.length === 0) {
            alert('O carrinho está vazio');
            return;
        }

        if (formaPagamento === "") {
            alert('Escolha uma forma de pagamento')
            return
        }

        const subTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
        const valorTotal = subTotal - desconto
        const trocoCalculado = (valorRecebido - valorTotal).toFixed(2)

        const novaVenda = {
            data: new Date().toISOString(),
            cliente: clienteSelecionado || "Consumidor final",
            itens: carrinho.map(item => ({
                id_pproduto: item.id,
                nome: item.nome_produto,
                quantidade: item.quantidade,
                preco_unitario: item.preco

            })),
            formaPagamento: formaPagamento,
            subTotal: subTotal.toFixed(2),
            desconto: Number(desconto).toFixed(2),
            total: valorTotal.toFixed(2),
            valorRecebido: Number(valorRecebido).toFixed(2),
            troco: trocoCalculado,

        }

        try {
            const response = await fetch('http://127.0.0.1:3003/vendas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novaVenda)

            })

            const data = await response.json()

            if (response.ok) {
                alert(data.mensagem)

                setMostrarNota(true)
                setVendaFinalizada(novaVenda)

                setCarrinho([])
                setClienteSelecionado("")
                setDesconto(0)
                setValorRecebido(0)
                setFormaPagamento("")
                setClienteSelecionado("")
                setSearchTerm("")


            } else {
                alert(data.mensagem)
            }

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    const subTotal = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
    const valorTotal = subTotal - desconto
    const trocoCalculado = (valorRecebido - valorTotal).toFixed(2)

    return (
        <DashboardLayout>

            {mostrarNota && (
                <NotaServico
                    dados={vendaFinalizada}
                    fechar={() => setMostrarNota(false)}
                />
            )}
            <header>
                <h1>Frente de Caixa</h1>
                <p>Sistema de vendas PDV</p>

            </header>


            <div className="container-vendas">
                <div className="container-listaProdutos">
                    <h3>Adicionar Produtos</h3>
                    <p>Busque e adicione produtos à venda</p>
                    <input type="text" value={searchTem} onChange={handleSearch} className="inputPesquisaProduto" ref={imputRef} placeholder="Buscar Produto..." />

                    {foundProducts.length > 0 && (
                        <div className="results-dropdown">
                            {foundProducts.map(product => (
                                <div key={product.id} className="result-item" onClick={() => addCarrinho(product)} styele={{ cursor: 'pointer' }}>
                                    <span>{product.nome_produto}</span>
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
                                <span>{item.nome_produto} </span>
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
                    <select onChange={(e) => setClienteSelecionado(e.target.value)} value={clienteSelecionado}>
                        <option value="Selecione um cliente">Selecione um Cliente</option>
                        {
                            clientes.map((element, index) => {
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
                            <input type="number" className="impValorRecebido" value={valorRecebido} placeholder="0,00" onChange={(e) => setValorRecebido(e.target.value)} />
                        </div>

                        <div>
                            <label >Desconto(R$)</label><br />
                            <input type="number" className="impDesconto" placeholder="0,00" onChange={(e) => setDesconto(e.target.value)} />
                        </div>

                        <div>
                            <label >Troco(R$)</label><br />
                            <input type="number" className="impTroco" placeholder="0,00" value={trocoCalculado} disabled />
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