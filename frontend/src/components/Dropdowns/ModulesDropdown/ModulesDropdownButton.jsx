import "./ModulesDropdownButton.css"

// JSDoc
/** 
 * @param {{ 
 * dropdownOpen?: boolean,
 * currentModuleOrder: number, 
 * onClick?: function
 * }} props
 */

function ModulesDropdownButton({ dropdownOpen, currentModuleOrder, onClick }) {

    return <>
        <button className="dropdown-button" onClick={onClick}>

            <img src="/arrowIcon.svg" alt="Expandir lista"
                className={`arrow-icon ${dropdownOpen ? "arrow-icon-open" : ""}`}
            />

            <p id="selected-option">{`Módulo ${currentModuleOrder}`}</p>
        </button>
    </>
}

export default ModulesDropdownButton