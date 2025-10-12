import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './OpenStudyPlanSkeleton.css';

const OpenStudyPlanSkeleton = () => {

    return (
        <div className="open-study-plan-container">

            <div className="open-study-banner-skeleton">
                <Skeleton height="100%" style={{ border: 0, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
            </div>

            <h2 className="open-study-plan-title-skeleton">
                <Skeleton width="100%" height={30} />
            </h2>

            <section className="description-and-statistics-skeleton">

                <div className="open-study-left-section-skeleton" >

                    <Skeleton width="100%" height="100%" style={{ borderRadius: 15 }} />

                </div>


                <section className="details-grid-skeleton">

                    <div className="estatisticas-skeleton">

                        <Skeleton width="100%" height="100%" style={{ borderRadius: 15, display: 'block' }} />

                    </div>

                    <div className="study-and-save-buttons-skeleton">

                        <div style={{ width: 'clamp(170px, 100%, 700px)' }}>

                            <Skeleton width="100%" height={50} style={{ borderRadius: 100 }} />

                        </div>

                        <Skeleton circle width={40} height={40} />
                    </div>

                </section>

            </section>

            <div className="visao-geral-skeleton">

                <div className='tabela-visao-geral-skeleton'>
                    <Skeleton width="100%" height="100%" style={{ borderRadius: 15 }} />
                </div>

            </div>

            <Skeleton width="30%" height="100%" style={{ marginBottom: 20, marginLeft: 60 }} />

            <div className="recommended-list-skeleton">

                {/* Círculo esquerdo */}
                <Skeleton circle width={40} height={40} />

                {/* Retângulo central */}
                <div style={{ width: 'clamp(170px, 100%, 800px)' }}>

                    <Skeleton width="100%" height={550} style={{ borderRadius: 15 }} />

                </div>

                {/* Círculo direito */}
                <Skeleton circle width={40} height={40} />

            </div>


            <section className="comments-skeleton">

                <div className="comments-icon-and-title-skeleton">

                    <Skeleton circle width={40} height={40} />
                    <Skeleton width={150} height={25}/>

                </div>


                <div className="comment-skeleton">
                    <Skeleton width={100} />
                    <Skeleton count={2} />

                    <Skeleton width={100} />
                    <Skeleton count={2} />
                </div>


            </section>
        </div>
    );
};

export default OpenStudyPlanSkeleton;