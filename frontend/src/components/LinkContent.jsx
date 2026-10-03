import "./LinkContent.css";
import linkIcon from "../assets/linkIcon.svg"

function LinkContent({ link }) {

    return (
        <div className="link-content">

            <img src={linkIcon} alt="Link" />
            <a href={link} target="_blank">{link}</a>

        </div>
    );
}

export default LinkContent;