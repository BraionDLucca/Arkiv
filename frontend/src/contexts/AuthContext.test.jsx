
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import {
    AuthProvider,
    useAuth
} from "./AuthContext.jsx";

// Componente auxiliar utilizado somente nos testes.
function TestAuthComponent() {
    const {
        user,
        isAuthenticated,
        login,
        logout
    } = useAuth();

    return (
        <div>
            <p>
                Status: {isAuthenticated
                    ? "Autenticado"
                    : "Não autenticado"}
            </p>

            <p>
                Usuário: {user?.email || "Nenhum"}
            </p>

            <button
                onClick={() =>
                    login({ email: "teste@example.com" })
                }
            >
                Simular login
            </button>

            <button onClick={logout}>
                Sair
            </button>
        </div>
    );
}

describe("AuthContext - ARKIV", () => {

    it("deve iniciar sem usuário autenticado", () => {
        render(
            <AuthProvider>
                <TestAuthComponent />
            </AuthProvider>
        );

        expect(
            screen.getByText("Status: Não autenticado")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Usuário: Nenhum")
        ).toBeInTheDocument();
    });

    it("deve atualizar o estado após login local", () => {
        render(
            <AuthProvider>
                <TestAuthComponent />
            </AuthProvider>
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Simular login"
            })
        );

        expect(
            screen.getByText("Status: Autenticado")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Usuário: teste@example.com")
        ).toBeInTheDocument();
    });

    it("deve limpar o estado após logout local", () => {
        render(
            <AuthProvider>
                <TestAuthComponent />
            </AuthProvider>
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Simular login"
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: "Sair"
            })
        );

        expect(
            screen.getByText("Status: Não autenticado")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Usuário: Nenhum")
        ).toBeInTheDocument();
    });
});
