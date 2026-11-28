import "../ChaptersAccordion/ChaptersAccordionTrigger.css"

function ChaptersAccordionTrigger({ currentModuleId, module, onClick, accordionOpen }) {

    let selectedModule = ""

    if (module.id === currentModuleId) selectedModule = "accordion-trigger-selected"

    return (
        <div
            className="accordion-trigger-container"
            onClick={() => onClick(accordionOpen)}
        >

            {/* O módulo atualmente acessado será destacado na lista de Accordions */}
            <div className={`accordion-trigger ${selectedModule}`}>

                <img src="/arrowIcon.svg" alt="Exibir capítulos do módulo" />

                <span>Módulo {module.ordem}: {module.titulo}</span>

            </div>
        </div>
    )
}

export default ChaptersAccordionTrigger