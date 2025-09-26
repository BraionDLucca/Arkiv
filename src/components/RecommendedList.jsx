import "./RecommendedList.css"
import { useState, useEffect, useRef } from "react";
import StudyPlan from "./StudyPlan";
import { useParams } from "react-router-dom";

export default function RecommendedList() {
    const [studyPlans, setStudyPlans] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/cursos")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Erro na requisição: ${res.status}`);
                }
                return res.json();
            })
            .then((cursos) => {
                
                setStudyPlans(cursos)
            })
            .catch((error) => console.error("Erro ao buscar planos de estudos:", error));
    }, []); // [] garante que a API será chamada apenas na montagem do componente.

    const scrollRef = useRef(0)

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -515, behavior: "smooth" });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 515, behavior: "smooth" });
    };

    return (
        <>
            <main className="recommended-list-wrapper">

                <button className="arrow-left" onClick={scrollLeft}>
                    <img src="../public/arrowIcon.svg" alt="Seta esquerda"></img>
                </button>

                <div className="recommended-list-container" ref={scrollRef}>
                    {studyPlans.length > 0 ? (

                        studyPlans.map((curso) => (

                        <StudyPlan key={curso.id}
                            plano_id={curso.id}
                            bannerSrc={curso.imagem_url}
                            title={curso.titulo}
                            tags={curso.tags}
                            description={curso.descricao}
                            authorImg="autorPlaceholder.png"
                            authorName={curso.autor}
                            rating={curso.nota_media}
                            comments="12"
                        />

                    ))

                    ) : (
                        <p className="loading">Carregando...</p>
                    )}
                </div>

                <button className="arrow-right" onClick={scrollRight}>
                    <img src="../public/arrowIcon.svg" alt="Seta direita"></img>
                </button>

            </main>
        </>
    );
}
