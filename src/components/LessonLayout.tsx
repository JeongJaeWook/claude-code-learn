'use client';

import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import SubsectionTOC from './SubsectionTOC';
import LessonNav from './LessonNav';
import NotePanel from './NotePanel'; // 기존 React 컴포넌트 재사용
import { Lesson, weeks } from '../data/curriculum';

interface LessonLayoutProps {
  lesson: Lesson;
  children: React.ReactNode;
}

export default function LessonLayout({ lesson, children }: LessonLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // 테마 전환 버튼 (Header 컴포넌트 내부에 적용됨)
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
    // 문서 제목 변경
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
    // 모바일 사이드바 토글 연동
    const btn = document.getElementById('mobileMenuBtn');
    const handleToggle = () => setIsMobileMenuOpen(prev => !prev);
    btn?.addEventListener('click', handleToggle);
    return () => btn?.removeEventListener('click', handleToggle);
  }, []);

  return (
    <div className="page-wrapper">
      <Header showMobileMenu={true} />

      <div className="content-wrapper">
        <Sidebar currentSlug={lesson.slug} />

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
    </div>
  );
}
