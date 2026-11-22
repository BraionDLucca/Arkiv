
import { describe, it, expect } from "vitest";
import {
    render,
    screen,
    fireEvent
} from "@testing-library/react";

import {
    MemoryRouter,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import {
    AuthProvider,
    useAuth
} from "../contexts/AuthContext.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";

// Página pública utilizada nos testes.
function LoginPage() {
    return <h1>Página de Login</h1>;
}

// Página privada utilizada nos testes.
function PrivatePage() {
    return <h1>Página Privada</h1>;
}

// Controles de autenticação exclusivos dos testes.
function TestLogin() {
    const { login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login("token-simulado-para-teste");
        navigate("/profile");
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <>
            <button onClick={handleLogin}>
                Autenticar no teste
            </button>

            <button onClick={handleLogout}>
                Sair do teste
            </button>
        </>
    );
}

// Ambiente de navegação simulado.
function TestApp({ initialRoute = "/profile" }) {
    return (
        <AuthProvider>
            <MemoryRouter initialEntries={[initialRoute]}>
                <TestLogin />

                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage />}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/profile"
                            element={<PrivatePage />}
                        />

                        <Route
                            path="/criar-plano"
                            element={<PrivatePage />}
                        />
                    </Route>
                </Routes>
            </MemoryRouter>
        </AuthProvider>
    );
}

describe("ProtectedRoute - ARKIV", () => {

    it("redireciona usuário não autenticado para login", () => {
        render(<TestApp initialRoute="/profile" />);

        expect(
            screen.getByText("Página de Login")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Página Privada")
        ).not.toBeInTheDocument();
    });

    it("protege a rota de criação de planos", () => {
        render(<TestApp initialRoute="/criar-plano" />);

        expect(
            screen.getByText("Página de Login")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Página Privada")
        ).not.toBeInTheDocument();
    });

    it("permite acesso após autenticação local", () => {
        render(<TestApp initialRoute="/login" />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Autenticar no teste"
            })
        );

        expect(
            screen.getByText("Página Privada")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Página de Login")
        ).not.toBeInTheDocument();
    });

    it("bloqueia o acesso após logout local", () => {
        render(<TestApp initialRoute="/login" />);

        fireEvent.click(
            screen.getByRole("button", {
                name: "Autenticar no teste"
            })
        );

        expect(
            screen.getByText("Página Privada")
        ).toBeInTheDocument();

        fireEvent.click(
            screen.getByRole("button", {
                name: "Sair do teste"
            })
        );

        expect(
            screen.getByText("Página de Login")
        ).toBeInTheDocument();

        expect(
            screen.queryByText("Página Privada")
        ).not.toBeInTheDocument();
    });
});
