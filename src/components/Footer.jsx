import "./Footer.css"

function Footer() {
    return <>
    <div className="footer">

        <div className="top-section">

            <div className="logo-and-phrase">

                <img src="./public/logo2.svg" alt="Logo"></img>

                <span>Sua plataforma colaborativa para compartilhar materiais e planos de estudo, conectando quem aprende com quem ensina.</span>

            </div>

            <div className="socials">
                    <img src="./public/instagramLogo.svg" alt="Instagram logo"></img>
                    <img src="./public/whatsappLogo.svg" alt="Whatsapp logo"></img>
                    <img src="./public/xLogo.svg" alt="X logo"></img>
                    <img src="./public/facebookLogo.svg" alt="Facebook logo"></img>
            </div>
        </div>

        <div className="helpful-links">

            <div className="helpful-links-text">
                <p className="title">Ajuda</p>
                <p>Contate-nos</p>
                <p>Sobre nós</p>
                <p>Suporte</p>
            </div>

            <div className="helpful-links-text">
                <p className="title">Recursos</p>
                <p>Planos de estudo</p>
                <p>Feedback</p>
                <p>Novidades</p>
            </div>

            <div className="helpful-links-text">
                <p className="title">Conta</p>
                <p>Criar conta</p>
                <p>Entrar na conta</p>
                <p>Sair da conta</p>
            </div>

            <div className="helpful-links-text">
                <p className="title">Políticas</p>
                <p>Termos e condições</p>
                <p>Política de privacidade</p>
                <p>Política de cookies</p>
            </div>
        </div>
        
    </div>
    </>
}

export default Footer