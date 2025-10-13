import { useState } from "react";
import { useNavigate } from "react-router-dom";
import saveBtnImg from "../assets/botaoSalvar.svg";
import expandBtnImg from "../assets/Botao reticencias.svg"
import "./StudyPlan.css";

function StudyPlan({ plano_id, bannerSrc, title, tags, description, authorImg, authorName, rating, comments }) {
    
    const navigate = useNavigate()

    const [showAllTags, setShowAllTags] = useState(false);
    const maxTagsToShow = 3;

    if (!tags) tags = [] // Se o array tags não existir, usa um array vazio.

    // Se showAllTags for true, mostra todas as tags. Se falso,
    // mostra até a quantidade especificada em maxTagsToShow.
    const visibleTags = showAllTags ? tags : tags.slice(0, maxTagsToShow);

    const handleSaveBtn = (event) => {
        event.stopPropagation(); // Evita a ação da div pai

        // Aqui entra a lógica de salvar um plano de estudo.
    }

    return (

        <div className="study-plan-wrapper">

            <div className="study-plan">

                {/* Banner do plano de estudos */}
                <div className="banner" onClick={() => navigate(`/planos/${plano_id}`)}>

                    <img src={bannerSrc} alt="Imagem do plano de estudos" className="banner-img"/>

                    {/* Botão de Salvar */}
                    <button className="save-button" onClick={handleSaveBtn}>
                        <img src={saveBtnImg} alt="Salvar" />
                    </button>

                </div>
                
                <div className="content" onClick={() => navigate(`/planos/${plano_id}`)}>
                    
                    {/* Título */}
                    <p className="title">{title}</p>

                    {/* Tags */}
                    <div className="tags">

                        {visibleTags.map((tag, index) => (
                            <p key={index} className="tag">{tag}</p>
                        ))}

                        {tags.length > maxTagsToShow && (
                            <button id="show-hide-btn" onClick={(e) => {
                                                            e.stopPropagation()
                                                            setShowAllTags(!showAllTags)}}>

                                <img src={expandBtnImg} alt="Expandir tags" />
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

                    <img src="/estrela.svg" alt="Estrela" className="feedback-item" />
                    <span className="feedback-item" id="rating">{rating}/5</span>

                    <img src="/comentario.svg" alt="Comentário" className="feedback-item" />
                    <span className="feedback-item" id="comment-number">{comments}</span>
                    
                </div>
            </div>
        </div>
    );
}

export default StudyPlan;