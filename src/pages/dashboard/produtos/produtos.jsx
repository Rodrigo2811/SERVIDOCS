import { useEffect, useState } from "react";

import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";
import Alert from "../../../components/alert/alert";

import { BsBoxSeam, BsCurrencyDollar, BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import './produtos.css'


const Produtos = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [alertOn, setAlertOn] = useState(false);
    const [alertMensagem, setAlertMensagem] = useState('')
    const [alertType, setAlertType] = useState('')
    const [produtos, setProdutos] = useState([])

    function showAlert(mensagem, tipo) {
        setAlertMensagem(mensagem)
        setAlertType(tipo)
        setAlertOn(true)

        setTimeout(() => {
            setAlertOn(false)
        }, 3000)
    }

    useEffect(() => {
        const buscarProduto = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3003/produtos')
                const data = await response.json()

                if (response.ok) {
                    setProdutos(data)
                } else {
                    setProdutos([])
                }
            } catch (error) {
                console.error('Erro ao buscar produtos', error)
                showAlert('Erro ao carregar lista de produtos', 'erro')
            }
        }
        buscarProduto()
    }, [])

    const [produto, setProduto] = useState({
        id: null,
        nome_produto: '',
        categoria: '',
        preco: '',
        quantidade: '',
        status: '',
        descricao: ''
    })


    function handleChange(e) {
        const { name, value } = e.target;

        setProduto(prevProduto => ({
            ...prevProduto, [name]: value
        }))
    }

    function addProduto() {
        setProduto({
            id: null,
            nome_produto: '',
            categoria: '',
            preco: '',
            quantidade: '',
            status: '',
            descricao: ''
        })
        setModalOpen(false)
        showAlert('Produto cadastrado com sucesso!', 'sucesso')
    }

    async function salvarProduto(e) {
        e.preventDefault();

        if (!produto.nome_produto || !produto.categoria || !produto.preco || !produto.quantidade || !produto.status || !produto.descricao) {
            showAlert('Por favor, preencha todos os campos obrigatórios (Nome, Categoria, Preço, Estoque, Status, descrição).', 'erro');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:3003/cadProdutos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome_produto: produto.nome_produto,
                    categoria: produto.categoria,
                    preco: produto.preco,
                    quantidade: produto.quantidade,
                    status: produto.status,
                    descricao: produto.descricao
                })
            });

            const data = await response.json();

            if (response.ok) {
                showAlert(data.mensagem, 'sucesso')
                addProduto()
            } else {
                showAlert(data.mensagem, 'erro')
            }
        } catch (error) {
            showAlert('Erro de conexão com o banco', 'erro')
            console.error('Erro: ', error)

        }
    }

    function handleAddProdutoServico() {
        setProduto({
            id: null,
            nome_produto: '',
            categoria: '',
            preco: '',
            quantidade: '',
            status: '',
            descricao: ''
        })
        setModalOpen(true)
    }

    function editar(id) {
        showAlert('editar: ' + id)
    }

    function removerProduto(id) {
        setProdutos(prevProdutos => prevProdutos.filter(p => p.id !== id));
        showAlert('Produto removido.', 'sucesso');
    }

    const totalProdutos = produtos.length;
    const estoqueTotal = produtos.reduce((acc, p) => acc + (Number(p.estoque) || 0), 0);
    const valorTotalEstoque = produtos.reduce((acc, p) => acc + (Number(p.preco) * Number(p.estoque) || 0), 0);

    return (
        <>
            {alertOn && <Alert mensagem={alertMensagem} tipo={alertType} />}
            <DashboardLayout>

                <header className="header-produtos">
                    <div>
                        <h1>Produtos / Serviços</h1>
                        <p>Gerencie seu estoque e preços</p>

                    </div>

                    <button className="btn-novoProduto" onClick={handleAddProdutoServico}><BsPlus className="inconBTN" />Novo Produto/Serviço</button>

                </header>

                <div className="navCard-user">

                    <Card
                        title={'Total de Produtos'}
                        qtd={totalProdutos}
                        icon={<BsBoxSeam />}
                    />
                    <Card
                        title={'Estoque Total'}
                        qtd={estoqueTotal}
                    />
                    <Card
                        title={'Valor em Estoque'}
                        qtd={'R$ ' + valorTotalEstoque.toFixed(2).replace('.', ',')}
                        icon={<BsCurrencyDollar />}
                    />
                </div>

                <div className="container-produtos" >
                    <h3>Lista de Produtos</h3>

                    {produtos.length === 0 ? (
                        <h4>Sem produtos cadastrados</h4>
                    ) : (
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
                                {produtos.map(p => (
                                    <tr key={p.id}>
                                        <td>{p.nome_produto}</td>
                                        <td>{p.categoria}</td>
                                        <td>{'R$ ' + Number(p.preco).toFixed(2).replace('.', ',')}</td>
                                        <td>{p.quantidade}</td>
                                        <td>{p.status}</td>
                                        <td>
                                            <button className="btn-acao" onClick={() => editar(p.id)}><BsFillPencilFill /></button>
                                            <button className="btn-acao" onClick={() => removerProduto(p.id)}><BsFillTrashFill /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                {modalOpen && (
                    <div className="modal-addProdutos" >
                        <header>
                            <h3>Novo Produto</h3>
                            <p>Preencha os dados para cadastrar um novo produto</p>
                        </header>
                        <form onSubmit={salvarProduto}>

                            <input
                                type="text"
                                id="nome_produto"
                                name="nome_produto"
                                placeholder="Nome do Produto"
                                value={produto.nome_produto}
                                onChange={handleChange}
                                required
                            />

                            <div style={{ display: 'flex', margin: '5px 0', justifyContent: 'space-between', gap: '5px' }}>
                                <input
                                    type="text"
                                    id="categoria"
                                    name="categoria"
                                    placeholder="Categoria"
                                    value={produto.categoria}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    type="number"
                                    id="preco"
                                    name="preco"
                                    placeholder="Preço"
                                    value={produto.preco}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            <div style={{ display: 'flex', margin: '5px 0', justifyContent: 'space-between', gap: '5px' }}>

                                <input
                                    type="number"
                                    id="quantidade"
                                    name="quantidade"
                                    placeholder="Quantidade em estoque"
                                    value={produto.quantidade}
                                    onChange={handleChange}
                                    required
                                />

                                <select
                                    id="status"
                                    name="status"
                                    value={produto.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione o Status</option>
                                    <option value="Disponivel">Disponível</option>
                                    <option value="Indisponivel">Indisponível</option>
                                </select>

                            </div>

                            <label htmlFor="descricao">Descrição</label><br />
                            <input
                                type="text"
                                id="descricao"
                                name="descricao"
                                placeholder="Descrição (Opcional)"
                                value={produto.descricao}
                                onChange={handleChange}
                            />

                            <footer>
                                <button className="btn-cancelar" type="button" onClick={() => setModalOpen(false)}>Cancelar</button>
                                <button className="btn-cadastrar" type="submit">Cadastrar</button>
                            </footer>
                        </form>
                    </div>
                )}
            </DashboardLayout>

        </>
    )
}

export default Produtos;