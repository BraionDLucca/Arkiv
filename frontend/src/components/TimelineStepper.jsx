import "./TimelineStepper.css";

function TimelineStepper({ firstLine, timelineHidden, accessed }) {

    return (

        <div className={`timeline-stepper-container ${timelineHidden ? "timeline-hidden" : ""}`}>

            <div
                className={`stepper-top-line ${firstLine ? "stepper-first-line" : ""} ${accessed ? "line-accessed" : ""}`}>
            </div>

            <div className={`stepper-circle ${accessed ? "stepper-accessed" : ""} ${timelineHidden ? "stepper-circle-hidden" : ""}`}></div>

            <div className={`stepper-bottom-line ${accessed ? "line-accessed" : ""}`}>
            </div>

        </div>
    );
}

export default TimelineStepper;