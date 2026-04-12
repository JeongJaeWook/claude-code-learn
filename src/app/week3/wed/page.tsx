
import React from 'react';
import LessonLayout from '../../../components/LessonLayout';
import { getLessonBySlug } from '../../../data/curriculum';

export default function Page() {
  const lesson = getLessonBySlug('/week3/wed');
  if (!lesson) return <div>Lesson not found</div>;

  return (
    <LessonLayout lesson={lesson}>
      

  <section id="unit">
    <h2>1. 단위 테스트</h2>
    <p>
      클로드 코드는 테스트 작성의 가장 큰 장벽인 "귀찮음"을 제거해줍니다. 코드를 작성하자마자 바로 테스트도 함께 만들 수 있습니다.
    </p>

    <h3>코드에서 테스트 자동 생성</h3>
    <pre><code>{`&gt; @app/services/recipe_service.py 이 파일의 모든 함수에 대한
  단위 테스트를 작성해줘.
  pytest 사용, edge case와 실패 케이스도 포함해줘.`}</code></pre>

    <h3>테스트 커버리지 높이기</h3>
    <pre><code>{`# 커버리지 보고서 생성
pytest --cov=app --cov-report=html

# 커버리지가 낮은 부분 확인 후 클로드에게 요청
&gt; coverage 보고서를 보면 app/utils/validators.py의 커버리지가 45%야.
  나머지 55%를 커버하는 테스트를 추가해줘.`}</code></pre>

    <h3>좋은 단위 테스트의 특성 (FIRST)</h3>
    <pre><code>{`&gt; 내가 작성한 테스트들이 FIRST 원칙(Fast, Independent, Repeatable,
  Self-validating, Timely)을 잘 따르고 있는지 검토해줘.`}</code></pre>
  </section>

  <section id="tdd">
    <h2>2. TDD 워크플로</h2>
    <p>TDD(Test-Driven Development)는 테스트를 먼저 작성하고 코드를 나중에 작성하는 방법론입니다. 클로드 코드와 함께하면 TDD가 더 자연스러워집니다.</p>

    <h3>Red-Green-Refactor 사이클</h3>
    <pre><code>{`# 1. Red: 실패하는 테스트 먼저 작성
&gt; 레시피 검색 기능의 테스트를 먼저 작성해줘.
  아직 구현 코드는 없어도 돼.
  다음 케이스를 커버해줘:
  - 제목으로 검색
  - 재료로 검색
  - 카테고리 필터
  - 검색 결과 없음

# 2. Green: 테스트를 통과하는 최소한의 코드 작성
&gt; 방금 작성한 테스트들이 통과하는 최소한의 구현을 해줘

# 3. Refactor: 코드 개선
&gt; 테스트는 통과하지만 코드가 지저분해. 테스트를 깨뜨리지 않고 리팩토링해줘`}</code></pre>

    <h3>클로드 코드와 TDD의 조합</h3>
    <blockquote>
      "테스트 먼저 → 구현 → 리팩토링" 사이클에서 클로드 코드는 각 단계에서 빠른 초안을 제공합니다. 개발자는 제안된 테스트가 올바른 요구사항을 검증하는지, 구현이 의도대로 동작하는지 검토하는 역할에 집중합니다.
    </blockquote>

    <h3>검증 기준을 프롬프트에 포함하기</h3>
    <p>클로드 코드가 스스로 결과를 검증할 수 있으면 품질이 극적으로 향상됩니다:</p>
    <pre><code>{`# 검증 기준이 없는 요청 (결과 불확실)
&gt; 이메일 검증 함수를 만들어줘

# 검증 기준이 포함된 요청 (결과 확실)
&gt; validateEmail 함수를 만들어줘.
  테스트 케이스: user@example.com → true,
  "invalid" → false, user@.com → false, @domain.com → false
  구현 후 테스트를 실행해서 모두 통과하는지 확인해줘.`}</code></pre>

    <h3>프로퍼티 기반 테스트</h3>
    <p>개별 테스트 케이스 대신 "이 함수는 항상 이 속성을 만족해야 한다"는 규칙을 검증합니다:</p>
    <pre><code>{`&gt; sort_recipes 함수에 대해 hypothesis를 사용한 프로퍼티 기반 테스트를 작성해줘.
  - 결과 리스트의 길이는 입력과 같아야 함
  - 결과는 항상 정렬되어 있어야 함
  - 입력의 모든 원소가 결과에 존재해야 함`}</code></pre>
  </section>

  <section id="integration">
    <h2>3. 통합 테스트</h2>
    <p>단위 테스트가 함수 하나를 검증한다면, 통합 테스트는 여러 컴포넌트가 함께 잘 동작하는지 검증합니다.</p>

    <h3>API 통합 테스트</h3>
    <pre><code>{`&gt; FastAPI의 TestClient를 사용해서 레시피 CRUD API의 통합 테스트를 작성해줘.
  실제 테스트 DB를 사용하고, 각 테스트 후 DB를 초기화해줘.
  인증이 필요한 엔드포인트 테스트도 포함해줘.`}</code></pre>

    <h3>데이터베이스 통합 테스트</h3>
    <pre><code>{`&gt; PostgreSQL과의 통합 테스트를 위한 pytest 픽스처를 만들어줘.
  트랜잭션 롤백 방식으로 각 테스트 후 DB를 자동 정리해줘.`}</code></pre>
  </section>

  <section id="e2e">
    <h2>4. E2E 테스트</h2>
    <p>E2E(End-to-End) 테스트는 실제 사용자의 시나리오를 처음부터 끝까지 자동으로 테스트합니다.</p>

    <h3>Playwright로 E2E 테스트</h3>
    <pre><code>{`&gt; Playwright를 사용해서 다음 사용자 시나리오의 E2E 테스트를 작성해줘:
  1. 회원가입 → 로그인
  2. 레시피 작성 → 이미지 업로드 → 게시
  3. 다른 사용자의 레시피 검색 → 찜하기
  4. 댓글 작성 → 수정 → 삭제`}</code></pre>

    <h3>E2E 테스트 실행 전략</h3>
    <p>E2E 테스트는 느리기 때문에 모든 커밋마다 실행하기보다 PR 머지 전, 또는 야간 배치로 실행하는 것이 일반적입니다.</p>
    <pre><code>{`&gt; E2E 테스트를 GitHub Actions에서 PR 머지 전에만 실행하는 워크플로를 만들어줘`}</code></pre>
  </section>

  <section id="cicd">
    <h2>5. 테스트 자동화와 CI/CD</h2>
    <p>모든 테스트를 자동으로 실행하는 CI/CD 파이프라인을 구축합니다.</p>

    <h3>GitHub Actions 워크플로</h3>
    <pre><code>{`&gt; GitHub Actions CI 워크플로를 만들어줘.
  PR 생성 시 자동으로:
  1. 린트 (ruff, mypy)
  2. 단위 테스트 (pytest)
  3. 통합 테스트 (testcontainers로 DB 띄우기)
  4. 커버리지 80% 미만이면 실패
  을 실행하고, 결과를 PR 코멘트로 달아줘.`}</code></pre>

    <h3>테스트 실패 자동 분석</h3>
    <pre><code>{`# CI에서 실패한 테스트 로그를 클로드에게 분석시키기
cat ci_logs.txt | claude -p "CI에서 실패한 테스트를 분석하고 원인과 해결 방법을 알려줘"`}</code></pre>
  </section>

  <section id="monitoring">
    <h2>6. 테스트 모니터링과 리포팅</h2>

    <h3>테스트 품질 메트릭</h3>
    <pre><code>{`&gt; 현재 테스트 스위트의 품질을 분석해줘:
  - 커버리지가 낮은 모듈
  - 실행 시간이 오래 걸리는 테스트
  - 불안정한(flaky) 테스트 패턴
  개선 우선순위를 제안해줘.`}</code></pre>

    <h3>테스트 리포트 자동화</h3>
    <pre><code>{`&gt; pytest-html로 테스트 결과를 HTML 리포트로 생성하고,
  GitHub Pages에 자동으로 배포하는 설정을 만들어줘.`}</code></pre>

    <h3>Mutation Testing</h3>
    <pre><code>{`&gt; mutmut으로 뮤테이션 테스트를 실행하고 결과를 분석해줘.
  살아남은 뮤턴트들을 잡을 수 있는 테스트를 추가해줘.`}</code></pre>
  </section>


    </LessonLayout>
  );
}
