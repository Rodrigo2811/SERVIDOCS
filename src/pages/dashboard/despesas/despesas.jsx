import { useEffect, useState, useCallback } from "react"

import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout"
import Card from "../../../components/card/card"
import Alert from "../../../components/alert/alert"

import { BsPlus, BsFillPencilFill, BsFillTrashFill, BsCurrencyDollar } from 'react-icons/bs'

import { FormData } from "../../../components/util/util"

import './despesas.css'

const Despesas = () => {

    const [alertOn, setAlertOn] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('');
    const [alertType, setAlertType] = useState('')
    const [modalOpen, setModalOpen] = useState(false);
    const [despesas, setDespesas] = useState([])


    function showAlert(mensagem, tipo) {
        setAlertMensagem(mensagem)
        setAlertType(tipo)
        setAlertOn(true)

        setTimeout(() => {
            setAlertOn(false)
        }, 3000)
    }
    const [despesa, setDespesa] = useState({
        id: null,
        despesa: '',
        valor: '',
        vencimento: '',
        status: ''
    })


    const buscarDespesas = useCallback(async () => {
        try {
            const response = await fetch('http://127.0.0.1:3003/despesas')

            const data = await response.json()

            if (response.ok) {
                setDespesas(data)
            } else {
                setDespesas([])
            }
        } catch (error) {
            console.error('Erro ao buscar despesas', error)
            showAlert('Erro ao carregar lista de despesas', error)
        }
    }, [])


    useEffect(() => {
        buscarDespesas()
    }, [buscarDespesas])


    function handleChange(e) {
        const { name, value } = e.target;

        setDespesa(prevDespesa => ({
            ...prevDespesa, [name]: value
        }))
    }

    function addDespesa() {
        setDespesa({
            id: null,
            despesa: '',
            valor: '',
            vencimento: '',
            status: ''
        })
        setModalOpen(true)
    }

    async function cadastrarDespesa(e) {
        e.preventDefault()

        if (!despesa.despesa || !despesa.valor || !despesa.vencimento || !despesa.status) {
            showAlert('Por favor, preencha todos os campos obrigatórios.', 'erro')
            return;
        }

        const isEditing = despesa.id !== null
            ;
        const url = isEditing
            ? `http://127.0.0.1:3003/despesas/${despesa.id}`
            : `http://127.0.0.1:3003/cadDespesas`;

        const method = isEditing ? 'PUT' : 'POST';
        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(despesa)
            });

            const data = await response.json()

            if (response.ok) {
                showAlert(isEditing ? 'Atualizado com sucesso !' : 'Cadastrato com sucesso', 'sucesso')
                setModalOpen(false)
                addDespesa()
                buscarDespesas()
            } else {
                showAlert(data.mensagem || 'Erro ao processar ', 'erro')
            }
        } catch (error) {
            showAlert('Erro de conexao com o banco', 'erro')
            console.error('Erro: ', error)
        }
        setTimeout(() => {
            setModalOpen(false)
        }, 2000)
    }

    function editar(id) {
        const despesaParaEditar = despesas.find(d => d.id === id)

        if (despesaParaEditar) {


            setDespesa({
                id: despesaParaEditar.id,
                despesa: despesaParaEditar.despesa.trim(),
                valor: despesaParaEditar.valor,
                vencimento: despesaParaEditar.vencimento ? despesaParaEditar.vencimento.split('T')[0] : '',
                status: despesaParaEditar.status.trim()
            })
            setModalOpen(true)
        }
    }


    async function removerDespesa(id) {
        if (!window.confirm('Deseja realmente excluir?')) return

        try {
            const response = await fetch(`http://127.0.0.1:3003/despesas/${id}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                setDespesas(prev => prev.filter(d => d.id !== id));
                showAlert('Despesa removida com sucesso', 'sucesso')

            }
        } catch (error) {
            showAlert('Erro ao remover do banco de dados', error)
        }
    }


    const qtdDespesas = despesas.length
    const totalDespesas = despesas.reduce((acc, d) => acc + Number(d.valor), 0)

    return (
        <>
            {alertOn && <Alert mensagem={alertMensagem} tipo={alertType} />}
            <DashboardLayout>
                <header className="header-despesas">

                    <div>
                        <h1>Despesas</h1>
                        <p>Gerencie suas despesas cadastrados</p>

                    </div>

                    <button className="btn-novoCliente" onClick={addDespesa}><BsPlus className="iconBTN" />Nova Despesa</button>

                </header>


                <div className="navCard">
                    <Card

                        title='Quantidade de Despesas'
                        icon={''}
                        qtd={qtdDespesas}
                        description='Despesas cadastrados'
                    />

                    <Card

                        title='Total Despesas'
                        icon={<BsCurrencyDollar />}
                        qtd={'R$ ' + (totalDespesas).toFixed(2)}
                        description='Total de Despesas'
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
                                        <td>{d.despesa.trim()}</td>
                                        <td>{Number(d.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                        <td>{FormData(d.vencimento)}</td>
                                        <td>{d.status.trim()}</td>
                                        <td>
                                            <button className="btn-acao" onClick={() => editar(d.id)} ><BsFillPencilFill /></button>
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
                                <h3>{despesa.id ? 'Editar Despesa' : 'Nova Despesa'}</h3>
                                <p>{despesa.id ? 'Altere os dados abaixo' : 'Preencha os dados para cadastrar uma nova despesa'}</p>
                            </header>
                            <form onSubmit={cadastrarDespesa}>

                                <label htmlFor="nome">Descrição Despesa</label><br />

                                <input
                                    type="text"
                                    name="despesa"
                                    placeholder="Nome da despesa"
                                    onChange={handleChange}
                                    value={despesa.despesa}
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
                                    <button className="btn-cadastrar" type="submit" onClick={cadastrarDespesa}>{despesa.id ? 'Salvar ALterações' : 'Cadastrar'}</button>
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