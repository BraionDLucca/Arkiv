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

      try {

        const res = await fetch(`${apiUrl}/planos/todos`)

        if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`)

        const planos = await res.json();

        setStudyPlans(planos)

      } catch (error) {
        console.error("Erro ao buscar planos de estudos:", error);

      } finally {

        setIsLoading(false)
      }
    }

    loadPlans()
  }, []); // [] garante que a API será chamada apenas na montagem do componente.

  return (
    <main>
      <div className="study-plan-container">

        {isLoading ?

          <>
            <StudyPlanSkeleton />
            <StudyPlanSkeleton />
            <StudyPlanSkeleton />
            <StudyPlanSkeleton />
            <StudyPlanSkeleton />
            <StudyPlanSkeleton />
          </>

          :

          studyPlans.map((plano) => (

            <StudyPlan key={plano.id}
              plano_id={plano.id}
              bannerSrc={plano.imagem_url}
              title={plano.titulo}
              tags={plano.tags}
              description={plano.descricao}
              authorImg="/autorPlaceholder.png"
              authorName={plano.autor}
              rating={plano.media_avaliacao || "–"}
              comments={plano.total_comentarios?.toString() || "0"}
            />

          ))}

      </div>
    </main>
  )
}

export default Home;