'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthorizedHeader from '@/components/HomePage/AuthorizedHeader';
import Footer from '@/components/HomePage/Footer';
import CourseContent from '@/components/CourseView/VideoContent';

export default function CourseView() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check both storages based on login
    const token =
      localStorage.getItem('accessToken') ||
      sessionStorage.getItem('accessToken');

    if (!token) {
      router.replace('/login');
    } else {
      // Optional: validate token with backend
      setIsAuthorized(true); // Assume valid if exists (for now)
    }
  }, [router]);

  if (isAuthorized === null) {
    return <p>Checking authentication...</p>; // Prevent flicker
  }

  if (!isAuthorized) {
    return null; // Redirecting...
  }

  return (
    <>
      <AuthorizedHeader />
      <div className="course-view-page">
       <h1 className="course-view-title">Course View</h1>
        <CourseContent
          courseContent={[
            {
              sectionTitle: 'Introduction',
              totalLessons: 3,
              totalDuration: '15 mins',
              lessons: [
                {
                  title: 'Welcome to the Course',
                  duration: '5 mins',
                  videoUrl: '/videos/intro.mp4',
                },
                {
                  title: 'Course Overview',
                  duration: '5 mins',
                  videoUrl: '/videos/overview.mp4',
                },
                {
                  title: 'Getting Started',
                  duration: '5 mins',
                  videoUrl: '/videos/getting-started.mp4',
                },
              ],
            },
            // Add more sections as needed
          ]}
        />
        {/* Example: protected API call */}
        {/* 
        useEffect(() => {
          fetch('/api/protected', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(res => res.json())
          .then(data => setCourseData(data))
        }, []);
        */}
      </div>
      <Footer />
    </>
  );
}
