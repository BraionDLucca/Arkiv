import { useState, useEffect } from "react";
import "./Home.css";
import StudyPlan from "../components/StudyPlan";

function Home() {
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
        console.log(cursos)
        setStudyPlans(
          cursos.map((curso) => (
            
            <StudyPlan
              plano_id={curso.id}
              bannerSrc={curso.imagem_url}
              title={curso.titulo}
              tags={["Básico", "Intermediário"]}
              description={curso.descricao}
              authorImg="autorPlaceholder.png"
              authorName={curso.autor}
              rating={curso.nota_media}
              comments="12"
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