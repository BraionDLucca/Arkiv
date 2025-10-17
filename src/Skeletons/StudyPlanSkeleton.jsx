import "./StudyPlanSkeleton.css";

export default function StudyPlanSkeleton() {

    return (
        <div class="study-plan-wrapper">

            <div class="study-plan">

                <div class="banner">

                    <div class="skeleton banner-img"></div>

                </div>

                <div class="content">

                    <p class="title skeleton skeleton-title"></p>

                    <div class="tags">

                        <div class="skeleton skeleton-tag"></div>
                        <div class="skeleton skeleton-tag"></div>

                    </div>

                    <p class="description">

                        <div class="skeleton skeleton-text"></div>
                        <div class="skeleton skeleton-text"></div>

                    </p>
                </div>
            </div>

            <div class="study-plan-footer">

                <div class="skeleton skeleton-author"></div>

                <div class="skeleton skeleton-feedback"></div>

            </div>
        </div>
    );
}