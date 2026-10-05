import "./TimelineStepper.css";

function TimelineStepper({ firstLine, accessed }) {

    return (

        <div className="timeline-stepper-container">

            <div
                className={`stepper-top-line ${firstLine ? "stepper-first-line" : ""} ${accessed ? "line-accessed" : ""}`}>
            </div>

            <div className={`stepper-circle ${accessed ? "stepper-accessed" : ""}`}></div>

            <div className={`stepper-bottom-line ${accessed ? "line-accessed" : ""}`}>
            </div>

        </div>
    );
}

export default TimelineStepper;