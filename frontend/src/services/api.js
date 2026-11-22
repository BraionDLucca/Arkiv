
const apiUrl = import.meta.env.DEV
    ? ""
    : (import.meta.env.VITE_API_URL || "");

export class ApiError extends Error {
    constructor(message, status, details = null) {
        super(message);

        this.name = "ApiError";
        this.status = status;
        this.details = details;
    }
}

export async function apiRequest(endpoint, options = {}) {
    // Separa o token das opções nativas do fetch.
    const { token, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers);

    // Define Content-Type para corpos JSON textuais.
    if (
        typeof fetchOptions.body === "string" &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    // Adiciona o JWT somente quando informado.
    if (token) {
        if (
            typeof token !== "string" ||
            !token.trim()
        ) {
            throw new ApiError(
                "Token de autenticação inválido.",
                0
            );
        }

        headers.set(
            "Authorization",
            `Bearer ${token}`
        );
    }

    let response;

    try {
        response = await fetch(`${apiUrl}${endpoint}`, {
            ...fetchOptions,
            headers,
        });
    } catch {
        throw new ApiError(
            "Não foi possível conectar ao servidor.",
            0
        );
    }

    if (response.status === 204) {
        if (!response.ok) {
            throw new ApiError(
                "Erro na requisição.",
                response.status
            );
        }

        return null;
    }

    const contentType =
        response.headers.get("Content-Type") || "";

    let data = null;

    if (contentType.includes("application/json")) {
        try {
            data = await response.json();
        } catch {
            throw new ApiError(
                "Resposta JSON inválida do servidor.",
                response.status
            );
        }
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        throw new ApiError(
            "A requisição não pôde ser concluída.",
            response.status,
            data
        );
    }

    return data;
}
