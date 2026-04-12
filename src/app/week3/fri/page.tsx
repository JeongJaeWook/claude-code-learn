
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week3/fri');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="api-docs">
    <h2>1. API 문서 자동 생성</h2>
    <p>
      코드에서 문서를 자동으로 생성하면 코드와 문서가 항상 동기화됩니다. 수동으로 문서를 업데이트하다가 코드와 달라지는 문제를 방지합니다.
    </p>

    <h3>FastAPI 자동 문서</h3>
    <p>FastAPI는 코드에서 자동으로 OpenAPI 문서를 생성합니다. 클로드 코드로 문서 품질을 높입니다:</p>
    <pre><code>{`&gt; @app/api/recipes.py 의 모든 엔드포인트에 OpenAPI 문서를 추가해줘.
  - 각 엔드포인트의 description
  - 요청/응답 예시 (example 값)
  - 에러 응답 케이스
  - 인증 필요 여부
  Pydantic 모델의 Field에도 description과 example을 추가해줘.`}</code></pre>

    <h3>Postman Collection 생성</h3>
    <pre><code>{`&gt; OpenAPI 스펙을 읽고 Postman Collection JSON을 만들어줘.
  개발/스테이징/프로덕션 환경 변수도 함께 만들어줘.`}</code></pre>

    <h3>API 변경 감지</h3>
    <pre><code>{`&gt; git diff main..HEAD -- app/api/ 를 보고
  이번 PR에서 API 스펙이 어떻게 변경됐는지 요약해줘.
  Breaking change가 있으면 명확히 표시해줘.`}</code></pre>

    <h3>README 자동 생성</h3>
    <p>새 프로젝트나 오픈소스 저장소의 README를 빠르게 만들 수 있습니다:</p>
    <pre><code>{`&gt; 이 프로젝트의 README.md를 작성해줘.
  - 배지(CI, coverage, license)
  - 한 줄 설명
  - 주요 기능 스크린샷 플레이스홀더
  - 빠른 시작 (5분 안에 실행)
  - API 사용 예시
  - 기여 가이드 링크
  개발자가 README를 읽고 5분 안에 시작할 수 있게 써줘.`}</code></pre>
  </section>

  <section id="user-guide">
    <h2>2. 사용자 가이드 작성</h2>
    <p>기술 문서와 달리 사용자 가이드는 비기술적인 독자를 위한 문서입니다.</p>

    <h3>스크린샷 없이 가이드 작성</h3>
    <pre><code>{`&gt; 레시피 공유 서비스의 "레시피 등록" 기능에 대한 사용자 가이드를 작성해줘.
  - 대상: 요리 블로거, 기술 지식 없음
  - 단계별 설명 (1, 2, 3...)
  - 각 단계에 "[화면 캡처 위치]" 플레이스홀더 표시
  - FAQ 3개 포함
  - 마크다운 형식`}</code></pre>

    <h3>다국어 문서</h3>
    <pre><code>{`&gt; 방금 작성한 사용자 가이드를 영어로 번역해줘.
  기술 용어는 일반적으로 쓰이는 영어 표현으로 번역하고,
  어색한 표현이 없도록 자연스럽게 다듬어줘.`}</code></pre>
  </section>

  <section id="structure">
    <h2>3. 기술 문서 구조화</h2>
    <p>문서가 많아질수록 구조가 중요합니다. 체계적인 문서 구조를 만듭니다.</p>

    <h3>문서 구조 설계</h3>
    <pre><code>{`&gt; 레시피 공유 서비스의 기술 문서 구조를 설계해줘.
  Docusaurus나 MkDocs 같은 문서 사이트로 만들 계획이야.
  다음 독자를 위한 섹션을 나눠줘:
  - 신규 개발자 온보딩
  - 백엔드 API 레퍼런스
  - 프론트엔드 컴포넌트 가이드
  - 운영 가이드
  - 아키텍처 결정 기록(ADR)`}</code></pre>

    <h3>MkDocs 설정</h3>
    <pre><code>{`&gt; MkDocs Material 테마로 문서 사이트를 설정해줘.
  mkdocs.yml 파일과 기본 문서 구조를 만들어줘.
  GitHub Pages에 자동 배포하는 GitHub Actions도 포함해줘.`}</code></pre>
  </section>

  <section id="sync">
    <h2>4. 코드와 문서 동기화</h2>
    <p>"살아있는 문서"란 코드와 항상 동기화된 문서입니다.</p>

    <h3>docstring 자동 생성</h3>
    <pre><code>{`&gt; @app/services/ 폴더의 모든 함수에 Google 스타일 docstring을 추가해줘.
  Args, Returns, Raises, Example 섹션을 포함해줘.
  함수의 실제 동작을 정확히 설명해줘.`}</code></pre>

    <h3>CHANGELOG 자동화</h3>
    <pre><code>{`&gt; git log v1.0.0..HEAD --format="%h %s" 의 결과를 읽고
  Keep a Changelog 형식의 CHANGELOG.md를 업데이트해줘.
  커밋 메시지를 Added/Changed/Fixed/Removed로 분류해줘.`}</code></pre>

    <h3>문서 품질 검사</h3>
    <pre><code>{`&gt; docs/ 폴더의 문서들을 검토해줘:
  - 코드 예시가 실제로 동작하는지
  - 버전 정보가 최신인지
  - 링크가 유효한지 (링크 목록 추출)
  - 마크다운 형식 오류가 있는지`}</code></pre>
  </section>

  <section id="ops">
    <h2>5. 배포 및 운영 문서</h2>

    <h3>배포 런북(Runbook) 작성</h3>
    <pre><code>{`&gt; 프로덕션 배포 런북을 작성해줘.
  다음 시나리오를 포함해줘:
  - 정기 배포 절차
  - 핫픽스 배포 절차
  - 롤백 절차
  - 데이터베이스 마이그레이션 포함 배포
  각 단계마다 확인 체크리스트와 실행 명령어 포함.`}</code></pre>

    <h3>장애 대응 플레이북</h3>
    <pre><code>{`&gt; 다음 장애 시나리오별 대응 플레이북을 만들어줘:
  - 서버 응답 지연 (p95 > 2s)
  - 데이터베이스 연결 풀 고갈
  - 디스크 용량 부족
  - 메모리 누수
  각각 감지 방법, 즉각 대응, 근본 원인 분석 방법을 포함.`}</code></pre>

    <h3>온콜 가이드</h3>
    <pre><code>{`&gt; 야간 장애 대응을 위한 온콜 가이드를 작성해줘.
  비기술직 팀원도 초기 대응을 할 수 있도록 쉽게 써줘.
  에스컬레이션 경로도 포함해줘.`}</code></pre>
  </section>

  <section id="diagram">
    <h2>6. 다이어그램 자동 생성</h2>
    <p>Mermaid 문법으로 텍스트 기반 다이어그램을 자동 생성합니다. GitHub, Notion 등에서 바로 렌더링됩니다.</p>

    <h3>시퀀스 다이어그램</h3>
    <pre><code>{`&gt; 레시피 공유 서비스의 로그인 → 레시피 등록 흐름을
  Mermaid 시퀀스 다이어그램으로 그려줘.
  클라이언트, API 서버, 인증 서버, DB, S3를 포함해줘.`}</code></pre>

    <h3>ERD</h3>
    <pre><code>{`&gt; @app/models/ 폴더의 SQLAlchemy 모델들을 읽고
  Mermaid erDiagram으로 ERD를 그려줘.
  각 관계의 cardinality도 표시해줘.`}</code></pre>

    <h3>플로우차트</h3>
    <pre><code>{`&gt; 레시피 검색 알고리즘의 로직을 Mermaid flowchart로 그려줘.
  검색어 처리, 필터링, 정렬, 페이지네이션 단계를 포함해줘.`}</code></pre>
  </section>

  <section id="checklist">
    <h2>7. 체크 리스트</h2>
    <p>좋은 기술 문서의 조건:</p>
    <ul>
      <li>☐ 대상 독자가 명확한가?</li>
      <li>☐ 코드 예시가 실제로 실행 가능한가?</li>
      <li>☐ 마지막 업데이트 날짜가 명시되어 있는가?</li>
      <li>☐ 관련 링크가 모두 유효한가?</li>
      <li>☐ "왜"를 설명하고 있는가? (HOW만이 아니라)</li>
      <li>☐ 팀원이 읽고 이해할 수 있는 수준인가? (동료 리뷰)</li>
    </ul>

    <h3>문서 업데이트를 CI에 포함하기</h3>
    <pre><code>{`&gt; PR에서 app/api/ 폴더가 변경되면 docs/API.md 업데이트를
  자동으로 요청하는 GitHub Actions 워크플로를 만들어줘.
  claude -p 명령어로 변경사항을 분석해서 CHANGELOG도 업데이트해줘.`}</code></pre>

    <blockquote>
      3주차 마무리: 설계부터 배포, 문서화까지 전체 개발 워크플로에 클로드 코드를 통합하는 방법을 배웠습니다. 4주차에서는 클로드 코드 자체를 더 강력하게 커스터마이징하는 방법을 배웁니다.
    </blockquote>
  </section>


    </LessonLayout>
  );
}
