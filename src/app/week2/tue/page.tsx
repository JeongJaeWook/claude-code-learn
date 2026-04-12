
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week2/tue');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="basics">
    <h2>1. 프롬프트 엔지니어링 기초</h2>
    <p>
      클로드 코드에게 "버그 고쳐줘"와 "auth.py 파일의 42번째 줄에서 JWT 토큰 검증 로직이 만료 시간을 확인하지 않는 버그가 있어. 수정해줘"는 결과가 전혀 다릅니다. 좋은 프롬프트는 좋은 결과를 만듭니다.
    </p>

    <h3>좋은 프롬프트의 3요소</h3>
    <ul>
      <li><strong>맥락(Context)</strong>: 어떤 상황인지, 어떤 코드를 다루는지</li>
      <li><strong>목적(Goal)</strong>: 무엇을 원하는지 정확하게</li>
      <li><strong>제약(Constraint)</strong>: 어떤 방식으로, 어떤 형식으로</li>
    </ul>

    <h3>나쁜 예 vs 좋은 예</h3>
    <pre><code>{`# 나쁜 예
&gt; 코드 고쳐줘

# 좋은 예
&gt; src/api/users.py의 create_user 함수에서 이메일 중복 검사를 하지 않고 있어.
  같은 이메일로 가입하면 데이터베이스 에러가 발생해.
  이메일 중복 시 HTTP 409 에러를 반환하도록 수정해줘.
  기존 테스트 코드도 함께 업데이트해줘.`}</code></pre>
  </section>

  <section id="context">
    <h2>2. 컨텍스트 최적화 전략</h2>
    <p>클로드 코드의 컨텍스트 윈도우는 유한합니다. 불필요한 내용으로 채우지 않고, 필요한 정보를 효율적으로 제공하는 것이 중요합니다.</p>

    <h3>관련 파일만 포함하기</h3>
    <pre><code>{`# 나쁜 예: 모든 파일을 보게 하기
&gt; 프로젝트 전체를 분석해서 버그를 찾아줘

# 좋은 예: 범위를 좁히기
&gt; @src/auth/jwt.py @src/middleware/auth.py
  이 두 파일에서 토큰 갱신 로직의 버그를 찾아줘`}</code></pre>

    <h3>컨텍스트 초기화 타이밍</h3>
    <p>한 가지 작업이 완전히 끝나면 <code>{`/clear`}</code>로 대화를 초기화하는 것이 좋습니다. 이전 작업의 맥락이 새 작업을 방해할 수 있습니다.</p>

    <h3>에러 메시지는 전체를 붙여넣기</h3>
    <pre><code>{`# 나쁜 예
&gt; 에러가 났어, 고쳐줘

# 좋은 예
&gt; 이 에러가 발생했어:
  Traceback (most recent call last):
    File "main.py", line 23, in &lt;module&gt;
      result = process_data(df)
    File "utils.py", line 15, in process_data
      return df.groupby('date')['amount'].sum()
  KeyError: 'amount'
  어떻게 고치면 돼?`}</code></pre>
  </section>

  <section id="shortcuts">
    <h2>3. 특수 문자 숏컷으로 프롬프트 편의성 극대화</h2>

    <h3>@ — 파일 참조</h3>
    <p>파일 경로 앞에 <code>{`@`}</code>를 붙이면 해당 파일의 내용을 컨텍스트에 포함시킵니다.</p>
    <pre><code>{`&gt; @src/models/user.py 이 모델에 created_at 필드를 추가해줘`}</code></pre>
    <p><code>{`@`}</code> 다음에 탭을 누르면 파일 자동완성이 됩니다.</p>

    <h3># — 메모리/이슈 참조</h3>
    <p>Claude Code의 메모리 시스템이나 이슈 번호를 참조할 때 사용합니다.</p>

    <h3>! — 쉘 명령어</h3>
    <pre><code>{`&gt; ! git diff HEAD~1 HEAD -- src/auth.py
  이 변경사항에서 보안 취약점이 있는지 검토해줘`}</code></pre>

    <h3>멀티라인 입력 (Shift+Enter)</h3>
    <p>복잡한 프롬프트는 여러 줄로 나눠서 작성하면 가독성이 높아집니다:</p>
    <pre><code>{`아래 조건으로 API 엔드포인트를 만들어줘:     [Shift+Enter]
- POST /api/users                           [Shift+Enter]
- 요청 바디: email, password, name          [Shift+Enter]
- 이메일 중복 검사                           [Shift+Enter]
- 비밀번호는 bcrypt로 해시                   [Enter 전송]`}</code></pre>
  </section>

  <section id="hierarchical">
    <h2>4. 계층적 질문 전략</h2>
    <p>큰 작업을 한 번에 요청하기보다 단계적으로 나눠서 진행하면 더 정확한 결과를 얻을 수 있습니다.</p>

    <h3>탐색 → 계획 → 실행</h3>
    <pre><code>{`# 1단계: 탐색
&gt; 현재 인증 시스템이 어떻게 구현되어 있는지 설명해줘

# 2단계: 계획 확인
&gt; OAuth 2.0 소셜 로그인을 추가하려면 어떤 파일을 수정해야 해?
  수정 계획을 먼저 보여줘, 실제 코드는 아직 수정하지 마

# 3단계: 실행
&gt; 계획 좋아. 이제 순서대로 구현해줘`}</code></pre>

    <h3>검증 포함하기</h3>
    <pre><code>{`# 구현 후 검증 요청
&gt; 방금 만든 코드가 edge case를 모두 처리하고 있어?
  놓친 부분이 있으면 보완해줘`}</code></pre>
  </section>

  <section id="templates">
    <h2>5. 실전 프롬프트 템플릿</h2>

    <h3>버그 수정 템플릿</h3>
    <pre><code>{`&gt; [파일: @경로]에서 [문제 현상]이 발생하고 있어.
  재현 방법: [재현 단계]
  예상 동작: [기대하는 결과]
  실제 동작: [실제 결과]
  에러 메시지: [에러 내용]
  원인을 파악하고 수정해줘.`}</code></pre>

    <h3>기능 추가 템플릿</h3>
    <pre><code>{`&gt; [기능명]을 추가해줘.
  - 입력: [입력 설명]
  - 출력: [출력 설명]
  - 제약: [제약사항]
  - 기존 [관련 기능]과의 일관성을 유지해줘.
  - 테스트 코드도 작성해줘.`}</code></pre>

    <h3>코드 리뷰 템플릿</h3>
    <pre><code>{`&gt; @변경된파일.py 를 코드 리뷰해줘.
  특히 다음 관점에서 봐줘:
  1. 잠재적 버그
  2. 성능 문제
  3. 보안 취약점
  각 이슈마다 심각도(높음/중간/낮음)도 표시해줘.`}</code></pre>
  </section>

  <section id="project">
    <h2>6. 실습: 프로젝트 기획</h2>
    <p>지금까지 배운 프롬프트 기법을 활용해서 실제 미니 프로젝트를 기획해봅시다.</p>
    <pre><code>{`&gt; 개인 독서 기록 앱을 만들고 싶어.
  - 책 제목, 저자, 읽은 날짜, 별점, 한줄 감상을 기록
  - 웹 앱으로 만들고 싶어

  다음 순서로 도와줘:
  1. 어떤 기술 스택이 적합한지 추천해줘 (이유 포함)
  2. 데이터베이스 스키마를 설계해줘
  3. API 엔드포인트 목록을 작성해줘`}</code></pre>
  </section>

  <section id="advanced">
    <h2>7. 고급 프롬프트 기법</h2>

    <h3>인터뷰 기법 — 클로드에게 질문하게 하기</h3>
    <p>큰 기능을 설계할 때, 클로드에게 먼저 인터뷰를 요청하면 놓치기 쉬운 부분을 잡을 수 있습니다:</p>
    <pre><code>{`&gt; 실시간 채팅 기능을 만들고 싶어. 구현 전에 먼저 인터뷰해줘.
  기술적 구현, UI/UX, 엣지 케이스, 트레이드오프에 대해 질문해줘.
  뻔한 질문 말고, 내가 놓쳤을 어려운 부분을 파고들어줘.
  인터뷰가 끝나면 완전한 스펙을 SPEC.md에 작성해줘.`}</code></pre>
    <blockquote>
      <strong>팁:</strong> 스펙이 완성되면 <code>{`/clear`}</code>로 새 세션을 시작하고, 해당 스펙을 기반으로 구현하세요.
      깨끗한 컨텍스트에서 구현에만 집중할 수 있습니다.
    </blockquote>

    <h3>검증 기준 포함하기 — 가장 중요한 습관</h3>
    <p>클로드가 스스로 작업을 검증할 수 있으면 결과물 품질이 <strong>극적으로 향상</strong>됩니다:</p>
    <pre><code>{`# 나쁜 예
&gt; 이메일 검증 함수를 만들어줘

# 좋은 예
&gt; validateEmail 함수를 만들어줘.
  테스트 케이스: user@example.com은 true,
  "invalid"는 false, user@.com은 false.
  구현 후 테스트를 실행해서 모두 통과하는지 확인해줘.`}</code></pre>

    <h3>역할 부여</h3>
    <pre><code>{`&gt; 시니어 백엔드 엔지니어로서 이 코드를 리뷰해줘.
  특히 확장성과 유지보수성 관점에서 봐줘.`}</code></pre>

    <h3>Writer/Reviewer 패턴 — 두 세션 활용</h3>
    <p>하나의 세션에서 코드를 작성하고, 별도 세션에서 리뷰하면 편향 없는 검토가 가능합니다:</p>
    <pre><code>{`# 세션 A (Writer)
&gt; API rate limiter를 구현해줘

# 세션 B (Reviewer) — 새 터미널에서 claude 실행
&gt; @src/middleware/rateLimiter.ts를 리뷰해줘.
  엣지 케이스, 레이스 컨디션, 기존 미들웨어 패턴과의 일관성을 확인해줘`}</code></pre>

    <h3>대안 제시 요청</h3>
    <pre><code>{`&gt; 이 문제를 해결하는 방법을 3가지 알려줘.
  각 방법의 장단점을 비교하고,
  우리 프로젝트 상황에 가장 적합한 것을 추천해줘.`}</code></pre>
  </section>

  <section id="troubleshoot">
    <h2>8. 문제 해결 및 팁</h2>

    <h3>결과가 기대와 다를 때</h3>
    <pre><code>{`&gt; 내가 원하는 게 그게 아니야. 다시 설명할게.
  [더 구체적인 설명]`}</code></pre>

    <h3>너무 많은 코드를 한 번에 바꿀 때</h3>
    <p>클로드 코드가 너무 많은 파일을 한 번에 수정하려 하면 잠깐 멈추고 확인하세요:</p>
    <pre><code>{`&gt; 잠깐, 수정하기 전에 어떤 파일을 어떻게 바꿀 건지 계획을 먼저 보여줘`}</code></pre>

    <h3>작업 중단하기</h3>
    <p><code>{`Ctrl+C`}</code>를 누르면 클로드 코드의 작업을 즉시 중단할 수 있습니다. 실수로 잘못된 방향으로 가고 있을 때 유용합니다.</p>
  </section>


    </LessonLayout>
  );
}
