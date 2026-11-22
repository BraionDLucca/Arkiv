import "./Module.css";
import moduleIcon from "../assets/moduleIcon.svg"
import chapterIcon from "../assets/chapterIcon.svg"

function Modules({ title, order, chapterCount }) {

    return (
        <div className="module">

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