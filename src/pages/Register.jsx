import "./Register.css"

export default function Register() {
    return <>
        <main className="register-container">

            {/*Semi círculo e Logo*/}
            <div className="circle">

                <img src="./public/registerPageLogo.svg" alt="Logo"></img>
            </div>

            {/*Formulário*/}
            <div className="form-container">
                <form className="reg-form">
                    <h2>Cadastro</h2>

                    <div className="reg-form-item">
                        <label>Email</label> <br />
                        <input type="email" placeholder="Digite seu email" /> <br /> <br />
                    </div>

                    <div className="reg-form-item">
                        <label>Senha</label> <br />
                        <input type="password" placeholder="Digite sua senha" /> <br /> <br />
                    </div>

                    <div className="reg-form-item">
                        <label>Confirmar Senha</label> <br />
                        <input type="password" placeholder="Confirme sua senha" /> <br /> <br />
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

                </form>
            </div>

        </main>
    </>
}