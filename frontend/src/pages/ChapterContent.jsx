import { useEffect, useState } from "react";
import LinkContent from "../components/LinkContent";
import TextWithLinkContent from "../components/TextWithLinkContent";
import TimelineStepper from "../components/TimelineStepper";
import YoutubeURLContent from "../components/YoutubeURLContent";
import Button from "../components/Button"
import "./ChapterContent.css";
import Dropdown from "../components/Dropdowns/Dropdown";
import ChaptersAccordionContent from "../components/Accordions/ChaptersAccordion/ChaptersAccordionContent";
import ModulesDropdownButton from "../components/Dropdowns/ModulesDropdown/ModulesDropdownButton";
import Accordion from "../components/Accordions/Accordion";
import ChaptersAccordionTrigger from "../components/Accordions/ChaptersAccordion/ChaptersAccordionTrigger";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function ChapterContent() {

    const [timelineHidden, setTimelineHidden] = useState(false)

    const [currentStudyPlan, setCurrentStudyPlan] = useState(null)

    // ID's dos itens acessados atualmente
    const params = useParams()

    const studyPlanId = Number(params.studyPlanId)
    const moduleId = Number(params.moduleId)
    const chapterId = Number(params.chapterId)

    useEffect(() => {

        // Busca o plano de estudos atualmente acessado.
        async function getCurrentStudyPlan() {
            try {
                const res = await fetch(`${apiUrl}/planos/${studyPlanId}`)

                if (!res.ok) {
                    throw new Error(`Erro na requisição: ${res.status}`)
                }

                const studyPlan = await res.json()
                setCurrentStudyPlan(studyPlan)
            } catch (error) {
                console.error("Erro ao buscar plano de estudos atual:", error)
            }
        }

        getCurrentStudyPlan()
    }, [studyPlanId])

    // Armazena os módulos do plano de estudos atualmente acessado, quando
    // o fetch terminar de buscá-lo.
    const currentStudyPlanModules = currentStudyPlan?.modulos ?? []

    // Ordena array de modulos em ordem crescente (baseado no atributo ordem de cada modulo)
    const orderedModules = [...currentStudyPlanModules].sort((a, b) => a.ordem - b.ordem);

    // Armazena o módulo atual
    const currentModule = orderedModules.find(
        module => module.id === moduleId
    )

    const chaptersMock = [
        {
            id: 1,
            moduloId: 1,
            imagem: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
            titulo: "Título de Capítulo",
            ordem: 1,
            linkQtd: 5,
            textoComLinkQtd: 2,
            youtubeURLQtd: 3,
            imagensQtd: 2,
        },
        {
            id: 2,
            moduloId: 1,
            imagem: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
            titulo: "Título de Capítulo Título de Capítulo Título de Capítulo",
            ordem: 2,
            linkQtd: 5,
            textoComLinkQtd: 2,
            youtubeURLQtd: 3,
            imagensQtd: 2,
        },
        {
            id: 3,
            moduloId: 1,
            imagem: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
            titulo: "Título de Capítulo",
            ordem: 3,
            linkQtd: 5,
            textoComLinkQtd: 2,
            youtubeURLQtd: 3,
            imagensQtd: 2,
        },
        {
            id: 4,
            moduloId: 1,
            imagem: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
            titulo: "Título de Capítulo",
            ordem: 4,
            linkQtd: 5,
            textoComLinkQtd: 2,
            youtubeURLQtd: 3,
            imagensQtd: 2,
        }
    ]

    const [contentMock, setContentMock] = useState([
        {
            id: 1,
            type: "LINK",
            value: "https://www.google.com",
            accessed: false,
        },
        {
            id: 2,
            type: "LINK",
            value: "https://www.youtube.com",
            accessed: false,
        },
        {
            id: 3,
            type: "TEXT_WITH_LINK",
            value: [
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab et harum cumque veniam distinctio nisi sapiente a atque, dolor vel! Velit eaque quia dicta iste quaerat quas quisquam delectus vel? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sunt, illo eum explicabo blanditiis optio placeat omnis voluptates, sit consequuntur quisquam laborum. Cumque et dolorum, sit impedit error fuga maiores.", "https://www.google.com", "https://www.youtube.com"],
            accessed: false,
        },
        {
            id: 4,
            type: "YOUTUBE_VIDEO_URL",
            value: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
            accessed: false,
        },
    ])

    const markContentAccessed = (accessedContent) => {

        setContentMock(prevContent =>
            prevContent.map(content =>
                content.id === accessedContent.id
                    ? { ...content, accessed: true }
                    : content
            )
        );
    };

    const handleHideTimeline = (timelineHidden) => {
        setTimelineHidden(!timelineHidden)
    }

    return (
        <main id="chapter-content-page-container">
            <section>
                <img
                    src={chaptersMock[0].imagem}
                    className="chapter-banner"
                ></img>

                <div className="chapter-content-header">

                    <h1 className="chapter-content-title">
                        {chaptersMock[0].titulo}
                    </h1>

                    {/* Dropdown com Accordion de cada módulo e capítulo do plano atual */}

                    <Dropdown
                        variant="right"
                        setHeight={false}
                        ButtonComponent={
                            <ModulesDropdownButton
                                currentModuleOrder={currentModule?.ordem || "-"}
                                disableSelected={false}
                            >
                                <>
                                    <div className="vertical-rule" />
                                    <span className="dropdown-current-chapter">
                                        {`Capítulo ${chapterId}`}
                                    </span>
                                </>
                            </ModulesDropdownButton>
                        }>

                        <div className="accordion-list">
                            {
                                orderedModules.map((module, key) => {

                                    return <Accordion
                                        key={key}
                                        TriggerComponent={
                                            <ChaptersAccordionTrigger
                                                currentModuleId={moduleId}
                                                module={module}
                                            />
                                        } >
                                        <ChaptersAccordionContent
                                            // currentModuleChapters = Todos os capítulos de todos os módulos
                                            // do plano de estudos atualmente acessado.
                                            module={module}
                                            currentChapterId={chapterId}
                                            chaptersMock={chaptersMock}
                                        // chaptersMock não será necessário quando implementados.
                                        >

                                        </ChaptersAccordionContent>
                                    </Accordion>
                                })
                            }
                        </div>

                    </Dropdown>

                </div>
            </section>

            <Button
                variant="secondary"
                className="hide-timeline-button"
                onClick={() => handleHideTimeline(timelineHidden)}
            >
                {
                    timelineHidden ? <>
                        <img src="/arrowIcon.svg" alt="Exibir linha do tempo" />
                        <span>Exibir linha do tempo</span>
                    </>
                        : <>
                            <img
                                src="/arrowIcon.svg"
                                alt="Ocultar linha do tempo"
                                className="hide-timeline-button-arrow-right"
                            />
                            <span>Ocultar linha do tempo</span>
                        </>
                }
            </Button>

            <section className={`chapter-content-container ${timelineHidden ? "grid-item-timeline-hidden" : ""}`}>
                {
                    contentMock.map((content, index) => {

                        switch (content.type) {

                            case "LINK":
                                return <>
                                    <TimelineStepper
                                        firstLine={index === 0 ? true : false}
                                        timelineHidden={timelineHidden}
                                        accessed={content.accessed}
                                    />
                                    <div className={
                                        `chapter-content ${index === 0 ? "first-content" : ""} ${index === contentMock.length - 1 ? "last-content" : ""}`
                                    }>
                                        <LinkContent
                                            firstContent={index === 0 ? true : false}
                                            lastContent={index === contentMock.length - 1 ? true : false}
                                            content={content}
                                            markContentAccessed={markContentAccessed}
                                            key={index}
                                        />
                                    </div>
                                </>

                            case "TEXT_WITH_LINK":
                                return <>
                                    <TimelineStepper
                                        firstLine={index === 0 ? true : false}
                                        timelineHidden={timelineHidden}
                                        accessed={content.accessed}
                                    />
                                    <div className={
                                        `chapter-content ${index === 0 ? "first-content" : ""} ${index === contentMock.length - 1 ? "last-content" : ""}`
                                    }>
                                        <TextWithLinkContent
                                            content={content}
                                            markContentAccessed={markContentAccessed}
                                            key={index}
                                        />
                                    </div>
                                </>

                            case "YOUTUBE_VIDEO_URL":
                                return <>
                                    <TimelineStepper
                                        firstLine={index === 0 ? true : false}
                                        timelineHidden={timelineHidden}
                                        accessed={content.accessed}
                                    />
                                    <div className={
                                        `chapter-content ${index === 0 ? "first-content" : ""} ${index === contentMock.length - 1 ? "last-content" : ""}`
                                    }>
                                        <YoutubeURLContent
                                            content={content}
                                            markContentAccessed={markContentAccessed}
                                            key={index}
                                        />
                                    </div>
                                </>

                            default:
                                return
                        }
                    })
                }
            </section >
        </main >
    );
}

export default ChapterContent;
