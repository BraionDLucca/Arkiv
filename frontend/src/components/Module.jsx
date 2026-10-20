import "./Module.css";
import moduleIcon from "../assets/moduleIcon.svg"
import chapterIcon from "../assets/chapterIcon.svg"

function Modules({ titulo, ordem }) {


    return (
        <div className="module">

            <div>
                <img src={moduleIcon} alt="Módulo" />
                <span><b>Módulo {ordem}:</b> {titulo}</span>
            </div>

            <hr />

            <div>
                <img src={chapterIcon} alt="Capítulo" />
                <span>5 capítulos</span>
            </div>

        </div>
    )
}

export default Modules