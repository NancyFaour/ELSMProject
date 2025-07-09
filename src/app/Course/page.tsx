import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import FeaturedCourses from '@/components/Courses/Filter';
import { featuredCourses } from '@/components/HomePage/FeaturedCourses';
export default function CoursePage() {
  return (
    <>
      <Header />
      <FeaturedCourses />
      <Footer />
      {/* other sections here */}
    </>
  );
}