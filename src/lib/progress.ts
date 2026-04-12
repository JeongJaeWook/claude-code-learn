/**
 * 학습 진도 & 메모 관리 모듈 (Firebase Realtime Database)
 * - 로그인 시: Firebase에서 읽고 쓰기
 * - 비로그인 시: localStorage fallback
 * - 로그인 시 localStorage → Firebase 자동 동기화
 *
 * DB 구조:
 * /users/{uid}/progress/{lessonId}: { completed, completedAt }
 * /users/{uid}/notes/{lessonId}: { textContent, drawingData[] }
 */

import { auth, db } from './firebase';
import { ref, set, get, update } from 'firebase/database';

export type DrawingStroke = {
  points: { x: number; y: number }[];
  color: string;
  width: number;
};

export type NoteData = {
  textContent: string;
  drawingData: DrawingStroke[];
};

// ── 진도 저장 ─────────────────────────────────────────────────

export async function markLesson(lessonId: string, completed: boolean): Promise<void> {
  // localStorage 항상 업데이트 (오프라인 fallback)
  const localProgress = getLocalProgress();
  localProgress[lessonId] = completed;
  setLocalProgress(localProgress);

  // 로그인 상태면 Firebase에도 저장
  const user = auth.currentUser;
  if (!user) return;

  const progressRef = ref(db, `users/${user.uid}/progress/${lessonId}`);
  await set(progressRef, {
    completed,
    completedAt: completed ? new Date().toISOString() : null,
  });
}

export async function getProgress(): Promise<Record<string, boolean>> {
  const user = auth.currentUser;
  if (!user) {
    return getLocalProgress();
  }

  try {
    const progressRef = ref(db, `users/${user.uid}/progress`);
    const snapshot = await get(progressRef);
    if (!snapshot.exists()) return getLocalProgress();

    const data = snapshot.val() as Record<string, { completed: boolean }>;
    const progress: Record<string, boolean> = {};
    Object.entries(data).forEach(([lessonId, val]) => {
      progress[lessonId] = val.completed;
    });
    return progress;
  } catch {
    return getLocalProgress();
  }
}

// 사용자 메타데이터 동기화 (Admin 페이지용)
export async function syncUserMetadata(): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  
  const metaRef = ref(db, `users/${user.uid}/metadata`);
  await update(metaRef, {
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || '사용자',
    lastSyncAt: new Date().toISOString()
  });
}

// 로그인 시 localStorage → Firebase 동기화
export async function syncProgressToCloud(): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  
  await syncUserMetadata();

  const localProgress = getLocalProgress();
  if (Object.keys(localProgress).length === 0) return;

  const updates: Record<string, unknown> = {};
  Object.entries(localProgress).forEach(([lessonId, completed]) => {
    updates[`users/${user.uid}/progress/${lessonId}`] = {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
    };
  });

  await update(ref(db), updates);
}

// ── 메모 저장 ─────────────────────────────────────────────────

export async function saveNote(lessonId: string, note: NoteData): Promise<void> {
  // localStorage 항상 업데이트
  const localNotes = getLocalNotes();
  localNotes[lessonId] = note;
  setLocalNotes(localNotes);

  // 로그인 상태면 Firebase에도 저장
  const user = auth.currentUser;
  if (!user) return;

  const noteRef = ref(db, `users/${user.uid}/notes/${lessonId}`);
  await set(noteRef, {
    textContent: note.textContent,
    drawingData: note.drawingData.length > 0 ? note.drawingData : [],
    updatedAt: new Date().toISOString(),
  });
}

export async function getNote(lessonId: string): Promise<NoteData> {
  const user = auth.currentUser;
  if (!user) {
    const localNotes = getLocalNotes();
    return localNotes[lessonId] ?? { textContent: '', drawingData: [] };
  }

  try {
    const noteRef = ref(db, `users/${user.uid}/notes/${lessonId}`);
    const snapshot = await get(noteRef);
    if (!snapshot.exists()) {
      const localNotes = getLocalNotes();
      return localNotes[lessonId] ?? { textContent: '', drawingData: [] };
    }
    const data = snapshot.val();
    return {
      textContent: data.textContent ?? '',
      drawingData: (data.drawingData as DrawingStroke[]) ?? [],
    };
  } catch {
    const localNotes = getLocalNotes();
    return localNotes[lessonId] ?? { textContent: '', drawingData: [] };
  }
}

// ── localStorage 헬퍼 ─────────────────────────────────────────

function getLocalProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem('progress') ?? '{}');
  } catch {
    return {};
  }
}

function setLocalProgress(progress: Record<string, boolean>): void {
  try {
    localStorage.setItem('progress', JSON.stringify(progress));
  } catch {}
}

function getLocalNotes(): Record<string, NoteData> {
  try {
    return JSON.parse(localStorage.getItem('notes') ?? '{}');
  } catch {
    return {};
  }
}

function setLocalNotes(notes: Record<string, NoteData>): void {
  try {
    localStorage.setItem('notes', JSON.stringify(notes));
  } catch {}
}
