'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/HomePage/Header';  
import Footer from '@/components/HomePage/Footer';

export default function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', form);
    // TODO: Connect to backend authentication
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
          name="username"
          type="text"
          placeholder="User Name"
          value={form.username}
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
          <Link href="#" className="forgot-password">
            Forget Password?
          </Link>
        </div>

        <button type="submit" className="submit-btn">Submit Now</button>
      </form>

      <div className="login-footer">
        <p>
          Don’t Have any Account? <Link href="/register">Sign Up</Link>
        </p>
        <p>or</p>
        <button className="social-login">Login With Social Media</button>
      </div>
    </div>
    <Footer />
      </>
  );
}
