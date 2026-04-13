'use client';

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SubsectionTOC from './SubsectionTOC';
import LessonNav from './LessonNav';
import NotePanel from './NotePanel';
import { Lesson, weeks } from '../data/curriculum';

interface LessonLayoutProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export default function LessonLayout({ lesson, children }: LessonLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isWide, setIsWide] = useState(true); // 1280px 초과 여부

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1281px)');
    setIsWide(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsWide(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const storedProgress = localStorage.getItem('progress');
    if (storedProgress) {
      try {
        const parsed = JSON.parse(storedProgress);
        setIsCompleted(!!parsed[lesson.id]);
      } catch (e) {}
    }

    const handleProgressUpdate = () => {
      try {
        const p = JSON.parse(localStorage.getItem('progress') || '{}');
        setIsCompleted(!!p[lesson.id]);
      } catch (e) {}
    };

    window.addEventListener('progressUpdated', handleProgressUpdate);
    return () => window.removeEventListener('progressUpdated', handleProgressUpdate);
  }, [lesson.id]);

  useEffect(() => {
    document.title = `${lesson.title} | 클로드 코드 배우기`;
  }, [lesson.title]);

  const toggleComplete = () => {
    try {
      const p = JSON.parse(localStorage.getItem('progress') || '{}');
      p[lesson.id] = !p[lesson.id];
      localStorage.setItem('progress', JSON.stringify(p));
      window.dispatchEvent(new Event('progressUpdated'));
    } catch(e) {}
  };

  const weekColors = ['week1', 'week2', 'week3', 'week4'];
  const weekColor = weekColors[lesson.week - 1];
  const weekTitle = weeks.find(w => w.number === lesson.week)?.title ?? '';

  useEffect(() => {
    const btn = document.getElementById('mobileMenuBtn');
    const handleToggle = () => setIsMobileMenuOpen(prev => !prev);
    btn?.addEventListener('click', handleToggle);
    return () => btn?.removeEventListener('click', handleToggle);
  }, []);

  // 사이드바 접힘 상태를 grid에 반영
  const sidebarCol = isSidebarCollapsed ? '64px' : 'var(--sidebar-width)';
  const contentStyle: React.CSSProperties = isWide
    ? { gridTemplateColumns: `${sidebarCol} 1fr 340px` }
    : { gridTemplateColumns: `${sidebarCol} 1fr` };

  return (
    <div className="page-wrapper">
      <Header showMobileMenu={true} />

      <div className="content-wrapper" style={contentStyle}>
        <Sidebar
          currentSlug={lesson.slug}
          collapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        />

        <main className="lesson-main">
          <div className="lesson-header">
            <div className="lesson-meta">
              <span className={`badge badge-${weekColor}`}>{lesson.week}주차</span>
              <span className="lesson-week-label">{weekTitle}</span>
              <span className="lesson-day-label">{lesson.dayLabel}요일</span>
            </div>
            <h1 className="lesson-title">{lesson.title}</h1>
            <button
              className={`lesson-complete-btn ${isCompleted ? 'completed' : ''}`}
              onClick={toggleComplete}
            >
              <span className="btn-icon">{isCompleted ? '✓' : '○'}</span>
              <span className="btn-label">{isCompleted ? '완료됨' : '완료로 표시'}</span>
            </button>
          </div>

          <div className="lesson-content">
            {children}
          </div>

          <LessonNav prev={lesson.prev} next={lesson.next} />
        </main>

        <aside className="note-aside">
          <NotePanel lessonId={lesson.id} />
        </aside>
      </div>

      {isMobileMenuOpen && (
        <div
          className="sidebar-overlay open"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
      <Sidebar currentSlug={lesson.slug} isMobile={true} />

      {/* 메모 플로팅 버튼 (좁은 화면에서 note-aside가 숨겨질 때 표시) */}
      <button
        className={`note-fab ${isNoteOpen ? 'note-fab--active' : ''}`}
        onClick={() => setIsNoteOpen(prev => !prev)}
        aria-label="메모 열기/닫기"
        title="내 메모"
      >
        <span className="note-fab__icon">📝</span>
      </button>

      {/* 메모 드로어 (좁은 화면) */}
      {isNoteOpen && (
        <div className="note-drawer-overlay" onClick={() => setIsNoteOpen(false)} />
      )}
      <div className={`note-drawer ${isNoteOpen ? 'note-drawer--open' : ''}`}>
        <div className="note-drawer__header">
          <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>내 메모</span>
          <button
            className="note-drawer__close"
            onClick={() => setIsNoteOpen(false)}
            aria-label="메모 닫기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <NotePanel lessonId={lesson.id} />
      </div>
    </div>
  );
}
