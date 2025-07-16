'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';
import useClearTokens from  '../../../pages/api/MiddleWares/useClearTokens'
export default function RegisterPage() {
  const router = useRouter();
  useClearTokens();

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
      await Swal.fire({
        icon: 'warning',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        confirmButtonText: 'Try Again',
      });
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
      const { code, description } = result;

      switch (code) {
        case 0:
          await Swal.fire({
            icon: 'success',
            title: 'Registration Successful',
            text: description || 'Your account has been created.',
            confirmButtonText: 'Go to Login',
          });
          router.push('/login');
          break;

        case 2:
          await Swal.fire({
            icon: 'info',
            title: 'Email Already Registered',
            text: 'This email is already in use. Please log in or use another email.',
            confirmButtonText: 'Go to Login',
          });
          router.push('/login');
          break;

        case 3:
          await Swal.fire({
            icon: 'error',
            title: 'Validation Error',
            text: description || 'Please check your inputs and try again.',
            confirmButtonText: 'Fix Inputs',
          });
          break;

        default:
          await Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            text: description || 'An unexpected error occurred.',
            confirmButtonText: 'Close',
          });
      }
    } catch (error) {
      console.error('Error submitting registration:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
        confirmButtonText: 'Close',
      });
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
