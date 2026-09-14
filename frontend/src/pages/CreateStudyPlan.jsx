import "./CreateStudyPlan.css";
import Button from "../components/Button";
import Tag from "../components/Tag";
import saveIcon from "../assets/saveIcon.svg";
import { useEffect, useRef, useState } from "react";


function CreateStudyPlan() {
    const [Banner, setBanner] = useState(null);
    const [tags, setTags] = useState([]);
    const [tagSearch, setTagSearch] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsDropdownOpen, setTagsDropdownOpen] = useState(false);
    

    useEffect(() => {
        fetch("http://localhost:5000/tags")
            .then((response) => response.json())
            .then((data) => {
                 setTags(data);
            })
            .catch((error) => {
                console.error("Erro ao carregar tags:", error);
            });
    },  []);

    const filteredTags = tags.filter((tag) =>
            tag.nome.toLowerCase().includes(tagSearch.toLowerCase())
    );

    const tagsAreaRef = useRef(null);
        useEffect(() => {
            function handleClickOutside(event) {
                if (
                    tagsAreaRef.current &&
                    !tagsAreaRef.current.contains(event.target)
                ) {
                setTagsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <main className="create-study-plan">
            <h1>Criação de Plano de Estudos</h1>

            <section className="study-plan-form">
                <div className="form-group">
                    <label>Adicione um banner:</label>

                    <div className="banner-upload">
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(event) => {
                                const file = event.target.files[0];

                                if (file) {
                                    setBanner(URL.createObjectURL(file));
                                }
                            }}
                            hidden
                            id="banner-input"
                        />

                        {Banner && (
                            <img
                                src={Banner}
                                alt="Pré-visualização do banner"
                                className="banner-preview"
                            />
                        )}

                        {!Banner && (
                            <Button 
                                type="button"
                                variant="secondary"
                                size="medium"
                                aria-label="Adicionar banner"
                                onClick={() => document.getElementById("banner-input").click()}
                            >
                                +
                            </Button>
                        )}
                    </div>
                    {Banner && (
                        <div className="banner-actions">
                            <Button
                                type="button"
                                variant="danger"
                                size="medium"
                                aria-label="Remover banner"
                                onClick={() => setBanner(null)}
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="button"
                                variant="secondary"
                                size="medium"
                                onClick={() => document.getElementById("banner-input").click()}
                            
                            >
                                Trocar imagem
                            </Button>

                        </div>
                    )}

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

                    <div className="tag-input-row" ref={tagsAreaRef}>
                        <input
                            id="tags"
                            type="text"
                            className="tag-input"
                            value={tagSearch}
                            onChange={(event) => {setTagSearch(event.target.value); setTagsDropdownOpen(true)}}
                            onFocus={() => setTagsDropdownOpen(true)}
                        />

                        <Button 
                        
                            type="button"
                            variant="secondary"
                            size="small"
                        >
                            +
                        </Button>

                        {tagsDropdownOpen && (
                            <div className="tags-dropdown">
                                {filteredTags.map((tag) => (
                                <div
                                    key={tag.id}
                                    className="tags-dropdown-item"
                                    onClick={() => {
                                        const alreadySelected = selectedTags.some(
                                            (selectedTag) => selectedTag.id === tag.id
                                        );

                                        if (!alreadySelected) {setSelectedTags([...selectedTags, tag]);
                                        }

                                        setTagSearch("");
                                        setTagsDropdownOpen(false);
                                    }}
                                >
                                    {tag.nome}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="tags-list">
                    {selectedTags.map((tag) => (
                        <div key={tag.id} className="selected-tag">
                            <span>{tag.nome}</span>
                            
                            <button
                                type="button"
                                className="remove-tag"
                                onClick={() => {
                                    setSelectedTags(
                                        selectedTags.filter(
                                            (selectedTag) => selectedTag.id !== tag.id
                                        )
                                    );
                                }}
                                aria-label={`Remover tag ${tag.nome}`}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

            </div>

                <div className="form-actions">
                    <Button type="button" variant="danger" size="medium">
                        Cancelar
                    </Button> 

                    <Button type="button" variant="primary" size="medium">
                        <img src={saveIcon} alt="" />
                        Salvar
                    </Button>
                </div>
            </section>
        </main>
    );
}

export default CreateStudyPlan;
