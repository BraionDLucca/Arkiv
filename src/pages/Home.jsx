import { useState, useEffect } from "react";
import "./Home.css";
import StudyPlan from "../components/StudyPlan";

function Home() {
  const [studyPlans, setStudyPlans] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/planos/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }
        return res.json();
      })
      .then((planos) => {

        setStudyPlans(
          planos.map((plano) => (
            
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
        );
      })
      .catch((error) => console.error("Erro ao buscar planos de estudos:", error));
  }, []); // [] garante que a API será chamada apenas na montagem do componente.

  return (
    <>
      <main>
        <div className="study-plan-container">
          {studyPlans.length > 0 ? (
            studyPlans
          ) : (
            <p className="loading">Carregando...</p>
          )}
        </div>
      </main>
    </>
  );
}

export default Home;