'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import HomeLayout from '../components/HomeLayout';
import { weeks, lessons } from '../data/curriculum';

export default function HomePage() {
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

  return (
    <HomeLayout>
      <section className="hero">
        <div className="hero-badge">4주 완성 커리큘럼</div>
        <h1>클로드 코드,<br />하루 하나씩 배워보세요</h1>
        <p className="hero-sub">
          설치부터 멀티에이전트까지 — 실습 중심으로 한 단계씩 익히는<br />
          클로드 코드 4주 완성 가이드
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">4주</span>
            <span className="hero-stat-label">커리큘럼</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">{totalLessons}개</span>
            <span className="hero-stat-label">레슨</span>
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">실습</span>
            <span className="hero-stat-label">중심</span>
          </div>
        </div>
      </section>

      <div className="progress-banner">
        <span className="progress-banner-label">내 진행률</span>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }}></div>
        </div>
        <span className="progress-pct">{completed} / {totalLessons} 완료</span>
      </div>

      <section className="curriculum-section">
        <h2>전체 커리큘럼</h2>
        <p className="section-sub">원하는 레슨을 클릭해서 바로 시작하세요</p>

        {weeks.map((week) => (
          <div key={week.number} className={`week-block week-${week.number}`}>
            <div className="week-header">
              <span className={`week-num w${week.number}`}>{week.number}</span>
              <span className="week-title">{week.title}</span>
            </div>
            <div className="lesson-grid">
              {week.lessons.map((lesson) => {
                const isDone = progress[lesson.id];
                return (
                  <Link
                    key={lesson.id}
                    href={lesson.slug} // Next.js <Link> automatically adds basePath if configured
                    className={`lesson-card ${isDone ? 'completed' : ''}`}
                  >
                    <span className="card-day">{lesson.dayLabel}</span>
                    <span className="card-title">{lesson.title}</span>
                    {lesson.subsections.length > 0 && (
                      <span className="card-count">{lesson.subsections.length}개 소단원</span>
                    )}
                    {lesson.day === 'weekend' && (
                      <span className="card-count">읽을거리</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="cta-section">
        <h2>지금 바로 시작해보세요</h2>
        <p>1주차 월요일부터 차근차근 따라오면 됩니다</p>
        <Link href="/week1/mon" className="btn-primary">
          1주차 시작하기 →
        </Link>
      </section>
    </HomeLayout>
  );
}
