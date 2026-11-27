
import {
    describe,
    it,
    expect,
    vi,
    afterEach
} from "vitest";

import { apiRequest, ApiError } from "./api.js";

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

describe("apiRequest - ARKIV", () => {

    it("envia o JWT no header Authorization", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(null, { status: 204 })
        );

        vi.stubGlobal("fetch", fetchMock);

        await apiRequest("/recurso-protegido", {
            method: "GET",
            token: "jwt-simulado-para-teste"
        });

        const [, options] = fetchMock.mock.calls[0];

        expect(
            options.headers.get("Authorization")
        ).toBe("Bearer jwt-simulado-para-teste");
    });

    it("não envia Authorization em requisições públicas", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(null, { status: 204 })
        );

        vi.stubGlobal("fetch", fetchMock);

        await apiRequest("/planos", {
            method: "GET"
        });

        const [, options] = fetchMock.mock.calls[0];

        expect(
            options.headers.has("Authorization")
        ).toBe(false);
    });


    it("retorna JSON quando a API responde 200", async () => {
        const dados = [{ id: 1, titulo: "Plano de Teste" }];

        const fetchMock = vi.fn().mockResolvedValue(
            new Response(JSON.stringify(dados), {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            })
        );

        vi.stubGlobal("fetch", fetchMock);

        const resultado = await apiRequest("/planos");

        expect(resultado).toEqual(dados);
        expect(fetchMock).toHaveBeenCalledOnce();
    });

    it("identifica uma resposta HTTP 401", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({ erro: "Não autenticado" }),
                {
                    status: 401,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            )
        ));

        await expect(
            apiRequest("/auth/login")
        ).rejects.toMatchObject({
            name: "ApiError",
            status: 401
        });
    });

    it("identifica uma resposta HTTP 403", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            new Response(null, { status: 403 })
        ));

        await expect(
            apiRequest("/recurso-protegido")
        ).rejects.toMatchObject({
            status: 403
        });
    });

    it("identifica erros internos HTTP 500", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            new Response(null, { status: 500 })
        ));

        await expect(
            apiRequest("/auth/register")
        ).rejects.toBeInstanceOf(ApiError);
    });

    it("identifica falhas de conexão", async () => {
        vi.stubGlobal("fetch", vi.fn().mockRejectedValue(
            new TypeError("Failed to fetch")
        ));

        await expect(
            apiRequest("/planos")
        ).rejects.toMatchObject({
            status: 0
        });
    });

    it("retorna null para respostas HTTP 204", async () => {
        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
            new Response(null, { status: 204 })
        ));

        const resultado = await apiRequest("/recurso");

        expect(resultado).toBeNull();
    });
});
