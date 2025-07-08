'use client';

import CourseOverview from './CourseOverview';
import CourseFormTable from './CourseFormTable';
import CourseCategory from './CourseCategory';
import CourseContent from './CourseContent';
import { featuredCourses } from '@/lib/data/courses';

const course = featuredCourses[0];

export default function CourseSection() {
  return (
    <section className="course-section-grid">
      {/* LEFT: Course Overview */}
      <div className="course-overview-wrapper">
        <CourseOverview
          courseOverview={course.courseOverview}
          whatYouWillLearn={course.whatYouWillLearn}
          courseSummary={course.courseSummary}
        />
           <CourseContent courseContent={course.courseContent} />
      </div>

      {/* RIGHT: Form Table + Category vertically stacked */}
      <div className="course-info-column">
        <CourseFormTable courseDetails={course.courseDetails} />
        <CourseCategory courseCategories={course.courseCategories} />
     
      </div>
    </section>
  );
}
