import { apiRequest } from "../services/api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {

    const { login } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const [error, setError] = useState(""); // mensagens de erro
    const [success, setSuccess] = useState(""); // mensagens de sucesso

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setError("");
        setSuccess("");

        if (!formData.email.trim() || !formData.senha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        setIsSubmitting(true);

        try {
            const data = await apiRequest("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: formData.email.trim(),
                    senha: formData.senha,
                }),
            });

            // Confirma se a resposta possui o token esperado.
            if (
                !data ||
                typeof data.token !== "string" ||
                !data.token.trim()
            ) {
                setError(
                    "O servidor não retornou uma autenticação válida."
                );
                return;
            }

            // Registra o JWT no contexto global.
            login(data.token);

            setSuccess("Login realizado com sucesso!");

            // Recupera a página solicitada anteriormente,
            // caso o usuário tenha sido redirecionado ao login.
            navigate("/", { replace: true });

        } catch (err) {
            console.error(
                "Falha na autenticação:",
                err.message
            );

            if (err.status === 400 || err.status === 401) {
                setError("Email ou senha incorretos.");
            } else if (err.status === 403) {
                setError("Acesso não autorizado.");
            } else if (err.status >= 500) {
                setError(
                    "Erro interno do servidor. Tente novamente mais tarde."
                );
            } else {
                setError("Não foi possível conectar ao servidor.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    /* Mostrar/Esconder senha */
    function handleMostrarSenha() {

        if (mostrarSenha) {
            setMostrarSenha(false)

        } else {
            setMostrarSenha(true)
        }
    }

    return (

        <main className="register-container">

            <div className="circle-wrapper">

                <div className="circle">

                    <object type="image/svg+xml" data="/arkiv-animated.svg" className="arkiv-animated"></object>

                </div>

            </div>

            <div className="form-container">

                <form className="reg-form" onSubmit={handleSubmit}>

                    <h1>Login</h1>

                    {/* Mensagens de erro e sucesso */}
                    {error && <p className="error-msg">{error}</p>}
                    {success && <p className="success-msg">{success}</p>}

                    <div className="reg-form-item">

                        <label htmlFor="email">Email</label> <br />
                        <input id="email" name="email" type="email" onChange={handleChange}
                            required autoComplete="email" /> <br /> <br />

                    </div>

                    <div className="reg-form-item senha-input">

                        <label htmlFor="senha">Senha</label> <br />

                        {/* Campo de senha */}
                        <input id="senha" name="senha" type={mostrarSenha ? "text" : "password"}
                            className="senha-input" onChange={handleChange}
                            required autoComplete="current-password" />

                        {/* Botão mostrar/esconder senha */}
                        {mostrarSenha ?

                            <button type="button" className="mostrar-senha-btn" onClick={() => handleMostrarSenha()}>
                                <img src="/esconderSenha.svg" alt="Esconder senha"></img>
                            </button>

                            :

                            <button type="button" className="mostrar-senha-btn" onClick={() => handleMostrarSenha()}>
                                <img src="/mostrarSenha.svg" alt="Mostrar senha"></img>
                            </button>

                        }
                        <br /> <br />

                    </div>

                    <Button size="large" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Entrando..." : "Continuar"}
                    </Button>

                    <div className="divide">

                        <hr className="divide-hr" />
                        <p className="divide-text">Ou</p>
                        <hr className="divide-hr" />

                    </div>

                    <div className="google-login">

                        <img src="/Google.png" alt="Continuar com Google" className="google-icon" />
                    </div>

                    <p className="login-text">
                        Não possui uma conta? <button type="button" className="swap-form-btn"
                            onClick={() => navigate("/register")}>Cadastre-se</button>
                    </p>

                </form>

            </div>
        </main>
    );
}
