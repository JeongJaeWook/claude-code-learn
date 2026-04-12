'use client';

import React, { useEffect, useState } from 'react';
import { db, auth } from '../../lib/firebase';
import { ref, get } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import HomeLayout from '../../components/HomeLayout';
import { lessons } from '../../data/curriculum';

interface UserData {
  metadata?: {
    email: string;
    displayName: string;
    lastSyncAt: string;
  };
  progress?: Record<string, { completed: boolean; completedAt: string }>;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const totalLessons = lessons.length;

  useEffect(() => {
    const fetchUsers = async (user: User) => {
      try {
        const usersRef = ref(db, 'users');
        const snapshot = await get(usersRef);
        if (snapshot.exists()) {
          setUsers(snapshot.val());
        }
      } catch (err: any) {
        console.error('Failed to fetch data:', err);
        setError('데이터를 불러오지 못했습니다. Firebase Database 규칙을 확인해주세요.');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email === 'admin@claude-code-learn.com') {
        setIsAdmin(true);
        fetchUsers(user);
      } else {
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <HomeLayout>
        <div style={{ padding: '4rem', textAlign: 'center' }}>데이터를 불러오는 중...</div>
      </HomeLayout>
    );
  }

  if (!isAdmin) {
    return (
      <HomeLayout>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <h2>접근 권한이 없습니다</h2>
          <p>관리자 계정(admin)으로 로그인해주세요.</p>
        </div>
      </HomeLayout>
    );
  }

  const userList = Object.entries(users).map(([uid, data]) => {
    const progressObj = data.progress || {};
    const completedCount = Object.values(progressObj).filter(v => !!v.completed).length;
    const progressPct = Math.round((completedCount / totalLessons) * 100) || 0;
    
    return {
      uid,
      email: data.metadata?.email || 'N/A',
      name: data.metadata?.displayName || 'Unknown',
      lastSyncAt: data.metadata?.lastSyncAt ? new Date(data.metadata.lastSyncAt).toLocaleString() : 'N/A',
      completedCount,
      progressPct
    };
  }).sort((a, b) => b.progressPct - a.progressPct);

  return (
    <HomeLayout>
      <div style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>관리자 대시보드</h1>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>수강생들의 학습 진행 상황을 확인합니다.</p>

        {error ? (
          <div style={{ padding: '1rem', background: '#ffecec', color: '#d32f2f', borderRadius: '8px' }}>
            {error}
          </div>
        ) : (
          <div style={{ overflowX: 'auto', background: 'var(--color-bg-primary)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
                  <th style={{ padding: '1rem' }}>이름</th>
                  <th style={{ padding: '1rem' }}>이메일</th>
                  <th style={{ padding: '1rem' }}>진행률</th>
                  <th style={{ padding: '1rem' }}>완료 레슨</th>
                  <th style={{ padding: '1rem' }}>마지막 접속</th>
                </tr>
              </thead>
              <tbody>
                {userList.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                      아직 가입한 사용자가 없습니다.
                    </td>
                  </tr>
                ) : userList.map(u => (
                  <tr key={u.uid} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{u.name}</td>
                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>{u.email}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '100px', height: '6px', background: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${u.progressPct}%`, height: '100%', background: 'var(--color-primary)' }} />
                        </div>
                        <span style={{ fontSize: '0.875rem' }}>{u.progressPct}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>{u.completedCount} / {totalLessons}</td>
                    <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{u.lastSyncAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
