import "./TextWithLinkContent.css";
import LinkContent from "./LinkContent";

function TextWithLinkContent({ text, links }) {

    return (
        <div className="text-with-link-content">

            <p>{text}</p>

            <hr />
            {console.log(links)}

            {links.map((link, key) => {

                return <LinkContent link={link} key={key} />
            })}

        </div>
    );
}

export default TextWithLinkContent;