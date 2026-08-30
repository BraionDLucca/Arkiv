import { useEffect, useState } from "react";
import "./Dropdown.css"
const apiUrl = import.meta.env.VITE_API_URL;

function Dropdown({ planId, currentModuleOrder }) {

    const [modules, setModules] = useState([])

    const [dropdownOpen, setDropdownOpen] = useState(false)

    useEffect(() => {

        async function getModules() {
            const res = await fetch(`${apiUrl}/modulos`)

            if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`)

            setModules(await res.json())
        }

        try {
            getModules()
        } catch (error) {
            console.error("Erro ao buscar planos de estudos:", error);
        }

    }, [])

    // Descarta modulos de outros planos
    const currentPlanModules = modules.filter(module => module.id_plano == planId)

    // Ordena array de modulos em ordem crescente (baseado no atributo ordem de cada modulo)
    const orderedCurrentPlanModules = [...currentPlanModules].sort((a, b) => a.ordem - b.ordem);

    function toggleOpen() {
        setDropdownOpen((dropdownOpen) => !dropdownOpen)
    }

    // Renderiza titulos dos modulos como opcoes do dropdown
    return <>
        <div className="dropdown" onClick={toggleOpen}>

            <img src="./arrowIcon.svg" alt="Expandir lista"
                className={`arrow-icon ${dropdownOpen ? "arrow-icon-open" : ""}`} />

            <div id="selected-option">{`Módulo ${currentModuleOrder}`}</div>

        </div>

        <div className={`option-container ${dropdownOpen ? "option-container-open" : ""}`}>

            {orderedCurrentPlanModules.map((module, index) => {
                return <div
                    className={`option ${currentModuleOrder === module.ordem ? "option-selected" : ""}`}
                    value={module.titulo}
                    key={index}>
                    Módulo {module.ordem}: {module.titulo}
                </div>
            })}
        </div>
    </>
}

export default Dropdown