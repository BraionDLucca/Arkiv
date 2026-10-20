import "./ModulesDropdownButton.css"

// JSDoc
/** 
 * @param {{ 
 * dropdownOpen?: boolean,
 * currentModuleOrder: number, 
 * onClick?: function
 * }} props
 */

function ModulesDropdownButton({ dropdownOpen, currentModuleOrder, onClick, children }) {

    return <>
        <button className="dropdown-button" onClick={onClick}>

            <img src="/arrowIcon.svg" alt="Expandir lista"
                className={`arrow-icon ${dropdownOpen ? "arrow-icon-open" : ""}`}
            />

            <span id="selected-option">{`Módulo ${currentModuleOrder}`}</span>

            {/* Utilizado para o capítulo atual em ChapterContent */}
            {children}

        </button>
    </>
}

export default ModulesDropdownButton