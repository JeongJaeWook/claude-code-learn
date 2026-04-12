'use client';

import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // admin 아이디 입력 시 특수 처리 (1. 이메일 변환, 2. 비밀번호 길이 정책 회피용)
    const parsedEmail = email.trim().toLowerCase() === 'admin' ? 'admin@claude-code-learn.com' : email;
    const parsedPassword = email.trim().toLowerCase() === 'admin' && password === 'admin' ? 'admin123!' : password;

    try {
      if (isLoginView) {
        await signInWithEmailAndPassword(auth, parsedEmail, parsedPassword);
      } else {
        await createUserWithEmailAndPassword(auth, parsedEmail, parsedPassword);
      }
      onSuccess();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setErrorMsg('이메일이나 비밀번호가 올바르지 않습니다.');
      } else if (err.code === 'auth/email-already-in-use') {
        setErrorMsg('이미 가입된 이메일입니다.');
      } else {
        setErrorMsg('오류가 발생했습니다: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="닫기">×</button>
        
        <h2>{isLoginView ? '로그인' : '회원가입'}</h2>
        
        <div className="auth-modal-tabs">
          <button 
            className={`auth-modal-tab ${isLoginView ? 'active' : ''}`}
            onClick={() => { setIsLoginView(true); setErrorMsg(''); }}
          >
            기존 계정 로그인
          </button>
          <button 
            className={`auth-modal-tab ${!isLoginView ? 'active' : ''}`}
            onClick={() => { setIsLoginView(false); setErrorMsg(''); }}
          >
            새 계정 만들기
          </button>
        </div>

        <form onSubmit={handleAuth} className="auth-modal-form">
          <input 
            type={email.toLowerCase() === 'admin' ? 'text' : 'email'} 
            placeholder="이메일 (admin은 'admin' 입력)" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            autoComplete="username"
          />
          <input 
            type="password" 
            placeholder="비밀번호" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            autoComplete={isLoginView ? "current-password" : "new-password"}
          />
          
          {errorMsg && <div className="auth-error">{errorMsg}</div>}
          
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? '처리 중...' : (isLoginView ? '로그인하기' : '회원가입하기')}
          </button>
        </form>

        <div className="auth-divider"><span>또는</span></div>

        <button className="auth-google-btn" onClick={handleGoogleLogin}>
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google 계정으로 계속
        </button>
      </div>
    </div>
  );
}
