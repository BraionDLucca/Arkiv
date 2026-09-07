const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import "./ModulesPage.css";
import { useParams } from "react-router-dom";
import Modules from "../components/Module";

function ModulesPage() {

    const [modulesList, setModulesList] = useState([])

    const { id } = useParams()

    useEffect(() => {

        const loadModules = async () => {

            const res = await fetch(`${apiUrl}/planos/${id}`)

            if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`)

            const currentStudyPlan = await res.json()

            setModulesList(currentStudyPlan.modulos)
        }

        try {
            loadModules()

        } catch (error) {
            console.error("Erro ao buscar módulos do planos de estudos:", error);
        }

    }, [id])

    // Ordena array de modulos em ordem crescente (baseado no atributo ordem de cada modulo)
    const orderedModules = [...modulesList].sort((a, b) => a.ordem - b.ordem)

    return (
        <main>
            <div className="modules-container">

                <h1>Módulos</h1>

                {
                    orderedModules.map((module, index) => {

                        return <Modules
                            titulo={module.titulo}
                            ordem={module.ordem}
                            key={index}
                        />
                    })
                }

            </div>
        </main>
    )
}

export default ModulesPage;