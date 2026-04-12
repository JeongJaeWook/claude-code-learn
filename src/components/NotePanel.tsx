'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { saveNote, getNote } from '../lib/progress';
import type { NoteData, DrawingStroke } from '../lib/progress';

interface NotePanelProps {
  lessonId: string;
}

type ActiveTab = 'text' | 'drawing';

const PEN_COLORS = [
  { value: '#1e293b', label: '검정' },
  { value: '#3b82f6', label: '파랑' },
  { value: '#ef4444', label: '빨강' },
  { value: '#10b981', label: '초록' },
];

const PEN_SIZES = [
  { value: 2, label: '가늘게' },
  { value: 4, label: '보통' },
  { value: 8, label: '굵게' },
];

export default function NotePanel({ lessonId }: NotePanelProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('text');
  const [textContent, setTextContent] = useState('');
  const [strokes, setStrokes] = useState<DrawingStroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<DrawingStroke | null>(null);
  const [penColor, setPenColor] = useState(PEN_COLORS[0].value);
  const [penSize, setPenSize] = useState(PEN_SIZES[1].value);
  const [isEraser, setIsEraser] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isExpanded, setIsExpanded] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── 초기 데이터 로드 ──────────────────────────────────────
  useEffect(() => {
    getNote(lessonId).then((note) => {
      setTextContent(note.textContent);
      setStrokes(note.drawingData);
    });
  }, [lessonId]);

  // ── Canvas 렌더링 ─────────────────────────────────────────
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;
    allStrokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      stroke.points.slice(1).forEach((pt) => ctx.lineTo(pt.x, pt.y));
      ctx.stroke();
    });
  }, [strokes, currentStroke]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Canvas 크기 조정 (resize observer)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        redrawCanvas();
      }
    };
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [redrawCanvas]);

  // ── 자동 저장 ─────────────────────────────────────────────
  const scheduleSave = useCallback((text: string, stks: DrawingStroke[]) => {
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    setSaveStatus('saving');
    saveTimerRef.current = setTimeout(async () => {
      const note: NoteData = { textContent: text, drawingData: stks };
      await saveNote(lessonId, note);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  }, [lessonId]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(e.target.value);
    scheduleSave(e.target.value, strokes);
  };

  // ── 그리기 이벤트 ─────────────────────────────────────────
  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    const color = isEraser ? '#ffffff' : penColor;
    const width = isEraser ? 24 : penSize;
    setIsDrawing(true);
    setCurrentStroke({ points: [pos], color, width });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !currentStroke) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);
    setCurrentStroke(prev =>
      prev ? { ...prev, points: [...prev.points, pos] } : prev
    );
  };

  const endDraw = () => {
    if (!isDrawing || !currentStroke) return;
    setIsDrawing(false);
    const newStrokes = [...strokes, currentStroke];
    setStrokes(newStrokes);
    setCurrentStroke(null);
    scheduleSave(textContent, newStrokes);
  };

  const handleUndo = () => {
    const newStrokes = strokes.slice(0, -1);
    setStrokes(newStrokes);
    scheduleSave(textContent, newStrokes);
  };

  const handleClearCanvas = () => {
    setStrokes([]);
    scheduleSave(textContent, []);
  };

  // ── 진도 상태 이벤트 구독 ─────────────────────────────────
  useEffect(() => {
    const handler = () => {
      getNote(lessonId).then(note => {
        setTextContent(note.textContent);
        setStrokes(note.drawingData);
      });
    };
    window.addEventListener('progressUpdated', handler);
    return () => window.removeEventListener('progressUpdated', handler);
  }, [lessonId]);

  return (
    <div className={`note-panel ${isExpanded ? 'note-panel--expanded' : ''}`} id="notePanel">
      {/* 헤더 */}
      <div className="note-panel__header">
        <div className="note-panel__title">
          <span className="note-panel__icon">📝</span>
          <span>내 메모</span>
          {saveStatus === 'saving' && <span className="note-save-status saving">저장 중…</span>}
          {saveStatus === 'saved' && <span className="note-save-status saved">✓ 저장됨</span>}
        </div>
        <div className="note-panel__actions">
          {isExpanded ? (
            <button
              className="note-collapse-btn"
              onClick={() => setIsExpanded(false)}
              title="메모 닫기"
              aria-label="메모 축소"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
              닫기
            </button>
          ) : (
            <button
              className="note-expand-btn"
              onClick={() => setIsExpanded(true)}
              title="전체화면으로 보기"
              aria-label="메모 전체화면"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 탭 */}
      <div className="note-tabs" role="tablist">
        <button
          className={`note-tab ${activeTab === 'text' ? 'note-tab--active' : ''}`}
          onClick={() => setActiveTab('text')}
          role="tab"
          aria-selected={activeTab === 'text'}
          id="tab-text"
          aria-controls="panel-text"
        >
          ✏️ 타이핑
        </button>
        <button
          className={`note-tab ${activeTab === 'drawing' ? 'note-tab--active' : ''}`}
          onClick={() => setActiveTab('drawing')}
          role="tab"
          aria-selected={activeTab === 'drawing'}
          id="tab-drawing"
          aria-controls="panel-drawing"
        >
          🖊️ 손글씨
        </button>
      </div>

      {/* 텍스트 탭 */}
      {activeTab === 'text' && (
        <div className="note-content" id="panel-text" role="tabpanel" aria-labelledby="tab-text">
          <textarea
            id="noteTextarea"
            className="note-textarea"
            value={textContent}
            onChange={handleTextChange}
            placeholder="이 레슨에서 배운 내용을 자유롭게 메모하세요…"
            aria-label="텍스트 메모"
          />
        </div>
      )}

      {/* 손글씨 탭 */}
      {activeTab === 'drawing' && (
        <div className="note-content" id="panel-drawing" role="tabpanel" aria-labelledby="tab-drawing">
          {/* 툴바 */}
          <div className="drawing-toolbar" role="toolbar" aria-label="그리기 도구">
            {/* 펜 색상 */}
            <div className="toolbar-group" role="group" aria-label="펜 색상">
              {PEN_COLORS.map(c => (
                <button
                  key={c.value}
                  className={`color-btn ${penColor === c.value && !isEraser ? 'color-btn--active' : ''}`}
                  style={{ background: c.value }}
                  onClick={() => { setPenColor(c.value); setIsEraser(false); }}
                  title={c.label}
                  aria-label={`${c.label} 펜`}
                  aria-pressed={penColor === c.value && !isEraser}
                />
              ))}
            </div>

            <div className="toolbar-separator" />

            {/* 펜 굵기 */}
            <div className="toolbar-group" role="group" aria-label="펜 굵기">
              {PEN_SIZES.map(s => (
                <button
                  key={s.value}
                  className={`size-btn ${penSize === s.value && !isEraser ? 'size-btn--active' : ''}`}
                  onClick={() => { setPenSize(s.value); setIsEraser(false); }}
                  title={s.label}
                  aria-label={`굵기 ${s.label}`}
                  aria-pressed={penSize === s.value && !isEraser}
                >
                  <span style={{
                    display: 'block',
                    width: s.value * 2.5,
                    height: s.value * 2.5,
                    maxWidth: 20,
                    maxHeight: 20,
                    background: 'currentColor',
                    borderRadius: '50%',
                  }} />
                </button>
              ))}
            </div>

            <div className="toolbar-separator" />

            {/* 도구 버튼 */}
            <div className="toolbar-group" role="group" aria-label="도구">
              <button
                className={`tool-btn ${isEraser ? 'tool-btn--active' : ''}`}
                onClick={() => setIsEraser(!isEraser)}
                title="지우개"
                aria-label="지우개"
                aria-pressed={isEraser}
              >
                🧹
              </button>
              <button
                className="tool-btn"
                onClick={handleUndo}
                disabled={strokes.length === 0}
                title="되돌리기 (Undo)"
                aria-label="마지막 획 되돌리기"
              >
                ↩
              </button>
              <button
                className="tool-btn tool-btn--danger"
                onClick={handleClearCanvas}
                disabled={strokes.length === 0}
                title="전체 지우기"
                aria-label="캔버스 전체 지우기"
              >
                🗑
              </button>
            </div>
          </div>

          {/* 캔버스 */}
          <canvas
            ref={canvasRef}
            id="drawingCanvas"
            className={`drawing-canvas ${isEraser ? 'drawing-canvas--eraser' : ''}`}
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={endDraw}
            aria-label="손글씨 메모 캔버스"
          />
        </div>
      )}
    </div>
  );
}
