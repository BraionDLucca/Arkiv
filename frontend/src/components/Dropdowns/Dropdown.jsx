import { useState, cloneElement, useRef, useEffect } from "react";
import "./Dropdown.css"

/* Uso:
    <Dropdown
        ButtonComponent={ <Botao prop={valor} /> }
        variant={"left"}>
        <Conteudo prop={valor} />
    </Dropdown>
*/

// JSDoc
/** 
 * @param {{ 
 * ButtonComponent: React.ReactElement,
 * variant: "left" | "right" | "wide",
 * }} props
 */

/* 'ButtonComponent' é o gatilho para abrir o conteúdo do Dropdown.
'children' é o conteúdo (onde ficam as opções). */
function Dropdown({ ButtonComponent, variant, children }) {

    const [dropdownOpen, setDropdownOpen] = useState(false)

    const dropdownRef = useRef()

    const variants = {
        "left": "dropdown-content-variant-left",
        "right": "dropdown-content-variant-right",
        "wide": "dropdown-content-variant-wide"
    }

    const dropdownContentClassNames = [
        "dropdown-content-container",
        `${dropdownOpen ? "dropdown-content-container-open" : ""}`,
        variants[variant]
    ]

    useEffect(() => {

        // Monitora se houve um clique fora do dropdown para fechar o conteúdo
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("click", handler)

        return () => {
            document.removeEventListener("click", handler)
        }

    }, [dropdownRef])


    function toggleOpen() {
        setDropdownOpen((dropdownOpen) => !dropdownOpen)
    }

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            {
                // Adicionando props à 'ButtonComponent' com cloneElement
                cloneElement(
                    ButtonComponent,
                    { onClick: toggleOpen, dropdownOpen: dropdownOpen }
                )
            }

            {/*Conteúdo do Dropdown */}
            <ul className={dropdownContentClassNames.join(" ")}>
                {children}
            </ul>
        </div>
    )
}

export default Dropdown