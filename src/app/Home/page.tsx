import AuthorizedHeader from '@/components/HomePage/AuthorizedHeader';
import Footer from '@/components/HomePage/Footer';
import FirstBody from '@/components/HomePage/FirstBody';
import PopularCategory from '@/components/HomePage/PopuarCategory'; 
import FeaturedCourses from '@/components/HomePage/FeaturedCourses';    
export default function Home() {
  return (
    <>
      <AuthorizedHeader />
      <FirstBody />
      <PopularCategory />
      <FeaturedCourses />
      <Footer />

      {/* other sections here */}
    </>
  );
}
