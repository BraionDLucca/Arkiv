const apiUrl = import.meta.env.VITE_API_URL;
import { useState, useEffect, Suspense } from "react";
import "./Home.css";
import StudyPlan from "../components/StudyPlan";
import StudyPlanSkeleton from "../skeletons/StudyPlanSkeleton";

function Home() {

  const [studyPlans, setStudyPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPlans = async () => {

      await fetch(`${apiUrl}/planos/todos`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
          }
          return res.json();
        })
        .then((planos) => {

          setStudyPlans(
            planos.map((plano) => (

              <Suspense fallback={<StudyPlanSkeleton />}>
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
              </Suspense>

            ))
          );
          setIsLoading(false)
        })
        .catch((error) => console.error("Erro ao buscar planos de estudos:", error));
    }

    loadPlans()

  }
    , []); // [] garante que a API será chamada apenas na montagem do componente.

  return (
    <>
      <main>
        <div className="study-plan-container">

          {isLoading ?

            <>
              <StudyPlanSkeleton />
              <StudyPlanSkeleton />
              <StudyPlanSkeleton />
              <StudyPlanSkeleton />
            </>

            : studyPlans}

        </div>
      </main>
    </>
  )
}

export default Home;