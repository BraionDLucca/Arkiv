import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/searchIcon.svg"
import './Header.css'
import Button from "../components/Button";

function Header() {

    const navigate = useNavigate();

    return <>
        <header>

            <button className='logo-btn' onClick={() => navigate("/")}>
                <img src="/logoHeader.png" id='logo-1' alt='Logo'></img>
            </button>

            <div className='search-bar'>

                <input name="search-input" type='text' placeholder='Buscar planos de estudo' />

                <Button variant="primary" size="medium" className="search-btn">
                    <img src={searchIcon} alt='Buscar' />
                </Button>
            </div>

            <div className='right-section'>

                <button
                    variant="tertiary"
                    className='register-btn'
                    name="registrar"
                    onClick={() => navigate("/register")}
                >
                    Registre-se
                </button>

                <Button
                    className='login-btn'
                    name="logar"
                    onClick={() => navigate("/login")}
                >
                    Login
                </Button>
            </div>
        </header>
    </>
}

export default Header