'use client';

import { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import {
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function AuthorizedHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem('accessToken') || sessionStorage.getItem('accessToken');
    setIsLoggedIn(!!token); // true if token exists
  }, []);

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
        <div className="logo">ELMS</div>

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

        <nav className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <a href="/Home">HOME</a>
          <a href="/Course">COURSES</a>
          <a href="/Contact">CONTACT</a>

          <div className="auth-buttons">
            {isLoggedIn ? (
              <>
                <a href="/Profile">PROFILE</a>
                <LogoutButton />
              </>
            ) : (
              <>
                <a href="/login">LOGIN</a>
                <a href="/register">REGISTER</a>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
