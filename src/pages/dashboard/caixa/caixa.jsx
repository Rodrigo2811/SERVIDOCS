import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";


import { BsCCircle, BsCurrencyDollar } from 'react-icons/bs'

import './caixa.css'

import { useState } from "react";


const LOCAL_STORAGE_ESTOQUE = 'produtosEstoque';
const LOCAL_STORAGE_CLIENTE = 'clientesCadastrados'

const Caixa = () => {

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



    function finalizarVenda(e) {
        e.preventDefault()

        alert('Venda Finalizada')
    }
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
                                <div key={product.id} className="result-item">
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

                    <label >Selecione um Cliente(Opcional)</label>
                    <select>
                        <option value="Selecione um cliente">Selecione um Cliente</option>
                        {

                        }
                    </select>

                    <label>Forma de Pagamento</label>
                    <select name="" id="">
                        <option value="Dinheiro">Dinheiro</option>
                        <option value="Débito">Débito</option>
                        <option value="Crédito">Crédito</option>
                        <option value="Pix">Pix</option>
                    </select>

                    <label >Desconto(R$)</label>
                    <input type="number" className="inpDesconto" placeholder="0,00" />
                    <hr />
                    <span className="subtotal">Subtotal <span>0</span></span>
                    <span className="total">Total: <span className="rsTOtal">0.00</span></span>

                    <button className="btn-finalizarVenda" onClick={finalizarVenda}><BsCurrencyDollar />Finalizar Venda</button>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Caixa;