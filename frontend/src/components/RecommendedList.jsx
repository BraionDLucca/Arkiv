const apiUrl = import.meta.env.VITE_API_URL;
import "./RecommendedList.css"
import { useState, useEffect } from "react";
import StudyPlan from "./StudyPlan";

export default function RecommendedList({ tags, plano_id }) {

    const [studyPlans, setStudyPlans] = useState([]);

    const tags_param = tags.join(",")

    useEffect(() => {

        const loadPlans = async () => {

            const res = await fetch(`${apiUrl}/planos/recomendados?tags=${tags_param}`)

            if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

            const planos = await res.json()

            // Filtra para remover o próprio plano que está aberto
            const planosFiltrados = planos.filter(plano => plano.id !== plano_id);

            setStudyPlans(planosFiltrados);
        }

        try {
            loadPlans()
        } catch (error) {
            console.error("Erro ao buscar planos de estudos:", error)
        }

    }, [plano_id, tags_param]) // efeito é executado quando "plano_id" ou "tags_param" mudar.

    // Só exibe planos recomendados se houver.
    if (studyPlans.length === 0) {
        return <h2 className="no-recommended-text">
            Não encontramos outros planos parecidos com este.
        </h2>;
    }

    return <>

        <h2 className="more-title">Mais como este:</h2>

        <div className="recommended-list-wrapper">

            <div className="recommended-list-container">

                {studyPlans.map((plano) => (

                    <StudyPlan key={plano.id}
                        plano_id={plano.id}
                        bannerSrc={`/${plano.imagem_url}`}
                        title={plano.titulo}
                        tags={plano.tags}
                        description={plano.descricao}
                        authorImg="/autorPlaceholder.png"
                        authorName={plano.autor}
                        rating={plano.media_avaliacao || 0}
                        comments={plano.total_comentarios?.toString() || "0"}
                        onClick={() => window.scrollTo(0, 0)}
                    />
                ))}
            </div>
        </div>
    </>
}
