
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import {
    AuthProvider,
    useAuth
} from "./AuthContext.jsx";

// Componente auxiliar exclusivo dos testes
function TestAuthComponent() {
    const {
        token,
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
                Token: {token || "Nenhum"}
            </p>

            <button
                onClick={() =>
                    login("token-simulado-para-teste")
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

describe("AuthContext JWT - ARKIV", () => {

    it("deve iniciar sem autenticação", () => {
        render(
            <AuthProvider>
                <TestAuthComponent />
            </AuthProvider>
        );

        expect(
            screen.getByText("Status: Não autenticado")
        ).toBeInTheDocument();

        expect(
            screen.getByText("Token: Nenhum")
        ).toBeInTheDocument();
    });

    it("deve armazenar o token após login local", () => {
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
            screen.getByText("Token: token-simulado-para-teste")
        ).toBeInTheDocument();
    });

    it("deve remover o token após logout", () => {
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
            screen.getByText("Token: Nenhum")
        ).toBeInTheDocument();
    });
});
