import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterLogin.css";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        senha: "",
    });

    const [error, setError] = useState(""); // para mostrar mensagens de erro
    const [success, setSuccess] = useState(""); // mensagem de sucesso

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validação mínima
        if (!formData.email || !formData.senha) {
            setError("Preencha todos os campos obrigatórios.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {

                setSuccess("Login realizado com sucesso! Redirecionando...")
                setTimeout(() => navigate("/"), 1500); // redireciona para a home

            } else {

                setError(data.erro || "Email ou senha incorretos.")
            }

        } catch (err) {

            console.error(err)
            setError("Erro ao conectar com o servidor.")
        }
    };

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
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}

                    <div className="reg-form-item">
                        <label>Email *</label> <br />
                        <input type="email" name="email" placeholder="Digite seu email" onChange={handleChange} required /> <br /> <br />
                    </div>

                    <div className="reg-form-item">
                        <label>Senha *</label> <br />
                        <input type="password" name="senha" placeholder="Digite sua senha" onChange={handleChange} required /> <br /> <br />
                    </div>

                    <button type="submit">Continuar</button>

                    <div className="divide">
                        <hr className="divide-hr" />
                        <p className="divide-text">Ou</p>
                        <hr className="divide-hr" />
                    </div>

                    <div className="google-login">
                        <img src="./public/Google.png" alt="Continuar com Google" className="google-icon" />
                    </div>

                    <p className="login-text">
                        Não possui uma conta? <button type="button" className="swap-form-btn" onClick={() => navigate("/register")}>Cadastre-se</button>
                    </p>

                </form>

            </div>
        </main>
    );
}
