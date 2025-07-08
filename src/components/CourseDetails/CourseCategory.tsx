'use client';
import React from 'react';

type Category = {
  label: string;
  value: string;
};

type CourseCategoryProps = {
  courseCategories: Category[];
};

export default function CourseCategory({ courseCategories }: CourseCategoryProps) {
  return (
    <section className="course-form-table-wrapper">
      <div className="course-form-table-content">
        <h2 className="course-form-table-title">Course Categories</h2>
        <table className="course-form-table">
          <tbody>
            {courseCategories.map((category, index) => (
              <tr key={index} className="course-form-table-row">
                <td className="course-form-table-label">{category.label}</td>
                <td className="course-form-table-value">{category.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
