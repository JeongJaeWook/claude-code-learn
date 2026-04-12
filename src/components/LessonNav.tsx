import React from 'react';
import Link from 'next/link';
import { getLessonBySlug } from '../data/curriculum';

interface LessonNavProps {
  prev: string | null;
  next: string | null;
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  const prevLesson = prev ? getLessonBySlug(prev) : null;
  const nextLesson = next ? getLessonBySlug(next) : null;

  return (
    <nav className="lesson-nav" aria-label="레슨 이동">
      {prevLesson ? (
        <Link href={prevLesson.slug} className="lesson-nav-btn prev">
          <span className="nav-arrow">←</span>
          <span className="nav-info">
            <span className="nav-label">이전 레슨</span>
            <span className="nav-title">{prevLesson.title}</span>
          </span>
        </Link>
      ) : <div></div>}

      {nextLesson ? (
        <Link href={nextLesson.slug} className="lesson-nav-btn next">
          <span className="nav-arrow">→</span>
          <span className="nav-info">
            <span className="nav-label">다음 레슨</span>
            <span className="nav-title">{nextLesson.title}</span>
          </span>
        </Link>
      ) : <div></div>}
    </nav>
  );
}
