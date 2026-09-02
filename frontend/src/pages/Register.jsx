const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import "./RegisterLogin.css";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Register() {

    const navigate = useNavigate()

    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)


    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const [confirmSenha, setConfirmSenha] = useState("") // para validar a confirmação
    const [error, setError] = useState("") // para mostrar mensagens de erro
    const [success, setSuccess] = useState("") // mensagem de sucesso

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleConfirmChange = (e) => {
        setConfirmSenha(e.target.value)
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(""); // limpa erro anterior
        setSuccess("") // limpa sucesso anterior

        // Validação de "confirmar senha"
        if (formData.senha !== confirmSenha) {
            setError("As senhas não coincidem!")
            return
        }

        // Validação de senha (8 caracteres)
        if (formData.senha.length < 8) {
            setError("A senha precisa ter no mínimo 8 caracteres.")
            return
        }

        /* Envio do formulário */
        try {

            const res = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if (!res.ok) {

                setError("Ocorreu um erro ao cadastrar.")
                console.error("Erro: ", data.erro)
            }

            setSuccess("Cadastro realizado com sucesso! Redirecionando para login...")

            // redireciona após 1,5s
            setTimeout(() => navigate("/login"), 1500);

        } catch (err) {

            console.error(err);
            setError("Erro ao conectar com o servidor.")
        }
    }

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

                        <label htmlFor="email">Email</label> <br />
                        <input id="email" name="email" type="email" onChange={handleChange}
                            required autoComplete="email" /> <br /> <br />

                    </div>

                    <div className="reg-form-item">

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

                    <div className="reg-form-item">

                        <label htmlFor="confirmar-senha">Confirmar Senha</label> <br />

                        {/* Campo de confirmar senha */}
                        <input id="confirmar-senha" name="confirmar-senha"
                            type={mostrarConfirmarSenha ? "text" : "password"}
                            className="senha-input" value={confirmSenha}
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

                    <Button size="large" type="submit">Continuar</Button>

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
