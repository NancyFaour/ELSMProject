'use client'
import '../style/FirstBody.css'

export default function FirstBody() {
  return (
    <section className="hero-section">
      <div className="hero-left">
        <h1>Online Education</h1>
        <h2>Learn The Skills You Need To Succeed</h2>
        <p>
          Free online courses from the world’s leading experts. Join 18+ million learners today.
        </p>

        <div className="hero-search">
          <input type="text" placeholder="Keywords of your course" />
          <button>Search Course</button>
        </div>

        <div className="hero-tags">
          <span>Most Popular :</span>
          <ul>
            <li>Figma</li>
            <li>Adobe XD</li>
            <li>Illustration</li>
            <li>Photoshop</li>
          </ul>
        </div>
      </div>

      <div className="hero-right">
        {<img src="/images/FirstBody.png" alt="First Body Image" />}
      </div>
    </section>
  );
}
