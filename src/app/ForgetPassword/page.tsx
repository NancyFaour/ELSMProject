'use client';

import { useState } from 'react';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/ForgetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Something went wrong');
        return;
      }

      setMessage('✅ Password reset email sent. Please check your inbox.');
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ Failed to send reset email.');
    }
  };

  return (
    <>
      <Header />

      <div className="forgot-password-page">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p>{message}</p>}
      </div>

      <Footer />
    </>
  );
}
