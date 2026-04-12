'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { weeks, lessons } from '../data/curriculum';

interface SidebarProps {
  currentSlug: string;
  isMobile?: boolean;
}

export default function Sidebar({ currentSlug, isMobile = false }: SidebarProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const totalLessons = lessons.length;

  useEffect(() => {
    const handleProgress = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('progress') || '{}');
        setProgress(stored);
      } catch (e) {}
    };
    handleProgress();
    window.addEventListener('progressUpdated', handleProgress);
    return () => window.removeEventListener('progressUpdated', handleProgress);
  }, []);

  const completed = Object.values(progress).filter(Boolean).length;
  const pct = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  const sidebarClass = isMobile ? 'sidebar-mobile' : 'sidebar';
  const idPrefix = isMobile ? 'mobile' : 'sidebar';

  const toggleCheck = (e: React.MouseEvent | React.KeyboardEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nextProgress = { ...progress, [id]: !progress[id] };
    setProgress(nextProgress);
    try {
      localStorage.setItem('progress', JSON.stringify(nextProgress));
    } catch (e) {}
    window.dispatchEvent(new Event('progressUpdated'));
  };

  return (
    <nav className={`${sidebarClass} ${isMobile ? '' : ''}`} id={isMobile ? 'mobileSidebar' : 'sidebar'} aria-label="커리큘럼 목차">
      <div className="sidebar-progress-wrap">
        <div className="sidebar-progress-label">
          <span>전체 진행률</span>
          <span className="sidebar-pct">{pct}%</span>
        </div>
        <div className="sidebar-progress-track">
          <div className="sidebar-progress-fill" style={{ width: `${pct}%` }}></div>
        </div>
      </div>

      {weeks.map((week) => (
        <div key={week.number} className={`sidebar-week w${week.number}`}>
          <div className="sidebar-week-header">
            <span className="sidebar-week-dot"></span>
            <span>{week.number}주차 — {week.title}</span>
          </div>
          {week.lessons.map((lesson) => {
            const isDone = progress[lesson.id];
            const isActive = lesson.slug === currentSlug;
            return (
              <Link
                key={lesson.id}
                href={lesson.slug} // Next.js Link automatically handles basePath
                className={`sidebar-lesson ${isActive ? 'active' : ''} ${isDone ? 'completed-lesson' : ''}`}
              >
                <span
                  className={`sidebar-check ${isDone ? 'done' : ''}`}
                  role="checkbox"
                  aria-checked={isDone ? 'true' : 'false'}
                  aria-label={`${lesson.title} 완료 표시`}
                  tabIndex={0}
                  onClick={(e) => toggleCheck(e, lesson.id)}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') toggleCheck(e, lesson.id);
                  }}
                ></span>
                <span className="sidebar-day">{lesson.dayLabel}</span>
                <span className="sidebar-lesson-title">{lesson.title}</span>
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
