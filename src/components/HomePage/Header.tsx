'use client';

import { useState } from 'react';

import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header-container">
      {/* Upper Header */}
      <div className="upper-header">
        <div className="upper-left">
          <span>📍 Where to find us</span>
          <span className="phone">
            <PhoneIcon className="w-4 h-4 inline mr-1" />
            +961 71 255 497
          </span>
        </div>
        <div className="upper-right">
          <a href="#" title="Messenger">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
          </a>
          <a href="#" title="Twitter">
            <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
          </a>
          <a href="#" title="Skype">
            <GlobeAltIcon className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Lower Header */}
      <div className="lower-header">
        <div className="logo">LMS</div>

        {/* Hamburger Toggle Button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>

        {/* Nav Links */}
        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#">HOME</a>
          <a href="#">COURSES</a>
          <a href="#">PAGES</a>
          <a href="#">CONTACT</a>
        </nav>
      </div>
    </header>
  );
}
