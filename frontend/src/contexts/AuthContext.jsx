
import {
    createContext,
    useContext,
    useState,
    useCallback
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    // Token mantido somente na memória do React.
    const [token, setToken] = useState(null);

    // Dados completos do usuário ainda indisponíveis.
    const [user, setUser] = useState(null);

    const isLoading = false;

    // Registra o token recebido após login confirmado pela API.
    const login = useCallback((receivedToken) => {
        if (
            typeof receivedToken !== "string" ||
            !receivedToken.trim()
        ) {
            throw new Error("Token de autenticação inválido.");
        }

        setToken(receivedToken);
        setUser(null);
    }, []);

    // Encerra a sessão local.
    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
    }, []);

    // Indica que existe um token recebido no fluxo de login.
    const isAuthenticated = token !== null;

    return (
        <AuthContext.Provider
            value={{
                token,
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

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error(
            "useAuth deve ser utilizado dentro de AuthProvider."
        );
    }

    return context;
}
