'use client';
import Image from 'next/image';

type CourseHeaderProps = {
  title: string;
  discount?: string;
  shortDescription: string;
  shortNote?: string;
  reviews: number;
  author: string;
  authorImg: string;
  courseImg: string;
};

export default function Upper({
  title,
  discount,
  shortDescription,
  shortNote,
  reviews,
  author,
  authorImg,
  courseImg,
}: CourseHeaderProps) {
  return (
    <section className="course-header-wrapper">
      <div className="course-header-left">
        <div className="course-header-badges">
          <span className="badge badge-green">{title}</span>
          {discount && <span className="badge badge-red">{discount}</span>}
        </div>

        <h1 className="course-header-title">{shortDescription}</h1>
        <p className="course-header-subtitle">{shortNote}</p>

        <div className="course-header-author">
          <div className="author-details">
         <div className="course-header-author">
           <img src={authorImg} alt={author} className="author-avatar" />
  
             <p className="author-name">{author}</p>

             <div className="star-rating">
             {Array.from({ length: 5 }).map((_, i) => (
                 <span key={i}>{i < reviews ? '★' : '★'}</span>
                // '☆'
       ))}
             <span className="review-count">{reviews.toString().padStart(2, '0')} reviews</span>
             </div>
            </div>

          </div>
        </div>
      </div>

      <div className="course-header-right">
        <div className="course-image-card">
          <Image
            src={courseImg}
            alt={title}
            width={600}
            height={400}
            className="course-img"
          />
        </div>
      </div>
    </section>
  );
}
