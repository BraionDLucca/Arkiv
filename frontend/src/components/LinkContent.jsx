import "./LinkContent.css";
import linkIcon from "../assets/linkIcon.svg"

function LinkContent({ content, markContentAccessed }) {

    const link = content.value

    return (
        <div className="link-content">

            <img src={linkIcon} alt="Link" />

            <a
                href={link}
                target="_blank"
                onClick={() => markContentAccessed(content)}
                onAuxClick={() => markContentAccessed(content)}
            >
                {link}
            </a>

        </div>
    );
}

export default LinkContent;