import "./Tag.css"

function Tag({ children }) {

    const handleTagClick = (event) => {
        event.stopPropagation
        // TO-DO: Acessar página com todos os planos contendo determinada tag.
    }

    return <span className="tag" onClick={handleTagClick}>
        {children}
    </span>
}

export default Tag