import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './src/login/login'
import Registrar from './src/registro/registro'
import Dashboard from './src/pages/dashboard/dashboard'

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/registro' element={<Registrar />} />

                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas