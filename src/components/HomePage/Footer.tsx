'use client';

import '../style/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="newsletter">
        <h2>Want Us To Email You About Special Offers And Updates?</h2>
        <input type="email" placeholder="Enter Your Email" />
      </div>

      {/* Sections */}
      <div className="footer-sections">
        {/* Useful Links */}
        <div className="footer-column">
          <h4>Useful Links</h4>
          <a href="#">Home</a>
          <a href="#">Courses</a>
          <a href="#">Pages</a>
          <a href="#">Contact</a>
        </div>

        {/* About & Contact */}
        <div className="footer-column">
          <h4>About Us</h4>
          <a href="#">Our Mission</a>
          <a href="#">Team</a>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <a href="#">Phone: +961 71 255 497</a>
          <a href="#">Email: contact@elms.com</a>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h4>Social Contact</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">GitHub</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="copyright">
        © 2025 ELMS — Designed by inMobiles
      </div>
    </footer>
  );
}
