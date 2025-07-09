'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    // Later: API integration
  };

  return (
   <div className="contact-form-wrapper">
  <div className="contact-form-container">
    <h2 className="form-title">Get in Touch with Contact Us</h2>
    <p className="form-subtitle">Fill The Form Below So We Can Get To Know You And Your Needs Better.</p>

    <form className="contact-form">
      <input type="text" placeholder="Your Name" required />
      <input type="email" placeholder="Your Email" required />
      <input type="text" placeholder="Phone" />
      <input type="text" placeholder="Subject" />
      <textarea placeholder="Your Message" rows={5} />
      <button type="submit">Send Your Message</button>
    </form>
  </div>
</div>

  );
}
