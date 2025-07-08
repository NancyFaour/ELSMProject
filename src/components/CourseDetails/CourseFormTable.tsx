'use client';
import React, { JSX } from 'react';
import {
  FaClock,
  FaBook,
  FaGraduationCap,
  FaGlobe,
  FaCertificate,
  FaVideo,
  FaQuestionCircle,
  FaPercent
} from 'react-icons/fa';

type CourseDetail = {
  label: string;
  value: string;
};

type CourseFormTableProps = {
  courseDetails: CourseDetail[];
};

// Map label to corresponding icon component
const iconMap: Record<string, JSX.Element> = {
  "Course Level": <FaGraduationCap className="course-form-icon" />,
  "Course Duration": <FaClock className="course-form-icon" />,
  "Online Class": <FaVideo className="course-form-icon" />,
  "Lessons": <FaBook className="course-form-icon" />,
  "Quizzes": <FaQuestionCircle className="course-form-icon" />,
  "Pass Percentage": <FaPercent className="course-form-icon" />,
  "Certificate": <FaCertificate className="course-form-icon" />,
  "Language": <FaGlobe className="course-form-icon" />
};

export default function CourseFormTable({ courseDetails }: CourseFormTableProps) {
  return (
    <section className="course-form-table-wrapper">
      <div className="course-form-table-content">
        <h2 className="course-form-table-title">Course Information</h2>
        <table className="course-form-table">
          <tbody>
            {courseDetails.map((detail, index) => (
              <tr key={index} className="course-form-table-row">
                <td className="course-form-table-label">
                  {iconMap[detail.label]}
                  {detail.label}
                </td>
                <td className="course-form-table-value">{detail.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
