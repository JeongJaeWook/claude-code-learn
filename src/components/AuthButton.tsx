'use client';
import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { syncProgressToCloud } from '../lib/progress';

import { signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import AuthModal from './AuthModal';

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const prev = user;
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser && !prev) {
        await syncProgressToCloud();
        window.dispatchEvent(new Event('progressUpdated'));
      }
      if (!firebaseUser && prev) {
        window.dispatchEvent(new Event('progressUpdated'));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setMenuOpen(false);
  };

  if (loading) {
    return (
      <div className="auth-loading" aria-label="로딩 중">
        <div className="auth-spinner" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ position: 'relative' }}>
        <button
          id="loginBtn"
          className="auth-login-btn"
          onClick={handleLogin}
          title="로그인 또는 회원가입"
        >
          <span className="auth-login-text">
            로그인 / 가입
          </span>
        </button>
        {showModal && (
          <AuthModal 
            onClose={() => setShowModal(false)} 
            onSuccess={() => setShowModal(false)} 
          />
        )}
        {error && (
          <div className="auth-error" onClick={() => setError(null)}>
            {error}
          </div>
        )}
      </div>
    );
  }

  const avatarUrl = user.photoURL ?? undefined;
  const displayName = user.displayName ?? user.email?.split('@')[0] ?? '사용자';
  const initials = displayName.charAt(0).toUpperCase();

  return (
    <div className="auth-user" style={{ position: 'relative' }}>
      <button
        id="userMenuBtn"
        className="auth-avatar-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={`${displayName} 메뉴`}
        title={displayName}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt={displayName} className="auth-avatar-img" />
        ) : (
          <div className="auth-avatar-placeholder">{initials}</div>
        )}
        <span className="auth-name">{displayName.split(' ')[0]}</span>
      </button>

      {menuOpen && (
        <>
          <div className="auth-menu-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="auth-menu" role="menu">
            <div className="auth-menu-info">
              {avatarUrl ? (
                <img src={avatarUrl} alt={displayName} className="auth-menu-avatar" />
              ) : (
                <div className="auth-menu-avatar-placeholder">{initials}</div>
              )}
              <div className="auth-menu-text">
                <div className="auth-menu-name">{displayName}</div>
                <div className="auth-menu-email">{user.email}</div>
              </div>
            </div>
            <hr className="auth-menu-divider" />
            <button
              className="auth-menu-item auth-logout"
              onClick={handleLogout}
              role="menuitem"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
              로그아웃
            </button>
          </div>
        </>
      )}
    </div>
  );
}
