import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";


import { BsCurrencyDollar } from 'react-icons/bs'

import './caixa.css'
const Caixa = () => {

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
                    <input type="text" className="inputPesquisaProduto" placeholder="Buscar Produto..." />
                </div>

                <div className="container-carrinho">
                    <h3>Resumo da Venda</h3>

                    <label >Selecione um Cliente(Opcional)</label>
                    <select>
                        <option value="Selecione um cliente">Selecione um Cliente</option>
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