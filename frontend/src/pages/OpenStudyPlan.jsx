const apiUrl = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./OpenStudyPlan.css";
import RecommendedList from "../components/RecommendedList";
import OpenStudyPlanSkeleton from "../skeletons/OpenStudyPlanSkeleton";
import Button from "../components/Button";
import Tag from "../components/Tag";
import Banner from "../components/Banner";

const OpenStudyPlan = () => {

    window.scrollTo(0, 0)

    const navigate = useNavigate();
    const { id } = useParams();

    const [studyPlan, setStudyPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {

        setIsLoading(true)

        const loadPlanDetails = async () => {

            try {

                const res = await fetch(`${apiUrl}/planos/${id}`)

                if (!res.ok) {
                    throw new Error(`Erro HTTP: ${res.status}`)
                }

                const data = await res.json();

                setStudyPlan(data);

            } catch (error) {

                console.error("Erro ao buscar os dados do studyPlan:", error)

            } finally {
                setIsLoading(false);
            }

        }

        loadPlanDetails()
    }, [id]) // [id] = useEffect é executado novamente quando "id" mudar.


    return isLoading ? <OpenStudyPlanSkeleton /> : (

        <div className="open-study-plan-container">

            <Banner
                imageUrl={studyPlan.imagem_url}
                studyPlanTitle={studyPlan.titulo}
            />

            <h2 className="open-study-plan-title">{studyPlan.titulo}</h2>

            <section className="description-and-statistics">

                <div className="study-plan-description">

                    <div className="author-open-study">

                        <div className="author-image-name">

                            <img src="/autorPlaceholder.png" alt="Perfil do autor" />
                            <span>{studyPlan.autor_nome}</span>
                            <span className="dot-text">•</span>

                        </div>

                        <div className="date-and-rating">

                            <span className="data-publicacao">

                                {/* Formata a data para exibição */}
                                {new Date(studyPlan.data_publicacao).toLocaleDateString()}
                            </span>

                            <div className="rating">

                                <img src="/estrela.svg" alt="Estrela" className="feedback-item" />

                                <span className="rating">

                                    {studyPlan.media_avaliacao != null ? `${studyPlan.media_avaliacao}` : "–/5"}
                                </span>
                            </div>

                        </div>
                    </div>

                    <div className="open-study-plan-tags-container">
                        {studyPlan.tags.map((tag, index) => (

                            <Tag key={index}>
                                {tag.nome}
                            </Tag>
                        ))}
                    </div>

                    <div className="descricao">
                        <p>{studyPlan.descricao}</p>
                    </div>

                </div>

                <div className="stats-and-button">

                    <ul className="stats-list">

                        <li><img src="/salvosIcon.svg" alt="Salvos" /> 867 Salvos</li>
                        <li><img src="/curtidasIcon.svg" alt="Curtidas" /> 755 Curtidas</li>
                        <li><img src="/iniciaramIcon.svg" alt="Iniciaram o Plano" /> 984 Iniciaram</li>

                    </ul>

                    <Button size="large" onClick={() => navigate(`/planos/${id}/modulos`)}>
                        Iniciar Estudos
                    </Button>

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

                        {studyPlan.modulos.map((modulo, index) => (
                            <tr key={index}>
                                <td className="module-number">Módulo {modulo.ordem}</td>
                                <td>{modulo.titulo}</td>
                                <td className="chapters-number">Capítulos</td>
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

            {/* Lista de planos recomendados */}
            <RecommendedList tags={studyPlan.tags} plano_id={studyPlan.id} />

            <section className="comments">

                <div className="comments-icon-and-title">

                    <img src="/comentariosIcon.svg" alt="" />
                    <span className="comments-title">{studyPlan.comentarios.length} Comentário(s)</span>

                </div>

                {studyPlan.comentarios.length === 0 && (
                    <p>Seja o primeiro a comentar!</p>
                )}

                {studyPlan.comentarios.map((c, index) => (

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