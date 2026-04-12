
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week4/mon');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="llm">
    <h2>1. LLM 엔진 최적화</h2>
    <p>
      클로드 코드를 더 효율적으로, 더 빠르게, 더 저렴하게 사용하려면 AI 모델 자체의 특성을 이해해야 합니다.
    </p>

    <h3>모델 선택 전략</h3>
    <p>모든 작업에 최고 성능 모델을 쓰는 것은 낭비입니다. 작업 유형에 따라 모델을 선택하세요:</p>
    <ul>
      <li><strong>claude-opus-4-5</strong>: 복잡한 아키텍처 설계, 어려운 버그 분석, 창의적인 문제 해결</li>
      <li><strong>claude-sonnet-4-5</strong>: 일반적인 코딩, 코드 리뷰, 리팩토링 (가장 균형적)</li>
      <li><strong>claude-haiku-4-5</strong>: 간단한 질문, 코드 포맷팅, 짧은 번역</li>
    </ul>
    <pre><code>{`# 빠른 작업은 Haiku로
claude --model claude-haiku-4-5 -p "이 함수에 JSDoc 주석 달아줘: \$(cat utils.js)"

# 복잡한 설계는 Opus로
claude --model claude-opus-4-5
&gt; 분산 시스템에서 일관성과 가용성의 트레이드오프를 고려한 이벤트 소싱 아키텍처를 설계해줘`}</code></pre>

    <h3>컨텍스트 윈도우 효율적 사용</h3>
    <p>컨텍스트가 너무 길어지면 성능이 저하됩니다. 다음 전략을 사용하세요:</p>
    <ul>
      <li>관련 없는 파일은 <code>{`@`}</code>로 참조하지 말 것</li>
      <li>작업 완료 후 <code>{`/clear`}</code>로 컨텍스트 초기화</li>
      <li>CLAUDE.md에 핵심 정보만 담아서 불필요한 설명 반복 제거</li>
      <li>큰 파일은 특정 줄 범위만 읽도록 요청</li>
    </ul>
    <pre><code>{`&gt; src/api/routes.py 파일의 100-150번 줄만 읽고 분석해줘`}</code></pre>

    <h3>프롬프트 캐싱 이해하기</h3>
    <p>클로드 API는 프롬프트 캐싱을 지원합니다. 같은 CLAUDE.md나 시스템 프롬프트를 반복적으로 보내면 캐시에서 읽어서 비용과 속도를 최적화합니다. 클로드 코드는 이를 자동으로 처리합니다.</p>

    <h3>/compact — 컨텍스트 압축</h3>
    <p>대화가 길어지면 클로드 코드는 성능이 저하됩니다. <code>{`/compact`}</code>로 대화를 요약하면 컨텍스트를 절약하면서 중요한 맥락을 유지할 수 있습니다:</p>
    <pre><code>{`/compact
# 선택적: 압축 시 유지할 내용 지정
/compact 인증 관련 결정사항과 현재 구현 중인 파일 목록은 반드시 유지해줘`}</code></pre>

    <h3>빠른 작업을 위한 /fast 모드</h3>
    <p>토큰 스트리밍 속도를 높이는 모드입니다. 빠른 편집이나 간단한 작업에 활용하세요:</p>
    <pre><code>{`/fast    # 토글 — 빠른 출력 모드 활성화/비활성화`}</code></pre>

    <h3>Extended Thinking 활용</h3>
    <p>복잡한 문제에는 클로드가 내부적으로 더 깊이 생각하는 Extended Thinking 모드를 활용할 수 있습니다:</p>
    <pre><code>{`&gt; [복잡한 알고리즘 문제]
  충분한 시간을 들여서 최선의 해결책을 찾아줘.
  다양한 접근법을 검토하고 트레이드오프를 분석해줘.`}</code></pre>

    <h3>비용 추적</h3>
    <p>인터랙티브 모드 종료 시 세션 요약에서 사용된 토큰과 비용을 확인할 수 있습니다. 비용이 걱정된다면:</p>
    <ul>
      <li>작업 완료 후 <code>{`/clear`}</code>로 즉시 컨텍스트 초기화</li>
      <li>단순 작업은 <code>{`claude-haiku-4-5`}</code> 모델 사용</li>
      <li>큰 파일 전체 참조보다 필요한 줄 범위만 참조</li>
    </ul>
  </section>

  <section id="memory">
    <h2>2. 메모리 시스템 활용</h2>
    <p>
      클로드 코드는 세션이 끝나면 대화를 기억하지 못합니다. 하지만 다양한 방법으로 "기억"을 구현할 수 있습니다.
    </p>

    <h3>CLAUDE.md가 메모리다</h3>
    <p>프로젝트와 관련된 중요한 결정, 규칙, 컨텍스트는 모두 CLAUDE.md에 기록합니다:</p>
    <pre><code>{`&gt; 오늘 결정한 내용을 CLAUDE.md에 추가해줘:
  - 인증은 JWT 대신 세션 방식으로 결정
  - 이유: 모바일 앱에서 토큰 갱신 복잡도 때문
  - 결정 날짜: 2025-01-15`}</code></pre>

    <h3>클로드 코드의 자동 메모리 시스템</h3>
    <p>클로드 코드는 <code>{`~/.claude/projects/`}</code> 디렉터리에 프로젝트별 메모리 파일을 자동으로 관리합니다:</p>
    <pre><code>{`&gt; 오늘 대화에서 나온 중요한 결정들을 메모리에 저장해줘`}</code></pre>
    <p>저장된 메모리는 다음 세션에서도 불러올 수 있습니다.</p>

    <h3>외부 컨텍스트 파일 활용</h3>
    <p>긴 컨텍스트가 필요한 작업은 파일로 준비합니다:</p>
    <pre><code>{`# 요구사항 문서를 파일로 만들기
cat requirements.md | claude -p "이 요구사항을 분석해서 개발 태스크 목록을 만들어줘"`}</code></pre>

    <h3>대화 내보내기</h3>
    <p>중요한 대화 내용은 파일로 저장해서 나중에 참조합니다:</p>
    <pre><code>{`# 터미널 스크롤백을 파일로 저장
script -q -c "claude" session.log`}</code></pre>

    <h3>컨텍스트 압축 전략</h3>
    <p>대화가 길어지면 클로드 코드는 이전 내용을 자동으로 요약해서 컨텍스트를 압축합니다. 중요한 내용이 잘려나가는 것을 방지하려면 중요 결정이나 규칙은 대화 중에 CLAUDE.md에 바로 저장하세요.</p>
    <pre><code>{`&gt; 지금까지 우리가 결정한 것들을 한 번 정리해서 CLAUDE.md에 추가해줘`}</code></pre>
  </section>

  <section id="multi-session">
    <h2>3. 멀티 세션 전략</h2>
    <p>복잡한 작업을 하나의 긴 세션에서 처리하기보다, 명확한 목적을 가진 여러 세션으로 나누면 훨씬 효율적입니다.</p>

    <h3>세션 분리 패턴</h3>
    <pre><code>{`# 세션 1: 탐색 (읽기 전용)
claude
&gt; 현재 인증 시스템의 구조를 파악해줘. 코드는 수정하지 마.
# /clear 또는 종료

# 세션 2: 설계 (Plan 모드)
claude
&gt; [이전 세션 결과 참조] 이 구조에서 OAuth를 추가하는 설계를 해줘.
# 설계를 파일로 저장 후 /clear

# 세션 3: 구현 (실행)
claude
&gt; @docs/oauth-design.md 이 설계대로 구현해줘`}</code></pre>

    <h3>/rewind — 실수 되돌리기</h3>
    <p>잘못된 방향으로 갔을 때 <code>{`/rewind`}</code>로 이전 상태로 돌아갈 수 있습니다:</p>
    <pre><code>{`/rewind    # 마지막 대화 턴을 취소하고 이전 상태로 복구`}</code></pre>
    <p>단, /rewind는 대화 히스토리만 되돌립니다. 이미 수정된 파일은 되돌아가지 않으므로 git을 병행 사용하세요.</p>
  </section>


    </LessonLayout>
  );
}
