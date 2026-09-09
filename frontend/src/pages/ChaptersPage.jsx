import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ChaptersPage.css";
import Chapter from "../components/Chapter";

function ChaptersPage() {

    const { studyPlanId, moduleId } = useParams()

    const [chaptersList, setChaptersList] = useState([])

    useEffect(() => {

        const chaptersMock = [
            {
                id: 1,
                moduloId: 1,
                imagem: "https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I",
                titulo: "Título de Capítulo",
                ordem: 1,
                artigosQtd: 7,
                videosQtd: 4
            },
            {
                id: 2,
                moduloId: 1,
                imagem: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
                titulo: "Título de Capítulo",
                ordem: 2,
                artigosQtd: 3,
                videosQtd: 9
            },
            {
                id: 3,
                moduloId: 1,
                imagem: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
                titulo: "Título de Capítulo",
                ordem: 3,
                artigosQtd: 6,
                videosQtd: 6
            },
            {
                id: 4,
                moduloId: 1,
                imagem: "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
                titulo: "Título de Capítulo",
                ordem: 4,
                artigosQtd: 4,
                videosQtd: 8
            }
        ]

        const loadChapters = async () => {

            setChaptersList(chaptersMock)
        }

        try {
            loadChapters()

        } catch (error) {
            console.error("Erro ao buscar módulos do planos de estudos:", error);
        }

    }, [studyPlanId, moduleId])

    // Ordena array de capítulos em ordem crescente (baseado no atributo ordem de cada capítulo)
    const orderedChapters = [...chaptersList].sort((a, b) => a.ordem - b.ordem)

    return (
        <main>
            <div className="chapters-container">

                <h1>Capítulos</h1>

                {
                    orderedChapters.map((chapter, index) => {

                        return <Chapter
                            key={index}
                            imagem={chapter.imagem}
                            titulo={chapter.titulo}
                            ordem={chapter.ordem}
                            artigosQtd={chapter.artigosQtd}
                            videosQtd={chapter.videosQtd}
                        />
                    })
                }

            </div>
        </main>
    )
}

export default ChaptersPage;