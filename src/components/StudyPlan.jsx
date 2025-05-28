import { useState } from "react"
import "./StudyPlan.css"

function StudyPlan() {

    const [showAllTags, setShowAllTags] = useState(false)

    const tags = ['Programação', 'Matemática', 'Computação', 'Lógica','Iniciante', 'Básico', 'Intermediário'];

    const maxTagsToShow = 4;
    
    // Se showAllTags for true, mostra todas as tags. Se falso,
    // mostra até a quantidade especificada em maxTagsToShow.
    const visibleTags = showAllTags ? tags : tags.slice(0, maxTagsToShow);

    const handleShowAllTags = () => {
        setShowAllTags(!showAllTags)
    }

    return <>

        <div className="study-plan">
            <div className="banner">

                <img src="./public/bannerPlaceholder.png" alt="Imagem do plano de estudos"></img>
            
            </div>

            <div className="tags">
                    {visibleTags.map((tag, index) => (
                        <p key={index} className="tag">{tag}</p>
                    ))}

                {tags.length > maxTagsToShow && (<button id="show-hide-btn">
                    <img src="./src/assets/Botao reticencias.svg" onClick={handleShowAllTags}></img>
                </button> )}

            </div>
            
            <div className="content">
                <p className="title">Introdução à linguagem C - Do básico ao intermediário</p>
                <p className="description">E aí, pessoal! Eu sou o Martin, desenvolvedor full stack e mentor de jovens programadores. Se você quer aprender a programar do zero e construir seus próprios sites, aplicativos ou jogos, esse plano é pra você. Vamos trabalhar com lógica de programação em C e montar projetos reais desde o começo. Vai ter código, vai ter erro, mas também vai ter muita conquista! Bora codar?</p>
            </div>

        </div>

        <div className="footer">

                <div className="author">

                    <img src="./public/autorPlaceholder.png" alt="Autor" className="author-item" id="author-avatar"/>
                    <span className="author-item" id="author-name">Martin_Programer</span>

                </div>

                <div className="feedback">

                    <img src="./public/estrela.svg" alt="Estrela" className="feedback-item" />
                    <span className="feedback-item" id="rating">4,6/5</span>

                    <img src="./public/comentario.svg" alt="Comentário" className="feedback-item" />
                    <span className="feedback-item" id="comment-number">14</span>

                </div>
            </div>

    </>

}

 export default StudyPlan