import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/components/contextAuth/constextAuth';
import PrivateRoute from './src/components/privateRouter/privateRouter';

import Login from './src/login/login';
import Registrar from './src/registro/registro';
import Dashboard from './src/pages/dashboard/dashboard';
import Clientes from './src/pages/dashboard/clientes/clientes';
import Produtos from './src/pages/dashboard/produtos/produtos';
import Caixa from './src/pages/dashboard/caixa/caixa';
import Relatorios from './src/pages/dashboard/relatorios/relatorios';
import Usuarios from './src/pages/dashboard/usuarios/usuarios';
import Despesas from './src/pages/dashboard/despesas/despesas';

import Page404 from './src/pages/notFound/page404';

const Rotas = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/Registro' element={<Registrar />} />

                    <Route path='/Dashboard' element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
                    <Route path='/Clientes' element={<PrivateRoute><Clientes /></PrivateRoute>} />
                    <Route path='/Produtos' element={<PrivateRoute><Produtos /></PrivateRoute>} />
                    <Route path='/Caixa' element={<PrivateRoute><Caixa /></PrivateRoute>} />
                    <Route path='/Despesas' element={<PrivateRoute><Despesas /></PrivateRoute>} />
                    <Route path='/Relatorios' element={<PrivateRoute><Relatorios /></PrivateRoute>} />
                    < Route path='/usuarios' element={<PrivateRoute>< Usuarios /></PrivateRoute >} />

                    <Route path='*' element={<Page404 />} />

                </Routes >

            </AuthProvider >
        </BrowserRouter >
    )
}

export default Rotas