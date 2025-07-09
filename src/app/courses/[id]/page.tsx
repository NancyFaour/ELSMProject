// app/courses/[id]/page.tsx
import { featuredCourses } from '@/lib/data/courses';
import { notFound } from 'next/navigation';
import Header from '@/components/HomePage/Header';
import Upper from '@/components/CourseDetails/Upper';
import CourseSection from '@/components/CourseDetails/CourseSection';
import Footer from '@/components/HomePage/Footer';
type Props = {
  params: {
    id: string;
  };
};

export default function CoursePage({ params }: Props) {
  const course = featuredCourses.find((c) => c.id === params.id);
  if (!course) return notFound();

  return (
    <>
      <Header />
      <Upper
        title={course.title}
        discount={course.discount}
        shortDescription={course.shortDescription}
        shortNote={course.shortNote}
        reviews={course.reviews}
        author={course.author}
        authorImg={course.authorImg}
        courseImg={course.courseImg}
      />
      <CourseSection />
      <Footer />
    </>
  );
}
