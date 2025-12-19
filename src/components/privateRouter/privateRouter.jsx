import { useContext } from "react";
import { AuthContext } from "../contextAuth/constextAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
        return <div>Carregando...</div>
    }

    if (!authenticated) {
        return <Navigate to='/' />
    }

    return children
}

export default PrivateRoute;