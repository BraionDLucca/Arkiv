import './OpenStudyPlanSkeleton.css';

const OpenStudyPlanSkeleton = () => {

    return (

        <div className="open-study-plan-container">

            <div className="open-study-banner skeleton"></div>

            <h2 className="open-study-plan-title-skeleton skeleton"></h2>

            <section className="description-and-statistics-skeleton">

                <div className="study-plan-description-skeleton skeleton"></div>

                <div className="stats-and-button-skeleton">

                    <div className="stats-item-skeleton skeleton"></div>
                    <div className="stats-item-skeleton skeleton"></div>
                    <div className="stats-item-skeleton skeleton"></div>

                    <div className="botao-estudo-skeleton skeleton"></div>

                </div>

            </section>

            <div className="visao-geral-skeleton">

                <div className="skeleton skeleton-subtitle"></div>

                <div className="tabela-visao-geral-skeleton skeleton"></div>
                
            </div>

            <div className="skeleton skeleton-subtitle"></div>

            <div className="recommended-list-skeleton skeleton"></div>

            <section className="comments-skeleton">

                <div className="comments-icon-and-title-skeleton">

                    <div className="skeleton skeleton-circle"></div>
                    <div className="skeleton skeleton-title"></div>

                </div>

                <div className="comment-skeleton">

                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>
                    <div className="skeleton skeleton-line"></div>

                </div>

            </section>

        </div>
    );
};

export default OpenStudyPlanSkeleton;