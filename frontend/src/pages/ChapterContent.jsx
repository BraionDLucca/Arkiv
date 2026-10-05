import { useEffect, useState } from "react";
import LinkContent from "../components/LinkContent";
import TextWithLinkContent from "../components/TextWithLinkContent";
import TimelineStepper from "../components/TimelineStepper";
import YoutubeURLContent from "../components/YoutubeURLContent";
import "./ChapterContent.css";

function ChapterContent() {

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

            <section className="chapter-content-container">

                {
                    contentMock.map((content, index) => {

                        switch (content.type) {

                            case "LINK":
                                return <>
                                    <TimelineStepper
                                        firstLine={index === 0 ? true : false}
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
