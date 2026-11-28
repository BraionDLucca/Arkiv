import "./Module.css";
import moduleIcon from "../assets/moduleIcon.svg"
import chapterIcon from "../assets/chapterIcon.svg"
import { useNavigate } from "react-router-dom";

function Modules({ studyPlanId, moduleId, title, order, chapterCount }) {

    const navigate = useNavigate()

    return (
        <div
            className="module"
            onClick={() => navigate(
                `/planos/${studyPlanId}/modulos/${moduleId}/capitulos`
            )}
        >

            <div>
                <img src={moduleIcon} alt="Módulo" />
                <span><b>Módulo {order}:</b> {title}</span>
            </div>

            <hr />

            <div>
                <img src={chapterIcon} alt="Capítulo" />
                <span>{chapterCount} capítulos</span>
            </div>

        </div>
    )
}

export default Modules