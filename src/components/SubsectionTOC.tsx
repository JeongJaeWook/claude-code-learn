'use client';

import React, { useEffect, useState } from 'react';
import type { Subsection } from '../data/curriculum';

interface SubsectionTOCProps {
  subsections: Subsection[];
}

export default function SubsectionTOC({ subsections }: SubsectionTOCProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (subsections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    subsections.forEach((s) => {
      const target = document.getElementById(s.id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [subsections]);

  if (subsections.length === 0) return null;

  return (
    <aside className="toc-aside" aria-label="이 페이지 목차">
      <p className="toc-label">이 페이지</p>
      {subsections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className={`toc-link ${activeId === s.id ? 'active' : ''}`}
        >
          {s.title}
        </a>
      ))}
    </aside>
  );
}
