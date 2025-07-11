'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/HomePage/Header';  
import Footer from '@/components/HomePage/Footer';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const result = await response.json();

      const { code, description } = result;

      switch (code) {
        case 0:
          alert(description); // Login successful
          console.log('Login successful:', result);
          break;
        case 1:
          alert('Invalid email or password.');
          break;
        case 2:
          alert('Account is locked. Please contact support.');
          break;
        default:
          alert(  description);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className="login-page">
        <div className="login-header">
          <p>Home / <strong>Login</strong></p>
          <h1>Login</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
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

          <div className="login-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              Remember Me
            </label>
            <Link href="/ForgetPassword" className="forgot-password">
              Forget Password?
            </Link>
          </div>

          <button type="submit" className="submit-btn">Submit Now</button>
        </form>

        <div className="login-footer">
          <p>
            Don’t Have an Account? <Link href="/register">Sign Up</Link>
          </p>
          <p>or</p>
          <button className="social-login">Login With Social Media</button>
        </div>
      </div>
      <Footer />
    </>
  );
}
