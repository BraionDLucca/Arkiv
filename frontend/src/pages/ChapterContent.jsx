import LinkContent from "../components/LinkContent";
import TextWithLinkContent from "../components/TextWithLinkContent";
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

    const contentMock = [
        {
            type: "LINK",
            value: "https://www.google.com",
        },
        {
            type: "LINK",
            value: "https://www.youtube.com",
        },
        {
            type: "TEXT_WITH_LINK",
            value: ["Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab et harum cumque veniam distinctio nisi sapiente a atque, dolor vel! Velit eaque quia dicta iste quaerat quas quisquam delectus vel? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia sunt, illo eum explicabo blanditiis optio placeat omnis voluptates, sit consequuntur quisquam laborum. Cumque et dolorum, sit impedit error fuga maiores.", "https://www.google.com", "https://www.youtube.com"]
        },
        {
            type: "YOUTUBE_VIDEO_URL",
            value: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
        },
    ]

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
                    contentMock.map((content, key) => {

                        switch (content.type) {

                            case "LINK":
                                return <LinkContent
                                    link={content.value}
                                    key={key}
                                />

                            case "TEXT_WITH_LINK":
                                return <TextWithLinkContent
                                    text={content.value[0]}
                                    links={content.value.splice(1)}
                                    key={key}
                                />

                            case "YOUTUBE_VIDEO_URL":
                                return <YoutubeURLContent
                                    url={content.value}
                                    key={key}
                                />;

                            default:
                                return;
                        }
                    })
                }
            </section>
        </main>
    );
}

export default ChapterContent;
