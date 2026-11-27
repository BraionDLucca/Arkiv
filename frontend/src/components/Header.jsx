
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

import searchIcon from "../assets/searchIcon.svg";
import "./Header.css";
import Button from "../components/Button";

function Header() {

    const navigate = useNavigate();

    // Obtém o estado de autenticação do contexto
    const { isAuthenticated, isLoading, logout } = useAuth();

    // Encerra o estado local e redireciona
    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header>

            <button
                className="logo-btn"
                onClick={() => navigate("/")}
            >
                <img
                    src="/logoHeader.png"
                    id="logo-1"
                    alt="Logo ARKIV"
                />
            </button>

            <div className="search-bar">

                <input
                    name="search-input"
                    type="text"
                    placeholder="Buscar planos de estudo"
                />

                <Button
                    variant="primary"
                    size="medium"
                    className="search-btn"
                >
                    <img src={searchIcon} alt="Buscar" />
                </Button>

            </div>

            <div className="right-section">

                {isLoading ? (
                    <span>Carregando...</span>
                ) : isAuthenticated ? (
                    <>
                        <button
                            className="register-btn"
                            onClick={() => navigate("/profile")}
                        >
                            Meu Perfil
                        </button>

                        <Button
                            className="login-btn"
                            onClick={handleLogout}
                        >
                            Sair
                        </Button>
                    </>
                ) : (
                    <>
                        <button
                            className="register-btn"
                            name="registrar"
                            onClick={() => navigate("/register")}
                        >
                            Registre-se
                        </button>

                        <Button
                            className="login-btn"
                            name="logar"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                    </>
                )}

            </div>

        </header>
    );
}

export default Header;
