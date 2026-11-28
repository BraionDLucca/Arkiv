import { useState, cloneElement } from "react";
import "./Accordion.css"

/* Uso:
    <Accordion
        ButtonComponent={ <Botao prop={valor} /> }
        variant={"left"}>
        <Conteudo prop={valor} />
    </Accordion>
*/

// JSDoc
/** 
 * @param {{ 
 * TriggerComponent: React.ReactElement
 * }} props
 */

/* 'ButtonComponent' é o gatilho para abrir o conteúdo do Accordion.
'children' é o conteúdo (onde ficam as opções). */
function Accordion({ TriggerComponent, children }) {

    const [accordionOpen, setAccordionOpen] = useState(false)

    function toggleOpen() {
        setAccordionOpen((accordionOpen) => !accordionOpen)
    }

    const handleAccordionContainerClick = (e) => {
        e.stopPropagation()
    }

    return (
        <div className="accordion-container" onClick={(e) => handleAccordionContainerClick(e)}>
            {
                // Adicionando props à 'TriggerComponent' com cloneElement
                cloneElement(
                    TriggerComponent,
                    { onClick: toggleOpen, accordionOpen: accordionOpen }
                )
            }

            {/*Conteúdo do Accordion */}
            <ol className={`accordion-content-container ${accordionOpen ? "accordion-content-container-open" : ""}`}>
                {children}
            </ol>
        </div >
    )
}

export default Accordion