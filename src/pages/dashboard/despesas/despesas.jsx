import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"
import Card from "../../../components/card/card"

import { BsPlus, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'

import './despesas.css'
import { useState } from "react"

const Despesas = () => {

    const [modalOpen, setModalOpen] = useState(false)


    function cadastrarDespesa(e) {
        e.preventDefault()
    }


    return (
        <>
            <DashboardLayout>
                <header className="header-despesas">

                    <div>
                        <h1>Despesas</h1>
                        <p>Gerencie suas despesas cadastrados</p>

                    </div>

                    <button className="btn-novoCliente" onClick={() => setModalOpen(true)}><BsPlus className="iconBTN" />Nova Despesa</button>

                </header>


                <div className="navCard">
                    <Card

                        title='Total de Despesas'
                        icon={''}
                        qtd={0}
                        description='Despesas cadastrados'
                    />

                    <Card

                        title='Total de Produtos'
                        icon={''}
                        qtd={'R$ ' + Number(0).toFixed(2)}
                        description='Produtos cadastrados'
                    />
                </div>

                <div className="container-despesas">
                    <h3>Lista de Despesas</h3>


                    <table>
                        <thead>
                            <tr>
                                <th>Despesa</th>
                                <th>Valor</th>
                                <th>Vencimento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>

                        </thead>

                        <tbody>


                            <tr >
                                <td>Internet</td>
                                <td>80.00</td>
                                <td>20/12/2025</td>
                                <td>Agentada</td>

                                <td>

                                    <button className="btn-acao" ><BsFillPencilFill /></button>
                                    <button className="btn-acao" ><BsFillTrashFill /></button>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>

                {
                    modalOpen && (
                        <div className="modal-addDespesas" >
                            <header>
                                <h3>Nova Despesa</h3>
                                <p>Preencha os dados para cadastrar uma nova despesa</p>
                            </header>
                            <form onSubmit={cadastrarDespesa}>

                                <label htmlFor="nome">Descrição Despesa</label><br />

                                <input
                                    type="text"
                                    id="despesa"
                                    name="despesa"
                                    placeholder="Nome da despesa"

                                    required
                                />

                                <label htmlFor="categoria">Valor</label>
                                <input
                                    type="Number"
                                    id="valor"
                                    name="valor"
                                    placeholder="valor"
                                    required
                                />

                                <label htmlFor="preco">Vencimento</label><br /><br />
                                <input
                                    type="date"
                                    id="data"
                                    name="data"
                                    placeholder="Data"
                                    required
                                />

                                <label htmlFor="status">Status</label><br />

                                <select
                                    id="status"
                                    name="status"
                                    required
                                >
                                    <option value="">Selecione o Status</option>
                                    <option value="Disponivel">Agendada</option>
                                    <option value="Indisponivel">Pago</option>
                                    <option value="Indisponivel">Vencida</option>
                                </select>



                                <footer>
                                    <button className="btn-cancelar" type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                                    <button className="btn-cadastrar" type="submit">Cadastrar</button>
                                </footer>
                            </form>
                        </div>
                    )
                }
            </DashboardLayout>

        </>
    )
}

export default Despesas;