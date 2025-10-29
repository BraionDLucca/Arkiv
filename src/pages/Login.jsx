const apiUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

export default function Login() {

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
        setError("");
        setSuccess("");

        // Validação campos obrigatórios
        if (!formData.email || !formData.senha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        /* Envio do formulário */
        try {

            const res = await fetch(`${apiUrl}auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {

                setError("Email ou senha incorretos.")
                console.error("Erro: ", data.erro)
            }

            setSuccess("Login realizado com sucesso! Redirecionando...")

            // redireciona para a página inicial após 1,5s
            setTimeout(() => navigate("/"), 1500);

        } catch (err) {

            console.error(err)
            setError("Erro ao conectar com o servidor.")
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

                        <label>Email</label> <br />
                        <input type="email" name="email" placeholder="Digite seu email" onChange={handleChange} required /> <br /> <br />

                    </div>

                    <div className="reg-form-item senha-input">

                        <label>Senha</label> <br />

                        {/* Campo de senha */}
                        <input type={mostrarSenha ? "text" : "password"} name="senha" className="senha-input"
                            placeholder="Digite sua senha" onChange={handleChange} required />

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

                    <button type="submit">Continuar</button>

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
