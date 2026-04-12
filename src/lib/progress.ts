/**
 * 학습 진도 관리 모듈
 * - 로그인 시: Supabase에서 읽고 쓰기
 * - 비로그인 시: localStorage fallback
 * - 로그인 시 localStorage → Supabase 자동 동기화
 */

import { supabase } from './supabase';
import type { DrawingStroke } from './supabase';

// ── 진도 저장 ─────────────────────────────────────────────────

export async function markLesson(lessonId: string, completed: boolean): Promise<void> {
  // localStorage 항상 업데이트 (오프라인 fallback)
  const localProgress = getLocalProgress();
  localProgress[lessonId] = completed;
  setLocalProgress(localProgress);

  // 로그인 상태면 Supabase에도 저장
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('user_progress').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  }, { onConflict: 'user_id,lesson_id' });
}

export async function getProgress(): Promise<Record<string, boolean>> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return getLocalProgress();
  }

  // Supabase에서 가져오기
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, completed')
    .eq('user_id', user.id);

  if (error || !data) {
    return getLocalProgress();
  }

  const progress: Record<string, boolean> = {};
  data.forEach(row => {
    progress[row.lesson_id] = row.completed;
  });
  return progress;
}

// 로그인 시 localStorage → Supabase 동기화
export async function syncProgressToCloud(): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const localProgress = getLocalProgress();
  if (Object.keys(localProgress).length === 0) return;

  const rows = Object.entries(localProgress).map(([lessonId, completed]) => ({
    user_id: user.id,
    lesson_id: lessonId,
    completed,
    completed_at: completed ? new Date().toISOString() : null,
  }));

  await supabase.from('user_progress').upsert(rows, { onConflict: 'user_id,lesson_id' });
}

// ── 메모 저장 ─────────────────────────────────────────────────

export type NoteData = {
  textContent: string;
  drawingData: DrawingStroke[];
};

export async function saveNote(lessonId: string, note: NoteData): Promise<void> {
  // localStorage 항상 업데이트
  const localNotes = getLocalNotes();
  localNotes[lessonId] = note;
  setLocalNotes(localNotes);

  // 로그인 상태면 Supabase에도 저장
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from('user_notes').upsert({
    user_id: user.id,
    lesson_id: lessonId,
    text_content: note.textContent,
    drawing_data: note.drawingData as unknown as never,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'user_id,lesson_id' });
}

export async function getNote(lessonId: string): Promise<NoteData> {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const localNotes = getLocalNotes();
    return localNotes[lessonId] ?? { textContent: '', drawingData: [] };
  }

  const { data, error } = await supabase
    .from('user_notes')
    .select('text_content, drawing_data')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .maybeSingle();

  if (error || !data) {
    const localNotes = getLocalNotes();
    return localNotes[lessonId] ?? { textContent: '', drawingData: [] };
  }

  return {
    textContent: data.text_content ?? '',
    drawingData: (data.drawing_data as unknown as DrawingStroke[]) ?? [],
  };
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
