import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import FirstBody from '@/components/HomePage/FirstBody';
import PopularCategory from '@/components/HomePage/PopuarCategory'; 

export default function Home() {
  return (
    <>
      <Header />
       <FirstBody />

       
       <PopularCategory />
      <Footer/>
     
      {/* other sections here */}
    </>
  );
}
