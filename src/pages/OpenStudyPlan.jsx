const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./OpenStudyPlan.css";
import RecommendedList from "../components/RecommendedList";
import OpenStudyPlanSkeleton from "../skeletons/OpenStudyPlanSkeleton";

const OpenStudyPlan = () => {

    window.scrollTo(0, 0)

    const { id } = useParams();

    const [plano, setPlano] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        !isLoading && setIsLoading(true)

        const loadPlanDetails = async () => {

            try {

                const res = await fetch(`${apiUrl}/planos/${id}`)

                if (!res.ok) {
                    throw new Error(`Erro HTTP: ${res.status}`)
                }

                const data = await res.json();

                setPlano(data);

            } catch (error) {

                console.error("Erro ao buscar os dados do plano:", error)

            } finally {
                setIsLoading(false);
            }

        }

        loadPlanDetails()
    }, [id]) // [id] = useEffect é executado novamente quando "id" mudar.


    return isLoading ? <OpenStudyPlanSkeleton /> : (

        <div className="open-study-plan-container">

            <div
                style={{ backgroundImage: `url(/${plano.imagem_url})` }} /* Começar com "/" pois as imagens estão em "public". */
                alt="Banner do Plano"
                className="open-study-banner"
            />

            <h2 className="open-study-plan-title">{plano.titulo}</h2>

            <section className="description-and-statistics">

                <div className="study-plan-description">

                    <div className="author-open-study">

                        <div className="author-image-name">

                            <img src="/autorPlaceholder.png" alt="Perfil do autor" />
                            <span>{plano.autor}</span>
                            <span className="dot-text">•</span>

                        </div>

                        <div className="date-and-rating">

                            <span className="data-publicacao">

                                {/* Formata a data para exibição */}
                                {new Date(plano.data_publicacao).toLocaleDateString()}
                            </span>

                            <div className="rating">
                                
                                <img src="/estrela.svg" alt="Estrela" className="feedback-item" />
                                
                                <span className="rating">
                                
                                    {plano.media_avaliacao != null ? `${plano.media_avaliacao}` : "–/5"}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="tags">
                        {plano.tags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    <div className="descricao">
                        <p>{plano.descricao}</p>
                    </div>

                </div>

                <div className="stats-and-button">

                    <ul className="stats-list">

                        <li><img src="/salvosIcon.svg" alt="Salvos" /> 867 Salvos</li>
                        <li><img src="/curtidasIcon.svg" alt="Curtidas" /> 755 Curtidas</li>
                        <li><img src="/iniciaramIcon.svg" alt="Iniciaram o Plano" /> 984 Iniciaram</li>

                    </ul>

                    <button className="botao-estudo">Iniciar estudos</button>

                </div>

            </section>

            <div className="visao-geral">

                <h3>Visão Geral:</h3>

                <ul className="details-card-container">

                    <li><img src="/documentosIcon.svg" alt="Documentos" /> 80 Documentos</li>
                    <li><img src="/aulasIcon.svg" alt="Aulas" /> 104 Aulas</li>
                    <li><img src="/atividadesIcon.svg" alt="Atividades" /> 87 Atividades</li>
                    <li><img src="/testesIcon.svg" alt="Testes" /> 14 Testes</li>

                </ul>

                <table className="tabela-visao-geral">

                    <tbody>

                        {plano.modulos.map((modulo, index) => (
                            <tr key={index}>
                                <td className="module-number">M{index + 1}</td>
                                <td>{modulo.titulo}</td>
                                <td className="chapters-number">Capítulos</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Lista de planos recomendados */}
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