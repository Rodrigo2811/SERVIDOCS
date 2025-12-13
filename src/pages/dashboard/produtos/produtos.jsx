import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import Card from "../../../components/card/card";
import DashboardLayout from "../../../components/dashboardLayout/dashboardLayout";

const Produtos = () => {
    return (

        <>
            <DashboardLayout>

                <header>
                    <div>
                        <h1>Produtos</h1>
                        <p>Gerencie seu estoque e preços</p>

                    </div>

                </header>

                <div className="navCard-user">

                    <Card
                        title={'Total de Produtos'}
                        qtd={1}
                    />
                    <Card
                        title={'Estoque Total'}
                        qtd={50}
                    />
                    <Card
                        title={'Valor em Estoque'}
                        qtd={'R$' + Number(0).toFixed(2)}
                    />
                </div>


                <div className="container-usuarios">
                    <h3>Lista de usuarios</h3>
                    <p>Total de 0 usuarios cadastrados</p>
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
                            <tr>
                                <td>papel</td>
                                <td>produto</td>
                                <td>2.50</td>
                                <td>50</td>
                                <td>Disponivel</td>
                                <td><button className="btn-acao" onClick={'editar'}><BsFillPencilFill /></button> <button className="btn-acao" onClick={''}><BsFillTrashFill /></button></td>
                            </tr>
                        </tbody>
                    </table>

                </div>


            </DashboardLayout>

        </>
    )
}

export default Produtos;