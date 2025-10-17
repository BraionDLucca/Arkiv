import './OpenStudyPlanSkeleton.css';

const OpenStudyPlanSkeleton = () => {

    return (

        <div class="open-study-plan-container">

            <div class="open-study-banner skeleton"></div>

            <h2 class="open-study-plan-title-skeleton skeleton"></h2>

            <section class="description-and-statistics-skeleton">

                <div class="study-plan-description-skeleton skeleton"></div>

                <div className="stats-and-button-skeleton">

                    <div className="stats-item-skeleton skeleton"></div>
                    <div className="stats-item-skeleton skeleton"></div>
                    <div className="stats-item-skeleton skeleton"></div>

                    <div className="botao-estudo-skeleton skeleton"></div>

                </div>

            </section>

            <div class="visao-geral-skeleton">

                <div class="skeleton skeleton-subtitle"></div>

                <div class="tabela-visao-geral-skeleton skeleton"></div>
                
            </div>

            <div class="skeleton skeleton-subtitle"></div>

            <div class="recommended-list-skeleton skeleton"></div>

            <section class="comments-skeleton">

                <div class="comments-icon-and-title-skeleton">

                    <div class="skeleton skeleton-circle"></div>
                    <div class="skeleton skeleton-title"></div>

                </div>

                <div class="comment-skeleton">

                    <div class="skeleton skeleton-line"></div>
                    <div class="skeleton skeleton-line"></div>
                    <div class="skeleton skeleton-line"></div>
                    <div class="skeleton skeleton-line"></div>

                </div>

            </section>

        </div>
    );
};

export default OpenStudyPlanSkeleton;