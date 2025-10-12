import { useNavigate } from "react-router-dom";
import notifcationBtnImg from "../assets/botaoNotificacoes.svg"
import searchBtnImg from "../assets/botaoLupa.svg"
import './Header.css'

function Header() {

    const navigate = useNavigate();

    return <>
        <header>

                <button className='logo-btn' onClick={() => navigate("/")}>
                    <img src="/logoHeader.svg" id='logo-1' alt='Logo'></img>
                </button>

                <div className='search-bar'>

                    <input type='text' placeholder='Buscando otimizar seus estudos?'></input>

                    <button className='search-btn'>
                        <img src={searchBtnImg} alt='Botão buscar'></img>
                    </button>
                </div>

            

            <div className='right-section'>

                <button className='register-btn' name="registrar" onClick={() => navigate("/register")}>
                    Registre-se
                </button>

                <button className='login-btn' name="logar" onClick={() => navigate("/login")}>
                    Login
                </button>

            </div>

        </header>
    </>
}

export default Header