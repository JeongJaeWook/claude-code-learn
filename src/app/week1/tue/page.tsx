
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week1/tue');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="basic">
    <h2>1. 기본 기능 및 대화 제어</h2>
    <p>클로드 코드는 대화 중에 <code>{`/`}</code>로 시작하는 슬래시 명령어를 제공합니다. 마우스 없이 키보드만으로 모든 설정을 바꿀 수 있습니다.</p>

    <h3>/help</h3>
    <p>사용 가능한 모든 명령어 목록과 설명을 출력합니다. 처음 시작할 때 한 번은 꼭 실행해보세요.</p>
    <pre><code>{`/help`}</code></pre>

    <h3>/clear — 컨텍스트 초기화</h3>
    <p>현재 대화 기록을 모두 지웁니다. <strong>이것은 가장 중요한 습관</strong>입니다. 클로드 코드는 대화가 길어질수록 성능이 떨어집니다. 주제가 바뀌면 반드시 <code>{`/clear`}</code>를 실행하세요.</p>
    <pre><code>{`/clear`}</code></pre>
    <blockquote>
      <strong>핵심 원칙:</strong> 같은 문제를 두 번 이상 교정했는데 여전히 잘못하면, 컨텍스트가 실패한 접근법으로 오염된 것입니다.
      <code>{`/clear`}</code>하고 더 구체적인 프롬프트로 새로 시작하세요. 깨끗한 세션 + 좋은 프롬프트가 긴 세션 + 누적된 교정보다 거의 항상 낫습니다.
    </blockquote>

    <h3>/compact — 대화 압축</h3>
    <p>대화가 너무 길어졌지만 맥락을 유지하고 싶을 때 사용합니다. 클로드가 지금까지의 대화를 요약하고, 중요한 부분만 남겨서 컨텍스트를 확보합니다.</p>
    <pre><code>{`/compact                         # 자동 압축
/compact API 변경사항에 집중해줘    # 특정 내용에 집중하여 압축`}</code></pre>

    <h3>/rewind — 되감기</h3>
    <p>이전 체크포인트로 되돌립니다. 클로드 코드는 모든 작업 전에 자동으로 체크포인트를 만듭니다.</p>
    <pre><code>{`/rewind    # 되감기 메뉴 열기 (Esc 두 번과 동일)`}</code></pre>
    <p>되감기 메뉴에서는 대화만 복원, 코드만 복원, 또는 둘 다 복원할 수 있습니다. 실수했을 때 git reset보다 편리합니다.</p>

    <h3>/exit (또는 /quit)</h3>
    <p>클로드 코드를 종료합니다. <code>{`Ctrl+C`}</code>를 두 번 눌러도 동일합니다.</p>

    <blockquote>
      <strong>실습:</strong> 클로드 코드를 실행하고 <code>{`/help`}</code>를 입력해서 어떤 명령어들이 있는지 살펴보세요. 그다음 간단한 질문을 몇 개 하고, <code>{`/clear`}</code>로 대화를 초기화해보세요.
    </blockquote>
  </section>

  <section id="model">
    <h2>2. 모델 설정 및 계정 관리</h2>

    <h3>/model — 모델 선택</h3>
    <p>현재 사용 중인 AI 모델을 확인하거나 변경합니다. 작업의 복잡도에 따라 모델을 바꾸면 비용과 속도를 최적화할 수 있습니다.</p>
    <pre><code>{`/model                  # 현재 모델 확인 + 선택 메뉴
/model opus             # Opus로 변경
/model sonnet           # Sonnet으로 변경
/model haiku            # Haiku로 변경`}</code></pre>

    <p>모델별 특성:</p>
    <ul>
      <li><strong>Claude Opus</strong>: 가장 강력한 추론. 복잡한 아키텍처 설계, 어려운 버그 분석, 대규모 리팩토링에 적합</li>
      <li><strong>Claude Sonnet</strong>: 속도와 품질의 균형. 일반적인 코딩 작업에 추천 (기본값)</li>
      <li><strong>Claude Haiku</strong>: 가장 빠르고 저렴. 단순한 질문, 파일 요약, 문서 생성에 적합</li>
    </ul>
    <blockquote>
      <strong>팁:</strong> 탐색/조사 단계에서는 Sonnet을 쓰고, 핵심 구현이나 복잡한 판단이 필요할 때만 Opus로 전환하는 것이 비용 대비 효율적입니다.
    </blockquote>

    <h3>/login, /logout — 계정 관리</h3>
    <p>Anthropic 계정 인증을 관리합니다. 계정을 전환하고 싶을 때 사용합니다.</p>
    <pre><code>{`/login    # 재인증 또는 계정 전환
/logout   # 로그아웃`}</code></pre>
  </section>

  <section id="file">
    <h2>3. 파일 및 프로젝트 관리</h2>

    <h3>/init — CLAUDE.md 자동 생성</h3>
    <p>현재 프로젝트를 분석해서 <code>{`CLAUDE.md`}</code> 파일을 자동 생성합니다. 빌드 시스템, 테스트 프레임워크, 코드 패턴을 감지해서 초안을 만들어줍니다.</p>
    <pre><code>{`/init`}</code></pre>
    <p><code>{`CLAUDE.md`}</code>는 매 세션 시작 시 자동으로 읽히는 특별한 파일입니다. 2주차 월요일에 자세히 배웁니다.</p>

    <h3>@ — 파일 참조</h3>
    <p>대화 중에 <code>{`@파일경로`}</code>로 특정 파일을 컨텍스트에 직접 추가합니다. Tab 키로 파일명 자동완성이 됩니다.</p>
    <pre><code>{`@src/main.py 이 파일에서 버그를 찾아줘
@package.json 의존성 중 보안 취약점이 있는지 확인해줘`}</code></pre>

    <h3>/permissions — 권한 규칙 관리</h3>
    <p>자주 사용하는 도구나 명령어에 대한 자동 승인 규칙을 설정합니다. 매번 승인 버튼을 누르는 번거로움을 줄입니다.</p>
    <pre><code>{`/permissions`}</code></pre>
  </section>

  <section id="system">
    <h2>4. 시스템 점검 및 요금 통계</h2>

    <h3>/status — 상태 확인</h3>
    <p>현재 연결 상태, 인증 정보, 사용 중인 모델을 한눈에 보여줍니다.</p>

    <h3>/cost — 사용량 확인</h3>
    <p>현재 대화에서 사용한 토큰 수와 예상 비용을 표시합니다.</p>
    <pre><code>{`/cost`}</code></pre>
    <blockquote>
      Claude Pro/Max 구독을 사용하면 별도 API 요금이 청구되지 않습니다.
      API 키 방식을 사용하는 경우에만 비용을 모니터링하세요.
    </blockquote>
  </section>

  <section id="view">
    <h2>5. 보기 및 입출력 설정</h2>

    <h3>/verbose — 상세 모드</h3>
    <p>클로드 코드가 내부적으로 어떤 도구를 어떤 순서로 사용하는지 상세하게 보여줍니다. 디버깅이나 학습 목적으로 유용합니다.</p>

    <h3>/btw — 사이드 질문</h3>
    <p>메인 대화 맥락을 오염시키지 않고 빠른 질문을 할 수 있습니다. 답변은 오버레이로 표시되고 대화 히스토리에 포함되지 않습니다.</p>
    <pre><code>{`/btw Python에서 dict comprehension 문법이 뭐야?`}</code></pre>

    <h3>/rename — 세션 이름 지정</h3>
    <p>현재 세션에 설명적인 이름을 붙여서 나중에 쉽게 찾을 수 있습니다.</p>
    <pre><code>{`/rename oauth-마이그레이션`}</code></pre>
  </section>

  <section id="review">
    <h2>6. 코드 리뷰 및 분석</h2>

    <h3>/review — 코드 리뷰</h3>
    <p>현재 git diff를 자동으로 코드 리뷰합니다. PR을 올리기 전에 셀프 리뷰를 빠르게 받을 수 있는 강력한 기능입니다.</p>
    <pre><code>{`git add .
/review`}</code></pre>

    <p>리뷰 결과에는 다음이 포함됩니다:</p>
    <ul>
      <li>잠재적 버그 및 논리 오류</li>
      <li>보안 취약점 (SQL 인젝션, XSS 등)</li>
      <li>성능 이슈 및 개선 제안</li>
      <li>코드 가독성 및 컨벤션 체크</li>
    </ul>

    <h3>Plan Mode — 안전한 분석 모드</h3>
    <p><code>{`Shift+Tab`}</code>을 누르면 Plan Mode로 전환됩니다. 이 모드에서 클로드 코드는 파일을 읽고 분석만 하며, 어떤 수정도 하지 않습니다. 변경 전에 계획을 세울 때 유용합니다.</p>
    <pre><code>{`# Plan Mode에서 (Shift+Tab으로 전환)
&gt; 현재 인증 시스템을 분석하고 OAuth 추가 계획을 세워줘

# 계획 확인 후 Normal Mode로 전환 (다시 Shift+Tab)
&gt; 계획대로 구현해줘`}</code></pre>
  </section>

  <section id="convenience">
    <h2>7. 편의성</h2>

    <h3>멀티라인 입력</h3>
    <p><code>{`Shift+Enter`}</code>로 여러 줄 입력이 가능합니다. 복잡한 요청을 구조적으로 작성할 수 있습니다.</p>

    <h3>히스토리 탐색</h3>
    <p><code>{`↑`}</code> / <code>{`↓`}</code> 방향키로 이전 입력을 탐색합니다.</p>

    <h3>자동 완성</h3>
    <p><code>{`/`}</code>를 입력하면 사용 가능한 명령어 목록이 표시되며, <code>{`Tab`}</code>으로 자동 완성합니다. <code>{`@`}</code> 뒤에도 Tab으로 파일 경로를 자동 완성할 수 있습니다.</p>

    <h3>체크포인트 자동 생성</h3>
    <p>클로드 코드는 모든 변경 전에 자동으로 체크포인트를 만듭니다. <code>{`Esc`}</code> 두 번 또는 <code>{`/rewind`}</code>로 언제든 이전 상태로 되돌릴 수 있습니다. 세션을 닫았다가 다시 열어도 체크포인트는 유지됩니다.</p>
  </section>

  <section id="extend">
    <h2>8. 기능 확장</h2>

    <h3>/mcp — MCP 서버 관리</h3>
    <p>MCP(Model Context Protocol) 서버 연결 상태를 확인합니다. MCP를 통해 데이터베이스, GitHub, Slack 등 외부 도구를 연결할 수 있습니다.</p>
    <pre><code>{`/mcp`}</code></pre>

    <h3>/hooks — 자동화 규칙 확인</h3>
    <p>설정된 Hooks(자동 실행 스크립트)를 확인합니다. 파일 수정 후 자동 린팅, 위험 명령어 차단 등을 설정할 수 있습니다.</p>

    <h3>/plugin — 플러그인 설치</h3>
    <p>커뮤니티와 Anthropic이 만든 플러그인을 마켓플레이스에서 설치합니다. Skills, Hooks, MCP 서버 등을 번들로 한 번에 추가할 수 있습니다.</p>

    <h3>커스텀 슬래시 명령어</h3>
    <p><code>{`.claude/commands/`}</code>에 마크다운 파일을 만들면 나만의 슬래시 명령어를 추가할 수 있습니다. 4주차 화요일에 자세히 다룹니다.</p>
  </section>

  <section id="etc">
    <h2>9. 기타</h2>

    <h3>! 접두사 — 쉘 명령어 실행</h3>
    <p>대화 중에 <code>{`!`}</code>로 시작하면 쉘 명령어를 직접 실행하고, 결과를 대화 컨텍스트에 포함시킵니다.</p>
    <pre><code>{`! ls -la          # 파일 목록 출력
! git log --oneline -10  # 최근 커밋 확인
! npm test        # 테스트 실행`}</code></pre>

    <h3>/bug — 버그 신고</h3>
    <p>클로드 코드 자체의 버그를 Anthropic에 신고합니다.</p>

    <h3>명령어 요약표</h3>
    <pre><code>{`# 대화 제어
/help      — 명령어 목록       /clear     — 대화 초기화
/compact   — 대화 압축         /rewind    — 이전 상태 복원
/btw       — 사이드 질문       /rename    — 세션 이름 변경

# 설정
/model     — 모델 변경         /login     — 계정 관리
/permissions — 권한 규칙       /verbose   — 상세 모드

# 분석
/review    — 코드 리뷰         /cost      — 사용량 확인
/status    — 상태 점검

# 확장
/init      — CLAUDE.md 생성    /mcp       — MCP 서버 관리
/hooks     — Hook 규칙 확인    /plugin    — 플러그인 설치

# 기타
!명령어     — 쉘 실행          @파일경로   — 파일 참조
Shift+Tab  — Plan Mode 전환   Esc×2      — 되감기 메뉴`}</code></pre>
  </section>


    </LessonLayout>
  );
}
