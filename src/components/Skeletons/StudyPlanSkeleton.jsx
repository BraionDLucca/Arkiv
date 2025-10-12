import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import "../StudyPlan.css";

export default function StudyPlanSkeleton() {

    return (
        <div className="study-plan-wrapper">

            <div className="study-plan">

                <div className="banner">

                    <Skeleton className="banner-img" />

                </div>

                <div className="content">

                    <p className="title"><Skeleton width="100%" height="100%" style={{ marginBottom: 15}} /></p>
                    
                    {/* Tags */}
                    <Skeleton count={2} width={80} height={35} inline style={{ marginRight: 8, borderRadius: 100}} />
                        
                    <p className="description"><Skeleton count={2} /></p>
                </div>

            </div>

            <div className="study-plan-footer">

                <div className="author">
                    <Skeleton circle width={40} height={40} />
                    <Skeleton width={80} height={20} />
                </div>

                <div className="feedback">
                    <Skeleton width={25} height={25} />
                    <Skeleton width={50} />
                    <Skeleton width={25} height={25} />
                    <Skeleton width={40} />
                </div>

            </div>
        </div>
    );
}