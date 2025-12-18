import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './src/login/login';
import Registrar from './src/registro/registro';
import Dashboard from './src/pages/dashboard/dashboard';
import Clientes from './src/pages/dashboard/clientes/clientes';
import Produtos from './src/pages/dashboard/produtos/produtos';
import Caixa from './src/pages/dashboard/caixa/caixa';
import Relatorios from './src/pages/dashboard/relatorios/relatorios';
import Usuarios from './src/pages/dashboard/usuarios/usuarios';
import Despesas from './src/pages/dashboard/despesas/despesas';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registro' element={<Registrar />} />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/Clientes' element={<Clientes />} />
                <Route path='/Produtos' element={<Produtos />} />
                <Route path='/Caixa' element={<Caixa />} />
                <Route path='/Despesas' element={<Despesas />} />
                <Route path='/Relatorios' element={<Relatorios />} />
                <Route path='/usuarios' element={<Usuarios />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas