'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthButton from './AuthButton';
import '../styles/header.css';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface HeaderProps {
  showMobileMenu?: boolean;
}

export default function Header({ showMobileMenu = false }: HeaderProps) {
  const [isAdmin, setIsAdmin] = useState(false);

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
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === 'admin@claude-code-learn.com');
    });

    return () => {
      btn?.removeEventListener('click', handleToggle);
      unsubscribe();
    };
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
          {isAdmin && (
            <Link href="/admin" className="header-link" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>대시보드</Link>
          )}
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
