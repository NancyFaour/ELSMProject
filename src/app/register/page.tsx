'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      // Backend is expected to return { code: number, description: string }
      const { code, description } = result;

      switch (code) {
        case 0:
          alert(description); // Registration successful
          console.log('Success:', result);
          break;
        case 2:
          alert('This email is already registered.');
          break;
        case 3:
          alert('Validation error: ' + description);
          break;
        default:
          alert('Error: ' + description);
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('Something went wrong. Please try again.');
    }
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
            name="username"
            type="text"
            placeholder="User Name"
            value={form.username}
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
