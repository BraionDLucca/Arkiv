import { useState } from "react";
import "./RegisterLogin.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const navigate = useNavigate()

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

        // Validação de senha
        if (formData.senha !== confirmSenha) {
            setError("As senhas não coincidem!")
            return
        }

        // Validação mínima de senha (8 caracteres)
        if (formData.senha.length < 8) {
            setError("A senha precisa ter no mínimo 8 caracteres.")
            return
        }

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if (res.ok) {
                setSuccess("Cadastro realizado com sucesso! Redirecionando para login...")
                setTimeout(() => navigate("/login"), 1500); // redireciona após 1,5s
            } else {
                // Erro retornado do backend
                setError(data.erro || "Ocorreu um erro ao cadastrar.")
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao conectar com o servidor.")
        }
    }


    return (
        <main className="register-container">

            <div className="circle-wrapper">
                <div className="circle">
                    <img src="./public/registerPageLogo.svg" alt="Logo" />
                </div>
            </div>

            <div className="form-container">

                <form className="reg-form" onSubmit={handleSubmit}>
                    <h1>Cadastro</h1>

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

                    <div className="reg-form-item">
                        <label>Confirmar Senha *</label> <br />
                        <input type="password" placeholder="Confirme sua senha" value={confirmSenha} onChange={handleConfirmChange} required /> <br /> <br />
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
                        Já possui uma conta? <button type="button" className="swap-form-btn" onClick={() => navigate("/login")}>Faça login</button>
                    </p>

                </form>

            </div>
        </main>
    )
}
