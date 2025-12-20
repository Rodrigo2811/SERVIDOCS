import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

import { BsFillPencilFill, BsFillTrashFill, BsPlus } from "react-icons/bs";

import './produtos.css'
import { useState, useEffect } from "react";


const LOCAL_STORAGE_KEY = 'produtosEstoque';

const Produtos = () => {

    const [produtos, setProdutos] = useState(() => {
        const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);

        return storedProducts ? JSON.parse(storedProducts) : [];
    });

    const [modalOpen, setModalOpen] = useState(false)
    const [produto, setProduto] = useState({

        id: null,
        nome: '',
        categoria: '',
        preco: '',
        estoque: '',
        status: '',
        descricao: ''
    })


    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(produtos));
    }, [produtos]);

    function handleChange(e) {
        const { name, value } = e.target;

        // Se o campo for 'preco' ou 'estoque', tente converter para número, senão, mantenha a string.
        const updatedValue = (name === 'preco' || name === 'estoque') ? Number(value) : value;

        setProduto(prevProduto => ({
            ...prevProduto, [name]: updatedValue
        }))
    }

    function addProduto() {

        setProduto({
            id: null,
            nome: '',
            categoria: '',
            preco: '',
            estoque: '',
            status: '',
            descricao: ''
        })
        setModalOpen(false)
        alert('Produto cadastrado com sucesso!')

    }

    function salvarProduto(e) {
        e.preventDefault();

        if (!produto.nome || !produto.categoria || !produto.preco || !produto.estoque || !produto.status) {
            alert('Por favor, preencha todos os campos obrigatórios (Nome, Categoria, Preço, Estoque, Status).');
            return;
        }


        const novoProduto = { ...produto, id: Date.now() };


        setProdutos(prevProdutos => [...prevProdutos, novoProduto])

        addProduto()
    }

    function handleAddProdutoServico() {

        setProduto({
            id: null,
            nome: '',
            categoria: '',
            preco: '',
            estoque: '',
            status: '',
            descricao: ''
        })
        setModalOpen(true)
    }


    function removerProduto(id) {

        setProdutos(prevProdutos => prevProdutos.filter(p => p.id !== id));
        alert('Produto removido.');
    }



    const totalProdutos = produtos.length;
    const estoqueTotal = produtos.reduce((acc, p) => acc + (Number(p.estoque) || 0), 0);
    const valorTotalEstoque = produtos.reduce((acc, p) => acc + (Number(p.preco) * Number(p.estoque) || 0), 0);

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
                        qtd={totalProdutos}
                    />
                    <Card
                        title={'Estoque Total'}
                        qtd={estoqueTotal}
                    />
                    <Card
                        title={'Valor em Estoque'}
                        qtd={'R$ ' + valorTotalEstoque.toFixed(2).replace('.', ',')}
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
                                        <td>{p.nome}</td>
                                        <td>{p.categoria}</td>
                                        <td>{'R$ ' + Number(p.preco).toFixed(2).replace('.', ',')}</td>
                                        <td>{p.estoque}</td>
                                        <td>{p.status}</td>
                                        <td>

                                            <button className="btn-acao" ><BsFillPencilFill /></button>
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

                            <label htmlFor="nome">Nome do Produto</label><br />

                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Nome do Produto"
                                value={produto.nome}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="categoria">Categoria</label>
                            <input
                                type="text"
                                id="categoria"
                                name="categoria"
                                placeholder="Categoria"
                                value={produto.categoria}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="preco">Preço</label><br /><br />
                            <input
                                type="number"
                                id="preco"
                                name="preco"
                                placeholder="Preço"
                                value={produto.preco}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="estoque">Quantidade em estoque</label><br />
                            <input
                                type="number"
                                id="estoque"
                                name="estoque"
                                placeholder="Quantidade em estoque"
                                value={produto.estoque}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="status">Status</label><br />

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