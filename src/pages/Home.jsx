import "./Home.css"
import StudyPlan from "../components/StudyPlan"

function Home() {
    return <>
        <main>
            {/*Aqui tem q ter uma lógica de puxar uma certa quantidade de planos do banco de dados
            e renderizar cada um de acordo com as informações.*/}
            <div className="study-plan-container">
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            <StudyPlan />
            </div>
        </main>
    </>
}

export default Home