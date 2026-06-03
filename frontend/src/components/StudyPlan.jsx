import { useEffect, useState } from "react";
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
        event.stopPropagation(); // Evita a ação de clique da div pai

        // TO-DO: lógica de salvar um plano de estudo.
    }

    // Mostra as imagens apenas quando forem completamente baixadas
    useEffect(() => {

        function loadBanners() {

        const bannerDivs = document.querySelectorAll(".banner")

        bannerDivs.forEach(div => {

            const img = div.querySelector("img")

            // Adiciona classe loaded
            function loaded() {
                img.classList.add("loaded")
                
            }

            // Verifica se a imagem foi baixada
            if (img.complete) {
                loaded()
            } else {
                img.addEventListener("load", loaded)
            }
        })
    }
    
    loadBanners()

    }, [])
    
    return (

        <div className="study-plan-wrapper">

            <div className="study-plan">

                {/* Banner do plano de estudos */}
                <div className="banner" onClick={() => navigate(`/planos/${plano_id}`)}>

                    <img src={bannerSrc} alt="Imagem do plano de estudos" className="banner-img"
                        loading="lazy" />

                    {/* Botão de Salvar */}
                    <button className="save-button" onClick={handleSaveBtn}>
                        <img src={saveBtnImg} alt="Salvar" loading="lazy" />
                    </button>

                </div>

                <div className="content" onClick={() => navigate(`/planos/${plano_id}`)}>

                    {/* Título */}
                    <h1 className="study-plan-title">{title}</h1>

                    {/* Tags */}
                    <div className="tags">

                        {visibleTags.map((tag, index) => (
                            <p key={index} className="tag">{tag}</p>
                        ))}

                        {/* Botão para mostrar/esconder todas as tags */}

                        {tags.length > maxTagsToShow && (
                            /* Renderização condicional apenas com condição verdadeira, "&&" ao invés de "?" e ":" */

                            <button id="show-hide-btn" onClick={(e) => {
                                e.stopPropagation() // Evita abrir o plano de estudo ao clicar
                                setShowAllTags(!showAllTags)
                            }}>

                                <img src={expandBtnImg} alt="Expandir tags" />
                            </button>
                        )}

                    </div>

                    {/* Descrição */}
                    <div className="description">

                        {/* Se a descrição tiver mais de 131 caracteres,
                        limitar a 19 palavras e adicionar "..." */}
                        <p className="description">{description.length > 131 ?
                            description.split(' ').slice(0, 19).join(' ') + "..." : description}</p>
                    </div>

                </div>
            </div>

            {/* Rodapé do plano de estudos */}
            <div className="study-plan-footer">

                {/* Imagem e nome do autor */}
                <div className="author">

                    <img src={authorImg} alt="Autor" className="author-item" id="author-avatar" loading="lazy" />

                    <span className="author-item" id="author-name">{
                        authorName}</span>

                </div>

                {/* Avaliação e qtd. de comentários */}
                <div className="feedback">

                    <img src="/estrela.svg" alt="Estrela" className="feedback-item" loading="lazy" />
                    
                    <span className="feedback-item" id="rating">{
                                                            Number(rating) ? Number(rating).toFixed(1)
                                                            :
                                                            rating}/5</span>

                    <img src="/comentario.svg" alt="Comentário" className="feedback-item" loading="lazy" />
                    <span className="feedback-item" id="comment-number">{comments}</span>

                </div>
            </div>
        </div>
    );
}

export default StudyPlan;