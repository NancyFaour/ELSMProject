'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/HomePage/Header';  
import Footer from '@/components/HomePage/Footer';


export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Registering:', form);
    // Connect to backend here
  };

  return (
    <>
      <Header />
   
      <div className="register-page">

        <div className="register-header">
          <p>Home / <strong>Sign Up</strong></p>
        <h1>Register Now</h1>
      </div>

      <form className="register-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="User Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="submit-btn">Get Started Now</button>
      </form>

      <div className="register-footer">
        <p>
          Are you a member? <Link href="/login">Login</Link>
        </p>
        <p>or</p>
        <button className="social-register">Register With Social Media</button>
      </div>
    </div>
    <Footer />
        </>
  );
}
