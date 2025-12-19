import { createContext, useState, useEffect } from 'react';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const recoveredUser = localStorage.getItem('logado');
        if (recoveredUser) {
            setAuthenticated(true);
        }
        setLoading(false);
    }, []);

    const login = (userData) => {

        localStorage.setItem('logado', JSON.stringify(userData));
        setAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('logado');
        setAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};