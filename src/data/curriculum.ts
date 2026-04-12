export type Subsection = {
  id: string;
  title: string;
};

export type Lesson = {
  id: string;
  week: number;
  day: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'weekend';
  dayLabel: string;
  title: string;
  slug: string;
  subsections: Subsection[];
  prev: string | null;
  next: string | null;
};

export type Week = {
  number: number;
  title: string;
  lessons: Lesson[];
};

const rawLessons: Omit<Lesson, 'prev' | 'next'>[] = [
  // ─── 1주차 ───────────────────────────────────────────
  {
    id: 'week1-mon',
    week: 1,
    day: 'mon',
    dayLabel: '월',
    title: '클로드 코드 설치하기',
    slug: '/week1/mon',
    subsections: [
      { id: 'install', title: '1. 클로드 코드 설치' },
      { id: 'run', title: '2. 클로드 코드 실행' },
    ],
  },
  {
    id: 'week1-tue',
    week: 1,
    day: 'tue',
    dayLabel: '화',
    title: '클로드 코드에서 제공하는 내장 명령어',
    slug: '/week1/tue',
    subsections: [
      { id: 'basic', title: '1. 기본 기능 및 대화 제어' },
      { id: 'model', title: '2. 모델 설정 및 계정 관리' },
      { id: 'file', title: '3. 파일 및 프로젝트 관리' },
      { id: 'system', title: '4. 시스템 점검 및 요금 통계' },
      { id: 'view', title: '5. 보기 및 입출력 설정' },
      { id: 'review', title: '6. 코드 리뷰 및 분석' },
      { id: 'convenience', title: '7. 편의성' },
      { id: 'extend', title: '8. 기능 확장' },
      { id: 'etc', title: '9. 기타' },
    ],
  },
  {
    id: 'week1-wed',
    week: 1,
    day: 'wed',
    dayLabel: '수',
    title: '인공지능으로 내 컴퓨터에만 있는 정보 분석하기',
    slug: '/week1/wed',
    subsections: [
      { id: 'pc-info', title: '1. 내가 사용하는 데스크탑/랩탑의 정보를 알아내기' },
      { id: 'local-files', title: '2. 로컬 파일들의 정보를 읽고 계산하기' },
    ],
  },
  {
    id: 'week1-thu',
    week: 1,
    day: 'thu',
    dayLabel: '목',
    title: '넘겨받은 디렉터리 분석 및 조치',
    slug: '/week1/thu',
    subsections: [
      { id: 'analyze', title: '1. 디렉터리 분석' },
      { id: 'plan', title: '2. 학습 계획 수립' },
    ],
  },
  {
    id: 'week1-fri',
    week: 1,
    day: 'fri',
    dayLabel: '금',
    title: '고양이 웹 페이지를 만들고 공개하기',
    slug: '/week1/fri',
    subsections: [
      { id: 'create', title: '1. 고양이가 나오는 웹 페이지 생성' },
      { id: 'deploy', title: '2. 만든 웹 페이지를 인터넷에 올리고 확인하기' },
    ],
  },
  {
    id: 'week1-weekend',
    week: 1,
    day: 'weekend',
    dayLabel: '주말',
    title: '클로드 코드 vs 제미나이 CLI',
    slug: '/week1/weekend',
    subsections: [],
  },

  // ─── 2주차 ───────────────────────────────────────────
  {
    id: 'week2-mon',
    week: 2,
    day: 'mon',
    dayLabel: '월',
    title: 'CLAUDE.md',
    slug: '/week2/mon',
    subsections: [
      { id: 'intro', title: '1. CLAUDE.md' },
      { id: 'init', title: '2. /init 명령어로 시작하기' },
      { id: 'practice', title: '3. 실제 프로젝트로 실습하기' },
      { id: 'customize', title: '4. CLAUDE.md 커스터마이징' },
      { id: 'strategy', title: '5. CLAUDE.md 활용 전략' },
      { id: 'tips', title: '6. 문제 해결 및 팁' },
    ],
  },
  {
    id: 'week2-tue',
    week: 2,
    day: 'tue',
    dayLabel: '화',
    title: '프롬프트 잘 작성하기',
    slug: '/week2/tue',
    subsections: [
      { id: 'basics', title: '1. 프롬프트 엔지니어링 기초' },
      { id: 'context', title: '2. 컨텍스트 최적화 전략' },
      { id: 'shortcuts', title: '3. 특수 문자 숏컷으로 프롬프트 편의성 극대화' },
      { id: 'hierarchical', title: '4. 계층적 질문 전략' },
      { id: 'templates', title: '5. 실전 프롬프트 템플릿' },
      { id: 'project', title: '6. 실습: 프로젝트 기획' },
      { id: 'advanced', title: '7. 고급 프롬프트 기법' },
      { id: 'troubleshoot', title: '8. 문제 해결 및 팁' },
    ],
  },
  {
    id: 'week2-wed',
    week: 2,
    day: 'wed',
    dayLabel: '수',
    title: '클로드 실행 모드 마스터하기',
    slug: '/week2/wed',
    subsections: [
      { id: 'overview', title: '1. 클로드 코드 실행 모드 개요' },
      { id: 'interactive', title: '2. 인터랙티브 모드(대화형 모드)' },
      { id: 'print', title: '3. 프린트 모드(비대화형 모드)' },
      { id: 'yolo', title: '4. YOLO 모드(권한 스킵 옵션)' },
      { id: 'keys', title: '5. 인터랙티브 모드의 특수 키 기능' },
      { id: 'detail', title: '6. 모드별 상세 설명' },
      { id: 'scenario', title: '7. 모드별 사용 시나리오' },
      { id: 'tips', title: '8. 문제 해결 및 팁' },
    ],
  },
  {
    id: 'week2-thu',
    week: 2,
    day: 'thu',
    dayLabel: '목',
    title: '클로드 코드의 내장 도구와 터미널 확장',
    slug: '/week2/thu',
    subsections: [
      { id: 'intro', title: '1. 클로드 코드의 내장 도구 이해하기' },
      { id: 'filesystem', title: '2. 파일 시스템 도구' },
      { id: 'exec', title: '3. 시스템 실행 도구' },
      { id: 'web', title: '4. 웹 리소스 도구' },
      { id: 'task', title: '5. 작업 관리 도구' },
      { id: 'combo', title: '6. 내장 도구 조합 패턴' },
      { id: 'terminal', title: '7. 터미널 도구 활용' },
      { id: 'best-practice', title: '8. 도구 활용 베스트 프랙티스' },
    ],
  },
  {
    id: 'week2-fri',
    week: 2,
    day: 'fri',
    dayLabel: '금',
    title: 'MCP(Model Context Protocol) 연동',
    slug: '/week2/fri',
    subsections: [
      { id: 'context-eng', title: '1. 프롬프트 엔지니어링에서 컨텍스트 엔지니어링으로' },
      { id: 'mcp', title: '2. MCP 이해하기' },
      { id: 'compare', title: '3. MCP vs 프롬프트 엔지니어링 비교' },
      { id: 'connect', title: '4. MCP 연결 방식 이해하기' },
      { id: 'postgres', title: '5. 실습: PostgreSQL 데이터베이스와 MCP 연동해 보기' },
      { id: 'github', title: '6. 실습: 깃허브 API 연동' },
      { id: 'advanced', title: '7. 고급 활용 패턴' },
      { id: 'examples', title: '8. 실전 활용 예시' },
      { id: 'config', title: '9. MCP 서버 구성하기' },
    ],
  },
  {
    id: 'week2-weekend',
    week: 2,
    day: 'weekend',
    dayLabel: '주말',
    title: '클로드 코드와 개발자 생산성',
    slug: '/week2/weekend',
    subsections: [],
  },

  // ─── 3주차 ───────────────────────────────────────────
  {
    id: 'week3-mon',
    week: 3,
    day: 'mon',
    dayLabel: '월',
    title: '프로젝트 설계',
    slug: '/week3/mon',
    subsections: [
      { id: 'arch', title: '1. 프로젝트 아키텍처 설계' },
      { id: 'structure', title: '2. 프로젝트 구조 설계' },
      { id: 'wbs', title: '3. WBS 작성' },
      { id: 'risk', title: '4. 리스크 분석과 대응 계획' },
      { id: 'docs', title: '5. 프로젝트 문서 템플릿 생성' },
      { id: 'recipe', title: '6. 레시피 공유 서비스 설계' },
      { id: 'troubleshoot', title: '7. 문제 해결' },
    ],
  },
  {
    id: 'week3-tue',
    week: 3,
    day: 'tue',
    dayLabel: '화',
    title: '부트스트래핑: 프로젝트 초기 구성 자동화',
    slug: '/week3/tue',
    subsections: [
      { id: 'template', title: '1. 프로젝트 템플릿 생성' },
      { id: 'deps', title: '2. 의존성 관리' },
      { id: 'env', title: '3. 개발 환경 구성' },
      { id: 'container', title: '4. 컨테이너 환경 구성' },
      { id: 'test-env', title: '5. 테스트 환경 부트스트래핑' },
      { id: 'bootstrap', title: '6. 부트스트래핑' },
      { id: 'troubleshoot', title: '7. 문제 해결' },
      { id: 'checklist', title: '8. 체크 리스트' },
    ],
  },
  {
    id: 'week3-wed',
    week: 3,
    day: 'wed',
    dayLabel: '수',
    title: '테스트: 클로드 코드와 함께하는 TDD',
    slug: '/week3/wed',
    subsections: [
      { id: 'unit', title: '1. 단위 테스트' },
      { id: 'tdd', title: '2. TDD 워크플로' },
      { id: 'integration', title: '3. 통합 테스트' },
      { id: 'e2e', title: '4. E2E 테스트' },
      { id: 'cicd', title: '5. 테스트 자동화와 CI/CD' },
      { id: 'monitoring', title: '6. 테스트 모니터링과 리포팅' },
    ],
  },
  {
    id: 'week3-thu',
    week: 3,
    day: 'thu',
    dayLabel: '목',
    title: '개선: 코드 리뷰, 리팩토링, 성능 최적화',
    slug: '/week3/thu',
    subsections: [
      { id: 'review', title: '1. 코드 리뷰 자동화' },
      { id: 'refactor', title: '2. 리팩토링 전략' },
      { id: 'perf', title: '3. 성능 최적화' },
      { id: 'metrics', title: '4. 코드 품질 메트릭' },
      { id: 'debt', title: '5. 기술 부채 관리' },
      { id: 'legacy', title: '6. 레거시 코드 개선' },
      { id: 'checklist', title: '7. 체크 리스트' },
    ],
  },
  {
    id: 'week3-fri',
    week: 3,
    day: 'fri',
    dayLabel: '금',
    title: '명세 작성 및 문서화: 살아 있는 문서 만들기',
    slug: '/week3/fri',
    subsections: [
      { id: 'api-docs', title: '1. API 문서 자동 생성' },
      { id: 'user-guide', title: '2. 사용자 가이드 작성' },
      { id: 'structure', title: '3. 기술 문서 구조화' },
      { id: 'sync', title: '4. 코드와 문서 동기화' },
      { id: 'ops', title: '5. 배포 및 운영 문서' },
      { id: 'checklist', title: '6. 체크 리스트' },
    ],
  },
  {
    id: 'week3-weekend',
    week: 3,
    day: 'weekend',
    dayLabel: '주말',
    title: 'AI에 최적화된 워크플로',
    slug: '/week3/weekend',
    subsections: [],
  },

  // ─── 4주차 ───────────────────────────────────────────
  {
    id: 'week4-mon',
    week: 4,
    day: 'mon',
    dayLabel: '월',
    title: 'LLM 엔진 최적화와 컨텍스트 관리',
    slug: '/week4/mon',
    subsections: [
      { id: 'llm', title: '1. LLM 엔진 최적화' },
      { id: 'memory', title: '2. 메모리 시스템 활용' },
    ],
  },
  {
    id: 'week4-tue',
    week: 4,
    day: 'tue',
    dayLabel: '화',
    title: '사용자 정의 명령어 만들기',
    slug: '/week4/tue',
    subsections: [
      { id: 'custom-cmd', title: '1. 사용자 정의 명령어의 이해' },
    ],
  },
  {
    id: 'week4-wed',
    week: 4,
    day: 'wed',
    dayLabel: '수',
    title: '클로드 코드 확장하기',
    slug: '/week4/wed',
    subsections: [
      { id: 'hooks', title: '1. Hooks 시스템 이해하기' },
      { id: 'output-style', title: '2. Output Style로 응답 방식 바꾸기' },
    ],
  },
  {
    id: 'week4-thu',
    week: 4,
    day: 'thu',
    dayLabel: '목',
    title: '다양한 MCP 활용 전략',
    slug: '/week4/thu',
    subsections: [
      { id: 'context7', title: '1. Context7' },
      { id: 'serena', title: '2. Serena' },
      { id: 'validation', title: '3. 검증 도구로써의 MCP' },
      { id: 'project-mgmt', title: '4. MCP를 통한 프로젝트 관리' },
      { id: 'thinking', title: '5. Thinking MCP' },
      { id: 'multi-llm', title: '6. 다양한 LLM 모델 활용' },
      { id: 'build-mcp', title: '7. MCP 만들기' },
    ],
  },
  {
    id: 'week4-fri',
    week: 4,
    day: 'fri',
    dayLabel: '금',
    title: '멀티에이전트 시스템',
    slug: '/week4/fri',
    subsections: [
      { id: 'task-tool', title: '1. 클로드 코드의 Task Tool과 서브에이전트' },
      { id: 'custom-agent', title: '2. Custom Subagent' },
      { id: 'squad', title: '3. Claude Squad' },
      { id: 'swarm', title: '4. Claude Swarm' },
    ],
  },
  {
    id: 'week4-weekend',
    week: 4,
    day: 'weekend',
    dayLabel: '주말',
    title: 'AI 코딩 도구의 현재와 미래',
    slug: '/week4/weekend',
    subsections: [],
  },
];

// prev/next 링크 자동 계산
export const lessons: Lesson[] = rawLessons.map((lesson, i) => ({
  ...lesson,
  prev: i > 0 ? rawLessons[i - 1].slug : null,
  next: i < rawLessons.length - 1 ? rawLessons[i + 1].slug : null,
}));

export const weeks: Week[] = [1, 2, 3, 4].map((num) => ({
  number: num,
  title: [
    '클로드 코드 시작하기',
    '클로드 코드 설정하기',
    '클로드 워크플로 전략',
    '클로드 코드 효율 극대화하기',
  ][num - 1],
  lessons: lessons.filter((l) => l.week === num),
}));

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessons.find((l) => l.slug === slug);
}
