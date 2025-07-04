'use client';

import Link from 'next/link';
import '../style/PopularCategory.css';

export default function PopularCategory() {
  const categories = [
    {
      title: 'Computer Science',
      courses: 24 ,
      image: '/images/ComputerScience.jpg',
      slug: 'computer-science',
      color: 'LIGHTGREEN'
    },
    {
      title: 'Civil Engineering',
      courses: 40,
      image: '/images/CivilEngineering.jpg',
      slug: 'civil-engineering',
      color: 'LightBlue'
    },
    {
      title: 'Business Analysis',
      courses: 27,
      image: '/images/BusinessAnalysis.jpg',
      slug: 'business-analysis',
      color: 'LightBrown'
    },
    {
      title: 'Data Science Analytics',
      courses: 28,
      image: '/images/DataScience.jpg',
      slug: 'data-science-analytics',
      color:'Purple'
    },
    {
      title: 'Learning Management',
      courses: 78,
      image: '/images/LearningManagement.jpg',
      slug: 'learning-management',
      color: 'LightCoral'
    },
    {
      title: 'Computer Engineering',
      courses: 38,
      image: '/images/ComputerEngineering.jpg',
      slug: 'computer-engineering',
      color: 'Coral '
    }
  ];

  return (
    <section className="category-section">
      <h2 className="category-subtitle">Popular Category</h2>
      <h3 className="category-title">Popular Category For Learn</h3>

      <div className="category-grid">
        {categories.map((cat, index) => (
          <Link href={`/category/${cat.slug}`} key={index} className="category-card">
            <div className="category-content">
              <img src={cat.image} alt={cat.title} className="category-image" />
              <div className="category-info">
                <h4 className="category-name">{cat.title}</h4>
               <p className="category-count">
                 <span style={{ color: cat.color, fontWeight: 'bold' }}>
                      {cat.courses} {cat.courses === 1 ? 'Course' : 'Courses'}
                 </span>
              </p>

              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="category-cta">
        <button className="browse-btn">Browse All Categories</button>
      </div>
    </section>
  );
}
