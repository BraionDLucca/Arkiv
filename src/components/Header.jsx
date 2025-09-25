import { useNavigate } from "react-router-dom";
import './Header.css'

function Header() {

    const navigate = useNavigate();

    return <>
        <header>
            <nav>
                <div className='left-section'>
                
                <button className='logo-btn' onClick={() => navigate("/")}>
                    <img src="./public/logo1.svg" id='logo-1' alt='Logo'></img>
                </button>

                <div className='search-bar'>
                    
                    <input type='text' placeholder='Buscando otimizar seus estudos?'></input>
                    
                    <button className='search-btn'>
                        <img src="./src/assets/Botao lupa.svg" alt='Botão buscar'></img>
                    </button>
                </div>

                </div>

                <div className='right-section'>

                <button className='notification-btn'>
                    <img src="./src/assets/Botão Notificações.svg" alt='Botão notificações'></img>
                </button>

                {/*Pegar imagem de perfil do usuário do banco*/}
                <button className='profile-btn' onClick={() => navigate("/profile")}>
                    <img src="./public/Imagem de perfil.svg" alt='Imagem de perfil'></img>
                </button>

                </div>
            </nav>
        </header>
    </>
}

export default Header