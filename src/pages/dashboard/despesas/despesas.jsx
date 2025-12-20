import { useEffect, useState } from "react"

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"
import Card from "../../../components/card/card"

import { BsPlus, BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs'

import { FormData } from "../../../components/util/util"

import './despesas.css'

const LOCAL_STORAGE_KEY = 'despesasCadastradas'
const Despesas = () => {


    const [modalOpen, setModalOpen] = useState(false);

    const [despesas, setDespesas] = useState(() => {

        const storedDespesas = localStorage.getItem(LOCAL_STORAGE_KEY)
        return storedDespesas ? JSON.parse(storedDespesas) : []
    })

    const [despesa, setDespesa] = useState({
        id: null,
        nome: '',
        valor: '',
        vencimento: '',
        status: ''
    })

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(despesas))
    }, [despesas])


    function handleChange(e) {
        const { name, value } = e.target;

        setDespesa(prevDespesa => ({
            ...prevDespesa, [name]: value
        }))
    }

    function addDespesa() {
        setDespesa({
            id: null,
            nome: '',
            valor: '',
            vencimento: '',
            status: ''
        })
        setModalOpen(false)
    }

    function cadastrarDespesa(e) {
        e.preventDefault()

        if (!despesa.nome || !despesa.valor || !despesa.vencimento || !despesa.status) {
            alert('Por favor, preencha todos os campos obrigatórios.')
            return;
        }

        const novaDespesa = { ...despesa, id: Date.now() }

        setDespesas(prevDespesas => [...prevDespesas, novaDespesa])

        addDespesa()
    }


    function removerDespesa(id) {
        setDespesas(prevDespesas => prevDespesas.filter(d => d.id !== id))
        alert('Despesa removida com sucesso')
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


                    {despesas.length <= 0 ? (
                        <h4>Sem despesas cadastradas</h4>
                    ) : (
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
                                {despesas.map(d => (
                                    <tr key={d.id}>
                                        <td>{d.nome}</td>
                                        <td>{Number(d.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{FormData(d.vencimento)}</td>
                                        <td>{d.status}</td>
                                        <td>
                                            <button className="btn-acao" ><BsFillPencilFill /></button>
                                            <button className="btn-acao" onClick={() => removerDespesa(d.id)}><BsFillTrashFill /></button>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    )}
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
                                    name="nome"
                                    placeholder="Nome da despesa"
                                    onChange={handleChange}
                                    value={despesa.nome}
                                    required
                                />

                                <label htmlFor="categoria">Valor</label>
                                <input
                                    type="Number"

                                    name="valor"
                                    placeholder="valor"
                                    onChange={handleChange}
                                    value={despesa.valor}
                                    required
                                />

                                <label htmlFor="preco">Vencimento</label><br /><br />
                                <input
                                    type="date"

                                    name="vencimento"
                                    placeholder="Data"
                                    onChange={handleChange}
                                    value={despesa.vencimento}
                                    required
                                />

                                <label htmlFor="status">Status</label><br />

                                <select

                                    name="status"
                                    onChange={handleChange}
                                    value={despesa.status}
                                    required
                                >
                                    <option value="" name='status' onChange={handleChange} >Selecione o Status</option>
                                    <option value={'Agendada'}>Agendada</option>
                                    <option value={'Pago'}>Pago</option>
                                    <option value={'Vencida'}>Vencida</option>
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