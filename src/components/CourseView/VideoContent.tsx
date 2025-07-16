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

  const openVideo = (url: string) => setSelectedVideo(url);

  return (
    <section className="course-view-layout">
      <div className="video-pane">
        {selectedVideo ? (
          <video controls autoPlay className="main-video" src={selectedVideo} />
        ) : (
          <div className="video-placeholder">Select a lesson to play the video</div>
        )}
      </div>

      <div className="content-pane">
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
                    onClick={() => openVideo(lesson.videoUrl)}
                  >
                    <div className="lesson-title">{lesson.title}</div>
                    <div className="lesson-duration">{lesson.duration}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
