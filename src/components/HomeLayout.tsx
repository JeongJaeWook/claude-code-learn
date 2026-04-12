import React from 'react';
import Header from './Header';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-wrapper home-page">
      <Header />
      <main className="content-wrapper home-main">
        {children}
      </main>
      
      <footer className="site-footer">
        <p>© {new Date().getFullYear()} 클로드 코드 프랙티스. All rights reserved.</p>
      </footer>
    </div>
  );
}
