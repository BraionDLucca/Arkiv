import "./Banner.css";

function Banner({ imageUrl, studyPlanTitle }) {

    return (
        <div
            style={{
                backgroundImage:
                    `url(/${imageUrl})`
            }} /* Começa com "/" pois as imagens de exemplo estão em "public/". */
            alt={`Banner de "${studyPlanTitle}"`}
            className="page-banner"
        />
    )
}

export default Banner