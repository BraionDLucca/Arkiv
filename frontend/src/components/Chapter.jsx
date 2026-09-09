import "./Chapter.css";
import articleIcon from "../assets/articleIcon.svg"
import videoIcon from "../assets/videoIcon.svg"

function Chapter({ imagem, titulo, ordem, artigosQtd, videosQtd }) {


    return (
        <div className="chapter">

            <img src={imagem} alt={titulo} className="chapter-image" />

            <div className="chapter-info">

                <span className="chapter-number">Capítulo {ordem}</span>

                <h2>{titulo}</h2>

                <div className="chapter-stats">
                    <span>
                        <img src={articleIcon} alt="Quantidade de artigos" />
                        {artigosQtd} artigos
                    </span>

                    <span>
                        <img src={videoIcon} alt="Quantidade de artigos" />
                        {videosQtd} vídeos
                    </span>
                </div>

            </div>

        </div>
    )
}

export default Chapter;