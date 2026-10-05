import "./TextWithLinkContent.css";
import linkIcon from "../assets/linkIcon.svg"

function TextWithLinkContent({ content, markContentAccessed }) {

    const text = content.value[0]

    const links = content.value.filter((item, index) => index !== 0)

    return (
        <div className="text-with-link-content">

            <p>{text}</p>

            <hr />

            <ul className="link-list">

                {links.map((link, key) => {

                    return <li className="link-item" key={key}>

                        <img src={linkIcon} alt="Link" />

                        <a
                            href={link}
                            target="_blank"
                            onClick={() => markContentAccessed(content)}
                            onAuxClick={() => markContentAccessed(content)}
                        >
                            {link}
                        </a>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default TextWithLinkContent;