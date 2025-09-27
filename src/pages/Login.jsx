import { useNavigate } from "react-router-dom"
import "./RegisterLogin.css"

export default function Login() {

    const navigate = useNavigate()

    return <>
        <main className="register-container">

            {/*Semi círculo e Logo*/}
            <div className="circle-wrapper">
                <div className="circle">

                    <img src="./public/registerPageLogo.svg" alt="Logo"></img>
                </div>
            </div>

            {/*Formulários de Login*/}
            <div className="form-container">

                <form className="reg-form">
                    <h1>Login</h1>

                    <div className="reg-form-item">
                        <label>Email</label> <br />
                        <input type="email" placeholder="Digite seu email" /> <br /> <br />
                    </div>

                    <div className="reg-form-item">
                        <label>Senha</label> <br />
                        <input type="password" placeholder="Digite sua senha" /> <br /> <br />
                    </div>

                    <button type="submit">Continuar</button>

                    <div className="divide">
                        <hr className="divide-hr" />
                        <p className="divide-text">Ou</p>
                        <hr className="divide-hr" />
                    </div>

                    <div className="google-login">
                        <img src="./public/Google.png" alt="Continuar com Google" className="google-icon"></img>
                    </div>

                    <p className="login-text">
                        Não possui uma conta? <button type="button" className="swap-form-btn" onClick={() => navigate("/register")}>Cadastre-se</button>
                    </p>

                </form>

            </div>
        </main>
    </>
}