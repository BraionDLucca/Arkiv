
const apiUrl = import.meta.env.DEV
    ? ""
    : (import.meta.env.VITE_API_URL || "");

export async function apiRequest(endpoint, options = {}) {
    const headers = new Headers(options.headers);

    // Adiciona Content-Type quando enviamos JSON.
    if (options.body && !headers.has("Content-Type")
        && typeof options.body === "string") {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${apiUrl}${endpoint}`, {
        ...options,
        headers,
    });

    // Trata respostas HTTP com erro.
    if (!response.ok) {
        const error = new Error(
            `Erro na requisição: ${response.status}`
        );

        error.status = response.status;
        throw error;
    }

    // Algumas requisições não retornam conteúdo.
    if (response.status === 204) {
        return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
        return response.json();
    }

    return response.text();
}
