'use client';
import Image from 'next/image';

type CourseOverviewProps = {
 courseOverview: string;   
    whatYouWillLearn: string[];
     

};

export default function CourseOverview({
  courseOverview,
  whatYouWillLearn,
}: CourseOverviewProps) {
  return (
    <section className="course-overview-wrapper">
      <div className="course-overview-content">
        <h2 className="course-overview-title">Course Overview</h2>
        <p className="course-overview-description">{courseOverview}</p>

        <h3 className="what-you-will-learn-title">What You Will Learn</h3>
        <ul className="what-you-will-learn-list">
          {whatYouWillLearn.map((item, index) => (
            <li key={index} className="what-you-will-learn-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}