import { useEffect, useState } from "react";
import LinkContent from "../components/LinkContent";
import TextWithLinkContent from "../components/TextWithLinkContent";
import TimelineStepper from "../components/TimelineStepper";
import YoutubeURLContent from "../components/YoutubeURLContent";
import Button from "../components/Button"
import "./ChapterContent.css";

function ChapterContent() {

    const [timelineHidden, setTimelineHidden] = useState(false)

    const chaptersMock = [
        {
            id: 1,
            moduloId: 1,
            imagem: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
            titulo: "Título de Capítulo",
            ordem: 1,
            artigosQtd: 7,
            videosQtd: 4
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
        console.log("accessedContent:", accessedContent);
        console.log("accessedContent.id:", accessedContent.id);

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

    useEffect(() => {
        console.log(contentMock);
    }, [contentMock]);


    return (
        <main id="chapter-content-page-container">
            <img
                src={chaptersMock[0].imagem}
                className="chapter-banner"
            ></img>

            <div className="chapter-content-header">

                <h1 className="chapter-content-title">
                    {chaptersMock[0].titulo}
                </h1>

            </div>

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
