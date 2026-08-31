import { useState, cloneElement } from "react";
/*

'ButtonComponent' é o gatilho para abrir o conteúdo do Dropdown.
'children' é o conteúdo (onde ficam as opções).

Uso:
    <Dropdown ButtonComponent={ <Botao prop={valor} /> }>
        <Conteudo prop={valor} />
    </Dropdown>

*/

function Dropdown({ ButtonComponent, children }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    function toggleOpen() {
        setDropdownOpen((dropdownOpen) => !dropdownOpen)
    }

    return <>
        {
            // Adicionando props à 'ButtonComponent' com cloneElement
            cloneElement(
                ButtonComponent,
                { onClick: toggleOpen, dropdownOpen: dropdownOpen }
            )
        }

        <ul className={
            `dropdown-content-container ${dropdownOpen ? "dropdown-content-container-open" : ""}`
        }>
            {children}
        </ul>
    </>
}

export default Dropdown