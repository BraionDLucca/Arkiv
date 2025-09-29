import "./RecommendedList.css"
import { useState, useEffect, useRef } from "react";
import StudyPlan from "./StudyPlan";

export default function RecommendedList({ tags, plano_id }) {
    const [studyPlans, setStudyPlans] = useState([]);

    const tags_param = tags.join(",")

    useEffect(() => {
        fetch("http://127.0.0.1:5000/planos/recomendados?tags=" + tags_param)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro na requisição: ${res.status}`);
                }
                return res.json();
            })
            .then((planos) => {

                // Filtra para remover o próprio plano que está aberto
                const planosFiltrados = planos.filter(plano => plano.id !== plano_id);
                setStudyPlans(planosFiltrados);
            })
            .catch((error) => console.error("Erro ao buscar planos de estudos:", error));
    }, []); // [] garante que a API será chamada apenas na montagem do componente


    const scrollRef = useRef(0)

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -515, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 515, behavior: "smooth" });
    };

    // Render condicional: só exibe a planos recomendados se houver.
    if (studyPlans.length === 0) {
        return <h2 className="no-recommended-text">Não encontramos outros planos parecidos com este.</h2>;
    }

    return (
        <>
            <main >

                <h2 className="more-title">Mais como este:</h2>

                <div className="recommended-list-wrapper">
                    <button className="arrow-left" onClick={scrollLeft}>
                        <img src="../public/arrowIcon.svg" alt="Seta esquerda"></img>
                    </button>

                    <div className="recommended-list-container" ref={scrollRef}>
                        {studyPlans.length > 0 ? (

                            studyPlans.map((plano) => (

                                <StudyPlan key={plano.id}
                                    plano_id={plano.id}
                                    bannerSrc={plano.imagem_url}
                                    title={plano.titulo}
                                    tags={plano.tags}
                                    description={plano.descricao}
                                    authorImg="/autorPlaceholder.png"
                                    authorName={plano.autor}
                                    rating={plano.media_avaliacao || 0}
                                    comments={plano.total_comentarios?.toString() || "0"}
                                />

                            ))

                        ) : (
                            <p className="loading">Carregando...</p>
                        )}
                    </div>

                    <button className="arrow-right" onClick={scrollRight}>
                        <img src="../public/arrowIcon.svg" alt="Seta direita"></img>
                    </button>
                </div>
            </main>
        </>
    );
}
