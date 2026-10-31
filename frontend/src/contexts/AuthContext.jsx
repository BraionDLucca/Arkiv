
import {
    createContext,
    useContext,
    useState,
    useCallback
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isLoading] = useState(false);

    // Registra uma sessão confirmada pela API.
    const login = useCallback((authenticatedUser) => {
        setUser(authenticatedUser);
    }, []);

    // Limpa o estado de autenticação local.
    const logout = useCallback(() => {
        setUser(null);
    }, []);

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Hook para acessar os dados de autenticação.
export function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            "useAuth deve ser utilizado dentro de AuthProvider."
        );
    }

    return context;
}
