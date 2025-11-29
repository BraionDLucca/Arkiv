import "./StudyPlanSkeleton.css";

export default function StudyPlanSkeleton() {

    return (
        <div className="study-plan-wrapper">

            <div className="study-plan">

                <div className="banner">

                    <div className="skeleton banner-img"></div>

                </div>

                <div className="content">

                    <p className="title skeleton skeleton-title"></p>

                    <div className="tags">

                        <div className="skeleton skeleton-tag"></div>
                        <div className="skeleton skeleton-tag"></div>

                    </div>

                    <div className="description">

                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>

                    </div>
                </div>
            </div>

            <div className="study-plan-footer">

                <div className="skeleton skeleton-author"></div>

                <div className="skeleton skeleton-feedback"></div>

            </div>
        </div>
    );
}