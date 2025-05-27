import './Header.css'

function Header() {
    return <>
        <header>
            <nav>
                <div className='left-section'>
                
                <img src="./public/Logo com fundo.svg" id='logo-with-bg' alt='Logo'></img>
        
                <div className='search-bar'>
                    
                    <input type='text' placeholder='Buscando otimizar seus estudos?'></input>
                    
                    <a href=''>
                        <img src="./src/assets/Botao lupa.svg" alt='Botão buscar'></img>
                    </a>
                </div>

                </div>

                <div className='right-section'>

                <a href=''>
                    <img src="./src/assets/Botão Notificações.svg" id="notifications-btn" alt='Botão notificações'></img>
                </a>

                <a href=''>
                    <img src="./public/Imagem de perfil.svg" alt='Imagem de perfil' id='profile-pic'></img>
                </a>

                </div>
            </nav>
        </header>
    </>
}

export default Header