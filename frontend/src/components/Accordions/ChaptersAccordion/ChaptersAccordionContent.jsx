import "../ChaptersAccordion/ChaptersAccordionContent.css"

function ChaptersAccordionContent({ module, currentChapterId, chaptersMock }) {

    console.log(module)

    // Quando implementados:
    // module.capitulos.foreach((chapter) => {
    //     if (chapter.id === currentChapterId) {
    //         selectedChapter = "accordion-content-item-selected"
    //     }
    // })

    return (
        <ol className="accordion-content-list">

            {
                chaptersMock.map((chapter, key) => {

                    let selectedChapter = ""

                    if (chapter.id === currentChapterId) {
                        selectedChapter = "accordion-content-item-selected"
                    }

                    if (chapter.moduloId === module.id) {
                        return < li
                            key={key}
                            className={`accordion-content-item ${selectedChapter}`}>

                            <span>{`Capítulo ${chapter.ordem}: ${chapter.titulo}`}</span>

                            {/* Quando implementados:
                    {`Capítulo ${module.capitulo.ordem}: ${module.capitulo.titulo}`} */}
                        </li>
                    }
                })
            }

        </ol >
    )
}

export default ChaptersAccordionContent