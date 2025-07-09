'use client';

import { useState } from 'react';
import { featuredCourses } from '../HomePage/FeaturedCourses';

function generateId(title: string, author: string) {
  return `${title}-${author}`
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '');
}

export default function FeaturedCourses() {
  const [search, setSearch] = useState('');
  const [formatFilter, setFormatFilter] = useState('');

  const filteredCourses = featuredCourses.filter((course) => {
    const searchMatch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.author.toLowerCase().includes(search.toLowerCase());
    const formatMatch = formatFilter ? course.format === formatFilter : true;

    return searchMatch && formatMatch;
  });

  return (
    <section className="featured-section">
      <h2 className="featured-subtitle">Featured Courses</h2>
      <h3 className="featured-title">Pick A Course To Get Started</h3>

      {/* === Filter Bar === */}
      <div className="filter-bar">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="filter-input"
          />
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Formats</option>
            <option value="Online Class">Online Class</option>
            <option value="In-Person">In-Person</option>
            
            {/* Add more formats here if needed */}
          </select>
        </div>
      </div>

      {/* === Courses Grid === */}
      <div className="featured-grid">
        {filteredCourses.map((course, index) => {
          const courseId = generateId(course.title, course.author);

          return (
            <div className="course-image-frame" key={index} id={courseId}>
              <div style={{ position: 'relative' }}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="course-image"
                />
              </div>

              <div className="course-content">
                <div className="course-top">
                  <span className="course-title">{course.title}</span>
                  <span className="course-reviews">
                    {course.reviews} reviews
                  </span>
                </div>

                <a href={`/courses/${courseId}`} className="course-description">
                  {course.description}
                </a>

                <div className="course-meta">
                  <span>{course.lessons}x Lesson</span>
                  <span>{course.format}</span>
                </div>

                <div className="course-footer">
                  <div className="course-author">
                    <img
                      src={course.authorImg}
                      alt={course.author}
                      className="author-img"
                    />
                    <span className="author-name">{course.author}</span>
                  </div>

                  <a href="#" className="read-more">Read More</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
