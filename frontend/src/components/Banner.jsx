import "./Banner.css";

function Banner({ imageUrl, studyPlanTitle }) {

    return (
        <img
            src={imageUrl}
            alt={`Banner de "${studyPlanTitle}"`}
            className="page-banner"
            loading="lazy"
        />
    )
}

export default Banner