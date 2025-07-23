'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Header from '@/components/HomePage/Header';
import Footer from '@/components/HomePage/Footer';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });

  // Check for token on mount
  useEffect(() => {
    const accessToken =
      localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');

    if (accessToken) {
      router.push('/CourseView'); // Redirect if already logged in
    }
  }, [router]);

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
      const { accessToken, refreshToken, description } = result;

      if (response.ok && accessToken) {
        // Save tokens
        if (form.remember) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        } else {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('refreshToken', refreshToken);
        }

        // Show success modal
        await Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: description || 'Welcome back!',
          confirmButtonText: 'Continue',
          position: 'center',
        });

        router.push('/CourseView');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: description || 'Invalid email or password.',
          confirmButtonText: 'Try Again',
          footer: '<a href="/ForgetPassword">Forgot your password?</a>',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);

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
