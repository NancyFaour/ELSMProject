'use client';
import ContactInfo from '@/components/Contact/ContactInfo';
import ContactForm from '@/components/Contact/ContactForm';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
export default function ContactPage() {
  return (
    <>
      <Header />
    <main className="contact-wrapper">
      <h1 className="contact-title">Get In Touch With Us</h1>
      <p className="contact-subtitle">We're Always Eager To Hear From You!</p>

      {/* Top Row: Map + Info */}
      <div className="contact-top">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3309.886702533236!2d35.557284575702515!3d33.83351927324771!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f1720f3bce12d%3A0xe832ef5a582f88a0!2sHoumal!5e0!3m2!1sen!2slb!4v1719925022976!5m2!1sen!2slb"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
        <ContactInfo />
      </div>

      {/* Full Width Contact Form */}
      <ContactForm />
     
    </main>
     <Footer />   
      </> 
  );
}