import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudyPlan.css";

function StudyPlan({ plano_id, bannerSrc, title, tags, description, authorImg, authorName, rating, comments }) {
    
    const navigate = useNavigate()

    const [showAllTags, setShowAllTags] = useState(false);
    const maxTagsToShow = 4;
    
    // Se showAllTags for true, mostra todas as tags. Se falso,
    // mostra até a quantidade especificada em maxTagsToShow.
    const visibleTags = showAllTags ? tags : tags.slice(0, maxTagsToShow);

    return (

        <div className="study-plan-wrapper" onClick={() => navigate(`/cursos/${plano_id}`)}>

            <div className="study-plan">

                {/* Banner do plano de estudos */}
                <div className="banner">

                    <img src={bannerSrc} alt="Imagem do plano de estudos" className="banner-img"/>

                    <button className="save-button">
                        <img src="./src/assets/botaoSalvar.svg" alt="Salvar" />
                    </button>

                </div>
                
                <div className="content">
                    
                    {/* Título */}
                    <p className="title">{title}</p>

                    {/* Tags */}
                    <div className="tags">

                        {visibleTags.map((tag, index) => (
                            <p key={index} className="tag">{tag}</p>
                        ))}

                        {tags.length > maxTagsToShow && (
                            <button id="show-hide-btn" onClick={() => setShowAllTags(!showAllTags)}>
                                <img src="./src/assets/Botao reticencias.svg" alt="Expandir tags" />
                            </button>
                        )}

                    </div>

                    {/* Descrição */}
                    <p className="description">{description}</p>

                </div>
            </div>

            {/* Rodapé do plano de estudos */}

            <div className="study-plan-footer">

                <div className="author">

                    <img src={authorImg} alt="Autor" className="author-item" id="author-avatar" />
                    <span className="author-item" id="author-name">{authorName}</span>

                </div>

                <div className="feedback">

                    <img src="./public/estrela.svg" alt="Estrela" className="feedback-item" />
                    <span className="feedback-item" id="rating">{rating}/5</span>

                    <img src="./public/comentario.svg" alt="Comentário" className="feedback-item" />
                    <span className="feedback-item" id="comment-number">{comments}</span>
                    
                </div>
            </div>
        </div>
    );
}

export default StudyPlan;