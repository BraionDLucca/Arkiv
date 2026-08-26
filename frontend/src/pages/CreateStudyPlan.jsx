import "./CreateStudyPlan.css";

function CreateStudyPlan() {
    return (
        <main className="create-study-plan">
            <h1>Criação de Plano de Estudos</h1>

            <section className="study-plan-form">
                <div className="form-group">
                    <label>Adicione um banner:</label>

                    <div className="banner-upload">
                        <button type="button" className="banner-add-button">
                            +
                        </button>
                    </div>

                    <span className="supported-formats">
                        Formatos suportados: .png, .jpg, .jpeg
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="title">Adicione um título:</label>
                    <input
                        id="title"
                        type="text"
                        className="form-input"
                    />
                    <span className="maximum-words">
                        Máximo de 20 palavras
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="short-description">
                        Adicione uma descrição curta:
                    </label>
                
                    <textarea
                        id="short-description"
                        className="form-textarea form-textarea-short"
                    />
                    <span className="maximum-words">
                        Máximo de 20 palavras
                    </span>
                </div>

                <div className="form-group">
                    <label htmlFor="detailed-description">
                        Adicione uma descrição detalhada:
                    </label>

                    <textarea
                        id="detailed-description"
                        className="form-textarea form-textarea-large"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="tags">Adicione algumas tags:</label>

                    <div className="tag-input-row">
                        <input
                            id="tags"
                            type="text"
                            className="tag-input"
                        />

                        <button
                            type="button"
                            className="tag-add-button"
                            aria-label="Adicionar tag"
                        >
                            +
                        </button>
                    </div>

                    <div className="tags-list">
                        <span className="tag">Exemplo</span>
                        <span className="tag">Ex.</span>
                        <span className="tag">Exemplo Longo</span>
                        <span className="tag">Exemplo</span>
                        <span className="tag">Exemplo</span>
                        <span className="tag">Exemplo</span>
                        <span className="tag">Exemplo Longo</span>
                        <span className="tag">Exemplo</span>
                        <span className="tag">Ex.</span>

                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-button">
                        Cancelar
                    </button>

                    <button type="button" className="save-button">
                        Salvar
                    </button>
                </div>
            </section>
        </main>
    );
}

export default CreateStudyPlan;