import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { syncProgressToCloud } from '../lib/progress';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const prev = user;
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser && !prev) {
        // 새로 로그인 시 localStorage 진도를 Firebase로 동기화
        await syncProgressToCloud();
        window.dispatchEvent(new Event('progressUpdated'));
      }
      if (!firebaseUser && prev) {
        window.dispatchEvent(new Event('progressUpdated'));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('로그인 실패:', err);
    }
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
      <button
        id="loginBtn"
        className="auth-login-btn"
        onClick={handleLogin}
        title="Google로 로그인 - 학습 진도와 메모를 어디서든 불러올 수 있어요"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        <span className="auth-login-text">로그인</span>
      </button>
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
              <div className="auth-menu-name">{displayName}</div>
              <div className="auth-menu-email">{user.email}</div>
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
