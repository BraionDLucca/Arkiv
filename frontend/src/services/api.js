
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
    const headers = new Headers(options.headers);

    // Define JSON para requisições com corpo textual,
    // sem interferir em uploads de arquivos.
    if (
        typeof options.body === "string" &&
        !headers.has("Content-Type")
    ) {
        headers.set("Content-Type", "application/json");
    }

    let response;

    try {
        response = await fetch(`${apiUrl}${endpoint}`, {
            ...options,
            headers,
        });
    } catch {
        throw new ApiError(
            "Não foi possível conectar ao servidor.",
            0
        );
    }

    // Algumas respostas não possuem conteúdo.
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
        // Não exponha mensagens internas do backend
        // diretamente ao usuário.
        throw new ApiError(
            "A requisição não pôde ser concluída.",
            response.status,
            data
        );
    }

    return data;
}
