'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import '../styles/header.css';

interface HeaderProps {
  showMobileMenu?: boolean;
}

export default function Header({ showMobileMenu = false }: HeaderProps) {
  useEffect(() => {
    // 테마 토글 초기화
    const btn = document.getElementById('themeToggle');
    const handleToggle = () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch(e) {}
    };
    btn?.addEventListener('click', handleToggle);
    return () => btn?.removeEventListener('click', handleToggle);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-left">
          {showMobileMenu && (
            <button className="mobile-menu-btn" id="mobileMenuBtn" aria-label="메뉴 열기">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              목차
            </button>
          )}
          <Link href="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">클로드 코드 배우기</span>
          </Link>
        </div>
        <div className="header-right">
          <Link href="/" className="header-link">홈</Link>
          <AuthButton />
          <button className="theme-toggle" id="themeToggle" aria-label="테마 전환">
            <span className="theme-icon light-icon">🌙</span>
            <span className="theme-icon dark-icon">☀️</span>
          </button>
        </div>
      </div>
    </header>
  );
}
