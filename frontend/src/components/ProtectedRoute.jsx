
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    // Aguarda a verificação da autenticação.
    if (isLoading) {
        return <p>Verificando autenticação...</p>;
    }

    // Redireciona usuários não autenticados.
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    // Renderiza a página quando autenticado.
    return <Outlet />;
}
