import { useEffect, useState } from "react";
import "../DropdownContent.css"
const apiUrl = import.meta.env.VITE_API_URL;

// JSDoc
/** 
 * @param {{ 
 * studyPlanId: number, 
 * currentModuleOrder: number, 
 * }} props
 */

function ModulesDropdownContent({ studyPlanId, currentModuleOrder }) {

    const [modules, setModules] = useState([])

    useEffect(() => {

        async function getModules() {
            const res = await fetch(`${apiUrl}/planos/${studyPlanId}`)

            if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`)

            const currentStudyPlan = await res.json()

            setModules(currentStudyPlan.modulos)
        }

        try {
            getModules()
        } catch (error) {
            console.error("Erro ao buscar planos de estudos:", error);
        }

    }, [studyPlanId])


    // Ordena array de modulos em ordem crescente (baseado no atributo ordem de cada modulo)
    const orderedModules = [...modules].sort((a, b) => a.ordem - b.ordem);

    // Renderiza titulos dos modulos como opcoes do dropdown
    return (
        orderedModules.map((module, index) => {

            return <li
                className={
                    `content-option ${currentModuleOrder === module.ordem ?
                        "content-option-selected" : ""}`
                }
                value={module.titulo}
                key={index}
            >
                Módulo {module.ordem}: {module.titulo}
            </li>
        })
    )
}

export default ModulesDropdownContent