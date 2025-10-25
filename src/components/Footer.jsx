import "./Footer.css"

function Footer() {
    return <>
        <div className="footer">

            <div className="top-section">

                <img src="/logoFooter.svg" alt="Logo"></img>

                <h3>Sua plataforma colaborativa para compartilhar materiais e planos de estudo, conectando quem aprende com quem ensina.</h3>

                <div className="socials">
                    <img src="/instagramLogo.svg" alt="Instagram logo"></img>
                    <img src="/whatsappLogo.svg" alt="Whatsapp logo"></img>
                    <img src="/xLogo.svg" alt="X logo"></img>
                    <img src="/facebookLogo.svg" alt="Facebook logo"></img>
                </div>
            </div>

            <div className="helpful-links">

                <div className="helpful-links-text">

                    <p className="title">Ajuda</p>
                    <a href="">Contate-nos</a>
                    <a href="">Sobre nós</a>
                    <a href="">Suporte</a>
                </div>

                <div className="helpful-links-text">

                    <p className="title">Recursos</p>
                    <a href="">Planos de estudo</a>
                    <a href="">Feedback</a>
                    <a href="">Novidades</a>
                </div>

                <div className="helpful-links-text">

                    <p className="title">Conta</p>
                    <a href="">Criar conta</a>
                    <a href="">Entrar na conta</a>
                    <a href="">Sair da conta</a>
                </div>

                <div className="helpful-links-text">
                    <p className="title">Políticas</p>
                    <a href="">Termos e condições</a>
                    <a href="">Política de privacidade</a>
                    <a href="">Política de cookies</a>
                </div>
            </div>

        </div>
    </>
}

export default Footer