'use client';
import React, { useState } from 'react';


type Lesson = {
  title: string;
  duration: string;
  videoUrl: string;
};

type CourseSection = {
  sectionTitle: string;
  totalLessons: number;
  totalDuration: string;
  lessons: Lesson[];
};

type CourseContentProps = {
  courseContent: CourseSection[];
};

export default function CourseContent({ courseContent }: CourseContentProps) {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(0);


  const toggleSection = (index: number) => {
    setOpenSectionIndex(prev => (prev === index ? null : index));
  };

  const openVideoModal = (url: string) => setSelectedVideo(url);
  const closeVideoModal = () => setSelectedVideo(null);

  return (
    <section className="course-content-wrapper">
      <h2 className="course-content-heading">Course Content</h2>

      {courseContent.map((section, idx) => (
        <div key={idx} className="course-section-block">
          <div className="course-section-header" onClick={() => toggleSection(idx)}>
            <h3>{section.sectionTitle}</h3>
            <span>{section.totalLessons} lessons • {section.totalDuration}</span>
          </div>

          {openSectionIndex === idx && (
            <ul className="course-lessons-list">
              {section.lessons.map((lesson, index) => (
                <li
                  key={index}
                  className="course-lesson-item"
                  onClick={() => openVideoModal(lesson.videoUrl)}
                >
                  <div className="lesson-title">{lesson.title}</div>
                  <div className="lesson-duration">{lesson.duration}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {/* Modal Video Player */}
      {selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal}>✕</button>
            <video
              className="video-modal-player"
              controls
              autoPlay
              src={selectedVideo}
            />
          </div>
        </div>
      )}
    </section>
  );
}
