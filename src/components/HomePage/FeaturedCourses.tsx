'use client';



const featuredCourses = [
  { id:1,
    price: 30,
    title: 'Adobe XD',
    reviews: 3,
    description: 'Fundamentals of Adobe XD Theory Learn New',
    lessons: 18,
    format: 'Online Class',
    author: 'William Smith',
    authorImg: '/images/Authors/WilliamSmith.jpg',
    thumbnail: '/images/courses/FundAdobe.jpg',
  },
  {
    price: 30,
    title: 'Photoshop',
    reviews: 3,
    description: 'Certified Graphic Design with Free Project Course',
    lessons: 18,
    format: 'Online Class',
    author: 'Lora Smith',
    authorImg: '/images/Authors/LoraSmith.jpg',
    thumbnail: '/images/courses/CertifiedGraphic.jpg',
  },

{
        price: 30,
        title: 'Photoshop',
        reviews: 3,
        description: 'Theory Learn New Student And Fundamentals',
        lessons: 18,
        format: 'Online Class',
        author:'Robot Smith',
        authorImg: '/images/Authors/RobotSmith.jpg',
        thumbnail: '/images/courses/Photoshop.jpg',

},
{
        price: 30,
        title: 'Adobe XD',
        reviews: 3,
        description: 'Computer Fundamentals Basic Startup Ultricies Vitae',
        lessons: 18,
        format: 'Online Class',
        author: 'Zinat Zaara',
        authorImg: '/images/Authors/ZinatZaara.jpg',
        thumbnail: '/images/courses/CompFund.jpg',
    },
    {
        price: 30,
        title: 'Adobe XD',
        reviews: 3,
        description: 'Computer Fundamentals Basic Startup Ultricies VitaeBoozy Halloween Drinks for the Grown Eleifend Kuismod',
        lessons: 18,
        format: 'Online Class',
        author: 'Billy Rivera',
        authorImg: '/images/Authors/BillyRivera.jpg',
        thumbnail: '/images/courses/BoozyHalloween.jpg',
    },
    {
        price: 30,
        title: 'Adobe XD',
        reviews: 3,
        description: 'Student Want to Learn About Science And Arts',
        lessons: 18,
        format: 'Online Class',
        author: 'Subrina Kabir',
        authorImg: '/images/Authors/SubrinaKabir.jpg',
        thumbnail: '/images/courses/ScienceArt.jpg',
    },

];
export default function FeaturedCourses() {
  return (
    <section className="featured-section">
      <h2 className="featured-subtitle">Featured Courses</h2>
      <h3 className="featured-title">Pick A Course To Get Started</h3>

      <div className="featured-grid">
        {featuredCourses.map((course, index) => (
      <div className="course-card" key={index}>
  <div style={{ position: 'relative' }}>
    <img src={course.thumbnail} alt={course.title} className="course-image" />
    <div className="course-price-tag">${course.price}</div>
  </div>

  <div className="course-content">
    <div className="course-top">
      <span className="course-title">{course.title}</span>
      <span className="course-reviews">{course.reviews} reviews</span>
    </div>

   <a href="#" className="course-description">{course.description}</a>

    <div className="course-meta">
      <span>{course.lessons}x Lesson</span>
      <span>{course.format}</span>
    </div>

    <div className="course-footer">
      <div className="course-author">
        <img src={course.authorImg} alt={course.author} className="author-img" />
        <span className="author-name">{course.author}</span>
      </div>
      <a href="#" className="read-more">Read More</a>
    </div>
  </div>
</div>

        ))}
      </div>
    </section>
  );
}
