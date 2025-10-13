import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OpenStudyPlan.css";
import RecommendedList from "../components/RecommendedList";
import OpenStudyPlanSkeleton from "../components/Skeletons/OpenStudyPlanSkeleton";

const OpenStudyPlan = () => {
    const { id } = useParams();

    const [plano, setPlano] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const [erro, setErro] = useState(null);
    const [isMobile, setIsMobile] = useState()


    useEffect(() => {
        fetch(`http://localhost:5000/planos/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os dados do plano.");
                }
                return response.json();
            })
            .then((data) => {
                setPlano(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setErro(error.message);
                setIsLoading(false);
            });
    }, [id]);

    if (erro) {

        console.error(erro);
    }

    /* Checa por uma resolução específica para usar renderização condicional */
    const mediaQuery = window.matchMedia('(max-width: 650px)');

    function handleChange(e) {

        if (e.matches) {
            setIsMobile(true)

        } else {
            setIsMobile(false)
        }
    }

    mediaQuery.addEventListener('change', handleChange);


    return isLoading ? <OpenStudyPlanSkeleton /> : (

        <div className="open-study-plan-container">

            <div
                style={{ backgroundImage: `url(${plano.imagem_url})` }}
                alt="Banner do Plano"
                className="open-study-banner"
            />

            <h2 className="open-study-plan-title">{plano.titulo}</h2>

            <section className="description-and-statistics">

                <div className="open-study-left-section">

                    <div className="author-date-rating">

                        <div className="author-date">

                            <img src="/autorPlaceholder.png" alt="Perfil do autor" />
                            <span>{plano.autor}</span>
                            <span>•</span>
                            <span className="data-publicacao">{plano.data_publicacao}</span>

                        </div>

                        <div className="rating">

                            <img src="/estrela.svg" alt="Estrela" className="feedback-item" />
                            <span className="rating">
                                {plano.nota_media ? `${plano.nota_media}/5` : "Sem avaliações"}
                            </span>

                        </div>
                    </div>

                    <div className="tags">
                        {plano.tags.map((tag, index) => (
                            <span key={index}>{tag}</span>
                        ))}
                    </div>

                    <div className="descricao">
                        <p>{plano.descricao}</p>
                    </div>

                </div>

                {isMobile ?

                    <ul className="estatisticas stats-lists stats-second-list">

                        <li><img src="/salvosIcon.svg" alt="Salvos" /> 867 Salvos</li>
                        <li><img src="/curtidasIcon.svg" alt="Curtidas" /> 755 Curtidas</li>
                        <li><img src="/iniciaramIcon.svg" alt="Iniciaram o Plano" /> 984 Iniciaram</li>

                    </ul>

                    :

                    <section className="details-grid">

                        <div className="estatisticas">

                            <h3>Estatísticas do plano:</h3>

                            <div className="stats-lists">
                                <ul className="stats-first-list">
                                    <li><img src="/documentosIcon.svg" alt="Documentos" /> 80 Documentos</li>
                                    <li><img src="/aulasIcon.svg" alt="Aulas" /> 104 Aulas</li>
                                    <li><img src="/atividadesIcon.svg" alt="Atividades" /> 87 Atividades</li>
                                    <li><img src="/testesIcon.svg" alt="Testes" /> 14 Testes</li>

                                </ul>

                                <hr />

                                <ul className="stats-second-list">
                                    <li><img src="/salvosIcon.svg" alt="Salvos" /> 867 Salvos</li>
                                    <li><img src="/curtidasIcon.svg" alt="Curtidas" /> 755 Curtidas</li>
                                    <li><img src="/iniciaramIcon.svg" alt="Iniciaram o Plano" /> 984 Iniciaram</li>
                                </ul>

                            </div>
                        </div>

                        <div className="study-and-save-buttons">
                            <button className="botao-estudo">Iniciar estudos</button>
                            <button className="open-study-save-button">
                                <img src="/src/assets/botaoSalvar.svg" alt="Salvar" />
                            </button>
                        </div>

                    </section>

                }

            </section>

            <div className="visao-geral">
                <table className="tabela-visao-geral">

                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Visão Geral</h3></td>
                            <td></td>
                        </tr>
                    </thead>

                    <tbody>

                        {plano.modulos.map((modulo, index) => (
                            <tr key={index}>
                                <td>Módulo {index + 1}</td>
                                <td>{modulo.titulo}</td>
                                <td>Capítulos</td>
                            </tr>
                        ))}

                    </tbody>

                </table>
            </div>

            {isMobile ?

                <ul className="estatisticas stats-first-list">

                    <li><img src="/documentosIcon.svg" alt="Documentos" /> 80 Documentos</li>
                    <li><img src="/aulasIcon.svg" alt="Aulas" /> 104 Aulas</li>
                    <li><img src="/atividadesIcon.svg" alt="Atividades" /> 87 Atividades</li>
                    <li><img src="/testesIcon.svg" alt="Testes" /> 14 Testes</li>

                </ul>

        : null }

            <RecommendedList tags={plano.tags} plano_id={plano.id} />

            <section className="comments">
                <div className="comments-icon-and-title">
                    <img src="/comentariosIcon.svg" alt="" />
                    <span className="comments-title">{plano.comentarios.length} Comentário(s)</span>
                </div>

                {plano.comentarios.length === 0 && (
                    <p>Seja o primeiro a comentar!</p>
                )}

                {plano.comentarios.map((c, index) => (
                    <div key={index} className="comment">
                        <strong>{c.autor}</strong>
                        <p>{c.texto}</p>
                    </div>
                ))}
            </section>

        </div>
    );
};

export default OpenStudyPlan;
