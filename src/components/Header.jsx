import { useNavigate } from "react-router-dom";
import notifcationBtnImg from "../assets/botaoNotificacoes.svg"
import searchBtnImg from "../assets/botaoLupa.svg"
import './Header.css'

function Header() {

    const navigate = useNavigate();

    return <>
        <header>
            <nav>
                <div className='left-section'>
                
                <button className='logo-btn' onClick={() => navigate("/")}>
                    <img src="/logoHeader.svg" id='logo-1' alt='Logo'></img>
                </button>

                <div className='search-bar'>
                    
                    <input type='text' placeholder='Buscando otimizar seus estudos?'></input>
                    
                    <button className='search-btn'>
                        <img src={searchBtnImg} alt='Botão buscar'></img>
                    </button>
                </div>

                </div>

                <div className='right-section'>

                <button className='notification-btn'>
                    <img src={notifcationBtnImg} alt='Botão notificações'></img>
                </button>

                {/*Pegar imagem de perfil do usuário do banco*/}
                <button className='profile-btn' onClick={() => navigate("/profile")}>
                    <img src="/perfilImg.svg" alt='Imagem de perfil'></img>
                </button>

                </div>
            </nav>
        </header>
    </>
}

export default Header