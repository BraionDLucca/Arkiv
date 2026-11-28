import { apiRequest } from "../services/api.js";
import { useState } from "react";
import "./RegisterLogin.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {

    const navigate = useNavigate()

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [confirmSenha, setConfirmSenha] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleConfirmChange = (e) => {
        setConfirmSenha(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        setError("");
        setSuccess("");

        // Validação dos campos obrigatórios
        if (!formData.username.trim() || !formData.email.trim() || !formData.password || !confirmSenha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        // Validação de confirmação de senha
        if (formData.password !== confirmSenha) {
            setError("As senhas não coincidem!");
            return;
        }

        // Validação do tamanho mínimo da senha
        if (formData.password.length < 8) {
            setError("A senha precisa ter no mínimo 8 caracteres.");
            return;
        }

        setIsSubmitting(true);

        try {
            await apiRequest("auth/register/", {
                method: "POST",
                body: JSON.stringify({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password,
                }),
            });

            // Só executa quando a API retorna sucesso.
            setSuccess(
                "Cadastro realizado com sucesso! Redirecionando para login..."
            );

            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {
            console.error(
                "Falha no cadastro:",
                err.message
            );

            if (err.status === 409) {
                setError("Este e-mail já está cadastrado.");
            } else if (err.status === 400 || err.status === 422) {
                setError("Não foi possível cadastrar. Verifique os dados informados.");
            } else if (err.status >= 500) {
                setError("Erro interno do servidor. Tente novamente mais tarde.");
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

    function handleMostrarConfirmarSenha() {

        if (mostrarConfirmarSenha) {
            setMostrarConfirmarSenha(false)

        } else {
            setMostrarConfirmarSenha(true)
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

                    <h1>Cadastro</h1>

                    {/* Mensagens de erro e sucesso */}
                    {error && <p className="error-msg">{error}</p>}
                    {success && <p className="success-msg">{success}</p>}

                    <div className="reg-form-item">

                        <label htmlFor="username">Nome de usuário</label> <br />
                        <input
                            id="username"
                            name="username"
                            type="text"
                            onChange={handleChange}
                            required
                        /> <br /> <br />

                    </div>

                    <div className="reg-form-item">

                        <label htmlFor="email">Email</label> <br />
                        <input id="email" name="email" type="email" onChange={handleChange}
                            required autoComplete="email" /> <br /> <br />

                    </div>

                    <div className="reg-form-item">

                        <label htmlFor="password">Senha</label> <br />

                        {/* Campo de senha */}
                        <input id="password" name="password" type={mostrarSenha ? "text" : "password"}
                            className="password-input" onChange={handleChange}
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

                    <div className="reg-form-item">

                        <label htmlFor="confirmar-senha">Confirmar Senha</label> <br />

                        {/* Campo de confirmar senha */}
                        <input id="confirmar-senha" name="confirmar-senha"
                            type={mostrarConfirmarSenha ? "text" : "password"}
                            className="password-input" value={confirmSenha}
                            onChange={handleConfirmChange} required />

                        {/* Botão mostrar/esconder senha */}
                        {mostrarConfirmarSenha ?

                            <button type="button" className="mostrar-senha-btn" onClick={() => handleMostrarConfirmarSenha()}>
                                <img src="/esconderSenha.svg" alt="Esconder senha"></img>
                            </button>

                            :

                            <button type="button" className="mostrar-senha-btn" onClick={() => handleMostrarConfirmarSenha()}>
                                <img src="/mostrarSenha.svg" alt="Mostrar senha"></img>
                            </button>

                        }

                        <br /> <br />

                    </div>

                    <Button size="large" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Cadastrando..." : "Continuar"}
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
                        Já possui uma conta? <button type="button" className="swap-form-btn"
                            onClick={() => navigate("/login")}>Faça login</button>
                    </p>

                </form>

            </div>
        </main>
    )
}
